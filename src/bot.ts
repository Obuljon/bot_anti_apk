/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BOT ISHGA TUSHIRISH VA KONFIGURATSIYASI
 * ═══════════════════════════════════════════════════════════════════════════
 * Telegram BOT ni yaratadi va barcha handlerlari bilan ishga tushiradi
 */

import TelegramBot from "node-telegram-bot-api";
import { TOKEN } from "./config/constants";
import { registerMessageHandler } from "./handlers/messageHandler";
import { registerAllCommands } from "./handlers/commandHandler";

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
function initializeBot(): TelegramBot {
  // 1️⃣ BOT NI YARATISH
  const bot = new TelegramBot(TOKEN as string, {
    polling: true,
  });

  console.log("🤖 APK Blocker Bot muvaffaqiyatli ishga tushdi...");

  // 2️⃣ MESSAGELAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerMessageHandler(bot);

  // 3️⃣ KOMANDALAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerAllCommands(bot);

  // 4️⃣ ERROR HANDLING - Polling xatolari
  bot.on("polling_error", (err: Error) => {
    console.error("❌ Polling xato:", err.message);
  });

  return bot;
}

export { initializeBot };
