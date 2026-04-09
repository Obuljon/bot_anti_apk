/**
 * ═══════════════════════════════════════════════════════════════════════════
 * APK BLOCKER BOT - ASOSIY FAYLI
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Bot nima qiladi:
 * - Telegram guruhida APK fayllarni blokirovka qiladi
 * - Unautorized foydalanuvchilar yuborgan APK larni o'chiradi
 * - Adminlarga esa APK yuborish ruxsatini beradi
 * - Xabar o'chirish xabar va shaxsiy notification yuboradi
 * 
 * Fayl Struktura:
 * src/
 *  ├── config/
 *  │   └── constants.js      (O'zgarmas qiymatlar va konfiguratsiya)
 *  ├── utils/
 *  │   └── helpers.js        (Yordamchi funksiyalar)
 *  ├── handlers/
 *  │   ├── messageHandler.js (APK fayllarni aniqlash va o'chirish)
 *  │   └── commandHandler.js (Botning komandalar)
 *  ├── bot.js                (Bot ishga tushirish)
 *  └── index.js              (Asosiy entry point)
 * ═══════════════════════════════════════════════════════════════════════════
 */

const { initializeBot } = require("./bot");

/**
 * DASTURNI ISHGA TUSHIRISH
 * Bot va barcha handlerlari yaratiladi va polling rejimida ishga tushiriladi
 */
function main() {
  const bot = initializeBot();

  // Global error handling - har qanday xatolikni tutib olamiz
  process.on("unhandledRejection", (reason) => {
    console.error("❌ Unhandled rejection:", reason);
  });

  process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
  });
}

// Dasturni ishga tushirish
main();
