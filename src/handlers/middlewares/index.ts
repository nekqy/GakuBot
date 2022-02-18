import { Composer, Context } from 'telegraf';
import wordResolver from './word.handler';

const middlewares = new Composer<Context>();

middlewares.on('text', wordResolver);

export default middlewares;