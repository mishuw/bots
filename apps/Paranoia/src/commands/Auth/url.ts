import { WosskiClient, Command } from '@repo/client'
import { bold, inlineCode, Message } from 'discord.js'

export default class VanityURLUsesCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'url',
      aliases: ['özellink', 'urele'],
      description: "Özel url'yi kaç kişinin kullandığını gösterir!",
      category: 'Auth',
      permissions: ['Administrator']
    })
  }

  override async run(_: InstanceType<typeof WosskiClient>, message: Message) {
    if (!message.guild?.vanityURLCode) {
      await message.timed("Sunucunun özel bir url'si bulunmuyor!")
      return
    }

    const url = await message.guild.fetchVanityData()

    await message.reply({
      content: `https://discord.gg/${message.guild.vanityURLCode} ${bold(
        `(${inlineCode(url.uses.toString())} kez kullanıldı.)`
      )}`
    })
  }
}
