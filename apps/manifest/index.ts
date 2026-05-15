import { WosskiClient } from '@repo/client'

(async () => {
  const client = (global.client = new WosskiClient({
    name: 'manifest',
    baseDir: import.meta.dirname,
    token: 'xxd',
    commands: false,
    events: true
  }))
  await client.start()
})()