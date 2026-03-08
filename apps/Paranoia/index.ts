import { WosskiClient } from '@repo/client'
import { Config } from '@repo/config'
;(async () => {
  const client = (global.client = new WosskiClient({
    voice: '1468968265043935305',
    baseDir: import.meta.dirname,
    token: 'MTM0ODA2Nzc5MzQ1MDMwNzY2NQ.G082-R.q0VYOI2cbwhV7FqLVc5-JBaTPdH4jOp9doU654',
    commands: true,
    events: true,
    presence: {
      name: 'misu was here',
      type: 3,
      status: 'dnd'
    }
  }))

  await client.start()
})()

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
