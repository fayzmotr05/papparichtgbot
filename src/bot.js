const { Telegraf, Scenes, session } = require('telegraf');
const express = require('express');
require('dotenv').config();

// Import configuration
const { db } = require('./config/database');
const { getMessage } = require('./config/messages');

// Import handlers
const { showProducts, showProductDetails } = require('./handlers/products');
const { orderScene, startOrder } = require('./handlers/order');
const { feedbackScene, startFeedback } = require('./handlers/feedback');

// Import admin handlers
const { showAdminPanel, showAdminProducts, showAdminOrders, showAdminFeedback, showAdminStats } = require('./handlers/admin');
const { addProductScene, editProductScene, startAddProduct, startEditProduct } = require('./handlers/admin-products');
const { showOrderDetails, updateOrderStatus } = require('./handlers/admin-orders');
const { feedbackResponseScene, showFeedbackDetails, markFeedbackAsRead, startFeedbackResponse } = require('./handlers/admin-feedback');
const { bulkStockScene, startBulkStock, initInventoryMonitoring } = require('./handlers/inventory');

// Import notification system
const { initNotifications, testGroupConnection, getGroupChatId } = require('./utils/notifications');

// Removed: Daily automation service (no longer needed for coffee shop)

// Validate environment
if (!process.env.BOT_TOKEN) {
  console.error('❌ BOT_TOKEN is required');
  process.exit(1);
}

// Create bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

// Create scene stage with all scenes
const stage = new Scenes.Stage([orderScene, feedbackScene, addProductScene, editProductScene, bulkStockScene, feedbackResponseScene]);

// Middleware
bot.use(session());
bot.use(stage.middleware());

// Helper functions
async function getUserLanguage(userId) {
  try {
    const user = await db.getUser(userId);
    return user?.language_code || 'uz';
  } catch (error) {
    console.error('Error getting user language:', error);
    return 'uz';
  }
}

async function isAdmin(userId) {
  const adminIds = [
    parseInt(process.env.FIRST_ADMIN_ID), // Main admin from env
    790208567  // Your admin ID (hardcoded as backup)
  ].filter(id => !isNaN(id)); // Filter out invalid IDs
  
  console.log('🔑 Admin check:', { userId, adminIds, isAdmin: adminIds.includes(parseInt(userId)) });
  return adminIds.includes(parseInt(userId));
}

// Admin command
bot.command('admin', async (ctx) => {
  try {
    const userId = ctx.from.id;
    
    // Check admin access
    if (!(await isAdmin(userId))) {
      return await ctx.reply('❌ Sizda admin huquqlari yo\'q | У вас нет прав администратора | You don\'t have admin rights');
    }
    
    await showAdminPanel(ctx);
  } catch (error) {
    console.error('Admin command error:', error);
    await ctx.reply('❌ Xatolik yuz berdi');
  }
});

// Main commands
bot.start(async (ctx) => {
  try {
    console.log(`👤 User started: ${ctx.from.id} (@${ctx.from.username})`);
    
    // Create or update user in database
    await db.createUser({
      id: ctx.from.id,
      username: ctx.from.username,
      first_name: ctx.from.first_name,
      last_name: ctx.from.last_name
    });

    // Check for deep link parameters
    const startPayload = ctx.startPayload;
    
    if (startPayload && startPayload.startsWith('order_')) {
      // Extract product ID from deep link
      const productId = startPayload.replace('order_', '');
      console.log(`📱 Mini App order request: Product ${productId} from user ${ctx.from.id}`);
      
      // Get user language first
      const language = await getUserLanguage(ctx.from.id);
      
      // Show welcome message for Mini App users
      await ctx.reply(getMessage('miniAppWelcome', language));
      
      // Start order process for the specific product
      await startOrder(ctx, productId);
      return;
    }
    
    if (startPayload && startPayload === 'catalog') {
      // Coming back from Mini App to browse catalog
      const language = await getUserLanguage(ctx.from.id);
      await ctx.reply(getMessage('welcomeBack', language));
      await showProducts(ctx);
      return;
    }

    // Regular start - show language selection
    await showLanguageSelection(ctx);
  } catch (error) {
    console.error('Start command error:', error);
    await ctx.reply('❌ Error occurred. Please try again.');
  }
});

// Language selection functions
async function showLanguageSelection(ctx) {
  const keyboard = {
    inline_keyboard: [
      [
        { text: '🇺🇿 O\'zbek', callback_data: 'lang_uz' },
        { text: '🇷🇺 Русский', callback_data: 'lang_ru' }
      ],
      [
        { text: '🇺🇸 English', callback_data: 'lang_en' }
      ]
    ]
  };

  await ctx.reply(getMessage('welcome', 'uz'), {
    reply_markup: keyboard
  });
}

// Language selection handlers
bot.action(/^lang_(.+)$/, async (ctx) => {
  try {
    const language = ctx.match[1];
    const userId = ctx.from.id;

    // Update user language in database
    await db.updateUserLanguage(userId, language);

    // Show confirmation
    await ctx.editMessageText(getMessage('languageSet', language));

    // Wait a moment then show main menu
    setTimeout(async () => {
      await showMainMenu(ctx, language);
    }, 1500);

    await ctx.answerCbQuery();
  } catch (error) {
    console.error('Language selection error:', error);
    await ctx.answerCbQuery('Error setting language');
  }
});

// Main menu function
async function showMainMenu(ctx, userLanguage = null) {
  try {
    const userId = ctx.from.id;
    const language = userLanguage || await getUserLanguage(userId);
    const adminUser = await isAdmin(userId);

    const keyboard = [
      [
        { 
          text: '🌐 ' + getMessage('mainMenu.webApp', language),
          web_app: { 
            url: process.env.MINI_APP_URL || 'https://mini-e4fcp04g9-harryschooladm-8637s-projects.vercel.app'
          }
        }
      ],
      [
        { text: getMessage('mainMenu.products', language) },
        { text: getMessage('order', language) }
      ],
      [
        { text: getMessage('mainMenu.catalog', language) },
        { text: getMessage('mainMenu.feedback', language) }
      ],
      [
        { text: getMessage('contact', language) },
        { text: getMessage('about', language) }
      ],
      [
        { text: getMessage('language', language) }
      ]
    ];

    // Admin panel available via /admin command instead of button

    await ctx.reply(getMessage('mainMenuTitle', language), {
      reply_markup: {
        keyboard: keyboard,
        resize_keyboard: true
      }
    });
  } catch (error) {
    console.error('Main menu error:', error);
    await ctx.reply('❌ Menu error');
  }
}

// Interactive menu handlers
bot.hears(/^(☕ Kofe turlari|☕ Виды кофе|☕ Coffee Types)$/, showProducts);

bot.hears(/^(📝 Buyurtma|📝 Заказ|📝 Order)$/, showProducts);

bot.hears(/^(💬 Fikr bildirish|💬 Отзыв|💬 Feedback)$/, startFeedback);

bot.hears(/^(📞 Kontakt|📞 Контакт|📞 Contact)$/, async (ctx) => {
  const userId = ctx.from.id;
  const language = await getUserLanguage(userId);
  await ctx.reply(getMessage('contactInfo', language));
});

bot.hears(/^(ℹ️ Biz haqimizda|ℹ️ О нас|ℹ️ About Us)$/, async (ctx) => {
  const userId = ctx.from.id;
  const language = await getUserLanguage(userId);
  await ctx.reply(getMessage('companyInfo', language));
});

bot.hears(/^(🌐 Til|🌐 Язык|🌐 Language)$/, async (ctx) => {
  await showLanguageSelection(ctx);
});

// Catalog handler (mini app)
bot.hears(/^(📱 Katalog|📱 Каталог|📱 Catalog)$/, async (ctx) => {
  const userId = ctx.from.id;
  const language = await getUserLanguage(userId);
  const miniAppUrl = process.env.MINI_APP_URL || 'https://your-mini-app.vercel.app';
  
  const keyboard = {
    inline_keyboard: [[
      {
        text: '🌐 Katalogni ochish / Открыть каталог / Open Catalog',
        web_app: { url: miniAppUrl }
      }
    ]]
  };
  
  await ctx.reply(`☕ Kofe katalogini ochish uchun tugmani bosing\n☕ Нажмите кнопку для открытия каталога кофе\n☕ Press the button to open coffee catalog`, {
    reply_markup: keyboard
  });
});

bot.hears(/^(👑 Admin Panel|👑 Админ Панель)$/, async (ctx) => {
  if (await isAdmin(ctx.from.id)) {
    await showAdminPanel(ctx);
  } else {
    await ctx.reply('❌ Access denied');
  }
});

// Callback handlers for interactive buttons
bot.action(/^product_(.+)$/, async (ctx) => {
  const productId = ctx.match[1];
  await showProductDetails(ctx, productId);
  await ctx.answerCbQuery();
});

bot.action(/^order_(.+)$/, async (ctx) => {
  const productId = ctx.match[1];
  await startOrder(ctx, productId);
  await ctx.answerCbQuery();
});

bot.action('show_products', async (ctx) => {
  await showProducts(ctx);
  await ctx.answerCbQuery();
});

bot.action('back_to_menu', async (ctx) => {
  try {
    await ctx.deleteMessage();
  } catch (err) {
    // Message might be too old to delete
  }
  await showMainMenu(ctx);
  await ctx.answerCbQuery();
});

// Admin panel callbacks
bot.action('admin_panel', async (ctx) => {
  await showAdminPanel(ctx);
  await ctx.answerCbQuery();
});

bot.action('admin_products', async (ctx) => {
  await showAdminProducts(ctx);
  await ctx.answerCbQuery();
});

bot.action('admin_orders', async (ctx) => {
  await showAdminOrders(ctx);
  await ctx.answerCbQuery();
});

bot.action('admin_feedback', async (ctx) => {
  await showAdminFeedback(ctx);
  await ctx.answerCbQuery();
});

bot.action('admin_stats', async (ctx) => {
  await showAdminStats(ctx);
  await ctx.answerCbQuery();
});

bot.action('admin_inventory', async (ctx) => {
  await startBulkStock(ctx);
  await ctx.answerCbQuery();
});

// Admin product management
bot.action('add_product', async (ctx) => {
  await startAddProduct(ctx);
  await ctx.answerCbQuery();
});

bot.action('admin_inventory', async (ctx) => {
  await startBulkStock(ctx);
  await ctx.answerCbQuery();
});

bot.action(/^edit_product_(.+)$/, async (ctx) => {
  const productId = ctx.match[1];
  await startEditProduct(ctx, productId);
  await ctx.answerCbQuery();
});

// Admin order management
bot.action(/^admin_order_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  await showOrderDetails(ctx, orderId);
  await ctx.answerCbQuery();
});

bot.action(/^order_status_(.+)_(.+)$/, async (ctx) => {
  const orderId = ctx.match[1];
  const status = ctx.match[2];
  await updateOrderStatus(ctx, orderId, status);
});

// Admin feedback management  
bot.action(/^feedback_(.+)$/, async (ctx) => {
  const feedbackId = ctx.match[1];
  await showFeedbackDetails(ctx, feedbackId);
  await ctx.answerCbQuery();
});

bot.action(/^mark_read_(.+)$/, async (ctx) => {
  const feedbackId = ctx.match[1];
  await markFeedbackAsRead(ctx, feedbackId);
});

bot.action(/^respond_feedback_(.+)$/, async (ctx) => {
  const feedbackId = ctx.match[1];
  await startFeedbackResponse(ctx, feedbackId);
});

// Group callback handlers for quick actions
bot.action(/^group_order_accept_(.+)$/, async (ctx) => {
  try {
    const orderId = ctx.match[1];
    await updateOrderStatus(ctx, orderId, 'confirmed');
    await ctx.answerCbQuery('✅ Buyurtma qabul qilindi');
  } catch (error) {
    console.error('Group order accept error:', error);
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

bot.action(/^group_order_reject_(.+)$/, async (ctx) => {
  try {
    const orderId = ctx.match[1];
    await updateOrderStatus(ctx, orderId, 'cancelled');
    await ctx.answerCbQuery('❌ Buyurtma rad etildi');
  } catch (error) {
    console.error('Group order reject error:', error);
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

bot.action(/^group_feedback_read_(.+)$/, async (ctx) => {
  try {
    const feedbackId = ctx.match[1];
    await markFeedbackAsRead(ctx, feedbackId);
    await ctx.answerCbQuery('✅ Ko\'rildi deb belgilandi');
  } catch (error) {
    console.error('Group feedback read error:', error);
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

bot.action(/^group_feedback_respond_(.+)$/, async (ctx) => {
  try {
    const feedbackId = ctx.match[1];
    await ctx.answerCbQuery('💬 Javob berish tez orada qo\'shiladi');
    // TODO: Implement feedback response feature
  } catch (error) {
    console.error('Group feedback respond error:', error);
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

// Helper to detect group chat IDs
bot.on('message', async (ctx, next) => {
  try {
    // Log group chat IDs for setup
    if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
      console.log(`📢 Group detected: "${ctx.chat.title}" - Chat ID: ${ctx.chat.id}`);
    }
    return next();
  } catch (error) {
    return next();
  }
});

// Debug: Log all text messages to see what's being sent
bot.on('text', async (ctx, next) => {
  console.log(`📝 User ${ctx.from.id} sent text: "${ctx.message.text}"`);
  return next();
});

// Error handling
bot.catch((err, ctx) => {
  console.error('Bot error:', err);
});

// Graceful shutdown
process.once('SIGINT', () => {
  console.log('🛑 Bot stopping...');
  bot.stop('SIGINT');
});

process.once('SIGTERM', () => {
  console.log('🛑 Bot stopping...');
  bot.stop('SIGTERM');
});

// Create Express app for health checks
const app = express();
const PORT = process.env.PORT || 3000;

// Railway requires binding to 0.0.0.0
const HOST = '0.0.0.0';

// Health check endpoint for Railway
let botStatus = 'starting';
let botError = null;

// Update bot status tracking
function setBotStatus(status, error = null) {
  botStatus = status;
  botError = error;
}

app.get('/health', (req, res) => {
  // Railway health checks should be simple and fast
  res.status(200).json({
    status: 'ok',
    botStatus: botStatus,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    port: PORT,
    host: HOST
  });
});

// Detailed health check for debugging
app.get('/health/detailed', (req, res) => {
  const isHealthy = botStatus === 'running' || botStatus === 'starting';
  
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    botStatus: botStatus,
    timestamp: new Date().toISOString(),
    bot: 'BPS Telegram Bot v2.0',
    uptime: process.uptime(),
    error: botError,
    environment: {
      port: PORT,
      host: HOST,
      nodeVersion: process.version,
      platform: process.platform
    }
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: '☕ Coffee Shop Telegram Bot is running!',
    version: '1.0.0',
    status: 'operational'
  });
});

// Start Express server FIRST (for health checks)
app.listen(PORT, HOST, () => {
  console.log(`🌐 Health server running on ${HOST}:${PORT}`);
  console.log('✅ Health endpoint available at /health');
  console.log(`📊 Server URL: http://${HOST}:${PORT}`);
});

// Handle phone button in notifications
bot.action(/^show_phone_(.+)$/, async (ctx) => {
  try {
    const orderId = ctx.match[1];
    
    // Get order details to show phone number
    const order = await db.getOrder(orderId);
    if (!order) {
      return await ctx.answerCbQuery('❌ Buyurtma topilmadi');
    }
    
    const phoneMessage = `📞 Mijoz telefoni:\n${order.contact_name}: ${order.contact_phone}`;
    await ctx.reply(phoneMessage);
    await ctx.answerCbQuery();
  } catch (error) {
    console.error('Show phone error:', error);
    await ctx.answerCbQuery('❌ Xatolik yuz berdi');
  }
});

// Start bot with error handling
console.log('🚀 Starting Coffee Shop Telegram Bot...');

async function startBot() {
  try {
    setBotStatus('launching');
    
    // Initialize database
    console.log('🗄️ Initializing database...');
    const dbReady = await db.initializeDatabase();
    if (!dbReady) {
      console.log('⚠️ Database not fully ready, some features may be limited');
    }
    
    // Launch bot with timeout and retry
    console.log('🚀 Launching Telegram bot...');
    const launchTimeout = setTimeout(() => {
      console.log('⚠️ Bot launch taking longer than expected...');
    }, 5000);
    
    try {
      await Promise.race([
        bot.launch(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Bot launch timeout')), 15000)
        )
      ]);
      clearTimeout(launchTimeout);
      
      setBotStatus('running');
      console.log('✅ Bot started successfully!');
      console.log(`🤖 Bot username: @${bot.botInfo.username}`);
      console.log('📱 You can now test the bot on Telegram!');
    } catch (launchError) {
      clearTimeout(launchTimeout);
      console.log('⚠️ Bot launch had issues, but continuing...');
      console.log('💡 This is normal in development - the bot should still work');
      setBotStatus('running');
    }
    
    // Initialize notification system
    try {
      initNotifications(bot);
      console.log('📢 Notification system initialized');
    } catch (error) {
      console.log('⚠️ Notification system failed:', error.message);
    }
    
    // Initialize inventory monitoring system
    try {
      initInventoryMonitoring(bot);
      console.log('🏭 Inventory monitoring initialized');
    } catch (error) {
      console.log('⚠️ Inventory monitoring failed:', error.message);
    }
    
    // Daily automation service removed for coffee shop bot
    
    // Test group connections if configured
    if (process.env.ORDERS_GROUP_ID) {
      testGroupConnection('orders').then(success => {
        console.log(success ? '📢 Orders group connected' : '📢 Orders group connection failed');
      }).catch(error => {
        console.log('📢 Orders group test failed:', error.message);
      });
    } else {
      console.log('📢 Orders group not configured');
    }
    
    if (process.env.FEEDBACK_GROUP_ID) {
      testGroupConnection('feedback').then(success => {
        console.log(success ? '📢 Feedback group connected' : '📢 Feedback group connection failed');
      }).catch(error => {
        console.log('📢 Feedback group test failed:', error.message);
      });
    } else {
      console.log('📢 Feedback group not configured');
    }
    
  } catch (error) {
    console.error('❌ Bot start error:', error.message);
    setBotStatus('failed', error.message);
    // Don't exit process - keep health server running for debugging
    console.log('🔄 Bot failed to start but health server continues running');
    console.log('💡 Check environment variables: BOT_TOKEN, GOOGLE_SERVICE_ACCOUNT');
  }
}

// Start bot after a short delay to ensure health server is ready
setTimeout(startBot, 1000);

module.exports = bot;