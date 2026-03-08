import { Event, WosskiClient } from '@repo/client'
import { Data } from '@repo/config'
import { Events, Interaction, GuildMember, MessageFlags } from 'discord.js'

export default class InteractionCreateEvent extends Event {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.InteractionCreate })
  }

  async run(_client: InstanceType<typeof WosskiClient>, interaction: Interaction) {
    if (!interaction.isStringSelectMenu() || interaction.customId !== 'color_roles') return

    const member = interaction.member as GuildMember
    const selectedRole = interaction.values[0]
    const colorRoles = Object.values(Data.Colors)

    const rolesToRemove = member.roles.cache.filter((r) => colorRoles.includes(r.id))
    if (rolesToRemove.size) await member.roles.remove(rolesToRemove).catch(() => {})

    if (!member.roles.cache.has(selectedRole)) await member.roles.add(selectedRole).catch(() => {})

    await interaction.reply({
      content: `Rengin güncellendi <@&${selectedRole}>`,
      flags: MessageFlags.Ephemeral
    })
  }
}
