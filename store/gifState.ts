import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import $axios, { AxiosResponse } from 'axios';
import { Pagination, TrendingGif } from '../models/trending-gif.interface';
import { Gif } from '../models/gif.interface';
import { Rating } from '../models/rating.enum';
import { GifByID } from '../models/gif-by-id.interface';

@Module({})
export default class GifState extends VuexModule {
  //Variable use to handle search bar state
  showSearchBar: boolean = false;

  //Variables to handle array of gifs searched
  gifs: Gif[] = [];
  total: number = 0;
  text_searched: string = "";

  //Variable to stop making calls when all gifs had been loaded
  canAddMoreGifs: boolean = true;

  //Variable to switch between trending and search
  showTrending: boolean = true;

  //Variable to handle gif by id
  gif!: Gif;

  @Mutation
  setStatusBar(showSearchBar: boolean) {
    this.showSearchBar = showSearchBar;
  }
  //Mutation used to change the state of trending and search
  @Mutation
  setTrendingStatus(show: boolean) {
    this.showTrending = show;
  }

  @Mutation
  addMoreGifs(value: boolean) {
    this.canAddMoreGifs = value;
  }

  //Mutation used to reset array of gifs
  @Mutation
  resetGifArray(){
    this.gifs = [];
    this.canAddMoreGifs = true;
  }

  //Mutation used to reset gifs 
  @Mutation
  saveAndResetGifs(data: { gifs: Gif[], total: number }) {
    this.gifs = data.gifs;
    this.total = data.total;
  }

  //Mutation used to add gifs
  @Mutation
  addGifs(data: {gifs: Gif[], pagination: Pagination}) {
    let gifs = data.gifs;
    this.gifs.push(...gifs);
    this.total = data.pagination.total_count;
    if(data.pagination.count == 0){
      this.canAddMoreGifs = false;
    }
  }

  @Mutation
  saveGifById(gif: Gif) {
    this.gif = gif;
  }

  @Mutation
  setTextSearched(text: string){
    this.text_searched = text;
  }


  @Action({ rawError: true })
  async trendingGifs(data: { limit: any, rating: Rating }) {
    let axioResponse: AxiosResponse<TrendingGif> = await $axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=a8OMRUP4eiqbeYG0E599hEFqMXZZBQxP&limit=${data.limit}&rating=${data.rating}`);
    this.context.commit('setTrendingStatus', true);
    this.context.commit('saveAndResetGifs', {gifs: axioResponse.data.data, total: axioResponse.data.pagination.total_count});
  }

  @Action({ rawError: true })
  async searchGifs(data: { text: string, limit: number, offset: number }) {
    this.context.commit('setTextSearched', data.text);
    let axioResponse: AxiosResponse<TrendingGif> = await $axios.get(`https://api.giphy.com/v1/gifs/search?api_key=a8OMRUP4eiqbeYG0E599hEFqMXZZBQxP&q=${data.text}&limit=${data.limit}&offset=${data.offset}&rating=g&lang=es`);
    if (this.showTrending == true) {
      this.context.commit('addMoreGifs', true);
      this.context.commit('setTrendingStatus', false);
      this.context.commit('saveAndResetGifs', {gifs: axioResponse.data.data, total: axioResponse.data.pagination.total_count});
    } else {
      if(this.canAddMoreGifs == true){
        this.context.commit('addGifs', {gifs: axioResponse.data.data, pagination: axioResponse.data.pagination});
      }
    }
  }

  @Action({ rawError: true })
  async gifById(id: number) {
    try {
      let axioResponse: AxiosResponse<GifByID> = await $axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=a8OMRUP4eiqbeYG0E599hEFqMXZZBQxP`);
      this.context.commit('saveGifById', axioResponse.data.data);
    } catch (error) {
      this.context.commit('saveGifById', null);
    }
  }
}