const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUtjbFFJMDBPdjdvL0gxTmROczgrVjNhL05IVUJGbjI4T3QybDlkUHJrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmowK08yeXFSNHRpVlhxZXFnSWJPU01jOXhQdTQ3SDdpakJXTUhSengxQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3QzM0K205WG55R2dBTEEwckF3VUVBM3VsQ29FM3A4UnYzZkdnMkQ0WDNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0RVVKdmhmNmwzajNjWitCV3VPa2p0Qml5bENSWHFOS0JEa0d5dTFYNGtZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVESmNqNytwSEk1MmQ4QmVKbCttbi9JLzRVakJJQ1l5SVlFMEVhejlpM3c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImljMTNHUDhQNlpCZlR0eWNJcWZ2YjVSZWh5WnFldi9SUk53WGRNdXRLd2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU9pcnVMc0tBakZ5YmdTbExRSnBuV3RoWG5UMkhTQ1RlYjJ1aXluVDZHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDBvTmtKbjhrY1l5Q0JzcUZSV3B2T3hyQkFsZVdVN25FNnFQbUdwQ0MzQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNJMXptMVpoZEx4c04vS2pwdm96ZUprVzNVVGlkSml3ZjhEMDFSeWVkRU8xY2xUSUliazVDUFJhV0prUEczRVo1OGZUckQ5WjdYSzhMSXUwbVhKaWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiIrNmpqdk50U1I2Y1c2SVI2M1pzRk42bUVZTllSSUlxMWQ4eHorWVBteTdvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJBY09DQnhwZFI3SzFDN3hTTUg2d01BIiwicGhvbmVJZCI6ImE5MDE4YzQ3LWM2MjUtNDk4NS1iMTE1LWQyOGZmMDZjMDI1NSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2dWJTWC9hdFAraWdNRWhkalRaWitoRjcvdVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYjY3T1hnbnhmb3Zjck03ZmI1REhIc2VyWjlvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjlQUDNBVlI1IiwibWUiOnsiaWQiOiI5MTkzMzI0NDYwMzc6MjlAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiUklVIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLKzA4UElFRUsyOGpMVUdHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5K0FaeG1qelNzUlZZcUVQY0J2a0d1c3gwU21TcldBckVHbzY4ckdRd3owPSIsImFjY291bnRTaWduYXR1cmUiOiJRTGFlYmdya3I0SEZZb0I5MWQwTFg2Q1czZHQvSlBPTHpyVjV1aUlzZnZaU0U4QXNYWVJzVkZQK2dlbzJLaFZmb1hxWUtVZ0FzTnpQNTlVNEtiamRBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiblNqbC94M2kyL3hWb0tGbzI0RTY2L3dHVXJUVis0ZjY1dnh5a052eWxmandwSFpqQ09kU0poc3RtOFgrc2NpNHdERytld21PczEvSE5BRkV0Q3VGaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5MTkzMzI0NDYwMzc6MjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY3ZnR2NabzgwckVWV0toRDNBYjVCcnJNZEVwa3ExZ0t4QnFPdkt4a01NOSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTk2NjEzNywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFHb0MifQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || " 𝑅𝛪𝐽𝑈-𝛸𝛭",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "917364934516",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || ' 𝑅𝛪𝐽𝑈-𝛸𝛭𝐷',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/789e61ce1b89c2c45afd2.jpge4fd1e8ce0fe6bb2253.jpg,https://telegra.ph/file/19df783b5751341a78780.jpg,https://telegra.ph/file/56dfb94e0f8b32fab33a7.jpg,https://telegra.ph/file/fe8a25fb17af3926e6048.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
