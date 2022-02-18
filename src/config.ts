export const config: BotConfig = {
    token: process.env.BOT_TOKEN as string,
    logger: console
};

export interface Logger {
    log(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
}

export interface BotConfig {
    token: string;
    logger: Logger;
}