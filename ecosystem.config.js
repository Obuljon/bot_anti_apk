/**
 * PM2 ECOSYSTEM KONFIGURATSIYASI
 * APK BLOCKER BOT UCHUN
 * 
 * Ishlantirish:
 * - PM2 o'rnatish: npm install -g pm2
 * - Botni ishga tushirish: pm2 start ecosystem.config.js
 * - Holatni ko'rish: pm2 status
 * - Loglarni ko'rish: pm2 logs
 * - Botni to'xtatish: pm2 stop ecosystem.config.js
 * - Botni o'chirish: pm2 delete ecosystem.config.js
 * - Qayta ishga tushirish: pm2 restart ecosystem.config.js
 */

module.exports = {
  apps: [
    {
      // ===== ASOSIY SOZLAMALAR =====
      name: "apk-blocker-bot",
      script: "dist/index.js",
      main: "dist/index.js",
      
      // ===== ISHGA TUSHIRISH SOZLAMALARI =====
      instances: 1,                    // Bir nusxada ishga tushirish
      exec_mode: "fork",               // fork rejimi (clustering uchun cluster sechi)
      
      // ===== AVTOMATIK QAYTA ISHGA TUSHIRISH =====
      watch: false,                    // Faylni o'zgartirganda qayta ishga tushirmaslik
      ignore_watch: ["node_modules", "logs", "dist/.git"],
      autorestart: true,               // Crash bo'lsa avtomatik qayta ishga tushirish
      max_restarts: 10,                // Maksimal qayta ishga tushirish soni
      min_uptime: "10s",               // Minimal ishlanish vaqti
      
      // ===== ENVIRONMENT O'ZGARUVCHILARI =====
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_development: {
        NODE_ENV: "development",
      },
      
      // ===== LOGLAR SOZLAMALARI =====
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      output: "logs/output.log",       // Standart output
      error: "logs/error.log",         // Error log
      
      // ===== XOTIRANI BOSHQARISH =====
      max_memory_restart: "500M",      // Xotira chegarasi
      
      // ===== ISHGA TUSHIRISH SOZLAMALARI =====
      cwd: __dirname,
      
      // ===== SIGNALLAR =====
      kill_timeout: 10000,             // Kill signalni kutish vaqti (ms)
      wait_ready: true,                // Bot readyga kutish
      listen_timeout: 5000,            // Listen timeoutu (ms)
    }
  ],
  
  // ===== DEPLOY SOZLAMALARI (QOPQOQLASHING, IXTIYORIY) =====
  deploy: {
    production: {
      user: "deploy",
      host: "your-server.com",
      ref: "origin/master",
      repo: "your-git-repo-url.git",
      path: "/var/www/apk-blocker-bot",
      "post-deploy": "npm install && npm run build && pm2 restart ecosystem.config.js"
    }
  }
};
