import { WosskiClient, Command } from '@repo/client'
import { ChannelType, Message, PermissionFlagsBits } from 'discord.js'

export default class LockCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'lock',
      aliases: ['kilit', 'l'],
      description: 'Kanalı kilitler!',
      category: 'Auth',
      permissions: ['Administrator']
    })
  }

  override async run(_: InstanceType<typeof WosskiClient>, message: Message) {
    if (!message.guild) return

    const channel = message.channel
    if (!channel || channel.type === ChannelType.DM || !('permissionOverwrites' in channel)) {
      return
    }

    const everyoneId = message.guild.roles.everyone.id
    const overwrite = channel.permissionOverwrites.cache.get(everyoneId)

    const isLocked = overwrite?.deny.has(PermissionFlagsBits.SendMessages) === true

    await channel.permissionOverwrites.edit(everyoneId, {
      SendMessages: isLocked ? null : false
    })

    await message.timed(`Kanal ${isLocked ? 'açıldı' : 'kilitlendi'}.`)
  }
}
