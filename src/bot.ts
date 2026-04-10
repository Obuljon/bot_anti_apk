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
async function initializeBot(): Promise<TelegramBot> {
  // 1️⃣ BOT NI YARATISH - Vercel da webhook rejimida, local da polling
  const botOptions: any = IS_VERCEL 
    ? { polling: false }  // Webhook rejimida polling o'chiriladi
    : { polling: true };  // Local da polling yonadi
  
  const bot = new TelegramBot(TOKEN as string, botOptions);

  // 2️⃣ WEBHOOK SOZLASH (Vercel da)
  if (IS_VERCEL) {
    try {
      const webhookUrl = process.env.WEBHOOK_URL || `${process.env.VERCEL_URL}/api/webhook`;
      
      // Eski webhook ni o'chirish
      await bot.deleteWebHook();
      
      // Yangi webhook ni sozlash
      await bot.setWebHook(webhookUrl, {
        drop_pending_updates: true,
        allowed_updates: ['message', 'edited_message', 'callback_query']
      } as any);
      
      console.log(`✅ Webhook sozlandi: ${webhookUrl}`);
    } catch (err: any) {
      console.warn(`⚠️ Webhook sozlashda xato: ${err.message}`);
    }
  }

  console.log(`🤖 APK Blocker Bot muvaffaqiyatli ishga tushdi... (${IS_VERCEL ? 'Webhook' : 'Polling'} rejimi)`);

  // 3️⃣ MESSAGELAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerMessageHandler(bot);

  // 4️⃣ KOMANDALAR UCHUN HANDLER NI REGISTRATSIYA QILISH
  registerAllCommands(bot);

  // 5️⃣ ERROR HANDLING
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
let initPromise: Promise<TelegramBot> | null = null;

/**
 * Bot instance ni olish (yoki yaratish agar mavjud bo'lmasa)
 * Webhook rejimida ham polling rejimida ham to'g'ri ishlaydi
 */
async function getBot(): Promise<TelegramBot> {
  if (botInstance) {
    return botInstance;
  }

  if (initPromise) {
    return initPromise;
  }

  initPromise = initializeBot();
  botInstance = await initPromise;
  return botInstance;
}

export { initializeBot, getBot, botInstance };
