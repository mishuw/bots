import { WosskiClient, Command } from '@repo/client'
import { ButtonInteraction, ButtonStyle, ComponentType, Message, MessageFlags, TextChannel } from 'discord.js'

export default class AvatarCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'avatar',
      aliases: ['av', 'pp', 'profil'],
      description: 'Kullanıcının profil resmini gösterir!',
      category: 'General'
    })
  }

  override async run(client: InstanceType<typeof WosskiClient>, message: Message, args: string[]) {
    const user =
      message.mentions.members?.first() ||
      (await client.getUser(args[0])) ||
      (message.reference ? (await message.fetchReference()).author : message.author)

    const member = await message.guild.getMember(user.id)

    const genelAvatar = user.displayAvatarURL({ forceStatic: true, size: 4096 })
    const sunucuAvatar = member?.avatar ? member.displayAvatarURL({ forceStatic: true, size: 4096 }) : null

    const components: any[] = [
      {
        type: ComponentType.Container,
        components: [
          {
            type: ComponentType.MediaGallery,
            items: [
              {
                media: {
                  url: genelAvatar,
                  description: `${user.displayName} kullanıcısnını avatarı`
                }
              }
            ]
          }
        ]
      }
    ]

    if (sunucuAvatar) {
      components.push({
        type: ComponentType.ActionRow,
        components: [
          {
            type: ComponentType.Button,
            custom_id: 'server_pp',
            label: 'Sunucu Avatarı',
            style: ButtonStyle.Secondary
          }
        ]
      })
    }

    const msg = await (message.channel as TextChannel).send({
      flags: MessageFlags.IsComponentsV2,
      components
    })

    if (!sunucuAvatar) return

    const collector = msg.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 30_000
    })

    collector.on('collect', async (interaction: ButtonInteraction) => {
      if (interaction.customId !== 'server_pp') return undefined
      if (interaction.user.id !== message.author.id) {
        return interaction.reply({
          content: `Bu butonu sadece ${message.author} kullanabilir.`,
          flags: MessageFlags.Ephemeral
        })
      }

      return interaction.update({
        flags: MessageFlags.IsComponentsV2,
        components: [
          {
            type: ComponentType.Section,
            accessory: {
              type: ComponentType.MediaGallery,
              media: { url: sunucuAvatar }
            }
          }
        ]
      })
    })
  }
}
