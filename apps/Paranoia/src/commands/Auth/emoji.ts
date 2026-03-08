import { WosskiClient, Command } from '@repo/client'
import { Message, parseEmoji } from 'discord.js'

const EMOJI_REGEX = /<a?:\w+:\d+>/g

export default class EmojiCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'emoji',
      aliases: ['e', 'ee'],
      description: 'emoji ekler!',
      category: 'Auth',
      permissions: ['Administrator']
    })
  }

  override async run(_: InstanceType<typeof WosskiClient>, message: Message, args: string[]) {
    if (!args.length) return message.reply({ content: 'Geçerli bir sayı gir.' })

    const content = args.join(' ')
    const matches = content.match(EMOJI_REGEX)

    if (!matches?.length) return message.reply({ content: 'Custom emoji yok lan bunda' })

    const results = await Promise.all(
      matches.map(async (raw) => {
        const parsed = parseEmoji(raw)
        if (!parsed?.id) return 'Emoji parse edilemedi.'

        const ext = parsed.animated ? 'gif' : 'png'
        const url = `https://cdn.discordapp.com/emojis/${parsed.id}.${ext}`

        try {
          const emoji = await message.guild!.emojis.create({
            attachment: url,
            name: parsed.name!
          })

          return `${emoji}`
        } catch {
          return `:${parsed.name} eklenemedi`
        }
      })
    )

    return message.reply({ content: results.join(' ') })
  }
}
