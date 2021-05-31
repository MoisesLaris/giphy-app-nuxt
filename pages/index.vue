<template>
  <div>
    <div class="container-fluid">
      <no-ssr>
        <vue-masonry-wall :items="gifs" :options="{width: 400, padding: 10}">
          <template v-slot:default="{item}">
            <img :src="item" />
          </template>
        </vue-masonry-wall>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue"; // @ is an alias to /src
import Gif from "@/components/Gif.vue"; // @ is an alias to /src
import axios, { AxiosResponse } from "axios";
import { GIF, Gif_model } from "~/models/test";
import VueMasonryWall from "vue-masonry-wall";
import NoSSR from "vue-no-ssr";

@Component({
  components: {
    Navbar,
    Gif,
    VueMasonryWall,
    NoSSR
  }
})
@Component
export default class Home extends Vue {
  gifs = [];

  created() {
    this.getGifs();
  }

  async getGifs(){
    let arrGifs = [], gifs = await axios.get(
      "https://api.giphy.com/v1/gifs/trending?api_key=a8OMRUP4eiqbeYG0E599hEFqMXZZBQxP&limit=30&rating=g"
    );
    arrGifs = gifs.data.data.map(obj => {
      return obj.images.downsized_medium.url;
    });

    this.gifs.push(...arrGifs);
    console.log(this.gifs)
  }

}
</script>

<style scoped>
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

.masonry-wall {
  margin: 0px !important;
}
</style>
