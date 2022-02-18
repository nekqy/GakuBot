import dotenv from 'dotenv';
dotenv.config();

import { Bot } from './bot';
import { config } from './config';
const bot = Bot(config);

bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '! enter some word.');
});
bot.help((ctx) => {
    ctx.reply('Send /start to receive a greeting');
    ctx.reply('Send some word to receive translation');
    //ctx.reply('Send /keyboard to receive a message with a keyboard');
    //ctx.reply('Send /quit to stop the bot');
});
// bot.command('quit', (ctx) => {
//   // Explicit usage
//   ctx.telegram.leaveChat(ctx.message.chat.id);
// // Context shortcut
//   ctx.leaveChat();
// });

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));