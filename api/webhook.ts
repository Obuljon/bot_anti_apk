import type { VercelRequest, VercelResponse } from '@vercel/node';
import TelegramBot from 'node-telegram-bot-api';
import { initializeBot } from '../src/bot';   // o'zingizning bot faylingiz

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  throw new Error('❌ BOT_TOKEN topilmadi!');
}

const bot = new TelegramBot(TOKEN);

const WEBHOOK_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}/api/webhook`
  : process.env.WEBHOOK_URL;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  
  // ==================== Webhook sozlash (GET) ====================
  if (req.method === 'GET') {
    if (!WEBHOOK_URL) {
      return res.status(400).json({ error: 'WEBHOOK_URL topilmadi' });
    }

    try {
      // drop_pending_updates ni to'g'ri yozish usuli
      await bot.setWebHook(WEBHOOK_URL, {
        drop_pending_updates: true
      } as TelegramBot.SetWebHookOptions);   // ← Bu qism xatoni hal qiladi

      console.log(`✅ Webhook muvaffaqiyatli o'rnatildi: ${WEBHOOK_URL}`);
      return res.status(200).json({ 
        status: 'success', 
        message: 'Webhook sozlandi va eski update lar tozalandi!' 
      });
    } catch (err: any) {
      console.error('Webhook sozlashda xato:', err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  // ==================== Telegramdan kelgan update (POST) ====================
  if (req.method === 'POST') {
    const update:any = req.body;

    try {
      // Sizning bot handlerlaringizni ishga tushiramiz
      if (typeof initializeBot === 'function') {
        await initializeBot();        // agar initializeBot update qabul qilsa
      } else {
        // Agar initializeBot update qabul qilmasa, quyidagicha qiling:
        await bot.processUpdate(update);
      }
    } catch (err: any) {
      console.error('Update ishlashda xato:', err.message);
    }

    return res.status(200).end(); // Telegramga javob berish MAJBURIY!
  }

  // Boshqa so'rovlar
  res.status(200).json({ message: 'APK Blocker Bot Vercel da ishlamoqda ✅' });
}