import { WosskiClient, Command } from '@repo/client'
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
import { ChannelType, Message } from 'discord.js'
import path from 'path'

GlobalFonts.registerFromPath(path.resolve(import.meta.dirname, '../../assets/fonts/Kanit-Regular.ttf'), 'Kanit')

export default class SayCommand extends Command {
  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, {
      name: 'say',
      aliases: ['say', 'sesli', 'istatistik'],
      description: 'Sunucuyla ilgili verileri gösterir!',
      category: 'Auth'
    })
  }

  override async run(_: InstanceType<typeof WosskiClient>, message: Message) {
    const guild = message.guild

    const [members, channels] = await Promise.all([guild.members.fetch(), guild.channels.fetch()])

    const voiceChannels = channels.filter((c) => c?.type === ChannelType.GuildVoice)

    let online = 0,
      offline = 0,
      mobile = 0,
      desktop = 0,
      web = 0,
      voice = 0,
      stream = 0,
      camera = 0,
      afk = 0,
      mute = 0

    members.forEach((m) => {
      const p = m.presence
      const v = m.voice

      if (p?.status && p.status !== 'offline') online++
      else offline++

      if (p?.clientStatus?.mobile) mobile++
      if (p?.clientStatus?.desktop) desktop++
      if (p?.clientStatus?.web) web++

      if (v.channel) voice++
      if (v.streaming) stream++
      if (v.selfVideo) camera++
      if (v.channel?.id === guild.afkChannelId) afk++
      if (v.serverMute) mute++
    })

    const activeVoiceChannels = voiceChannels.filter((v) => v.members.size > 0).size

    const canvas = createCanvas(1135, 400)
    const ctx = canvas.getContext('2d')

    const bg = await loadImage('https://raw.githubusercontent.com/mishuw/mishuw/refs/heads/main/Server.png')
    const icon = await loadImage(
      guild.iconURL({ extension: 'png', size: 4096 }) ?? 'https://cdn.discordapp.com/embed/avatars/0.png'
    )

    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.beginPath()
    ctx.arc(55, 55, 35, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(icon, 20, 20, 70, 70)
    ctx.restore()

    ctx.fillStyle = '#ffffff'
    ctx.font = '34px Kanit'
    ctx.fillText(guild.name, 97, 50)

    ctx.fillStyle = '#ded9d9'
    ctx.font = '24px Kanit'
    ctx.fillText('Sunucu verileri', 97, 82)

    const stats: [string, number][] = [
      ['Toplam Üye:', guild.memberCount],
      ['Online Üye:', online],
      ['Offline Üye:', offline],
      ['Mobil:', mobile],
      ['Masaüstü:', desktop],
      ['Web:', web],
      ['Sesteki Üyeler:', voice],
      ['Yayın:', stream],
      ['Kamera:', camera],
      ['AFK:', afk],
      ['Susturulan:', mute],
      ['Üye olan kanallar:', activeVoiceChannels]
    ]

    const boxW = 350
    const boxH = 50
    const startX = 60
    const startY = 120
    const pad = 20

    stats.forEach(([label, value], i) => {
      const row = Math.floor(i / 3)
      const col = i % 3
      const x = startX + col * (boxW + pad)
      const y = startY + row * (boxH + pad)

      ctx.fillStyle = '#ffffff'
      ctx.font = '20px Kanit'
      ctx.fillText(label, x + 10, y + 32)

      ctx.font = 'bold 22px Kanit'
      ctx.fillText(format(value), x + 15 + ctx.measureText(label).width, y + 32)
    })

    message.reply({
      files: [{ attachment: canvas.toBuffer('image/png'), name: 'say.png' }]
    })
  }
}

function format(n: number) {
  return n.toLocaleString('tr-TR')
}
