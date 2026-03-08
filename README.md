# 🚀 Wosski Pack — Modern Discord Bot Monorepo

<div align="center">
  <img src="https://i.imgur.com/Qr4wR4r.png" alt="Wosski Logo" width="150"/>
  <h4>🎛️ Hepsi bir arada modern Discord bot altyapısı</h4>
</div>

---

## 🛠 Teknolojiler & Araçlar

- 🟢 **Node.js v25+** — Modern JS runtime
- 🔷 **TypeScript** — Tam tip güvenliği
- 🤖 **Discord.js v14** — Discord API ve bot yönetimi
- ⚡ **Turborepo** — Monorepo task orchestration
- 📦 **pnpm** — Hızlı ve deterministik paket yönetimi
- 🗄️ **Drizzle ORM** & **PostgreSQL** — Modern ve tip güvenli DB
- 🔍 **Knip** — Kullanılmayan dosya ve dependency tespiti
- 🛠️ **Tsup & TSX** — Hızlı build ve watch sistemi
- 🔁 **Nodemon** — Development hot reload
- ⏱️ **Moment.js** — Tarih ve zaman formatlama

---

## 📂 Monorepo Yapısı

```
wosski_pack/
├─ apps/
│ ├─ Controller/ # ⚙️ Ana bot yönetim & event handler
│ ├─ GuildTag/ # 🏷️ Tag takibi & log sistemi
│ ├─ Moderation/ # 🚨 Moderasyon bot modülleri
├─ packages/
│ ├─ client/ # 🤝 Discord client wrapper & helperlar
│ ├─ db/ # 🗄️ Drizzle & DB config, migration
│ ├─ kv/ # 🔑 Key-value store wrapper
│ ├─ shared/ # 🧩 Ortak tipler, utils & constants
│ ├─ moderation/ # ⚔️ Moderasyon logları & helperlar
└─ turbo.json # ⚡ Task & build orchestration
```

---

## 💻 Development

1. Repo’yu klonla:

```bash
git clone https://github.com/mishuw/wosski_pack.git
cd wosski_pack
```

2. Paketleri yükle:

```bash
pnpm install
```

3. Development modunu başlat:

```bash
pnpm dev
```

> 🔄 Turborepo tüm apps ve packages’i watch modunda çalıştırır. Kod değişikliklerinde hot reload sağlar.

## ⚡ Task & CI Sistemi

| Task         | Açıklama                                                    |
| ------------ | ----------------------------------------------------------- |
| `pnpm build` | 🔨 Tüm paketleri build eder                                 |
| `pnpm dev`   | 🚀 Tüm botları ve package’leri development modda çalıştırır |
| `pnpm lint`  | 📏 Kod standartlarını kontrol eder                          |

| `pnpm type-check` | ✅ TypeScript tip güvenliği |
| `pnpm check:knip` | 🕵️ Kullanılmayan dosya & dependency kontrolü |
| `pnpm db:migrate / db:push / db:studio` | 🗄️ DB yönetimi |
| `pnpm type-check` | ✅ TypeScript tip güvenliği |
| `pnpm check:knip` | 🕵️ Kullanılmayan dosya & dependency kontrolü |
| `pnpm db:migrate / db:push / db:studio` | 🗄️ DB yönetimi |

| CI/CD | 🤖 GitHub Actions ile lint, type-check ve knip kontrolleri otomatik |

## 💡 Öne Çıkan Özellikler

- 🏗️ Modern monorepo ile modüler bot geliştirme

- 🎙️ Discord ses ve tag event log sistemi

- 🗃️ Gerçek zamanlı veritabanı yönetimi

- 🛡️ Type-safe, maintainable ve test edilebilir codebase

# ⚡ Turbo ile hızlı build & task management

- 🏗️ Modern monorepo ile modüler bot geliştirme

- 🎙️ Discord ses ve tag event log sistemi

- 🗃️ Gerçek zamanlı veritabanı yönetimi

- 🛡️ Type-safe, maintainable ve test edilebilir codebase

- ⚡ Turbo ile hızlı build & task management

---

## 🧩 Katkıda Bulunmak

1. 🔀 Repo’yu fork et
2. 🏷️ Branch oluştur: git checkout -b feature/yenifonksiyon
3. 💾 Commit et: git commit -m "Add: yeni fonksiyon"
4. 🚀 Push et: git push origin feature/yenifonksiyon
5. 📬 Pull request aç

<div align="center"> Made with ❤️ by **Yasin Çakmak** <a href="https://github.com/mishuw/wosski_pack">GitHub Repo</a> | <a href="https://discord.gg/yourserver">Discord</a> </div>
