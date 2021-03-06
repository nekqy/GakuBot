import { stringify } from 'qs';
import axios from 'axios';
import type { IDef } from '../../models/model';

export async function lookup(text: string): Promise<IDef[]> {
    const promise: Promise<IDef[]> = new Promise((resolve, reject) => {
        axios.post('https://dictionary.yandex.net/api/v1/dicservice.json/lookup', stringify({
            key: 'dict.1.1.20220213T013257Z.534dc33100d161fd.8ee4e9c97a22e6cd1d967931d80544f7cf854e76',
            lang: 'en-ru',
            text,
            flags:
                //0x0001 + // FAMILY - Apply the family search filter.
                0x0004 + // MORPHO - Enable searching by word form.
                0x0008 // POS_FILTER - Enable a filter that requires matching parts of speech for the search word and translation.
        }))
            .then((res: { data: { def: IDef[] } }) => {
                resolve(res.data.def);
            })
            .catch((err: { message: string }) => {
                reject(err);
            });
    });
    return promise;
}