import { Event, WosskiClient } from '@repo/client'
import { AuditLogEvent, Events, Guild, GuildAuditLogsEntry } from 'discord.js'
import RoleDelete from './RoleDelete.js'

export default class GuildRoleDeleteEvent extends Event {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.GuildAuditLogEntryCreate })
  }

  async run(client: InstanceType<typeof WosskiClient>, audit: GuildAuditLogsEntry, guild: Guild) {
    const type = audit.action
    const member = guild.members.cache.get(audit?.executorId)

    if (type === AuditLogEvent.RoleDelete) await RoleDelete(client, guild, member, audit)
  }
}