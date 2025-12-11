# ☕ Coffee Shop Bot Setup Guide

## ✅ **What's Already Done**

Your coffee shop bot is pre-configured with:
- ✅ Bot token configured
- ✅ Supabase credentials configured  
- ✅ All unwanted features removed (phone registration, reports, Google Sheets)
- ✅ Messages customized for coffee business
- ✅ Database schema ready
- ✅ Sample coffee products included

## 🚀 **Quick Setup Steps**

### **1. Setup Database (5 minutes)**

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Go to your project: `qtlmqdozxckjpgorbhfg`
3. Go to **SQL Editor**
4. Copy and paste the content from `database-schema.sql`
5. Click **Run**

✅ **This creates all tables and sample coffee products!**

### **2. Test the Bot (2 minutes)**

1. Open Terminal in this folder
2. Run: `npm install`
3. Run: `npm start`
4. Find your bot on Telegram: `@YourBotUsername`
5. Send `/start`

✅ **You should see coffee shop welcome message!**

### **3. Make Yourself Admin (1 minute)**

1. Get your Telegram ID (message @userinfobot)
2. Update `.env` file:
   ```
   FIRST_ADMIN_ID=YOUR_TELEGRAM_ID_HERE
   ```
3. Restart bot: `npm start`
4. Send `/admin` to your bot

✅ **You can now add/edit/delete coffee products!**

## 🔧 **How to Add Real Products**

1. Send `/admin` to your bot
2. Click **"📦 Mahsulotlar"** 
3. Click **"➕ Mahsulot qo'shish"**
4. Follow the step-by-step prompts:
   - Enter product name (Uzbek, Russian, English)
   - Enter price in UZS
   - Set minimum order quantity
   - Upload product image (optional)
   - Add description (optional)

## 📱 **Mini App (Optional)**

The mini app shows a beautiful product catalog. To deploy:

1. **Deploy to Vercel:**
   - Connect your GitHub repo to Vercel
   - Deploy the `mini-app` folder
   - Set environment variables in Vercel

2. **Update bot config:**
   - Add your Vercel URL to `.env`:
     ```
     MINI_APP_URL=https://your-app.vercel.app
     ```

## 🌐 **Deploy to Production**

### **Option 1: Railway (Recommended)**
1. Create Railway account
2. Connect GitHub repo
3. Deploy automatically
4. Set environment variables

### **Option 2: Manual**
1. Upload to your server
2. Install Node.js
3. Run `npm install`
4. Run `npm start`

## 🔑 **GitHub Access**

For me to push updates to your GitHub:

**Option A: Personal Access Token**
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` permissions
3. Share the token with me

**Option B: Add as Collaborator**
1. Go to your repo settings
2. Add `anthropics/claude-code` as collaborator

**Option C: Manual**
- I'll prepare all changes
- You run git commands to push

## ☕ **Your Bot Features**

### **For Customers:**
- ☕ Browse coffee products
- 📝 Place orders (no registration needed)
- 📱 Use mini app for better experience
- 💬 Send feedback
- 📞 View contact information
- 🌐 Switch between UZ/RU/EN

### **For Admin (You):**
- 👑 Use `/admin` command
- ➕ Add new coffee products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📋 View all orders
- 💬 Respond to feedback
- 📊 View simple statistics

## 🆘 **Need Help?**

Common issues:
- **Bot not responding**: Check bot token
- **Database errors**: Verify Supabase setup
- **Admin commands don't work**: Check your Telegram ID in `.env`

---

**🎉 Congratulations! Your coffee shop bot is ready to serve customers!**

Start by adding your real products through the admin panel, then share your bot with customers!