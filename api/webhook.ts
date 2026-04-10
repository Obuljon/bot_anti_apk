import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBot } from '../src/bot';

/**
 * Vercel Serverless Function - Telegram Bot Webhook Handler
 * 
 * GET  → Webhook-ni sozlash
 * POST → Telegram xabarlarini qabul qilish
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // GET → Webhook tasdiqlash va sozlash
  if (req.method === 'GET') {
    try {
      const bot = getBot();
      const webhookUrl = `https://${req.headers.host}/api/webhook`;
      
      // Eski webhook ni o'chirish
      await bot.deleteWebHook();
      
      // Yangi webhook ni sozlash
      await bot.setWebHook(webhookUrl, { 
        drop_pending_updates: true,
        allowed_updates: ['message', 'edited_message', 'callback_query']
      } as any);
      
      console.log(`✅ Webhook sozlandi: ${webhookUrl}`);
      return res.status(200).json({ 
        status: "success", 
        message: "Webhook sozlandi!",
        webhook_url: webhookUrl
      });
    } catch (err: any) {
      console.error("Webhook sozlash xatosi:", err.message);
      return res.status(500).json({ 
        status: "error",
        error: err.message 
      });
    }
  }

  // POST → Telegramdan kelgan xabarlar
  if (req.method === 'POST') {
    try {
      const bot = getBot();
      
      // Telegram dan kelgan update ni qayta ishlash
      if (req.body && req.body.update_id !== undefined) {
        console.log(`📨 Update qabul qilindi: ${req.body.update_id}`);
        await bot.processUpdate(req.body);
      }
    } catch (err: any) {
      console.error("Update ishlashda xato:", err.message);
    }
    
    // Telegramga tez javob berish MAJBURIY (2 sekunddan tez)
    return res.status(200).end();
  }

  // Boshqa metodlar uchun
  res.status(200).json({ 
    message: "APK Blocker Bot Vercel da ishlayapti ✅",
    status: "running"
  });
}