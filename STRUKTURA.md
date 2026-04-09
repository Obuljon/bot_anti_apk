# 📊 BOT TUZILMASI SXEMASI

## 🗂️ FAYL STRUKTURASI

```
/home/obul/demo/bot_anti_apk/
│
├── package.json                    # NPM paketlar
├── .env                           # Rahoyasi ma'lumotlar (BOT_TOKEN, ADMIN_IDS)
├── README.md                      # Asl README
├── TUZILMA.md                     # Batafsil ta'rif (🆕)
│
└── src/
    ├── index.js              🎯 ENTRY POINT
    │   └─ main()             Dasturni ishga tushiradi
    │      └─ initializeBot() Bot ni yaratadi
    │
    ├── bot.js                🚀 BOT INITIALIZATION
    │   └─ initializeBot()
    │      ├─ TelegramBot yaratadi
    │      ├─ registerMessageHandler() chaqiradi
    │      ├─ registerAllCommands()    chaqiradi
    │      └─ Error handling sozlaydi
    │
    ├── config/
    │   └── constants.js      📌 KONFIGURATSIYA
    │       ├─ TOKEN
    │       ├─ ADMIN_IDS
    │       ├─ WARNING_MESSAGE
    │       ├─ NOTIFY_SENDER
    │       ├─ AUTO_DELETE_WARNING_SEC
    │       └─ POLLING_INTERVAL
    │
    ├── utils/
    │   └── helpers.js        🛠️ YORDAMCHI FUNKSIYALAR
    │       ├─ getUserName()          Foydalanuvchi ismini olish
    │       ├─ isApkFile()            APK faylni aniqlash
    │       └─ canDeleteMessages()    O'chirish huquqini tekshirish
    │
    └── handlers/
        ├── messageHandler.js 📨 XABAR QAYTA ISHLASH
        │   └─ registerMessageHandler()
        │      ├─ Xabarni loglash
        │      ├─ APK ekanligini aniqlash
        │      ├─ Admin tekshirish
        │      ├─ Xabarni o'chirish
        │      ├─ Ogohlantirish yuborish
        │      └─ Shaxsiy xabar yuborish
        │
        └── commandHandler.js ⌨️ KOMANDA QAYTA ISHLASH
            └─ registerAllCommands()
               ├─ registerStartCommand()  /start
               └─ registerStatusCommand() /status
```

---

## 🔀 DASTUR OQIMI (Flow)

```
┌─────────────────────────────────────────────────────────┐
│  npm start / node src/index.js                          │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  src/index.js                                           │
│  - main() funksiyasini chaqira                         │
│  - Global error handling sozla                         │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│  src/bot.js                                             │
│  - initializeBot() funksiyasini chaqira               │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
        ▼           ▼           ▼
    ┌─────┐   ┌─────────┐   ┌─────────┐
    │TOKEN│   │CONSTANTS│   │HANDLERS │
    │oqiy │  (config)   │   │royst.   │
    └─────┘   └─────────┘   └─────────┘
        │           │           │
        └───────────┴───────────┘
                    │
                    ▼
        ┌─────────────────────────┐
        │  BOT POLLING REJIMIGA   │
        │  Xabarlarni tekshiradi  │
        └────────────┬────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
    ┌─────────────┐         ┌──────────────┐
    │  /KOMANDA   │         │  📨 XABAR    │
    │  qabul qila │         │  qabul qila  │
    └──────┬──────┘         └──────┬───────┘
           │                       │
           ▼                       ▼
    ┌─────────────────┐  ┌────────────────────┐
    │/start yoki      │  │handlers/message    │
    │/status komanda  │  │Handler.js          │
    │xizmat qila      │  │- isApkFile() test  │
    └─────────────────┘  │- canDelete() test  │
                         │- O'chirish amali   │
                         │- Xabar yuborish    │
                         └────────────────────┘
```

---

## 📞 FUNCTION QO'LLANILISH GRAFIKI

### 1. **getUserName(user)** ko'ллаши жойлари:
```
messageHandler.js → registerMessageHandler → 
  → console.log() ichida
  → WARNING_MESSAGE change
  → sendMessage() parametri
```

### 2. **isApkFile(msg)** ko'llash жойлари:
```
messageHandler.js → registerMessageHandler → 
  → document va MIME type tekshirish
  → Agar APK bo'lsa → o'chirish jarayoni boshlash
```

### 3. **canDeleteMessages(bot, chatId)** ko'llash жойлари:
```
messageHandler.js   → Admin huquqini tekshirish
commandHandler.js   → /status komandasi
```

---

## 🔄 XABAR ЖОЯСИДАГИ QADAMLAR

```
1. XABAR KELADI 📨
   │
   ▼
2. registerMessageHandler() CHAQIRILADI
   │
   ├─ Xabar loglash (debug uchun)
   ├─ Document bor-yoqligini tekshirish
   ├─ Chat turi guruhmi tekshirish
   │
   ▼
3. isApkFile(msg) → Agar APK:
   │
   ├─ ADMIN_IDS.includes(userId) → Ruxsat berish ✅
   │
   ▼ (Agar admin emas)
4. canDeleteMessages(bot, chatId) → Huquq tekshiris
   │
   ├─ Huquq yo'q → Xabar yuborish, STOP
   │
   ▼ (Huquq bor)
5. bot.deleteMessage() → Xabarni o'chirish ✂️
   │
   ├─ Guruhga ogohlantirish yuborish 📣
   │  └─ 10 sekund keyin o'chirish ⏰
   │
   ▼
6. NOTIFY_SENDER true bo'lsa:
   └─ Shaxsiy xabar yuborish 💬
      └─ "Siz yuborgan .apk fayl o'chirildi"
```

---

## 📋 VARIABLE SCOPE'LARI

### GLOBAL (config/constants.js)
```javascript
TOKEN         → Telegram BOT API tokeni
ADMIN_IDS     → Admin foydalanuvchilar
WARNING_MESSAGE
NOTIFY_SENDER
AUTO_DELETE_WARNING_SEC
POLLING_INTERVAL
```

### MESSAGE HANDLER (handlers/messageHandler.js)
```javascript
chatId       → Guruh ID
messageId    → Xabar ID
user         → Foydalanuvchi ob'jekti
userId       → User ID
```

### COMMAND HANDLER (handlers/commandHandler.js)
```javascript
msg          → Telegram xabari
chatId       → Guruh/Private chat ID
```

---

## 🎯 MODULLAR O'RTASIDAGI HABARLAR

```
index.js
  │
  └─ requires → bot.js
                  │
                  └─ requires → handlers/messageHandler.js
                  │              handlers/commandHandler.js
                  │
                  └─ requires → config/constants.js
                  
                  
handlers/messageHandler.js
  │
  └─ requires → utils/helpers.js
              → config/constants.js

handlers/commandHandler.js
  │
  └─ requires → utils/helpers.js
```

---

## 💾 .env KONFIGURASIYASI

```env
# Telegram BOT API tokeni
BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11

# Admin ID'lari (vergul bilan ajratilgan)
ADMIN_IDS=123456789,987654321

# Xavfsizlik xabari
WARNING_MESSAGE=⚠️ {user} tomonidan yuborilgan .apk fayl xavfsizlik sababli o'chirildi!

# Foydalanuvchiga shaxsiy xabar yuborilsinmi
NOTIFY_SENDER=true
```

---

## 🚦 ERROR HANDLING SXEMASI

```
BOT ISHIGA TUSHGAN → Polling boshlandi
    │
    ├─ polling_error → console.error() → Davom etadi
    │
    ├─ unhandledRejection → console.error() → Davom etadi
    │
    └─ uncaughtException → console.error() → process.exit(1)
```

---

## 📈 PERFORMANCE OPTIMALASHTIRILISI

| Parameter | Qiymati | Sababi |
|-----------|---------|--------|
| polling_interval | 300ms | Tezroq javob berish |
| Auto delete warning | 10 sec | Ko'p xabar yiglashdan saqlash |
| Auto delete status | 8 sec | Foydalanuvchi interfeysi tozalash |

---

## ✅ TEKSHIRUV RO'YXATI

- [ ] .env faylida BOT_TOKEN mavjudmi
- [ ] ADMIN_IDS to'g'ri formatda ravon
- [ ] Bot guruhda admin bo'lganmi
- [ ] Bot "Delete messages" ruxsati berilganmi
- [ ] Barcha npm paketlari o'rnatilganmi (`npm install`)

---

**Oxirgi yangilash:** 2025  
**Til:** Uzbek (Kiril)
