import { WosskiClient, Command } from '@repo/client'
import { Data } from '@repo/config'
import { bold, ComponentType, Message, MessageFlags, TextChannel } from 'discord.js'
export default class ColorCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'color',
      aliases: ['renk'],
      description: 'renk mesjı',
      category: 'Root'
    })
  }

  override async run(_client: InstanceType<typeof WosskiClient>, message: Message) {
    message.delete().catch(() => {});
    (message.channel as TextChannel).send({
      flags: MessageFlags.IsComponentsV2,
      components: [
        {
          type: ComponentType.TextDisplay,
          content: `${bold('Aşağıdaki menüden renk rolleri seçebilirsin :3')}`
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.StringSelect,
              custom_id: 'color_roles',
              placeholder: 'İstediğin renk rollerini seç!',
              min_values: 1,
              max_values: 1,
              options: Object.entries(Data.Colors).map(([name, id]) => {
                const role = message.guild?.roles.cache.get(id)

                return {
                  label: name.charAt(0).toUpperCase() + name.slice(1),
                  value: id,
                  emoji: role?.icon
                    ? {
                        id: role.icon
                      }
                    : undefined
                }
              })
            }
          ]
        }
      ]
    })
  }
}
