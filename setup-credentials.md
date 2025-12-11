# Google Sheets Credentials Setup Guide

## Quick Setup Steps:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/

2. **Enable Google Sheets API**:
   - Navigate to "APIs & Services" → "Library"
   - Search for "Google Sheets API" 
   - Click "Enable"

3. **Create Service Account**:
   - Go to "IAM & Admin" → "Service Accounts"
   - Click "Create Service Account"
   - Name: `telegram-bot-sheets`
   - Click "Create and Continue"

4. **Download Credentials**:
   - After creating, click on the service account
   - Go to "Keys" tab → "Add Key" → "Create New Key"
   - Choose "JSON" format
   - Download the file

5. **Share Google Sheet**:
   - Open your Google Sheet: https://docs.google.com/spreadsheets/d/1Qogaq381KUC0iLUXEpfeurgSgCdq-rd04cHlhKn3Ejs
   - Click "Share" button
   - Add the service account email (from the JSON file)
   - Give "Editor" permissions

6. **Update Credentials**:
   Replace the content in `/Users/fayzullolutpillayev/bps-telegrambot/google-credentials.json` with your new JSON file content.

## Test Command:
After setup, run:
```bash
node -e "
const SheetsService = require('./src/services/google-sheets');
SheetsService.testConnection().then(result => {
  console.log('Test result:', result ? '✅ SUCCESS' : '❌ FAILED');
});
"
```

## Current System Status:
- ✅ Phone number collection handler: Ready
- ✅ Google Sheets service: Ready (needs valid credentials)  
- ✅ PDF generation service: Ready
- ✅ Multilingual support: Complete
- ✅ Bot integration: Complete
- ❌ Credentials: Need to be set up

The contact report system is fully implemented and will work immediately once you provide valid Google service account credentials.