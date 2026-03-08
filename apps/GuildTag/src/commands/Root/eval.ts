import { WosskiClient, Command } from '@repo/client'
import { codeBlock, Message } from 'discord.js'
import { inspect } from 'node:util'
import { Script, createContext } from 'node:vm'

export default class EvalCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'eval',
      aliases: ['run'],
      description: 'Secure eval',
      category: 'Root'
    })
  }

  override async run(client: InstanceType<typeof WosskiClient>, message: Message, args: string[]) {
    const code = args.join(' ')
    if (!code) {
      await message.timed('??')
      return
    }

    try {
      const sandbox = {
        console,
        setTimeout,
        Promise,
        client,
        message,
        args
      }

      const context = createContext(sandbox)

      const wrapped = `
        (async () => {
          ${code}
        })()
      `

      const script = new Script(wrapped)

      const result = await script.runInContext(context)

      const output = inspect(result, { depth: 1 })

      const messages = splitMessage(clean(output), { maxLength: 1900 })
      for (const m of messages) await message.reply(codeBlock('ts', m))
    } catch (err: any) {
      const messages = splitMessage(clean(err?.stack || err.message), {
        maxLength: 1900
      })
      for (const m of messages) await message.reply(codeBlock('ts', m))
    }
  }
}

function clean(text: string) {
  return text.replace(/`/g, '`\u200b').replace(/@/g, '@\u200b')
}

function splitMessage(text: string, { maxLength = 2000, char = '\n', prepend = '', append = '' } = {}) {
  if (text.length <= maxLength) return [append + text + prepend]
  const splitText = text.split(char)
  const messages = []
  let msg = ''
  for (const chunk of splitText) {
    if (msg && (msg + char + chunk + append).length > maxLength) {
      messages.push(msg + append)
      msg = prepend
    }
    msg += (msg && msg !== prepend ? char : '') + chunk
  }
  return messages.concat(msg).filter((m) => m)
}
