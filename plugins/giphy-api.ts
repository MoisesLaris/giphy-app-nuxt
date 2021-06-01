import { TrendingOptions } from "../models/trending-options.interface"

export default ({ $axios }, inject) => {
    inject('getTrendingGifs', async (params: TrendingOptions) => {
        return await $axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=a8OMRUP4eiqbeYG0E599hEFqMXZZBQxP&limit=${params.limit}&rating=${params.rating}`);
    });


    inject('getGifById', async (id: string) => {
        return await $axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=a8OMRUP4eiqbeYG0E599hEFqMXZZBQxP`);
    });
    // ... and so on
}