require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const userCreater = require('./utils/userCreater');
const quotesGenerator = require('./utils/quotesGenarator');

const TelegramApi = require('node-telegram-bot-api');
const TOKEN = process.env.TOKEN;
const DB_URL = process.env.DB_URL;

const bot = new TelegramApi(TOKEN, { polling: true });

const start = () => {
    bot.setMyCommands([
        {
            command: '/start',
            description: 'Поехали'
        }
    ]);

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const user = await userCreater(msg);

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/15d/540/15d540a6-a2f2-3dec-a3d4-5f8bc5df4110/192/1.webp');
            await bot.sendMessage(chatId, 'Отправь мне любое сообщение, а я в ответ отправлю тебе итересную цитату');
        }

        quotesGenerator(async (error, response) => {
           if (error) {
               await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/a6f/1ae/a6f1ae15-7c57-3212-8269-f1a0231ad8c2/192/5.webp');
               await bot.sendMessage(chatId, 'Что-то сломалось и мы это обязательно починим. Наверное');
           } else {
               const quote = response.quoteText + ' ' + response.quoteAuthor;
               await bot.sendMessage(chatId, quote);
               user.quotesCount++;
               await user.save();
           }
        });
    });

};

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log('Connecting with mongoose');
        start();
    })
    .catch(err => console.log(err));