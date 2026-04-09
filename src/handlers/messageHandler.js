/**
 * ═══════════════════════════════════════════════════════════════════════════
 * XABAR QAYTA ISHLASH (Message Handler)
 * ═══════════════════════════════════════════════════════════════════════════
 * Foydalanuvchilar yuborgan xabarlarni qayta ishlaydi va APK fayllarni blokirovka qiladi
 */

const { 
  getUserName, 
  isApkFile, 
  canDeleteMessages 
} = require("../utils/helpers");

const { 
  ADMIN_IDS, 
  WARNING_MESSAGE, 
  NOTIFY_SENDER, 
  AUTO_DELETE_WARNING_SEC 
} = require("../config/constants");

/**
 * ASOSIY XABAR HANDLER
 * @param {Object} bot - Telegram BOT objekti
 * @returns {Function} Message handler funksiyasi
 * 
 * Qanday ishlaydi:
 * 1. Xabar guruhda ekanligini tekshiradi
 * 2. APK fayl bo'lsa aniqlaydi
 * 3. Adminlarga ruxsat beradi
 * 4. Xabar va ogohlantirish yuklatadi
 * 5. Foydalanuvchiga shaxsiy xabar yuboradi
 */
function registerMessageHandler(bot) {
  bot.on("message", async (msg) => {
    // 1️⃣ XABANI LOGLASH
    // console.log("📥 YANGI XABAR KELDI!");
    // console.log("Chat ID:", msg.chat.id);
    // console.log("Chat Type:", msg.chat.type);
    // console.log("Foydalanuvchi:", msg.from?.id, getUserName(msg.from));

    // 2️⃣ DOCUMENT VARLIGINI TEKSHIRISH
    if (msg.document) {
      // console.log("📄 DOCUMENT aniqlandi:", msg.document.file_name);
      // console.log("Mime Type:", msg.document.mime_type);
    }
    if (!msg.document) return;

    // 3️⃣ CHAT TURINI TEKSHIRISH (Faqat guruh va super guruhda ishlaydi)
    const chatType = msg.chat.type;
    if (chatType !== "group" && chatType !== "supergroup") return;

    // 4️⃣ APK FAYLNI ANIQLASH
    if (!isApkFile(msg)) return;

    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const user = msg.from;
    const userId = user?.id;

    // 5️⃣ ADMINLARGA RUXSAT BERISH
    // if (ADMIN_IDS.length > 0 && ADMIN_IDS.includes(userId)) {
    //   console.log(`✅ Admin APK yubordi (o'chirilmaydi)`);
    //   return;
    // }

    // console.log(
    //   `🚫 APK aniqlandi → ${msg.document.file_name} | User: ${userId} | Chat: ${chatId}`
    // );

    // 6️⃣ O'CHIRISH HUQUQINI TEKSHIRISH
    const hasDeleteRight = await canDeleteMessages(bot, chatId);
    if (!hasDeleteRight) {
      try {
        await bot.sendMessage(
          chatId,
          "⚠️ Botda xabarlarni o'chirish huquqi yo'q!\n" +
          "Iltimos, botni admin qiling va 'Delete messages' ruxsatini yoqing."
        );
      } catch {}
      return;
    }

    // 7️⃣ XABARNI O'CHIRISH
    try {
      await bot.deleteMessage(chatId, messageId);
      // console.log(`✅ APK fayl o'chirildi: ${msg.document.file_name}`);
    } catch (err) {
      console.error("❌ Delete xatosi:", err.message);
      return;
    }

    // 8️⃣ GURUHGA OGOHLANTIRISH XABARI YUBORISH
    const warningText = WARNING_MESSAGE.replace("{user}", getUserName(user));
    try {
      const warnMsg = await bot.sendMessage(chatId, warningText, {
        parse_mode: "HTML",
      });

      // Ogohlantirishni avtomatik o'chirish
      setTimeout(() => {
        bot.deleteMessage(chatId, warnMsg.message_id).catch(() => {});
      }, AUTO_DELETE_WARNING_SEC * 1000);
    } catch (err) {
      console.error("❌ Warning yuborishda xato:", err.message);
    }

    // 9️⃣ FOYDALANUVCHIGA SHAXSIY XABAR YUBORISH
    if (NOTIFY_SENDER && userId) {
      try {
        await bot.sendMessage(
          userId,
          `🚫 Siz yuborgan <b>${msg.document.file_name}</b> fayli guruhdan o'chirildi.\n\n` +
          `Sabab: Guruhda .apk fayllar taqiqlangan.`,
          { parse_mode: "HTML" }
        );
      } catch (err) {
        // Foydalanuvchi botni block qilgan bo'lishi mumkin
        console.log(`⚠️ Foydalanuvchiga xabar yuborilmadi (${userId})`);
      }
    }
  });
}

module.exports = {
  registerMessageHandler,
};
