import { lookup } from "./yandex";

export async function getText(text: string) {
    return await lookup(text);
}