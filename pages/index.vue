<template>
  <div>
    <Searchbar @onSearch="onSearch"></Searchbar>
    <Loading v-if="loadingData == true"/>
     <div class="container-fluid" v-else>
      <no-ssr>
        <vue-masonry-wall :items="gifs" :options="{ width: 400, padding: 10 }">
          <template v-slot:default="{ item }">
            <GifPreview :gif="item" />
          </template>
        </vue-masonry-wall>
      </no-ssr>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue"; // @ is an alias to /src
import Searchbar from "@/components/Searchbar.vue"; // @ is an alias to /src
import GifPreview from "@/components/GifPreview.vue"; // @ is an alias to /src
import Loading from "@/components/Loading.vue"; // @ is an alias to /src
import VueMasonryWall from "vue-masonry-wall";
import NoSSR from "vue-no-ssr";
import { Gif, Rating } from "~/models/gif.interface";
import { TrendingGif } from "~/models/trending-gif.interface";
import { AxiosResponse } from "axios";

@Component({
  components: {
    Navbar,
    GifPreview,
    VueMasonryWall,
    NoSSR,
    Searchbar,
    Loading
  },
})
@Component
export default class Home extends Vue {
  loadingData: boolean = false;
  gifs: Gif[] = [];

  created() {
    this.getGifs();
  }


  async getGifs() {
    this.loadingData = true;
    let arrGifs: Gif[] = [],
    gifs: AxiosResponse<TrendingGif> = await this.$getTrendingGifs({ limit: 25, rating: Rating.G });

    arrGifs = gifs.data.data;

    this.gifs.push(...arrGifs);
    this.loadingData = false;
  }

  async onSearch(text: string){
    this.loadingData = true;
    let search: AxiosResponse<TrendingGif> = await this.$searchGifs(text, 25, 0);
    this.gifs = search.data.data;
    this.loadingData = false;
  }
}
</script>

<style scoped lang="scss">
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}

.gif {
  position: relative;
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05, 1.05);
  }
}

.masonry-wall {
  margin: 0px !important;
}
</style>
