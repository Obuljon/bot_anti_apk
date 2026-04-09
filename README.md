# 🤖 APK Blocker Bot

Telegram guruhiga `.apk` fayl yuborilsa, darhol o'chirib tashlaydigan bot.

---

## 📁 Loyiha tuzilmasi

```
apk-blocker-bot/
├── src/
│   └── index.js        # Asosiy bot logikasi
├── .env.example        # Environment o'zgaruvchilar namunasi
├── package.json
└── README.md
```

---

## ⚡ O'rnatish

```bash
# 1. Paketlarni o'rnatish
npm install

# 2. .env fayl yaratish
cp .env.example .env
```

`.env` faylni oching va `BOT_TOKEN` ni to'ldiring:

```env
BOT_TOKEN=123456789:ABC-your-token-here
```

---

## 🤖 Bot token olish

1. Telegramda [@BotFather](https://t.me/BotFather) ga yozing
2. `/newbot` buyrug'ini yuboring
3. Bot nomi va username kiriting
4. Tokenni nusxalab `.env` ga joylashtiring

---

## 🚀 Ishga tushirish

```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

---

## ⚙️ Guruhga qo'shish

1. Botni guruhga **admin** sifatida qo'shing
2. **"Xabarlarni o'chirish"** ruxsatini bering
3. Guruhda `/status` buyrug'ini yuboring — bot tayyor ekanligini tekshiring

---

## 🔧 Konfiguratsiya (`.env`)

| O'zgaruvchi | Tavsif | Default |
|-------------|--------|---------|
| `BOT_TOKEN` | BotFather tokeningiz | — (majburiy) |
| `ADMIN_IDS` | APK yuborishga ruxsat berilgan admin IDlar | — (ixtiyoriy) |
| `WARNING_MESSAGE` | Guruhga yuboriladigan ogohlantirish | O'zbek xabar |
| `NOTIFY_SENDER` | Yuboruvchiga shaxsiy xabar yuborish | `true` |

---

## 📋 Bot buyruqlari

| Buyruq | Tavsif |
|--------|--------|
| `/start` | Bot haqida ma'lumot |
| `/status` | Botning guruhda ishlash holatini tekshirish |

---

## 🔍 APK aniqlash logikasi

Bot quyidagi holatlarni tekshiradi:
- Fayl nomi `.apk` bilan tugaydi
- MIME type: `application/vnd.android.package-archive`
- MIME type: `application/apk`

---

## 🌐 Server (VPS) da ishlatish

```bash
# PM2 bilan (tavsiya etiladi)
npm install -g pm2
pm2 start src/index.js --name apk-blocker
pm2 save
pm2 startup
```
