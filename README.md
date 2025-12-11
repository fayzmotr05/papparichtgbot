# Coffee Shop Telegram Bot

A full-featured Telegram bot for coffee shop businesses in Uzbekistan with multi-language support (Uzbek, Russian, English).

## Features

- 📦 Product catalog management
- 🛒 Order processing system
- 👑 Admin panel with full control
- 🔔 Real-time order notifications
- 📊 Inventory management
- 💬 Customer feedback system
- 🌍 Multi-language support (UZ/RU/EN)

## Tech Stack

- **Backend**: Node.js, Telegraf.js
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Railway (Bot) + Vercel (Mini App)

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env` and fill in your credentials
3. Run the database schema in Supabase
4. Install dependencies: `npm install`
5. Start the bot: `npm start`

## Environment Variables

```bash
BOT_TOKEN=your_telegram_bot_token
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
FIRST_ADMIN_ID=your_telegram_user_id
PORT=3000
```

## Deployment

### Railway (Bot)
1. Push to GitHub
2. Connect repository to Railway
3. Set environment variables
4. Deploy automatically

### Vercel (Mini App)
1. Deploy mini app to Vercel
2. Update `MINI_APP_URL` in environment variables

## Database Setup

Execute the SQL commands in `database-schema.sql` in your Supabase SQL editor.

## Admin Commands

- `/admin` - Access admin panel
- `/start` - Start the bot

## Features

- ✅ Product management (add/edit/delete)
- ✅ Order processing with status updates
- ✅ Admin notifications
- ✅ Inventory tracking
- ✅ Customer feedback system
- ✅ Multi-language support

## Support

Built with ❤️ for coffee businesses in Uzbekistan
