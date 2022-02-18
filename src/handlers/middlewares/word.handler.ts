import { Middleware, Context } from 'telegraf';
import { getPicture } from '../../sources/picture';
import { MatchedContext } from '../../types';
import { IDef, Word } from '../../models/model';
import { getText } from '../../sources/text';

const wordResolver: Middleware<MatchedContext<Context, "text">> = async (ctx, next) => {
    let result: IDef[];
    let error: string;
    const text = ctx.message.text
        .replace(/\//, '')
        .replace(/\\_/g, ' ');

    try {
        result = await getText(text);
        if (!result) {
            error = 'not found :\\(';
        }
    } catch (err) {
        console.error(err);
        error = 'error :(';
    }
    const messageID = ctx.message.message_id;
    const picture = await getPicture(text);

    let caption;
    if (result) {
        const word = new Word(text, result, picture?.medium);
        caption = word.getTranslations();
    } else {
        caption = error;
    }

    if (picture?.isFound()) {
        ctx.replyWithPhoto(picture.medium || '', {
            caption,
            parse_mode: 'MarkdownV2',
            reply_to_message_id: messageID
        });
    } else {
        ctx.reply(caption, {
            parse_mode: 'MarkdownV2'
        });
    }

    return next();
};

export default wordResolver;