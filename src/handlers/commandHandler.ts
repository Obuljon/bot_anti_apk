/**
 * ═══════════════════════════════════════════════════════════════════════════
 * KOMANDA QAYTA ISHLASH (Command Handler)
 * ═══════════════════════════════════════════════════════════════════════════
 * Foydalanuvchilar / orqali yuborgan komandalarni qayta ishlaydi
 */

import TelegramBot from "node-telegram-bot-api";
import { canDeleteMessages } from "../utils/helpers";

/**
 * /START KOMANDASI
 * @param {Object} bot - Telegram BOT objekti
 * 
 * Qanday ishlaydi:
 * 1. Faqat shaxsiy chatda ishlaydigan komanda
 * 2. Botning nomasi va qanday ishlashi haqida ma'lumot beradi
 * 3. Sozlash qadamlarini ko'rsatadi
 */
function registerStartCommand(bot: TelegramBot): void {
  bot.onText(/\/start/, (msg: TelegramBot.Message) => {
    if (msg.chat.type === "private") {
      bot.sendMessage(
        msg.chat.id,
        `👋 Salom! Men <b>APK Blocker Bot</b>man.\n\n` +
          `Guruhga .apk fayl tashlanganda uni darhol o'chiraman.\n\n` +
          `✅ Sozlash:\n` +
          `1. Meni guruhga qo'shing\n` +
          `2. Admin qiling\n` +
          `3. "Xabarlarni o'chirish" ruxsatini bering`,
        { parse_mode: "HTML" }
      );
    }
  });
}

/**
 * /STATUS KOMANDASI
 * @param {Object} bot - Telegram BOT objekti
 * 
 * Qanday ishlaydi:
 * 1. Bot to'g'ri ishlapadigini tekshiradi
 * 2. Xabar o'chirish huquqini aniqlab qaytaradi
 * 3. Status xabarini 8 sekund o'chirib tashlaydi
 */
function registerStatusCommand(bot: TelegramBot): void {
  bot.onText(/\/status/, async (msg: TelegramBot.Message) => {
    // Faqat guruhda ishlayadigan komanda
    if (msg.chat.type === "private") return;

    // Bot huquqlarini tekshirish
    const canDelete = await canDeleteMessages(bot, msg.chat.id);
    const text = canDelete
      ? "✅ Bot to'g'ri ishlayapti. APK fayllar bloklanadi."
      : "❌ Botda xabarlarni o'chirish huquqi yo'q!";

    // Status xabarini yuborish
    const statusMsg = await bot.sendMessage(msg.chat.id, text);

    // 8 sekunddan keyin xabarni o'chirish
    setTimeout(
      () =>
        bot.deleteMessage(msg.chat.id, statusMsg.message_id).catch(() => {}),
      8000
    );
  });
}

/**
 * BARCHA KOMANDALARNI REGISTRATSIYA QILISH
 * @param {Object} bot - Telegram BOT objekti
 * 
 * Bu funksiya barcha komanda handlerlarni ro'yxatga oladi
 */
function registerAllCommands(bot: TelegramBot): void {
  registerStartCommand(bot);
  registerStatusCommand(bot);
  console.log("✅ Barcha komandalar ro'yxatga olingan");
}

export { registerAllCommands };
