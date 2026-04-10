# 🚀 Vercel ga Deploy Qilish (Webhook rejimi)

## 📋 Webhook nima?

Webhook - bu Telegram serverining sizning API ga to'g'ri bilan yangilanishlarni yubori. Polling o'rniga Telegram siz uchun xabarlarni to'g'ri yubori.

**Polling (Eski):**
- Bot doimiy Telegram serveriga "yangilanish bor mi?" deb soraishishini davomi ettilib

**Webhook (Yangi - Vercel uchun):**  
- Telegram siz uchun xabarlarni to'g'ri yubori
- Seversiz, serverless architecture
- Tezroq va arzonroq

---

## ✅ Tayyorlik

### 1. Environment Variables (.env)

Vercel da `BOT_TOKEN` ni o'rnatish kerak:

```env
BOT_TOKEN=123456789:ABCDEFGHIJKLMNOPqrstuvwxyz_your_token_here
ADMIN_IDS=123456789,987654321
WARNING_MESSAGE=⚠️ {user} tomonidan yuborilgan .apk fayl xavfsizlik sababli o'chirildi!
NOTIFY_SENDER=true
```

### 2. Vercel CLI o'rnatish (lokal test uchun)

```bash
npm install -g vercel
# yoki
npm install -D vercel
```

---

## 🔧 Vercel da Deploy Qilish

### Option 1: GitHub orqali (Tavsiya qilinadi)

1. GitHub ga push qiling:
```bash
git add .
git commit -m "Vercel webhook sozlash"
git push origin master
```

2. [Vercel Dashboard](https://vercel.com/dashboard) ga o'ting
3. **"New Project"** bosing
4. Sizning repository ni tanlang (`bot_anti_apk`)
5. **Environment Variables** qo'shing:
   - `BOT_TOKEN` = `123456789:ABC...`
   - `ADMIN_IDS` = (ixtiyoriy)
   - `WARNING_MESSAGE` = (ixtiyoriy)
6. **Deploy** bosing

### Option 2: Vercel CLI orqali

```bash
vercel login
vercel --prod --env BOT_TOKEN=123456789:ABC...
```

---

## 🔗 Webhook ni Sozlash

Deploy qilgandan keyin webhook ni sozlash uchun:

```bash
curl https://your-vercel-project.vercel.app/api/webhook
```

**Sukssizlik javob:**
```json
{
  "status": "success",
  "message": "Webhook sozlandi!",
  "webhook_url": "https://your-vercel-project.vercel.app/api/webhook"
}
```

### Webhook Status ni Tekshirish

```bash
curl https://api.telegram.org/botYOUR_BOT_TOKEN/getWebhookInfo
```

**Natija:**
```json
{
  "ok": true,
  "result": {
    "url": "https://your-vercel-project.vercel.app/api/webhook",
    "has_custom_certificate": false,
    "pending_update_count": 0,
    "ip_address": "1.2.3.4",
    "last_error_date": null,
    "allowed_updates": ["message", "edited_message", "callback_query"]
  }
}
```

---

## 🧪 Lokal Test Qilish

Vercel-emulator dan foydalaning:

```bash
npm install -D vercel
vercel dev
```

Keyin boshqa terminaldagi:
```bash
curl http://localhost:3000/api/webhook
```

---

## 📝 Environment Variables Roster

| Variable | Qiymat | Kerak? |
|----------|--------|--------|
| `BOT_TOKEN` | Telegram Bot Token | ✅ Ha |
| `ADMIN_IDS` | `123,456,789` (vergul bilan) | ❌ Yo'q (optional) |
| `WARNING_MESSAGE` | Xabar matni | ❌ Yo'q (default bor) |
| `NOTIFY_SENDER` | `true` yoki `false` | ❌ Yo'q (default: true) |

---

## ⚠️ Common Issues va Solutions

### Xato: "502 Bad Gateway"
- Webpack hato bo'lishi mumkin
- `npm run build` qo'shing vercel.json da

### Xato: "BOT_TOKEN topilmadi"
- Environment variables to'plangan?
- Vercel settings → Environment Variables → check!

### Xato: Webhook sozlanmadi
- Bot token to'g'ri?
- Vercel deployment muvaffaqiyatli?
- Firebase/Vercel logs: `vercel logs --tail`

### Xato: Telegram xabarlar kelib turgan emas
```bash
# Webhook info ni check qiling
curl https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo
```

---

## 🔄 Local da Polling, Vercel da Webhook

Code avtomatik ravishda muhitni aniqladi:
- **Local (npm run dev)** → Polling rejimi
- **Vercel** → Webhook rejimi

```typescript
const IS_VERCEL = !!process.env.VERCEL || !!process.env.VERCEL_URL;
```

---

## 📊 Vercel Logs

Logs ni ko'rish uchun:

```bash
vercel logs
# yoki
vercel logs --tail  # Real-time
```

---

## ✨ Optimal Konfiguratsiya (Vercel)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/webhook.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/webhook",
      "dest": "/api/webhook.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/api/webhook.ts"
    }
  ]
}
```

Bu config faqat API qismi deploy qiladi va xizmat qiladi.

---

## 🎯 Deploy Checklist

- [ ] BOT_TOKEN juziga .env.local da test qildingiz
- [ ] `npm run build` xatosiz ishlaydi
- [ ] GitHub da push qildingiz
- [ ] Vercel da environment variables qo'shdiniz
- [ ] Deploy muvaffaqiyatli
- [ ] Webhook `/api/webhook` GET ga javob beradi
- [ ] Telegram bot token hali ham ishlaydi (bot test guruhga yuboring)
- [ ] Logslarda xato ko'rinmaydi

---

## 🚀 Deployment muvaffaqiyatli!

Bot endi Telegram xabarlarini get qilsa, webhook orqali sizning Vercel serveriga yubori!

**Agar qandaydir muammo bo'lsa:**
1. Vercel logs ni check qiling (`vercel logs --tail`)
2. Webhook info ni check qiling (`curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo`)
3. .env variables ni double-check qiling
