import { get as get2 } from './pexels';

export async function getPicture(searchString: string) {
    // 100/hour
    // return await get1(searchString);

    // 200/hour and 20,000/month
    return await get2(searchString);

    // ???
    // return await get3(searchString);
}