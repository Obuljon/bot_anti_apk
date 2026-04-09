# 🤖 APK Blocker Bot - Kodi Tuzilmasi va Ta'rifi

## 📋 UMUMIY MA'LUMOT

Bu Telegram bot **APK fayllarini blokirovka** qiladi. Guruhda xatterak yuborilgan barcha `.apk` fayllarni avtomatik o'chirib tashlaydi va xavfsizlik sababli ogohlantirish beradi.

---

## 📁 FAYL STRUKTURA

```
bot_anti_apk/
├── src/
│   ├── config/
│   │   └── constants.js          # 📌 O'zgarmas qiymatlar va konfiguratsiya
│   ├── utils/
│   │   └── helpers.js            # 🛠️ Yordamchi funksiyalar
│   ├── handlers/
│   │   ├── messageHandler.js     # 📨 Xabarlarni qayta ishlash
│   │   └── commandHandler.js     # ⌨️ Komandalarni qayta ishlash
│   ├── bot.js                    # 🚀 Bot ishga tushirish
│   └── index.js                  # 🎯 Asosiy entry point
├── package.json
├── .env                          # Muhim: TOKEN va ADMIN_IDS
└── README.md
```

---

## 🔧 FAYLLARI BATAFSIL

### 1️⃣ **config/constants.js** - KONFIGURATSIYA
**Vazifasi:** .env fayldan o'zgarmas qiymatlarni o'qiydi

**Asosiy O'zgaruvchilar:**
- `TOKEN` - Telegram BOT API tokeni (majburiy)
- `ADMIN_IDS` - Adminlar ro'yxati (APK yuborish ruxsati)
- `WARNING_MESSAGE` - Ogohlantirish matni
- `NOTIFY_SENDER` - Shaxsiy xabar yuborilsinmi
- `AUTO_DELETE_WARNING_SEC` - O'chirish vaqti (10 sekund)
- `POLLING_INTERVAL` - Bot tekshirish oralığı (300ms)

```javascript
// .env faylida:
BOT_TOKEN=123456789:ABCdefGHIjkl
ADMIN_IDS=123456789,987654321
```

---

### 2️⃣ **utils/helpers.js** - YORDAMCHI FUNKSIYALAR
**Vazifasi:** Butun botda ishlatiladigan umumiy funksiyalar

#### 🔹 `getUserName(user)` - Foydalanuvchi ismini olish
```javascript
// Birinchi + oxirgi nom → FULL NAME
// Aks holda username → @username
// Yo'q bo'lsa ID → ID:123456
```

#### 🔹 `isApkFile(msg)` - APK faylni aniqlash
```javascript
// Fayl nomi: .apk bilan tugasa
// MIME type: "application/vnd.android.package-archive"
// Nomi: "apk" so'zini o'z ichiga olsa
```

#### 🔹 `canDeleteMessages(bot, chatId)` - O'chirish huquqini tekshirish
```javascript
// Bot admin ekanligini va xabar o'chirish ruxsatini aniqlab qaytaradi
// True: O'chirish mumkin ✅
// False: O'chirish mumkin emas ❌
```

---

### 3️⃣ **handlers/messageHandler.js** - XABARLARNI QAYTA ISHLASH
**Vazifasi:** Foydalanuvchilar yuborgan hamma xabarlarni tekshiradi

**Ishlash Qadamlari:**
```
1. Xabarni loglash (printing)
2. Document bor-yoqligini tekshirish
3. Chat turi guruhmi (group/supergroup)? 
4. APK fayl ekanligini aniqlash
5. Admin bo'lsami? (admin o'chirilmaydi)
6. O'chirish huquqi bor-yoqligini tekshirish
7. Xabarni o'chirish
8. Guruhga ogohlantirish yuborish
9. Foydalanuvchiga shaxsiy xabar yuborish
```

**Ogohlantirish Misali:**
```
⚠️ @username tomonidan yuborilgan .apk fayl xavfsizlik sababli o'chirildi!
```
→ 10 sekund o'chirib tashlanadi

---

### 4️⃣ **handlers/commandHandler.js** - KOMANDALARNI QAYTA ISHLASH
**Vazifasi:** Foydalanuvchilar `/komanda` orqali yuborgan buyruqlarni qayta ishlaydi

#### 🔹 `/start` - Botning ma'lumotu
```
👋 Salom! Men APK Blocker Bot man.
... sozlash qadamlarini ko'rsatadi ...
```

#### 🔹 `/status` - Bot holatini tekshirish
```
✅ Bot to'g'ri ishlayapti. APK fayllar bloklanadi.
❌ Botda xabarlarni o'chirish huquqi yo'q!
```
→ 8 sekund o'chirib tashlanadi

---

### 5️⃣ **bot.js** - BOT ISHGA TUSHIRISH
**Vazifasi:** Telegram BOT ni yaratadi va barcha handlerlarni birlashtirib ishga tushiradi

```javascript
1. BOT ni TelegramBot bilan initialization
2. Polling rejimini yuqoriga o'rnatish (300ms)
3. Xabar handlerini registratsiya
4. Komanda handlerlarini registratsiya
5. Error handling sozlash
```

---

### 6️⃣ **index.js** - ASOSIY ENTRY POINT
**Vazifasi:** Dasturning kirish nuqtasi

```javascript
1. Bot ni initialize qilish
2. Global error handling (unhandledRejection, uncaughtException)
3. Dasturni ishga tushirish
```

---

## 🚀 ISHGA TUSHIRISH

### Talablangan Paketlar
```bash
npm install
```

### .env Faylini Yaratish
```bash
# .env faylini yarating:
BOT_TOKEN=your_telegram_bot_token_here
ADMIN_IDS=123456789,987654321
WARNING_MESSAGE=⚠️ {user} tomonidan yuborilgan .apk fayl xavfsizlik sababli o'chirildi!
NOTIFY_SENDER=true
```

### Botni Ishga Tushirish
```bash
npm start
```

---

## 📊 FUNKSIONAL SXEMA

```mermaid
┌─────────────────────────────────────┐
│   👤 Foydalanuvchi Xabar Yuboradi   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  handlers/messageHandler.js         │
│  - Xabar turini tekshirish           │
│  - APK ekanligini aniqlash           │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
    URI APK?      BOSHQA FILE?
    ENDI │            │
        │            ▼
        │    ✅ RUXSAT BERISH
        │
        ▼
┌─────────────────────────────────────┐
│  utils/helpers.js                   │
│  - Admin ekanligini tekshirish       │
│  - O'chirish huquqini tekshirish     │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        │             │
   ADMIN?        RUXSAT?
    ✅ │            │
       │            ▼
       │      ❌ NO DELETE RIGHT
       │      (xabar yuborish)
       │
       ▼
┌─────────────────────────────────────┐
│  🚫 XABARNI O'CHIRISH               │
│  📣 OGOHLANTIRISH YUBORISH          │
│  💬 SHAXSIY XABAR YUBORISH         │
└─────────────────────────────────────┘
```

---

## ⚙️ KONFIGURATSIYA MISOLLARI

### Admin Qo'shish
```env
ADMIN_IDS=123456789,987654321,555666777
```

### Custom Ogohlantirish Matni
```env
WARNING_MESSAGE=🚫 {user} шахс APK юборди! Бўйинсанг, чегара камин ғашта...
```

### Notification O'CHIRING
```env
NOTIFY_SENDER=false
```

---

## 🐛 DEBUGGING VA ERROR HANDLING

### Amallar:
1. **Polling xatolari** - `polling_error` orqali tutiladi
2. **Unhandled Rejections** - Global handler orqali
3. **Uncaught Exceptions** - Process tugatish bilan

### Logs Misollari:
```
✅ Admin APK yubordi (o'chirilmaydi)
🚫 APK aniqlandi → app.apk | User: 123 | Chat: -456
❌ Delete xatosi: Insufficient rights
```

---

## 📞 ADMIN RUXSATLARI KERAK

Bot to'g'ri ishlashi uchun guruhda quyidagi ruxsatlari mavjud bo'lishi shart:

- ✅ **Delete messages** - Xabarlarni o'chirish
- ✅ **Admin status** - Admin sifatida o'rnatish

---

## 📝 CLEAN CODE PRINSIPLARI

### Qo'llanilgan Amaliyotlar:
1. **Modular tuzilma** - Har bir fayl bir vazifani bajaradi
2. **Izohlar** - Uzbek tilida batafsil izohlar
3. **Funksional programmalashtirish** - Kichik, qayta ishlatiladigan funksiyalar
4. **Error handling** - Xatolarni to'g'ri qayta ishlash
5. **Environment variables** - Yashirin ma'lumotlar uchun .env
6. **DRY prinsipi** - Takrorlash yo'q, qayta ishlash bor

---

## 🎯 KEYINGI TAKOMILLASH

- [ ] Database integrations (user statistics)
- [ ] Qo'shimcha komandalar (/whitelist, /blacklist)
- [ ] Log fayli yaratish
- [ ] Rate limiting sozlash
- [ ] WebHook rejimiga o'tish

---

**Yaratilgan:** 2024-2025  
**Til:** Uzbek (Kiril)  
**Framework:** node-telegram-bot-api
