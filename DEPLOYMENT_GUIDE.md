# 🚀 Deployment Guide

## 1. GitHub Setup

✅ **Done**: Repository is ready with all code committed.

## 2. Railway Deployment (Telegram Bot)

### Step 1: Connect to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select this repository: `coffee-shop-telegram-bot`

### Step 2: Configure Environment Variables
In Railway dashboard, add these environment variables:

```bash
BOT_TOKEN=8574629010:AAGWZ4pYkHlPf2auOirhrco2BlQXfGtQ2NM
SUPABASE_URL=https://qtlmqdozxckjpgorbhfg.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG1xZG96eGNranBnb3JiaGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzI3NTMsImV4cCI6MjA4MDk0ODc1M30.NiTxi4oHcgWzaxPFmXO1upmyI6WYZdEyE2BPKs-13sU
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0bG1xZG96eGNranBnb3JiaGZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTM3Mjc1MywiZXhwIjoyMDgwOTQ4NzUzfQ.iWZ4L-BesZh0K9Re6F4F7HJKMJ5dYQ4XGs_jXWL3so0
FIRST_ADMIN_ID=790208567
PORT=3000
NODE_ENV=production
```

### Step 3: Deploy
1. Railway will automatically deploy
2. Bot will be available at: `https://your-app.railway.app`
3. Health check: `https://your-app.railway.app/health`

## 3. Vercel Deployment (Mini App)

### Option A: Deploy from mini-app folder separately
1. Navigate to `mini-app/` folder
2. Deploy to Vercel: `vercel --prod`
3. Get deployment URL

### Option B: Create new repository for mini-app
1. Copy `mini-app/` contents to new repo
2. Connect to Vercel
3. Deploy

### Step 4: Update Mini App URL
1. Get Vercel URL (e.g., `https://coffee-mini-app.vercel.app`)
2. Add to Railway environment variables:
```bash
MINI_APP_URL=https://your-mini-app.vercel.app
```

## 4. Final Steps

### Update Bot Commands
1. Go to BotFather (@BotFather)
2. Send `/setcommands`
3. Select your bot
4. Send:
```
admin - Access admin panel
start - Start the bot
```

### Test Everything
1. ✅ Bot responds to `/start`
2. ✅ Admin panel works with `/admin`
3. ✅ Order flow works
4. ✅ Notifications arrive
5. ✅ All buttons work

## 5. Production URLs

- **Bot Backend**: `https://your-app.railway.app`
- **Mini App**: `https://your-mini-app.vercel.app`
- **Health Check**: `https://your-app.railway.app/health`

## 6. Monitoring

- Railway provides logs and metrics
- Health endpoint for uptime monitoring
- Database monitoring via Supabase dashboard

## ✅ Deployment Complete!

Your coffee shop Telegram bot is now live and ready for customers! 🎉
