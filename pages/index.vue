<template>
  <div>
    <Searchbar @onSearch="onSearch"></Searchbar>
    <Loading v-if="loadingData == true" />

    <div v-else>
      <div class="my-4">
        <div
          class="d-flex justify-content-between align-items-center"
          v-if="$store.state.gifState.showTrending == true"
        >
          <div class="d-flex justify-content-between align-items-center">
            <fa class="text-primary" :icon="['fas', 'chart-line']" />
            <span class="ml-2">Trending</span>
          </div>
          <span>All the GIFs</span>
        </div>
        <div
          class="d-flex align-items-center justify-content-between"
          v-if="$store.state.gifState.showTrending == false"
        >
          <div>
            <span class="searched-title">{{ $store.state.gifState.text_searched }}</span
            >&nbsp;<span class="total-gifs"
              >{{ $store.state.gifState.total }} GIFs</span
            >
          </div>
          <div>
            <span class="sort"
              ><b class="mr-2">Sort:</b>
              <b class="mr-2">Relevant</b> Newest</span
            >
          </div>
        </div>
      </div>

      <div class="card-columns mb-5">
        <GifPreview
          v-for="gif in $store.state.gifState.gifs"
          :key="gif.id"
          :gif="gif"
        />
      </div>
      
      <!-- <no-ssr>
        <vue-masonry-wall
          :items="$store.state.gifState.gifs"
          :options="{ width: 400, padding: 10 }"
          :ssr="{columns: 2}"
          @append="appendGifs"
        >
          <template v-slot:default="{ item }">
            <GifPreview :gif="item" />
          </template>
        </vue-masonry-wall>
      </no-ssr> -->
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
import { Gif } from "~/models/gif.interface";
import { Rating } from "~/models/rating.enum";
import GifState from "~/store/gifState";
import { Action, Mutation } from "nuxt-property-decorator";

@Component({
  components: {
    Navbar,
    GifPreview,
    VueMasonryWall,
    NoSSR,
    Searchbar,
    Loading,
  },
})
@Component
export default class Home extends Vue {
  @Action("gifState/trendingGifs") getTrendingAction: any;
  @Action("gifState/searchGifs") searchGifsAction: any;

  @Mutation("gifState/resetGifArray") resetGifArray: any;

  offset = 0;
  loadingData: boolean = false;
  appendingGifs: boolean = false;
  gifs: Gif[] = (this.$store.state.gifState as GifState).gifs;

  created() {
    if (!this.gifs.length) {
      this.getTrendingGifs();
    }
  }

  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  async getTrendingGifs() {
    this.loadingData = true;
    await this.getTrendingAction({ limit: 30, rating: Rating.G });
    this.loadingData = false;
  }

  async onSearch(text: string) {
    this.offset = 0;
    this.loadingData = true;
    this.resetGifArray();
    await this.searchGifsAction({ text: text, limit: 30, offset: this.offset });
    this.loadingData = false;
  }

  handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.appendGifs();
    }
  }

  async appendGifs() {
    //We will only append gifs if we are searching, this is because trending endpoint does not give the option to bring more than a specific number of items.
    if (
      (this.$store.state.gifState as GifState).showTrending == false &&
      this.appendingGifs == false
    ) {
      this.appendingGifs = true;
      await this.searchGifsAction({
        text: this.$store.state.gifState.text_searched,
        limit: 30,
        offset: (this.offset += 30),
      });
      this.appendingGifs = false;
    }
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
.searched-title {
  font-size: 19px;
  font-weight: bold;
  text-transform: uppercase;
}

.total-gifs {
  font-size: 14px;
  color: rgb(207, 207, 207);
}

.sort {
  font-size: 14px;
  cursor: pointer;
}
</style>
