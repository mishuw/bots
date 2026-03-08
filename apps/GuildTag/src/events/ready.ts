import { Event, WosskiClient } from '@repo/client'
import { Config } from '@repo/config'
import { Colors, Events, inlineCode, TextChannel } from 'discord.js'
import { debounceCache } from './raw.js'

const CONCURRENCY = 5

export default class ClientReadyEvent extends Event {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.ClientReady, once: true })
  }

  async run(client: InstanceType<typeof WosskiClient>) {
    client.logger.info(`Logged in as ${client.user?.tag}`)
    const guild = client.guilds.cache.get(Config.serverID)
    if (!guild) throw new Error('Guild not found')


    const members = await guild.members.fetch()
    const logChannel = guild.findChannel('guild-logs') as TextChannel

    const tasks: (() => Promise<void>)[] = []

    for (const member of members.values()) {
      if (member.user.bot) continue

      const shouldHaveRole = member.user.primaryGuild?.identityGuildId === Config.serverID
      const hasRole = member.roles.cache.has("1415371533483901162")

      if (shouldHaveRole === hasRole) continue
      const last = debounceCache.get(member.id)
      if (last && Date.now() - last < 3000) return

      tasks.push(async () => {
        try {
          if (shouldHaveRole) {
            await member.roles.add("1415371533483901162")
          } else {
            await member.roles.remove("1415371533483901162")
          }
          if (logChannel)
            logChannel.send({
              embeds: [
                client.embed({
                  color: shouldHaveRole ? Colors.Green : Colors.Red,
                  description: `${member} [${inlineCode(member.id)}] ${inlineCode(`@${member.guild.roles.cache.get("1415371533483901162")?.name}`)} ${shouldHaveRole ? 'verildi' : 'alındı'}.`
                })
              ]
            })
        } catch {}
      })
    }

    await this.runWithConcurrency(tasks, CONCURRENCY)
    client.logger.info(`⚡ Tamamlandı — ${tasks.length} üye güncellendi`)
  }

  private async runWithConcurrency(tasks: (() => Promise<void>)[], limit: number) {
    const executing = new Set<Promise<void>>()

    for (const task of tasks) {
      const p = task()
      executing.add(p)

      p.finally(() => executing.delete(p))

      if (executing.size >= limit) {
        await Promise.race(executing)
      }
    }

    await Promise.allSettled(executing)
  }
}