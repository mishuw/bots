import { WosskiClient, Command } from '@repo/client'
import { ChannelType, Message, TextChannel } from 'discord.js'

export default class NukeCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'nuke',
      aliases: ['nuke', 'clone', 'kopyala'],
      description: 'Kanalı silip yenisini oluşturur!',
      category: 'Auth',
      permissions: ['Administrator']
    })
  }

  override async run(_: InstanceType<typeof WosskiClient>, message: Message) {
    const channel = message.channel as TextChannel

    const data = {
      name: channel.name,
      type: channel.type,
      topic: channel.topic ?? undefined,
      nsfw: channel.nsfw ?? false,
      rateLimitPerUser: channel.rateLimitPerUser ?? 0,
      parent: channel.parentId ?? null,
      position: channel.position,
      permissionOverwrites: channel.permissionOverwrites.cache.map((o) => ({
        id: o.id,
        type: o.type,
        allow: o.allow.bitfield,
        deny: o.deny.bitfield
      }))
    }
    await channel.delete('Nuke command').catch(() => {})

    const newChannel = await message.guild.channels.create({
      name: data.name,
      type: data.type === ChannelType.GuildText ? ChannelType.GuildText : data.type,
      topic: data.topic,
      nsfw: data.nsfw,
      rateLimitPerUser: data.rateLimitPerUser,
      parent: data.parent,
      permissionOverwrites: data.permissionOverwrites
    })

    await newChannel.setPosition(channel.position)
  }
}
