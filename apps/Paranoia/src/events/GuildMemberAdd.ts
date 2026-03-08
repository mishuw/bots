import { Event, WosskiClient } from '@repo/client'
import { bold, Events, GuildMember, TextChannel } from 'discord.js'

export default class GuildMemberAddEvent extends Event {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.GuildMemberAdd })
  }

  async run(client: InstanceType<typeof WosskiClient>, member: GuildMember) {
    const chn = member.guild.findChannel('derin') as TextChannel
    if (client.guildConfig.autoRole) member.roles.add(client.guildConfig.autoRole).catch(() => {})
    if (chn) chn.send(`${await client.findEmoji('tht_52')} ${bold(`Sunucumuza hoş geldin ${member} ^^`)}`)
  }
}
