# 📖 BOTNING BATAFSIL TUSHUNTIRISH

## 🎯 BOT NIMA QILADI?

```
Telegram Guruhida APK Fayllarini Avtomatik Blokirovka Qiluvchi Bot
```

**Jarayon:**
1. Hamma xabarlarni monitoring qiladi
2. APK fayllarini aniqlaydi
3. Admin emas bo'lsa o'chiradi
4. Xabar va ogohlantirish yuboradi

---

## 🏗️ MODULLAR TUZILMASI

### 1. **KONFIGURATSIYA MODULI** (config/constants.js)
```
Vazifa: .env fayldan sozlamalarni o'qish

O'ZGARUVCHILAR:
├── TOKEN          → Telegram API tokeni
├── ADMIN_IDS      → Ruxsatli adminlar ro'yxati
├── WARNING_MSG    → Ogohlantirish matni
├── NOTIFY_SENDER  → Shaxsiy xabar yuborish
├── DELETE_TIME    → Xabar o'chirish vaqti
└── POLL_INTERVAL  → Tekshirish oralığı

MAVSUM: Butun bot uchun uum sozlamalar
```

### 2. **YORDAMCHI MODUL** (utils/helpers.js)
```
Vazifa: Qayta ishlatiladigan utility funksiyalar

FUNKSIYALAR:
├── getUserName(user)
│   → Foydalanuvchi ismini qaytaradi
│   → Misol: "Eshmat" yoki "@eshmat_uz"
│
├── isApkFile(msg)
│   → APK faylmi tekshiradi
│   → 3 xil usul orqali tekshirish:
│   │  1. File name .apk bilan tugashi
│   │  2. MIME type "application/vnd.android.package-archive"
│   │  3. MIME type "apk" so'zini o'z ichiga olishi
│   → true yoki false qaytaradi
│
└── canDeleteMessages(bot, chatId)
    → Bot o'chirish huquqi bor-yoqligini tekshiradi
    → Async funksiya (kutish talab)
    → true yoki false qaytaradi

MAVSUM: Barcha modullar bu funksiyalardan foydadir
```

### 3. **XABAR QAYTA ISHLASH MODULI** (handlers/messageHandler.js)
```
Vazifa: Foydalanuvchilar yuborgan xabarlarni qayta ishlash

ASOSIY LOGIKA:
1. XABAR KELDI
   └─ console.log() bilan log qilish

2. DOCUMENT TEKSHIRISH
   └─ Agar document yo'q → CHIQIB KET

3. CHAT TURI TEKSHIRISH
   └─ Faqat group yoki supergroup → aks holda CHIQIB KET

4. APK FAYLMI?
   └─ isApkFile() funksiyasini chaqira
   └─ Agar APK emas → CHIQIB KET

5. ADMIN TEKSHIRISH
   └─ ADMIN_IDS.includes(userId) ?
   └─ ✅ AGAR ADMIN → Ruxsat berish, CHIQIB KET
   └─ ❌ AGAR ODDIY FOYDALANUVCHI → Davom

6. O'CHIRISH HUQUQINI TEKSHIRISH
   └─ canDeleteMessages() chaqira
   └─ ❌ Huquq yo'q → Xabar yuborish, CHIQIB KET

7. XABARNI O'CHIRISH
   └─ bot.deleteMessage() chaqira
   └─ console log: "✅ APK fayl o'chirildi"

8. OGOHLANTIRISH YUBORISH
   └─ WARNING_MESSAGE.replace("{user}", userName)
   └─ Xabar yuborish
   └─ setTimeout() orqali 10 sekund keyin o'chirish

9. SHAXSIY XABAR YUBORISH (Agar NOTIFY_SENDER=true)
   └─ Foydalanuvchiga shaxsiy xabar
   └─ "Siz yuborgan .apk fayl o'chirildi"

MAVSUM: APK fayllarni blokirovka qilish logikasi
```

### 4. **KOMANDA QAYTA ISHLASH MODULI** (handlers/commandHandler.js)
```
Vazifa: /start va /status komandasini qayta ishlash

KOMANDA 1: /start
├─ Qabul joyi: Faqat private chat
├─ Jarayon:
│  └─ Bot haqida ma'lumot yuborish
│  └─ Sozlash qadamlarini ko'rsatish
└─ Natija: Long text message

KOMANDA 2: /status
├─ Qabul joyi: Faqat group/supergroup
├─ Jarayon:
│  ├─ canDeleteMessages() chaqira
│  ├─ Huquq bor bo'lsa → "✅ Bot to'g'ri ishlayapti"
│  └─ Huquq yo'q bo'lsa → "❌ Botda ruxsat yo'q"
├─ Natija: Short status message
└─ Auto delete: 8 sekund keyin
```

### 5. **BOT INITIALIZATION** (bot.js)
```
Vazifa: TelegramBot yaratish va sozlash

JARAYON:
1. TelegramBot importini chaqira
2. Constants yoki config ni oqiya
3. new TelegramBot(TOKEN, options) yaratadi
4. Message handler ni registratsiya qiladi
5. Komanda handlerlarini registratsiya qiladi
6. Error handling ni sozlaydi (polling_error)
7. Bot objektini qaytaradi

NATIJA: Butunlay ishga tayyor bot
```

### 6. **ASOSIY ENTRY POINT** (index.js)
```
Vazifa: Dasturning kirishi nuqtasi

JARAYON:
1. bot.js dan initializeBot() ni import qila
2. main() funksiyasini belgilaydi
3. initializeBot() chaqira
4. Global error handling ni sozlaydi
   ├─ process.on("unhandledRejection", ...)
   └─ process.on("uncaughtException", ...)
5. main() funksiyasini ishga tushira

NATIJA: Bot polling rejimida, xabarlarni tekshira
```

---

## 🔄 BUTUN OQIM DIAGRAMMASI

```
┌────────────────────────────────────────┐
│  npm start / node src/index.js         │
│  ▼▼▼ ISHGA TUSHIRISH ▼▼▼              │
│                                        │
│  Telegram Server                       │
│    │                                   │
│    ├─ Xabar 1: "Salom"                │ ➜ APK emas → Ignora
│    │                                   │
│    ├─ Xabar 2: "app.apk" (file)       │ ➜ APK!
│    │    │                              │
│    │    ▼                              │
│    │  handlers/messageHandler          │
│    │    1. isApkFile() ✅ true        │
│    │    2. Admin check ❌              │
│    │    3. Delete check ✅ true       │
│    │    │    │                         │
│    │    │    ▼                         │
│    │    │  deleteMessage()            │
│    │    │  sendMessage() warning       │
│    │    │  (10 sec later delete)       │
│    │    │                              │
│    │    └─→ User DM: "APK o'chirildi" │
│    │                                   │
│    └─ Komanda: "/status"               │ ➜ handlers/commandHandler
│         │                              │
│         ▼                              │
│       canDeleteMessages() ✅           │
│         │                              │
│         └─→ "Bot ishlamoqda ✅"       │
│             (8 sec delete)             │
└────────────────────────────────────────┘
```

---

## 📊 FAYL VAZIFALARI JADVALI

| Fayl | Qadami | Vazifa | Muhim Funksiyalar |
|------|--------|--------|-------------------|
| **index.js** | 1️⃣ Birinchi | Dasturni ishga tushuruv | `main()` |
| **bot.js** | 2️⃣ Ikkinchi | Bot initialization | `initializeBot()` |
| **config/constants.js** | 3️⃣ Harqanday vaqt | Sozlamalar | Export `TOKEN`, `ADMIN_IDS` |
| **utils/helpers.js** | 3️⃣ Harqanday vaqt | Utility funksiyalar | `getUserName()`, `isApkFile()`, `canDeleteMessages()` |
| **handlers/messageHandler.js** | 💬 Xabar kelganda | APK blokirovka logikasi | `registerMessageHandler()` |
| **handlers/commandHandler.js** | ⌨️ Komanda kelganda | Komanda qayta ishlash | `registerAllCommands()` |

---

## 🔐 O'ZGARUVCHILAR VA ORALASH

### Global Scope (config/constants.js)
```javascript
const TOKEN = process.env.BOT_TOKEN
const ADMIN_IDS = []
const WARNING_MESSAGE = ""
const NOTIFY_SENDER = true
const AUTO_DELETE_WARNING_SEC = 10
const POLLING_INTERVAL = 300
```

### Message Context (handlers/messageHandler.js)
```javascript
msg.chat.id        → Guruh yoki private chat ID
msg.message_id     → Xabar ID
msg.from.id        → Foydalanuvchi ID
msg.document       → File informatsiyasi
msg.document.file_name
msg.document.mime_type
```

### Function Parameters
```javascript
function getUserName(user) {}
function isApkFile(msg) {}
async function canDeleteMessages(bot, chatId) {}
function registerMessageHandler(bot) {}
```

---

## 🎬 KOMANDA VA QAYTA JAVOB

### `/start` (Private chat)
**K:** ➡️ `/start`  
**J:** ← "👋 Salom! Men APK Blocker Bot man..."

### `/status` (Group chat)
**K:** ➡️ `/status`  
**J:** ← "✅ Bot to'g'ri ishlayapti" (8 sec o'chiriladi)

### APK yuborish (Admin)
**K:** ➡️ `app.apk` (admin)  
**J:** ← Xabar o'chirilmaydi ✅

### APK yuborish (Oddiy foydalanuvchi)
**K:** ➡️ `app.apk` (user)  
**J:** ← Xabar o'chiriladi ✂️  
**J:** ← "⚠️ APK o'chirildi" (10 sec o'chiriladi)  
**J:** ← Private: "Siz yuborgan .apk fayl o'chirildi"

---

## 💾 .ENV SOZLAMASI

```env
# BOT TOKEN (Majburiy)
BOT_TOKEN=123456789:ABCdefGHIjklmnoPQRstuvWXYZ

# ADMIN ID'lari (vergul bilan)
ADMIN_IDS=987654321,123456789

# Xavfsizlik xabari ({user} urniga nom chu)
WARNING_MESSAGE=⚠️ {user} tomonidan yuborilgan .apk fayl xavfsizlik sababli o'chirildi!

# Shaxsiy xabar yuborish (true yoki false)
NOTIFY_SENDER=true
```

---

## 🧪 TEST SENARYLAR

### Test 1: Admin APK yuborishi
```
1. Admin id ni .env ga qo'sh
2. Admin sifatida APK tanlash
3. Kutish: Xabar o'chirilmayshyapti ✅
```

### Test 2: Oddiy foydalanuvchi APK yuborishi
```
1. Non-admin foydalanuvchi bo'ling
2. APK tanlash
3. Kutish:
   - Xabar o'chiriladi ✅
   - Guruhda ogohlantirish ✅
   - Shaxsiy xabar (2-3 sekund) ✅
```

### Test 3: /status komandasi
```
1. /status yoza
2. Kutish: Status xabari (8 sec o'chiriladi) ✅
```

---

## 🐛 MUMKIN BO'LGAN MUAMMOLAR

| Muamma | Sabab | Chor-ara |
|--------|-------|---------|
| "Bot nima ham qilmaydi" | TOKEN yo'q/noto'g'ri | .env tekshir |
| "Delete message error" | Bot admin emas | Bot admin qil |
| "APK o'chirilmaydi" | Huquq yo'q | Delete msg permission qo'sh |
| "Xabar kelmiyor" | Polling error | Process restart |
| Admin ruxsati ishlash emas | Admin ID noto'g'ri | ADMIN_IDS tekshir |

---

## 📈 OPTIMALSIZASYON

```
Hozirgi:
- polling_interval: 300ms (tezroq)
- WARNING delete: 10 sec (bosh-bosh)
- STATUS delete: 8 sec (bosh-bosh)

Optimallash:
- polling_interval ⬆️ 500ms: Kamroq CPU
- polling_interval ⬇️ 100ms: Tezroq javob
```

---

## ✅ TEKSHIRISH RO'YXATI

Botni ishga tushirishdan oldin:
- [ ] npm install
- [ ] .env faylida BOT_TOKEN mavjud
- [ ] ADMIN_IDS to'g'ri qo'yilgan
- [ ] Bot guruhda admin
- [ ] Bot "Delete messages" ruxsati
- [ ] node-telegram-bot-api paket o'rnatilgan

---

**Muallif:** Bot Developer  
**Yazilgan:** Uzbek tilida (Kiril)  
**Oxirgi tahrir:** 2025-yil
