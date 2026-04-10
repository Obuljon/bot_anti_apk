# PM2 SETUP QOLLANMA 🚀

APK BLOCKER BOT-ni PM2 bilan ishga tushirish va boshqarish bo'yicha to'liq qollanma.

---

## 1️⃣ PM2 O'rnatish

```bash
# Global o'rnatish (istalgan joydan ishlatish uchun)
npm install -g pm2

# PM2 versiyasini tekshirish
pm2 --version

# PM2 ni sistem bootdan songg ishga tushirish (ixtiyoriy)
pm2 startup
pm2 save
```

---

## 2️⃣ Botni Ishga Tushirish

### Eng oddiy usul:
```bash
# Avval build qilish
npm run build

# Botni PM2 bilan ishga tushirish
npm run pm2:start

# Yoki to'gridan-to'g'ri
pm2 start ecosystem.config.js
```

### Rivojlanish rejimida:
```bash
pm2 start ecosystem.config.js --env development
```

---

## 3️⃣ Asosiy PM2 Komandalari

### Holatni Tekshirish
```bash
# PM2 statusu ko'rish
npm run pm2:status
# yoki
pm2 status
pm2 list

# Real-time monitoring
npm run pm2:monit
# yoki
pm2 monit
```

### Loglarni Ko'rish
```bash
# Barcha loglar
npm run pm2:logs

# Muayyan app logu
pm2 logs apk-blocker-bot

# Faqat error loglar
pm2 logs apk-blocker-bot --err

# Oxirgi N qatorni ko'rish
pm2 logs --lines 100
```

### Bot Boshqarish

```bash
# Bot to'xtatish
npm run pm2:stop

# Botni qayta ishga tushirish
npm run pm2:restart

# Bot o'chirish (PM2 dan)
npm run pm2:delete

# Barcha PM2 processlarini o'chirish
pm2 delete all
```

---

## 4️⃣ Sozlashni Tekshirish

```bash
# ecosystem.config.js ni tekshirish
pm2 show apk-blocker-bot

# Barcha details
pm2 describe apk-blocker-bot
```

---

## 5️⃣ Xotirani Monitoring

```bash
# Real-time xotirani ko'rish
pm2 monit

# Processning batafsil ma'lumotlari
pm2 info apk-blocker-bot
```

---

## 6️⃣ Avtomatik Restart Sozlamalari

`ecosystem.config.js` faylida qo'llanilgan sozlamalar:

- **autorestart: true** - Crash bo'lmaganda avtomatik qayta ishga tushirish
- **max_restarts: 10** - Maksimal qayta ishga tushirish soni (1 daqiqada)
- **min_uptime: "10s"** - Kamida 10 soniya ishlansa, restart sanovchasini nollash
- **max_memory_restart: "500M"** - 500MB dan ko'p xotirani ishlatsa, qayta ishga tushirish

---

## 7️⃣ Production'da Avtomatik Start

Bot server qayta ishga tushiganda avtomatik ishga tushishi uchun:

```bash
# System startup'ni qaysiga o'rnatish
sudo pm2 startup systemd -u username --hp /home/username

# PM2 konfiguratsiyasini saqlash
pm2 save

# Tekshirish (server qayta ishga tushganda bot avtomatik ishga tushar)
pm2 resurrct
```

---

## 8️⃣ Deployment Script

Deploy ro'yxatidan foydalanib `production` serverdagi botni yangilash:

```bash
pm2 deploy ecosystem.config.js production setup
pm2 deploy ecosystem.config.js production
```

> **Eslatma**: `deploy` qollanish uchun SSH access va Git kerak.

---

## 9️⃣ Troubleshooting

### Bot ishga tushmayotgan bo'lsa:
```bash
# Loglarni ko'rish
pm2 logs apk-blocker-bot

# Error log separate ko'rish
tail -f logs/error.log
```

### Xotirani tozalash:
```bash
# PM2 cache tozalash
pm2 flush

# PM2 logs o'chirish
pm2 log flush
```

### PM2 ni qayta boshlash:
```bash
pm2 kill
pm2 start ecosystem.config.js
```

---

## 🔟 QISQACHA REFERENS

| Buyruq | Nima qiladi |
|--------|-----------|
| `pm2 start ecosystem.config.js` | Botni ishga tushirish |
| `pm2 stop apk-blocker-bot` | Botni to'xtatish |
| `pm2 restart apk-blocker-bot` | Botni qayta ishga tushirish |
| `pm2 delete apk-blocker-bot` | Botni o'chirish |
| `pm2 logs` | Loglarni ko'rish |
| `pm2 status` | Status ko'rish |
| `pm2 monit` | Monitoring |
| `pm2 save` | Konfiguratsiyani saqlash |
| `pm2 startup` | Auto-start o'rnatish |
| `pm2 kill` | PM2 daemonini o'chirish |

---

**✅ Tayyor!** Endi bot PM2 bilan ishga tushar va ishlamaydigan bo'lsa avtomatik qayta ishga tushar. 🎉
