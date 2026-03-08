import { WosskiClient } from '@repo/client'
import { db, roleSchema, eq } from '@repo/db'
import { Guild, GuildAuditLogsEntry, GuildMember } from 'discord.js'

export default async function (client: WosskiClient, guild: Guild, member: GuildMember, audit: GuildAuditLogsEntry) {
  if (
    client.guildConfig.whitelist.includes(member.id) ||
    member.roles.cache.map((r) => r.id).some((id) => client.guildConfig.whitelist.includes(id))
  ) {
    return
  }

  await db
    .insert(roleSchema)
    .values({
      id: audit.targetId,
      isDeleted: true,
      deletedTimestamp: Date.now()
    })
    .onConflictDoUpdate({
      target: roleSchema.id,
      set: {
        isDeleted: true,
        deletedTimestamp: Date.now()
      }
    })
    .execute()

  const [document] = await db.select().from(roleSchema).where(eq(roleSchema.id, audit.targetId))
  if (!document) return

  await member.setRole(client.guildConfig.autoRole).catch(() => {})
  await guild.createRole(document)
}