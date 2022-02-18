import { Composer, Context } from 'telegraf';
import { InlineQueryResultPhoto, InlineQueryResultArticle, InputTextMessageContent } from 'typegram';
import { lookup } from '../sources/text/yandex';
import { getPicture } from '../sources/picture';

const inline = new Composer<Context>();

inline.on('inline_query', async function (ctx) {
    const code = ctx.inlineQuery?.query;

    if (!code) {
        return ctx.answerInlineQuery([]);
    }

    let result;
    try {
        result = await lookup(code) || 'not found :\\(';
    } catch (err) {
        console.error(err);
        result = 'error :(';
    }
    const picture = await getPicture(code);

    if (picture?.isFound()) {
        return ctx.answerInlineQuery([
            {
                id: '1',
                type: 'photo',
                title: code,
                description: 'translate this',
                photo_url: picture.medium,
                thumb_url: picture.tiny,
                caption: result,
                parse_mode: 'MarkdownV2'
            } as InlineQueryResultPhoto
        ]);
    } else {
        return ctx.answerInlineQuery([
            {
                id: '1',
                type: 'article',
                title: code,
                description: 'translate this',
                thumb_url: picture?.tiny,
                input_message_content: {
                    message_text: result,
                    parse_mode: 'MarkdownV2'
                } as InputTextMessageContent
            } as InlineQueryResultArticle
        ]);
    }
});

export default inline;