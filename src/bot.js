/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BOT ISHGA TUSHIRISH VA KONFIGURATSIYASI
 * ═══════════════════════════════════════════════════════════════════════════
 * Telegram BOT ni yaratadi va barcha handlerlari bilan ishga tushiradi
 */

const TelegramBot = require("node-telegram-bot-api");
const { TOKEN, POLLING_INTERVAL } = require("./config/constants");
const { registerMessageHandler } = require("./handlers/messageHandler");
const { registerAllCommands } = require("./handlers/commandHandler");

/**
 * BOT NI YARATISH VA ISHGA TUSHIRISH
 * @returns {Object} Yaratilgan BOT objekti
 * 
 * Qanday ishlaydi:
 * 1. Telegram BOT API orqali yangi bot yaratadi
 * 2. Polling rejimida ishga tushiradi (avtomatik xabarlarni tekshiradi)
 * 3. Barcha handlerlari va komandalarni ro'yxatga oladi
 * 4. Error handlingni sozlaydi
 */
function initializeBot() {
  // 1️⃣ BOT NI YARATISH
  const bot = new TelegramBot(TOKEN, {
    polling: true,
    polling_interval: POLLING_INTERVAL, // Tezroq javob berish uchun
  });

  console.log("🤖 APK Blocker Bot muvaffaqiyatli ishga tushdi...");

  // 2️⃣ MESSAGELAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerMessageHandler(bot);

  // 3️⃣ KOMANDALAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerAllCommands(bot);

  // 4️⃣ ERROR HANDLING - Polling xatolari
  bot.on("polling_error", (err) => {
    console.error("❌ Polling xato:", err.message);
  });

  return bot;
}

module.exports = {
  initializeBot,
};
