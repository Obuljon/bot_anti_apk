import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBot } from '../src/bot';

/**
 * Vercel Serverless Function - Telegram Bot Webhook Handler
 * POST → Telegram xabarlarini qabul qilish
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // POST → Telegramdan kelgan xabarlar
  if (req.method === 'POST') {
    try {
      const bot = await getBot();
      
      // Telegram dan kelgan update ni qayta ishlash
      if (req.body && req.body.update_id !== undefined) {
        console.log(`📨 Update qabul qilindi: ${req.body.update_id}`);
        await bot.processUpdate(req.body);
      }
    } catch (err: any) {
      console.error("Update ishlashda xato:", err.message);
    }
    
    // Telegramga tez javob berish MAJBURIY
    return res.status(200).end();
  }

  // Boshqa metodlar
  res.status(200).json({ 
    status: "running"
  });
}