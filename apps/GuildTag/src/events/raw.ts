import { Event, WosskiClient } from '@repo/client'
import { inlineCode, Colors, TextChannel, GatewayDispatchPayload, Events } from 'discord.js'
import { Config } from '@repo/config'

export const debounceCache = new Map<string, number>()

export default class RawGuildTagEvent extends Event {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.Raw })
  }

  async run(client: InstanceType<typeof WosskiClient>, packet: GatewayDispatchPayload) {
    if (packet.t !== 'GUILD_MEMBER_UPDATE') return
    const data = packet.d
    if (data.guild_id !== Config.serverID) return

    const guild = client.guilds.cache.get(Config.serverID)
    if (!guild) return
    const member = guild.members.cache.get(data.user.id)
    if (!member || member.user.bot) return

    const last = debounceCache.get(member.id)
    if (last && Date.now() - last < 3000) return
    debounceCache.set(member.id, Date.now())

    const logChannel = guild.findChannel('guild-logs') as TextChannel

    const hasTag = data.user.primary_guild?.identity_guild_id === Config.serverID
    const hasRole = member.roles.cache.has("1415371533483901162")

    if (hasTag && !hasRole) {
      await member.roles.add("1415371533483901162").catch(() => {})
      if (logChannel)
        logChannel.send({
          embeds: [
            client.embed({
              color: Colors.Green,
              description: `${member} [${inlineCode(member.id)}] ${inlineCode(`@${member.guild.roles.cache.get("1415371533483901162")?.name}`)} verildi`
            })
          ]
        })
    } else if (!hasTag && hasRole) {
      await member.roles.remove("1415371533483901162").catch(() => {})
      if (logChannel)
        logChannel.send({
          embeds: [
            client.embed({
              color: Colors.Red,
              description: `${member} [${inlineCode(member.id)}] ${inlineCode(`@${member.guild.roles.cache.get("1415371533483901162")?.name}`)} alındı`
            })
          ]
        })
    }
  }
}