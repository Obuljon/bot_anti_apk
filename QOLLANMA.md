# 🔍 BOTNING TEZKOR MA'LUMOT

## 📍 Har bir faylning asosiy vazifasi

| Fayl | Vazifa | Asosiy Funksiya |
|------|--------|-----------------|
| **src/index.js** | Dasturni ishga tushirish | `main()` |
| **src/bot.js** | Bot initialization | `initializeBot()` |
| **src/config/constants.js** | O'zgarmas qiymatlar | `export TOKEN, ADMIN_IDS...` |
| **src/utils/helpers.js** | Yordamchi funksiyalar | `getUserName(), isApkFile(), canDeleteMessages()` |
| **src/handlers/messageHandler.js** | Xabar qayta ishlash va APK blokirovka | `registerMessageHandler()` |
| **src/handlers/commandHandler.js** | Bot komandasini qayta ishlash | `registerAllCommands()` |

---

## 🔧 Asosiy Funksiyalar

### `getUserName(user)` 
**Qayta qaytaradi:** String → Foydalanuvchi nomi  
**Misol:** `"Eshmat Otayev"` yoki `"@eshmat_uz"` yoki `"ID:123"`

### `isApkFile(msg)`
**Qayta qaytaradi:** Boolean → APK ekanmi  
**Tekshirish:** Fayl nomi, MIME type

### `canDeleteMessages(bot, chatId)`
**Qayta qaytaradi:** Boolean → O'chirish mumkinmi  
**Tekshirish:** Bot admin va "delete messages" ruxsati

### `registerMessageHandler(bot)`
**Qiladi:** Hamma xabarlarni tekshiradi  
**Jarayoni:** 
1. APK ekanligini tekshirish
2. Adminlarni ajratib olish
3. O'chirish va xabar yuborish

### `registerAllCommands(bot)`
**Qiladi:** Komandalarni ro'yxatga oladi  
**Komandalar:** `/start`, `/status`

### `initializeBot()`
**Qiladi:** TelegramBot yaratadi  
**Sozlash:** Polling mode, handlers ro'yxatga olish

---

## 🌀 Qadamlar Boʻyicha Jarayon

### Adminlarning APK yuborishi
```
Xabar keldi (APK)
  → ADMIN_IDS tekshirish
  → ✅ Ruxsat (o'chirilmaydi)
```

### Oddiy Foydalanuvchining APK yuborishi
```
Xabar keldi (APK)
  → isApkFile() = true
  → ADMIN_IDS tekshirish = false
  → canDeleteMessages() = true
  → ✂️ Xabarni o'chirish
  → 📣 Ogohlantirish (10 sec o'chirib tashlash)
  → 💬 Shaxsiy xabar (agar NOTIFY_SENDER=true)
```

### Bot huquqi yo'q
```
Xabar keldi (APK)
  → isApkFile() = true
  → canDeleteMessages() = false
  → ⚠️ Xabar: "Botda ruxsat yo'q"
```

---

## 🎬 Komandalar

### `/start` (Private)
```
Qabul: "Salam! Men APK Blocker Bot man..."
Jayla: Shaxsiy chat
```

### `/status` (Group)
```
Qayta: "✅ Bot to'g'ri ishlayapti..." yoki "❌ Botda ruxsat yo'q"
Jayla: Guruh/Supergroup
O'chirish: 8 sekund keyin
```

---

## 🛠️ Tezkor Setup

```bash
# 1. Dependencies o'rnatish
npm install

# 2. .env yaratish
cat > .env << EOF
BOT_TOKEN=your_token_here
ADMIN_IDS=12345,67890
EOF

# 3. Ishga tushirish
npm start
```

---

## 💡 Asosiy Tushunchalar

| Tushuncha | Taʼrifi | Misol |
|-----------|---------|-------|
| **Polling** | Bot har 300ms xabarlarni tekshiradi | Telegram API sўrovi |
| **Handler** | Event tushganda ishlatiladigan funksiya | Xabar qabul qilganda |
| **Middleware** | Ma'lumotni qayta ishlash | APK tekshirish |
| **MIME Type** | Fayl turi ko'rsatuvchi | `application/vnd.android.package-archive` |
| **Chat ID** | Guruh yoki private chat ID | `-456789123` (guruh) |

---

## ⚙️ O'zgarmas Qiymatlar (.env)

```env
# 🔑 Tomondan keyin imzo qilish (MAJBURIY)
BOT_TOKEN=

# 👑 Admin ID'lari (vergul bilan)
ADMIN_IDS=

# ⚠️ Xavfsizlik xabari ({user} urniga nom chu)
WARNING_MESSAGE=

# 💬 Shaxsiy xabar yuborish
NOTIFY_SENDER=true|false

# ⏰ Ogohlantirish o'chirish vaqti (sekund)
# Kodda: AUTO_DELETE_WARNING_SEC = 10

# 🔄 Bot tekshirish oralığı (millisekundda)
# Kodda: POLLING_INTERVAL = 300
```

---

## 🐛 Debugging Buyruqlari

```bash
# Loglarni real-time ko'rish
npm start

# Xatolarni tekshirish (linting)
npm run lint  # (agar eslint o'rnatilgan bo'lsa)

# .env tekshirish
cat .env

# Process bilgisini ko'rish
ps aux | grep node
```

---

## 📊 APK Blokirovka Sxemasi

```
Fayl Keldi → 
  Type Check → 
    APK? → 
      YES {
        Admin? → 
          YES: Ruxsat ✅
          NO: Huquq tekshir → O'chirish → Xabar
      }
      NO: Davom
```

---

## 🔐 Xavfsizlik Eslatmalari

- ✅ TOKEN-ni HECH QACHON kodga yozma
- ✅ .env faylini .gitignore ga qo'sh
- ✅ ADMIN_IDS-ni to'g'ri qo'sh
- ✅ Bot botga admin ruxsati ber
- ✅ Regular loglarni tekshir

---

## 🚀 Keyingi Qadamlar

1. **Database qo'sh** - Statistic saqlash
2. **Log file** - Xabarlarni saqlash
3. **Config file** - Dynamic sozlash
4. **Rate limiting** - Spam buyrugach
5. **Webhook mode** - Polling o'rniga

---

## 📞 Yordam

Agar muammoga duch kelgan bo'lsang:
1. Loglarni tekshir (`console.error` ko'rinmasi)
2. .env faylini tekshir
3. Bot huquqlarini tekshir
4. Network ulanganligini tekshir

---

**Telegram Bot API:** https://core.telegram.org/bots/api  
**node-telegram-bot-api:** https://github.com/yagop/node-telegram-bot-api
