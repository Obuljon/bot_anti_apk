/**
 * ═══════════════════════════════════════════════════════════════════════════
 * YORDAMCHI FUNKSIYALAR
 * ═══════════════════════════════════════════════════════════════════════════
 * Butun bot uchun uum ishlatiladigan funksiyalar
 */

import TelegramBot from "node-telegram-bot-api";

/**
 * FOYDALANUVCHI ISMINI OLISH
 * @param {Object} user - Telegram user objekti
 * @returns {String} Foydalanuvchi nomi yoki ID
 * 
 * Qanday ishlaydi:
 * 1. Birinchi va oxirgi nomni birlashtiradi
 * 2. Agar yo'q bo'lsa, username ishlatadi
 * 3. Aks holda, user ID ni qaytaradi
 */
function getUserName(user: TelegramBot.User | undefined): string {
  if (!user) return "Noma'lum";
  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ");
  return fullName || user.username ? `@${user.username}` : `ID:${user.id}`;
}

/**
 * APK FAYLNI ANIQLASH
 * @param {Object} msg - Telegram xabari objekti
 * @returns {Boolean} APK fayl bo'lsa true, aks holda false
 * 
 * Aniqlash usullari:
 * 1. Fayl nomi .apk bilan tugasa
 * 2. MIME type "application/vnd.android.package-archive" bo'lsa
 * 3. MIME type "apk" so'zini o'z ichiga olsa
 */
function isApkFile(msg: TelegramBot.Message): boolean {
  const doc = msg.document;
  if (!doc) return false;

  const fileName = (doc.file_name || "").toLowerCase();
  const mimeType = (doc.mime_type || "").toLowerCase();

  return (
    fileName.endsWith(".apk") ||
    mimeType === "application/vnd.android.package-archive" ||
    mimeType.includes("apk")
  );
}

/**
 * XABARNI O'CHIRISH RUXSATINI TEKSHIRISH
 * @param {Object} bot - Telegram BOT objekti
 * @param {Number} chatId - Chat ID
 * @returns {Boolean} Agar bot xabar o'chirishga ruxsat bo'lsa true
 * 
 * Qanday ishlaydi:
 * 1. Bot o'zini admin sifatida tekshiradi
 * 2. Xabar o'chirish huquqi bor-yoqligini aniqlab qaytaradi
 */
async function canDeleteMessages(
  bot: TelegramBot,
  chatId: number
): Promise<boolean> {
  try {
    const me = await bot.getMe();
    const member = await bot.getChatMember(chatId, me.id);
    return member.can_delete_messages === true;
  } catch (err) {
    const error = err as Error;
    console.warn(`⚠️ Huquqni tekshirishda xato: ${error.message}`);
    return false;
  }
}

// Eksport qilish
export { getUserName, isApkFile, canDeleteMessages };
