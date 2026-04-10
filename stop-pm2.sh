#!/bin/bash

# PM2 STOP SCRIPT
# APK BLOCKER BOT

echo "🛑 Bot to'xtatilmoqda..."
pm2 stop apk-blocker-bot

echo ""
echo "✅ Bot to'xtatildi"
echo ""

pm2 status

echo ""
echo "💡 Botni qayta ishga tushirish: npm run pm2:restart"
echo "🗑️ Botni PM2 dan o'chirish: npm run pm2:delete"
echo ""
