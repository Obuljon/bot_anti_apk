/**
 * ═══════════════════════════════════════════════════════════════════════════
 * KONFIGURATSIYA VA O'ZGARMAS QIYMATLAR
 * ═══════════════════════════════════════════════════════════════════════════
 * Bu fayl .env faylidan o'zgarmas qiymatlarni o'qiydi va saqlaydi
 */

import dotenv from "dotenv";

dotenv.config();

/**
 * BOT TOKEN - Telegram BOT API dan olingan token
 * Majburiy parametr, aks holda dastur to'xtaydi
 */
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error("❌ BOT_TOKEN topilmadi! .env faylni tekshiring.");
  process.exit(1);
}

/**
 * ADMIN ID LARI - Qaysi foydalanuvchilar adminlarni blokirovka qila olmaydi
 * .env fayldan vergul bilan ajratilgan raqamlar o'qiladi
 */
const ADMIN_IDS: number[] = (process.env.ADMIN_IDS || "")
  .split(",")
  .map((id: string) => id.trim())
  .filter(Boolean)
  .map(Number);

/**
 * OGOHLANTIRISH XABARI - APK fayl o'chirilganda guruhda ko'rsatiladi
 * {user} o'rniga foydalanuvchi nomi qo'yiladi
 */
const WARNING_MESSAGE: string =
  process.env.WARNING_MESSAGE ||
  "⚠️ {user} tomonidan yuborilgan .apk fayl xavfsizlik sababli o'chirildi!";

/**
 * XABAR YUBORISH - Foydalanuvchiga shaxsiy xabar yuborilsinmi?
 * Default: true
 */
const NOTIFY_SENDER: boolean = process.env.NOTIFY_SENDER !== "false";

/**
 * OGOHLANTIRISH XABARINI O'CHIRISH VAQTI (sekund)
 * Guruhga yuborilgan ogohlantirish xabarini qancha vaqtdan keyin o'chirish
 */
const AUTO_DELETE_WARNING_SEC: number = 10;

/**
 * POLLING INTERVAL - Bot har qancha millisekundda xabarlarni tekshiradi
 * Kichik raqam = tezroq javob, lekin ko'proq CPU ishlatish
 */
const POLLING_INTERVAL: number = 300;

// Eksport qilish
export {
  TOKEN,
  ADMIN_IDS,
  WARNING_MESSAGE,
  NOTIFY_SENDER,
  AUTO_DELETE_WARNING_SEC,
  POLLING_INTERVAL,
};
