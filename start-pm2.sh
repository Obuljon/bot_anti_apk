#!/bin/bash

# PM2 STARTUP SCRIPT
# APK BLOCKER BOT

echo "🚀 APK Blocker Bot - PM2 Startup..."
echo ""

# PM2 o'rnatilganini tekshirish
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 topilmadi!"
    echo "📦 PM2 o'natish: npm install -g pm2"
    exit 1
fi

echo "✅ PM2 topildi"
echo ""

# Build qilish
echo "🔨 TypeScript build qililyap..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build xatosi!"
    exit 1
fi

echo "✅ Build tugadi"
echo ""

# PM2 da already running bo'lsa, o'chirish
if pm2 list | grep -q "apk-blocker-bot"; then
    echo "🔄 Avvalgi process o'chirilmoqda..."
    pm2 delete apk-blocker-bot
    sleep 1
fi

# Bot ishga tushirish
echo "⚙️ Bot ishga tushurilmoqda..."
pm2 start ecosystem.config.js

echo ""
echo "✅ BOT ISHGA TUSHDI!"
echo ""

# Status ko'rsatish
pm2 status

echo ""
echo "📝 Loglarni ko'rish: npm run pm2:logs"
echo "📊 Monitoring: npm run pm2:monit"
echo ""
