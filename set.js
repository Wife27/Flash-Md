const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVBvTFRwK2Y3RXhLeVFNdldCMHhQVVhQaVFNTDgyU1QvQ2J3MExocFVXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVcvei9QMEs1aVNBVVBJdFdrVEJ6TGl0bHdlV0Nyamg5VnlzckxndldTRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLTTRsNTBiT05JZkhGRkludkRzVWNLRXp2Q29xY3UzcXJCUWRXU20ySmtZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRajAxM0IyQmtoRmgvK2c4T0ZhMWk1dXBmMHROQkZDaVMwQmVoRVp2VEVBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtLR1Y2VFFCOHQwN1RxTHc0RjNQcUhtbnhsNUs2WU13RnlTcTFqSjNaVnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdyVVYrYkR5bjZRQklmZWYxdVh3U0JWTG1oanoxTXo4eVh0NmVuczE1MUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEozT2dzdEo5S1lnZ1B1amlHVVhUYzRKYVM1ck9ibGVjRnAyWnNDVVkxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVBxL0EwZmFqdDlvaUNCdVZNdWk2a09ub21HWHpyQlNuc1J2VHpBQUlRTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFrZXpwZWVPUDJMTEtYekVaeWExNTdLMy9BTlpoQ3p3cVF5OWM0OFNWMlpVOU1ZbVMwekkxWXRxOHVSMVRiRDdvQlJSMUlIeUowM2h5dzBEdFUvYWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUsImFkdlNlY3JldEtleSI6ImJXcGdLcWZqZXJVdVNzcllOUGkxc0NPUGxhMDhNdlMrb3ZieVNHeTE0c0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMTgyOTQ3OTc0OThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQTgzN0RBMDZBNTUxRUY1RUE4NDhCMzNDQjlGNzJGNUYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczMzUzMDQyN31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiWG9rTkhkM3dRQmlZZGcwLTlDWlVoZyIsInBob25lSWQiOiI0ZTM4Y2E3YS01M2E3LTQzOWMtOTZiYS1mYWI5ODBkY2VhNGEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicThobkJ3b2tsUEhRYWhoTkpWR0ExZFl2RUM4PSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVZUWJ2ankwL1VTVjFHWXd0eXg0VTFkRDA3cz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJMUExCTlpDUyIsIm1lIjp7ImlkIjoiMTgyOTQ3OTc0OTg6ODlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tmYnA2VURFS21tenJvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImVVNDVxaXlOVDhQNXRtNjdJMW9UQ2FUZ0ZmRUtzeUNUWFRzeTFVYXBDakE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlhDbE15R1c4MDJ3dkw4SHh3SVRhSFJGU0llNXlEUEZ3eFNQZkF1amtEbW96ZXpOMzFlT1pPZWlqU1gybGZlRklRRHc3OUN1cmhzcGNxRHNEY3BHWkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXTTRnVGNldEtoZVJBb0UrVElscUFRNXgreGhTaTgrRjFMckdiL2E1NHh5aWc2aThPUk40M0pkY1d4eXVhaTlVbDRhZGQ5dW0vNVhtY3FJdHdBV2JnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjE4Mjk0Nzk3NDk4Ojg5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhsT09hb3NqVS9EK2JadXV5TmFFd21rNEJYeENyTWdrMTA3TXRWR3FRb3cifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzM1MzA0MjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRFBDIn0=;;;=>',
    PREFIXES: (process.env.PREFIX || '').split('-').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "18294797498",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
