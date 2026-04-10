# Vercel Webhook Sozlash - Quick Start

## ✅ Qo'lda Qilingan O'zgarishlar

### 1. **src/bot.ts** - Webhook rejimlari qo'llab-quvvatlandi
- ✅ `getBot()` function qo'shildi (singleton pattern)
- ✅ Environ detect: Vercel da webhook, local da polling
- ✅ Webhook uchun special options

### 2. **api/webhook.ts** - To'lig'i qayta yozildi
- ✅ `getBot()` dan foydalanadi
- ✅ GET - webhook sozlash
- ✅ POST - Telegram updates
- ✅ Better error handling va logging

### 3. **VERCEL_SETUP.md** - To'liq deployment guide
- ✅ Step-by-step instructions
- ✅ Environment variables
- ✅ Troubleshooting tips

---

## 🚀 Vercel Deploy Qilish (5 Qadamlik)

### Qadam 1: Vercel Account ochish
```
https://vercel.com → Sign up with GitHub
```

### Qadam 2: Loyihani GitHub ga push qiling
```bash
git add .
git commit -m "Setup webhook for Vercel"
git push origin master
```

### Qadam 3: Vercel da repo qo'shing
```
1. vercel.com/dashboard -> "New Project"
2. "bot_anti_apk" repository tanlang
3. "Deploy" bosing
```

### Qadam 4: Environment Variables qo'shing
Vercel Settings → Environment Variables:
```
BOT_TOKEN = <your-telegram-bot-token>
```

### Qadam 5: Webhook ni sozlash
Deploy qilib bo'lgandan keyin:
```bash
curl https://your-vercel-project.vercel.app/api/webhook
```

Agar `"status": "success"` ko'rsa - TAYYOR! ✅

---

## 🔍 Status Tekshirish

### Vercel logs:
```bash
npm i -g vercel
vercel logs --tail
```

### Webhook info:
```bash
curl https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo
```

---

## 📝 Kerak bo'lgan tokenlar

1. **BOT_TOKEN** - Telegram dan (@BotFather orqali)
2. **Vercel** - GitHub account (kirish uchun)

Done! 🎉
