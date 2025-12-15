// Multilingual messages for BPS Telegram Bot
// Simple structure with room for expansion

const messages = {
  // Welcome and start messages
  welcome: {
    uz: '☕ Assalomu aleykum!\n\nPappa Rich Uzbekistan - kofe distribyutor kompaniyasining rasmiy botiga xush kelibsiz!\n\n3-in-1 kofe mahsulotlarimiz bilan tanishing.\n\nTilni tanlang:',
    ru: '☕ Здравствуйте!\n\nДобро пожаловать в официальный бот компании Pappa Rich Uzbekistan - дистрибьютора кофе!\n\nОзнакомьтесь с нашими продуктами кофе 3-в-1.\n\nВыберите язык:',
    en: '☕ Hello!\n\nWelcome to the official bot of Pappa Rich Uzbekistan - coffee distribution company!\n\nDiscover our 3-in-1 coffee products.\n\nChoose language:'
  },

  languageSet: {
    uz: '✅ Til o\'rnatildi: O\'zbek tili',
    ru: '✅ Язык установлен: Русский',
    en: '✅ Language set: English'
  },

  miniAppWelcome: {
    uz: '📱 Mini App\'dan xush kelibsiz!\n\nSiz tanlagan 3-in-1 kofe uchun buyurtma berasiz.',
    ru: '📱 Добро пожаловать из Mini App!\n\nВы заказываете выбранный кофе 3-в-1.',
    en: '📱 Welcome from Mini App!\n\nYou are ordering the selected 3-in-1 coffee.'
  },

  welcomeBack: {
    uz: '🏠 Botga qaytganingiz uchun rahmat!\n\nQuyida 3-in-1 kofe katalogi:',
    ru: '🏠 Спасибо, что вернулись в бот!\n\nВот каталог кофе 3-в-1:',
    en: '🏠 Thanks for returning to the bot!\n\nHere is the 3-in-1 coffee catalog:'
  },

  // Main menu buttons
  mainMenu: {
    webApp: {
      uz: '3-in-1 Kofe Katalogi',
      ru: 'Каталог Кофе 3-в-1',
      en: '3-in-1 Coffee Catalog'
    },
    products: {
      uz: '☕ 3-in-1 Kofe',
      ru: '☕ Кофе 3-в-1',
      en: '☕ 3-in-1 Coffee'
    },
    order: {
      uz: '📝 Buyurtma berish',
      ru: '📝 Сделать заказ',
      en: '📝 Place Order'
    },
    catalog: {
      uz: '📱 Mahsulotlar',
      ru: '📱 Продукция',
      en: '📱 Products'
    },
    feedback: {
      uz: '💬 Fikr bildirish',
      ru: '💬 Отзыв',
      en: '💬 Feedback'
    },
    contact: {
      uz: '📞 Kontakt',
      ru: '📞 Контакт',
      en: '📞 Contact'
    },
    info: {
      uz: 'ℹ️ Ma\'lumot',
      ru: 'ℹ️ Информация',
      en: 'ℹ️ Information'
    },
    language: {
      uz: '🌐 Til',
      ru: '🌐 Язык',
      en: '🌐 Language'
    },
    adminPanel: {
      uz: '👑 Admin Panel',
      ru: '👑 Админ Панель',
      en: '👑 Admin Panel'
    }
  },

  // Language selection
  languageButtons: {
    uzbek: '🇺🇿 O\'zbek tili',
    russian: '🇷🇺 Русский язык',
    english: '🇺🇸 English'
  },

  // Products
  noProducts: {
    uz: '☕ Hozircha 3-in-1 kofe mahsulotlari mavjud emas.',
    ru: '☕ Продукция кофе 3-в-1 пока недоступна.',
    en: '☕ No 3-in-1 coffee products available at the moment.'
  },

  productList: {
    uz: '☕ 3-IN-1 KOFE MAHSULOTLARI',
    ru: '☕ ПРОДУКЦИЯ КОФЕ 3-В-1',
    en: '☕ 3-IN-1 COFFEE PRODUCTS'
  },

  // Orders
  orderStart: {
    uz: 'Buyurtma berish uchun kofe turini tanlang yoki nomini yozing:',
    ru: 'Для заказа выберите вид кофе или напишите его название:',
    en: 'To place an order, select a coffee type or write its name:'
  },

  // Common responses
  error: {
    uz: '❌ Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.',
    ru: '❌ Произошла ошибка. Пожалуйста, попробуйте снова.',
    en: '❌ An error occurred. Please try again.'
  },

  cancel: {
    uz: '❌ Bekor qilindi',
    ru: '❌ Отменено',
    en: '❌ Cancelled'
  },

  // Contact info
  contactInfo: {
    uz: `☕ KOFE DO'KONI\n\n` +
         `📱 Telefon: +998XX XXX XX XX\n` +
         `📱 Telefon 2: +998XX XXX XX XX\n` +
         `📍 Manzil: Toshkent shahri\n` +
         `🕐 Ish vaqti: Har kuni 08:00 - 22:00\n` +
         `📧 Email: info@coffeeshop.uz\n` +
         `☕ Eng mazali kofe bizda!`,
    ru: `☕ КОФЕЙНЯ\n\n` +
         `📱 Телефон: +998XX XXX XX XX\n` +
         `📱 Телефон 2: +998XX XXX XX XX\n` +
         `📍 Адрес: г. Ташкент\n` +
         `🕐 Рабочее время: Ежедневно 08:00 - 22:00\n` +
         `📧 Email: info@coffeeshop.uz\n` +
         `☕ Самый вкусный кофе у нас!`,
    en: `☕ COFFEE SHOP\n\n` +
         `📱 Phone: +998XX XXX XX XX\n` +
         `📱 Phone 2: +998XX XXX XX XX\n` +
         `📍 Address: Tashkent\n` +
         `🕐 Working hours: Daily 08:00 - 22:00\n` +
         `📧 Email: info@coffeeshop.uz\n` +
         `☕ The most delicious coffee is here!`
  },

  // Company info
  companyInfo: {
    uz: `☕ KOFE DO'KONI HAQIDA\n\n` +
         `📋 Biz yuqori sifatli kofe sotuvchisimiz:\n\n` +
         `☕ Turli xil kofe turlari\n` +
         `🫘 Arabika va Robusta\n` +
         `🌟 Maxsus aralashmalar\n` +
         `⚡ Eriydigan kofe\n` +
         `🥄 Kofe aksessuarlari\n\n` +
         `⭐ Bizning afzalliklarimiz:\n` +
         `✅ 100% sifatli kofe donalari\n` +
         `✅ Tez yetkazib berish\n` +
         `✅ Hamyonbop narxlar\n` +
         `✅ Katta hajmdagi buyurtmalar\n` +
         `✅ Professional xizmat\n\n` +
         `☕ Mazali kofe buyurtma uchun bog'laning!`,
    ru: `☕ О НАШЕЙ КОФЕЙНЕ\n\n` +
         `📋 Мы продавцы высококачественного кофе:\n\n` +
         `☕ Различные виды кофе\n` +
         `🫘 Арабика и робуста\n` +
         `🌟 Специальные смеси\n` +
         `⚡ Растворимый кофе\n` +
         `🥄 Кофейные аксессуары\n\n` +
         `⭐ Наши преимущества:\n` +
         `✅ 100% качественные кофейные зерна\n` +
         `✅ Быстрая доставка\n` +
         `✅ Доступные цены\n` +
         `✅ Крупные объемы заказов\n` +
         `✅ Профессиональное обслуживание\n\n` +
         `☕ Свяжитесь для заказа вкусного кофе!`,
    en: `☕ ABOUT OUR COFFEE SHOP\n\n` +
         `📋 We are sellers of high-quality coffee:\n\n` +
         `☕ Various types of coffee\n` +
         `🫘 Arabica and Robusta\n` +
         `🌟 Special blends\n` +
         `⚡ Instant coffee\n` +
         `🥄 Coffee accessories\n\n` +
         `⭐ Our advantages:\n` +
         `✅ 100% quality coffee beans\n` +
         `✅ Fast delivery\n` +
         `✅ Affordable prices\n` +
         `✅ Large volume orders\n` +
         `✅ Professional service\n\n` +
         `☕ Contact us to order delicious coffee!`
  },


  // Errors
  errors: {
    general: {
      uz: '❌ Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.',
      ru: '❌ Произошла ошибка. Пожалуйста, попробуйте снова.',
      en: '❌ An error occurred. Please try again.'
    }
  },

  // Navigation
  back: {
    uz: '⬅️ Orqaga',
    ru: '⬅️ Назад',
    en: '⬅️ Back'
  },

  // Main menu labels  
  mainMenuTitle: {
    uz: '🏠 Pappa Rich Uzbekistan\n\n3-in-1 kofe distribyutori',
    ru: '🏠 Pappa Rich Uzbekistan\n\nДистрибьютор кофе 3-в-1',
    en: '🏠 Pappa Rich Uzbekistan\n\n3-in-1 Coffee Distributor'
  },

  order: {
    uz: '📝 Buyurtma',
    ru: '📝 Заказ', 
    en: '📝 Order'
  },

  myOrders: {
    uz: '📋 Mening buyurtmalarim',
    ru: '📋 Мои заказы',
    en: '📋 My Orders'
  },

  about: {
    uz: 'ℹ️ Biz haqimizda',
    ru: 'ℹ️ О нас',
    en: 'ℹ️ About Us'
  },

  contact: {
    uz: '📞 Kontakt',
    ru: '📞 Контакт',
    en: '📞 Contact'
  },

  language: {
    uz: '🌐 Til',
    ru: '🌐 Язык',
    en: '🌐 Language'
  },

};

// Helper function to get message by key and language
function getMessage(key, language = 'uz', ...args) {
  try {
    const keys = key.split('.');
    let message = messages;
    
    for (const k of keys) {
      message = message[k];
      if (!message) break;
    }
    
    if (!message) {
      console.warn(`Message not found: ${key}`);
      return `Missing: ${key}`;
    }
    
    let text = message[language] || message.uz || message;
    
    // Simple placeholder replacement {0}, {1}, etc.
    if (args.length > 0 && typeof text === 'string') {
      args.forEach((arg, index) => {
        text = text.replace(new RegExp(`\\{${index}\\}`, 'g'), arg);
      });
    }
    
    return text;
  } catch (error) {
    console.error(`Error getting message ${key}:`, error);
    return `Error: ${key}`;
  }
}

module.exports = {
  messages,
  getMessage
};