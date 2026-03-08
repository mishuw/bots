import { WosskiClient } from '@repo/client'
import { Config } from '@repo/config'

for (let i = 0; i < Config.Bots.Welcome.Tokens.length; i++) {
  const client = new WosskiClient({
    voice: '1468968265043935305',
    token: Config.Bots.Welcome.Tokens[i],
    commands: false,
    events: false,
    presence: {
      name: 'misu was here',
      type: 3,
      status: 'dnd'
    }
  }).start();
}

process.on('unhandledRejection', (error: Error) => {
  client.logger.line()
  client.logger.error(`Unhandled Rejection at: ${error.name}\n\nReason: ${error.message}`)
  client.logger.line()
})
process.on('uncaughtException', (error: Error) => {
  client.logger.line()
  client.logger.error(`Uncaught exception: ${error.name}\n\nException origin: ${error.message}`)
  client.logger.line()
})
process.on('uncaughtExceptionMonitor', (error: Error) => {
  client.logger.line()
  client.logger.error(`Uncaught exception monitor: ${error.name}\n\nException origin: ${error.message}`)
  client.logger.line()
})
process.on('warning', (warning) => {
  if (warning.name === 'ExperimentalWarning' && warning.message.includes('buffer.File')) return
})
