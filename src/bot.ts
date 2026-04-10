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

// Vercel yoki local muhit aniqlash
const IS_VERCEL = !!process.env.VERCEL || !!process.env.VERCEL_URL;

/**
 * BOT NI YARATISH VA ISHGA TUSHIRISH
 * @returns {Object} Yaratilgan BOT objekti
 * 
 * Qanday ishlaydi:
 * 1. Telegram BOT API orqali yangi bot yaratadi
 * 2. Agar Vercel da bo'lsa webhook rejimida, aks holda polling rejimida ishga tushiradi
 * 3. Barcha handlerlari va komandalarni ro'yxatga oladi
 * 4. Error handlingni sozlaydi
 */
function initializeBot(): TelegramBot {
  // 1️⃣ BOT NI YARATISH - Vercel da webhook rejimida, local da polling
  const botOptions: any = IS_VERCEL 
    ? { polling: false }  // Webhook rejimida polling o'chiriladi
    : { polling: true };  // Local da polling yonadi
  
  const bot = new TelegramBot(TOKEN as string, botOptions);

  console.log(`🤖 APK Blocker Bot muvaffaqiyatli ishga tushdi... (${IS_VERCEL ? 'Webhook' : 'Polling'} rejimi)`);

  // 2️⃣ MESSAGELAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerMessageHandler(bot);

  // 3️⃣ KOMANDALAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerAllCommands(bot);

  // 4️⃣ ERROR HANDLING
  if (!IS_VERCEL) {
    // Polling xatolari (faqat local da)
    bot.on("polling_error", (err: Error) => {
      console.error("❌ Polling xato:", err.message);
    });
  }

  return bot;
}

// Global bot instance - Vercel webhook uchun zarur
let botInstance: TelegramBot | null = null;

/**
 * Bot instance ni olish (yoki yaratish agar mavjud bo'lmasa)
 */
function getBot(): TelegramBot {
  if (!botInstance) {
    botInstance = initializeBot();
  }
  return botInstance;
}

export { initializeBot, getBot, botInstance };
