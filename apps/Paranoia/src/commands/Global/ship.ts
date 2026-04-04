import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas'
import { WosskiClient, Command } from '@repo/client'
import {
  AttachmentBuilder,
  bold,
  ButtonStyle,
  ComponentType,
  GuildMember,
  Message,
  MessageFlags,
  TextChannel
} from 'discord.js'
import path from 'node:path'

GlobalFonts.registerFromPath(
  path.resolve(import.meta.dirname, '../../assets/fonts/MarlinGeo-Black.otf'),
  'Marlin Geo Black'
)

let spotify = [
  'https://open.spotify.com/track/2SGltWNsdjCjyf6eh3iM0g?si=c49bb2c15ac343f5',
  'https://open.spotify.com/track/0ywlnV6QEZneCbbqLev6qL?si=a94d3ae7328b476c',
  'https://open.spotify.com/track/0JkZUrGmvzpX4yP8CoqItc?si=c5b35b77a6804b43',
  'https://open.spotify.com/track/0yrqfgfaQs222WGcZMvIFA?si=3219a4f749884702',
  'https://open.spotify.com/track/2911GW6Gdfuc3CQ2HrLDn6?si=a590bce4552f40a0',
  'https://open.spotify.com/track/3ZGUpGjkL9D5wjMWd7wFB5?si=ed9b59544f6a4eab',
  'https://open.spotify.com/track/38j60DwttFNYk2GmCTIUod?si=2ab67840f1a84dd0',
  'https://open.spotify.com/track/6KmThLltgcLO058vNzxvMV?si=2a89388eeb42414c',
  'https://open.spotify.com/track/26EzdCBOvRJljcc2zYOEVP?si=e4c5cd109369406e',
  'https://open.spotify.com/track/7hrjh79DQVNwGTL3EgrBi4?si=c4e24bf978ea457c',
  'https://open.spotify.com/track/11AkXmBdjwu4upt22GjJrG?si=76fe1e69c3224af3',
  'https://open.spotify.com/track/6ZvKnJSendvbZGiVMmgIdp?si=c3fb586f7c0142b2',
  'https://open.spotify.com/track/0kjy0Qk3anB4t1dNIL7No3?si=8f9cea3da1e146e3',
  'https://open.spotify.com/track/3jDcUArWhSonfHpK3QXJug?si=2b4db33b15784b89',
  'https://open.spotify.com/track/4uoXb2toU8zWD27TpJS7Yk?si=1a6217915dd5422f',
  'https://open.spotify.com/track/4UohOvkgmCt3p0PYOPnHjN?si=8f0199b91b164724',
  'https://open.spotify.com/track/04RR90pc7GMGHfELXfuX2Z?si=56154d8544164a7b',
  'https://open.spotify.com/track/6CcJMwBtXByIz4zQLzFkKc?si=a76b6157d1c6480b',
  'https://open.spotify.com/track/1GvNBnLOlRKZYS93fdEN9h?si=9e3a97956b3d4046',
  'https://open.spotify.com/track/0wr0JTOlgZVYccny0GlL4T?si=432cd351bee74708',
  'https://open.spotify.com/track/3bKMzeLEDmPHzDMWplhdtP?si=4d28a63f8a3a4a67',
  'https://open.spotify.com/track/5SFBaOi2ELB2P5tFzmcD73?si=713b86f5e0d64a62',
  'https://open.spotify.com/track/2pPJA6IEl9iyXtVyrE06cT?si=05e234d20ad645b7',
  'https://open.spotify.com/track/6nhJ2KSi1rKGX75frHpkXK?si=7bd37d56f85f4148',
  'https://open.spotify.com/track/5XMAeSjjinBwKjdANxHbeZ?si=87ec32afe2994536',
  'https://open.spotify.com/track/0slHapEcgmGP0kwfqQLLmP?si=4bf5c78418ef4136',
  'https://open.spotify.com/intl-tr/track/4ySBa6Ho1KxSGgxT8MIPEf?si=8b964949d79247b9',
  'https://open.spotify.com/intl-tr/track/4WzEt032hy8gLMSJVOB90O?si=8a4548794bb64490',
  'https://open.spotify.com/intl-tr/track/01zrETrdU6ywRoqXZXBfbV?si=bf12521701804d68',
  'https://open.spotify.com/intl-tr/track/56wAzOBkIYK8YXSGu2Wldg?si=9f59ddb60bf14c87',
  'https://open.spotify.com/intl-tr/track/5nld3fSkdB34dvCeyhw8zW?si=dabbc434bf024e2d',
  'https://open.spotify.com/intl-tr/track/1Ji7vJOJIYAuZLeLWS9Xrg?si=6a9f5759ab6240d2',
  'https://open.spotify.com/intl-tr/track/7Ikg74SQrxu5DMpEEbestg?si=75e2b68aa1144bf1',
  'https://open.spotify.com/intl-tr/track/3730z7N28rvWW4PpSXR7PY?si=01d2784858ba47c4',
  'https://open.spotify.com/intl-tr/track/4hv9mEWi4911k1uhU4fPEH?si=9132c8ea589943b8',
  'https://open.spotify.com/intl-tr/track/0yxxBfo9KWMPnAjuaKhfdi?si=c140f0a378544a3d'
]

function drawHeart(ctx: any, x: number, y: number, size: number, percent: number) {
  ctx.save()

  const glowIntensity = 0.2 + 0.8 * (percent / 100)
  const glow = ctx.createRadialGradient(x, y + size / 2, 5, x, y + size / 2, size)
  glow.addColorStop(0, `rgba(255, 77, 109, ${glowIntensity})`)
  glow.addColorStop(1, 'rgba(255, 77, 109, 0)')

  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(x, y + size / 2, size, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.moveTo(x, y + size * 0.3)
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size * 0.3)
  ctx.bezierCurveTo(x - size / 2, y + size * 0.7, x, y + size * 0.9, x, y + size)
  ctx.bezierCurveTo(x, y + size * 0.9, x + size / 2, y + size * 0.7, x + size / 2, y + size * 0.3)
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size * 0.3)
  ctx.closePath()

  ctx.clip()

  const bgGradient = ctx.createLinearGradient(0, y, 0, y + size)
  bgGradient.addColorStop(0, '#1e1f22')
  bgGradient.addColorStop(1, '#2b2d31')
  ctx.fillStyle = bgGradient
  ctx.fillRect(x - size / 2, y, size, size)

  const fillGradient = ctx.createLinearGradient(0, y, 0, y + size)
  fillGradient.addColorStop(0, '#ff8fa3')
  fillGradient.addColorStop(1, '#ff4d6d')
  ctx.fillStyle = fillGradient
  ctx.fillRect(x - size / 2, y + size * (1 - percent / 100), size, size * (percent / 100))

  ctx.restore()

  ctx.beginPath()
  ctx.moveTo(x, y + size * 0.3)
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size * 0.3)
  ctx.bezierCurveTo(x - size / 2, y + size * 0.7, x, y + size * 0.9, x, y + size)
  ctx.bezierCurveTo(x, y + size * 0.9, x + size / 2, y + size * 0.7, x + size / 2, y + size * 0.3)
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size * 0.3)
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'
  ctx.lineWidth = 2
  ctx.stroke()
}

function drawRoundedAvatar(ctx: any, img: any, x: number, y: number, size: number) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(img, x, y, size, size)
  ctx.restore()
}

function drawRoundedRect(ctx: any, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function shortenName(name: string, max: number = 10) {
  return name.length > max ? name.slice(0, max) + '...' : name
}

export default class ShipCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'ship',
      aliases: ['ship'],
      description: 'ship',
      category: 'General',
      usage: '.ship'
    })
  }

  override async run(client: InstanceType<typeof WosskiClient>, message: Message, args: string[]) {
    const erkek = '1464369659749863617'
    const kadin = '1464369651353129011'

    const member =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]) ||
      message.guild?.members.cache
        .filter((m: GuildMember) => {
          if (m.user.bot) return false
          return message.member.roles.cache.has(erkek) ? m.roles.cache.has(kadin) : m.roles.cache.has(erkek)
        })
        .random()

    if (!member) return message.reply('adam bulamadım amk')

    const percent = Math.floor(Math.random() * 101)

    const canvas = createCanvas(380, 150)
    const ctx = canvas.getContext('2d')

    const banner = message.guild.bannerURL({ extension: 'png', size: 1024 })
    const bg = await loadImage(banner || 'https://i.pinimg.com/736x/1a/77/b5/1a77b590a5495a4d03462f3c4d0427b1.jpg')
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgba(0,0,0,0.35)'
    drawRoundedRect(ctx, 10, 10, 360, 130, 20)
    ctx.fill()

    const av1 = await loadImage(message.author.displayAvatarURL({ extension: 'png', forceStatic: true }))
    const av2 = await loadImage(member.user.displayAvatarURL({ extension: 'png', forceStatic: true }))

    drawRoundedAvatar(ctx, av1, 25, 40, 80)
    drawRoundedAvatar(ctx, av2, 380 - 25 - 80, 40, 80)

    ctx.font = '16px Marlin Geo Black'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillText(shortenName(message.member.displayName), 25 + 80 / 2, 150 / 2 - 80 / 2 + 80 + 10)

    ctx.fillText(shortenName(member.displayName), 380 - 25 - 80 / 2, 150 / 2 - 80 / 2 + 80 + 10)

    drawHeart(ctx, 190, 45, 60, percent)

    ctx.font = '18px Marlin Geo Black'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(`${percent}%`, 190, 45 + 60 / 2)

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'ship.png' })

    ;(message.channel as TextChannel).send({
      flags: MessageFlags.IsComponentsV2,
      files: [attachment],
      components: [
        {
          type: ComponentType.TextDisplay,
          content: `:sparkling_heart: ${bold(`${message.member} × ${member.user}`)}`
        },
        {
          type: ComponentType.MediaGallery,
          items: [
            {
              media: {
                url: 'attachment://ship.png'
              }
            }
          ]
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              label: 'Şarkınız',
              style: ButtonStyle.Link,
              url: spotify[Math.floor(Math.random() * spotify.length)],
              emoji: '🎵'
            }
          ]
        }
      ]
    })
  }
}
