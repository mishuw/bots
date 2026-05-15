import { Events, VoiceChannel } from 'discord.js'
import { Event, WosskiClient } from '@repo/client'
import { DisTube, Events as DistubeEvents} from 'distube';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpSearchPlugin } from '../plugins/YtDlpSearchPlugin'

const ffmpegPath = require('ffmpeg-static') as string;
process.env['FFMPEG_PATH'] = ffmpegPath;

export default class ClientReadyEvent extends Event {
  private distube: DisTube
  private readonly songs: string[] = [
    'manifest X Ajda Pekkan - Hileli | Official Music Video',
    'manifest - Daha İyi | Official Music Video',
    'manifest - Başrol Sensin | Official Music Video',
    'manifest - RÜYA | Official Music Video',
    'manifest - Amatör | Official Music Video',
    'manifest - Yaşanacaksa | Official Music Video',
    'manifest - KTS | Official Music Video',
    'manifest - Arıyo | Official Music Video',
    'manifest feat. Arem & Arman - Manifest | Official Dance Video',
    'manifest - Zamansızdık | Official Music Video',
    'manifest - Snap | Official Music Video',
    'manifest feat. Pango - Zehir | Official Lyric Video',
    'manifest - Hayır | Official Lyric Video',
    'manifest - Durma | Official Lyric Video',
    'manifest - Amateur | Official Music Video',
    'manifest - Zehir (Motive Remix) | Official Lyric Video',
    'manifest - Rampapapam (Arem Ozguc & Arman Aydin Remix) | Official Lyric Video',
    'manifest - Arıyo (Zeki Arkun Remix) | Official Lyric Video',
    'manifest - Outro | Official Lyric Video',
    'manifest - Outro (Extended Version) | Official Lyric Video',
    'manifest - Intro | Official Lyric Video',
    'manifest - Hayır (AYDEED Remix) | Official Lyric Video',
    'manifest - Manifest (Arem & Arman Remix) | Official Lyric Video',
    'manifest - Zehir (Arem & Arman Remix) | Official Lyric Video'
  ]

  constructor(client: InstanceType<typeof WosskiClient>) {
    super(client, { name: Events.ClientReady })

    this.distube = new DisTube(client, {
      emitNewSongOnly: true,
      emitAddSongWhenCreatingQueue: false,
      emitAddListWhenCreatingQueue: false,
      plugins: [
        new SpotifyPlugin(),
        new YtDlpSearchPlugin(),
        new YtDlpPlugin({ update: true }),
      ],
    })
  }

  private async playPlaylist(voice: VoiceChannel) {
    const random = this.songs[Math.floor(Math.random() * this.songs.length)] as string

    try {
      this.distube.play(voice, random, {
        skip: false,
        metadata: { source: "youtube" },
      })
      
      this.client.rest.put(`/channels/${voice.id}/voice-status`, {
        body: { status: random }
      })
    } catch (error) {
      console.error("Play/Status error:", error)
    }
  }

  async run(client: InstanceType<typeof WosskiClient>) {
    const voice = client.channels.cache.get("1344748919111946262") as VoiceChannel

    if (!voice) {
      console.error("Voice channel yok")
      return
    }
    
    this.distube
      .on(DistubeEvents.ERROR, (err) => console.error("DISTUBE ERROR:", err))
      .on(DistubeEvents.FINISH_SONG, () => {
        this.playPlaylist(voice)
      })

    await this.playPlaylist(voice)
  }
}