import { Event, WosskiClient } from '@repo/client'
import { Config } from '@repo/config'
import { db, and, eq, notInArray, roleSchema } from '@repo/db'
import { Events } from 'discord.js'

export default class ClientReadyEvent extends Event {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.ClientReady })
  }

  async run(client: InstanceType<typeof WosskiClient>) {
    client.logger.info(`Logged in as ${client.user?.tag}`)
    const guild = client.guilds.cache.get(Config.serverID)
    if (!guild) throw new Error('Guild not found')
    await guild.fetchConfig(client)

    const roleIds = guild.roles.cache.map((r) => r.id)
    const now = Date.now()

    await db
      .update(roleSchema)
      .set({
        isDeleted: true,
        deletedTimestamp: now
      })
      .where(and(eq(roleSchema.isDeleted, false), roleIds.length ? notInArray(roleSchema.id, roleIds) : undefined))
      .execute()

    await guild.backup()
    setInterval(() => guild.backup(), 1000 * 60 * 60 * 2)
  }
}
