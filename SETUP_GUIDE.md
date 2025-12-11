# Company Telegram Bot - Setup Guide

## Quick Setup Checklist

### 1. **Telegram Bot Setup**
- [ ] Create new bot via @BotFather
- [ ] Get bot token
- [ ] Set bot commands: `/start`, `/help`

### 2. **Google Sheets Setup**
- [ ] Create new Google Sheets document
- [ ] Create sheet named "📚 Справочники" (or update in code)
- [ ] Set up columns:
  - Column Q: Client names
  - Column R: Phone numbers (+country_code_number format)
- [ ] Create sheet named "ТГ бот (не трогать)" for report data
- [ ] Create Google Service Account
- [ ] Share sheets with service account email

### 3. **Database Setup (Supabase)**
- [ ] Create new Supabase project
- [ ] Run the SQL from `database/create_user_phones_table.sql`
- [ ] Get Supabase URL and anon key

### 4. **Environment Configuration**
- [ ] Copy `.env.example` to `.env`
- [ ] Fill in all required environment variables:
  ```bash
  BOT_TOKEN=your_telegram_bot_token
  GOOGLE_SHEETS_ID=your_google_sheets_id
  GOOGLE_SERVICE_ACCOUNT_EMAIL=service-account@project.iam.gserviceaccount.com
  GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
  SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_ANON_KEY=your_supabase_anon_key
  PORT=3000
  ```

### 5. **Customization**
- [ ] Update company name in `src/config/messages.js`
- [ ] Modify contact information and company details
- [ ] Update phone number format if different country
- [ ] Customize PDF report template in `src/services/pdf-generator.js`

### 6. **Testing**
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Test phone registration
- [ ] Test report generation
- [ ] Verify daily automation timing

### 7. **Deployment**
- [ ] Initialize git repository
- [ ] Push to GitHub/GitLab
- [ ] Deploy to Railway/Heroku/similar
- [ ] Set environment variables in deployment platform
- [ ] Test production deployment

## Key Files to Modify for Your Company

### `src/config/messages.js`
Update all company-specific text:
- `companyInfo` - Company description
- `contactInfo` - Contact details
- Button text and menu items
- Error messages and notifications

### `src/services/phone-registry.js`
If your country uses different phone format:
- Update `normalizePhoneNumber()` function
- Modify regex patterns for phone validation

### `src/services/daily-automation.js`
Change report schedule:
- Modify cron pattern: `'50 23 * * *'` (currently 11:50 PM)
- Update timezone: `timezone: "Asia/Tashkent"`

### `src/services/pdf-generator.js`
Customize PDF reports:
- Company logo and branding
- Report header/footer
- Data formatting and layout

## Common Configuration Issues

### Phone Number Format
- Default format: `+998901234567` (Uzbekistan)
- For other countries, update the regex in `normalizePhoneNumber()`
- Example for US: `+1234567890` or `(123) 456-7890`

### Google Sheets Permissions
- Service account must have "Editor" access to sheets
- Check sheet names match exactly (case-sensitive)
- Verify data starts from row 2 in column R

### Database Connection
- Supabase URL format: `https://project-id.supabase.co`
- Use "anon" key, not "service_role" key
- Enable Row Level Security (RLS) if needed

### Timezone Configuration
Common timezones:
- `"America/New_York"`
- `"Europe/London"`
- `"Asia/Dubai"`
- `"Asia/Tashkent"` (current)

## Testing Your Setup

### 1. Phone Registration Test
```
1. Start bot with /start
2. Click "📱 Phone Registration" button
3. Share contact
4. Should receive confirmation message
```

### 2. Report Generation Test
```
1. Click "📊 Report" button
2. Select "Today" or custom date
3. Should receive PDF report
```

### 3. Daily Automation Test
```
1. Temporarily change cron to run in next minute
2. Check logs for "📊 Sending daily reports"
3. Verify registered users receive reports
4. Reset cron to desired time
```

## Support and Maintenance

### Monitoring
- Check Railway/Heroku logs regularly
- Monitor Google Sheets API quota usage
- Track database growth in Supabase

### Updates
- Keep dependencies updated: `npm audit`
- Monitor Telegram Bot API changes
- Backup database regularly

### Scaling
- Consider Redis for session management at scale
- Implement request queuing for high volume
- Monitor memory usage with large user base

---

**Need help?** Check the main documentation in `BPS_BOT_DOCUMENTATION.md` for detailed technical information.