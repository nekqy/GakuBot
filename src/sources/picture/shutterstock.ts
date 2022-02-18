const sstk = require("shutterstock-api");
sstk.setAccessToken(process.env.SHUTTERSTOCK_API_TOKEN);

const imagesApi = new sstk.ImagesApi();

async function get1(searchString: string) {
    const queryParams = {
        "query": searchString,
        "image_type": "photo",
        "orientation": "vertical",
        "people_number": 3
    };

    let data;
    try {
        data = await imagesApi.searchImages(queryParams);
        console.log(data);
        return data.data[0]?.assets.preview_1000.url;
    } catch (error) {
        console.error(error);
    };
}