# PM2 TEZKOR SETUP 

## 💻 O'rnatish va Ishga Tushirish

### 1. PM2 o'natish (faqat birinchi marta)
```bash
npm install -g pm2
```

### 2. Botni ishga tushirish

#### Variant A: Avtomatik script bilan
```bash
chmod +x start-pm2.sh
./start-pm2.sh
```

#### Variant B: NPM buyrug'i bilan
```bash
npm run build
npm run pm2:start
```

#### Variant C: To'gridan-to'g'ri PM2 bilan
```bash
npm run build
pm2 start ecosystem.config.js
```

---

## 📊 Botni Boshqarish

Qo'llaniladi:
```bash
# Status ko'rish
npm run pm2:status

# Loglarni ko'rish (real-time)
npm run pm2:logs

# Monitoring (CPU, Memory)
npm run pm2:monit

# Bot to'xtatish
npm run pm2:stop

# Bot qayta ishga tushirish
npm run pm2:restart

# Bot o'chirish
npm run pm2:delete
```

---

## 🔧 Server Qayta Ishga Tushganda Avtomatik Start

```bash
pm2 startup
pm2 save
```

---

## 📚 To'liq Qollanma

Ushbu faylda ba'tafsil ma'lumot mavjud:
👉 [PM2_SETUP.md](PM2_SETUP.md)

---

## ✅ Tayyorlik Tekshirish

```bash
# PM2 o'rnatilganini tekshirish
pm2 --version

# Bot running bo'lganini tekshirish
pm2 list

# Bot loglarini ko'rish
pm2 logs apk-blocker-bot
```

---

**Masalalar bo'lsa, [PM2_SETUP.md](PM2_SETUP.md) faylni o'qing!** 📖
