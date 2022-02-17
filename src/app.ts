import { Context, Telegraf, Markup, Telegram } from 'telegraf';
import { MessageEntity, Update } from 'typegram';
import { lookup } from './dictionary';

const token: string = process.env.BOT_TOKEN as string;
const telegram: Telegram = new Telegram(token);
const bot: Telegraf<Context<Update>> = new Telegraf(token as string, { handlerTimeout: 9_000_000 });
const chatId: string = process.env.CHAT_ID as string;

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
bot.on('text', async (ctx) => {
    let result: string = '';
    const text = ctx.message.text.replace(/\//, '').replace(/\\_/g, ' ');
    try {
        result = await lookup(text) || 'not found :(';
    } catch (err) {
        console.error(err);
        result = 'error :(';
    }
    ctx.reply(result, {
        parse_mode: 'MarkdownV2',
        // entities: [{
        //   type: 'bot_command',
        //   offset: 0,
        //   length: 5
        // }]
    });
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));