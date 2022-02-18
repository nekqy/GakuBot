import { createClient, PhotosWithTotalResults, ErrorResponse } from 'pexels';

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';
const client = createClient(PEXELS_API_KEY);

function randomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function getRandomImage(searchString: string) {
    try {
        const query = searchString;
        const res = await client.photos.search({ query, per_page: 10 }) as PhotosWithTotalResults;
        const image = res.photos[randomInteger(0, (res.photos.length - 1))];
        return image;
    } catch (error) {
        const err = error as ErrorResponse;
        console.error(err.error);
    }
}

export async function get(searchString: string) {
    try {
        const image = await getRandomImage(searchString);
        return {
            medium: image?.src.medium,
            tiny: image?.src.tiny,
            isFound: () => { return image?.src.medium && image?.src.tiny; }
        }
    } catch (error) {
        console.log('error', error);
    }
}