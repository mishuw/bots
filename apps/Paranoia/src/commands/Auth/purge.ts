import { WosskiClient, Command } from '@repo/client'
import { bold, Message, TextChannel } from 'discord.js'

export default class ClearCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'sil',
      aliases: ['purge', 'clear', 'temizle'],
      description: 'Kanalda mesaj siler!',
      category: 'Auth',
      permissions: ['ManageMessages']
    })
  }

  override async run(_: InstanceType<typeof WosskiClient>, message: Message, args: string[]) {
    const amountArg = parseInt(args[0])
    if (!amountArg || isNaN(amountArg) || amountArg < 1) {
      await message.reply({ content: 'Geçerli bir sayı gir.' })
      return
    }

    let amount = amountArg
    const channel = message.channel as TextChannel
    let deleted = 0

    try {
      while (amount > 0) {
        const limit = Math.min(amount, 100)

        const messages = await channel.messages.fetch({ limit })
        if (!messages.size) break

        const deletable = messages.filter((m) => Date.now() - m.createdTimestamp < 14 * 24 * 60 * 60 * 1000)

        if (!deletable.size) break

        await channel.bulkDelete(deletable, true)
        deleted += deletable.size
        amount -= deletable.size
      }

      await message.timed(`${bold(deleted.toString())} adet mesaj silindi.`)
    } catch (err) {
      console.error(err)
    }
  }
}
