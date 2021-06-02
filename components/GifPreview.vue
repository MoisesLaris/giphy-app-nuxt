<template>
  <nuxt-link :to="'/gifs/' + gif.id">
    <div class="image" :style="{'height': gif.images.downsized_medium.height, 'width': gif.images.downsized_medium.width}">
      <img class="animate" :src="gif.images.downsized_medium.url" alt />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { Gif } from "~/models/gif.interface";

@Component
export default class GifPreview extends Vue {
  @Prop() gif!: Gif;

  created(){
  }

}
</script>

<style lang="scss" scoped>
.image{
  background-color: #343a40;
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}
</style>