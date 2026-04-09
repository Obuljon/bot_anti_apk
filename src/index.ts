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
 *  │   └── constants.ts      (O'zgarmas qiymatlar va konfiguratsiya)
 *  ├── utils/
 *  │   └── helpers.ts        (Yordamchi funksiyalar)
 *  ├── handlers/
 *  │   ├── messageHandler.ts (APK fayllarni aniqlash va o'chirish)
 *  │   └── commandHandler.ts (Botning komandalar)
 *  ├── bot.ts                (Bot ishga tushirish)
 *  └── index.ts              (Asosiy entry point)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { initializeBot } from "./bot";

/**
 * DASTURNI ISHGA TUSHIRISH
 * Bot va barcha handlerlari yaratiladi va polling rejimida ishga tushiriladi
 */
async function main(): Promise<void> {
  initializeBot();

  // Global error handling - har qanday xatolikni tutib olamiz
  process.on("unhandledRejection", (reason: unknown) => {
    console.error("❌ Unhandled rejection:", reason);
  });

  process.on("uncaughtException", (err: Error) => {
    console.error("❌ Uncaught Exception:", err);
    process.exit(1);
  });
}

// Dasturni ishga tushirish
main();
