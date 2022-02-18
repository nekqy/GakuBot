import { Context, Telegraf } from 'telegraf';

import middlewares from './handlers/middlewares';
import commands from './handlers/commands';
import inline from './handlers/inline.handler';

import { BotConfig } from './config';

export function Bot({ token }: BotConfig) {
    const bot: Telegraf<Context> = new Telegraf(token as string, {
        handlerTimeout: 9_000_000
    });

    bot.use(middlewares);
    bot.use(commands);
    bot.use(inline);

    bot.catch((err: any, ctx: Context) => {
        console.error(err);
    });

    return bot;
}