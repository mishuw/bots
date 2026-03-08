import { Event, MessageCommandHandler, WosskiClient } from '@repo/client'
import { Events, Message } from 'discord.js'

export default class MessageCreateEvent extends Event {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.MessageCreate })
  }

  async run(client: InstanceType<typeof WosskiClient>, message: Message) {
    MessageCommandHandler(client, message)
  }
}
