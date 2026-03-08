import { WosskiClient } from '@repo/client'
import { Config } from '@repo/config'
;(async () => {
  const client = (global.client = new WosskiClient({
    baseDir: import.meta.dirname,
    token: Config.Bots.Main.Private.token,
    commands: false,
    events: true,
    presence: {
      name: 'misu was here',
      type: 3,
      status: 'dnd'
    }
  }))

  await client.start()
})()

process.on('unhandledRejection', (error: Error) => logger.error(`${error.name}: ${error.message}`))
process.on('uncaughtException', (error: Error) => logger.error(`${error.name}: ${error.message}`))
