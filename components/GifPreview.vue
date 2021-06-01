<template>
  <nuxt-link :to="'/gifs/' + gif.id">
    <img class="animate" :src="gif.images.downsized_medium.url" alt />
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { Gif } from "~/models/gif.interface";

@Component
export default class GifPreview extends Vue {
  @Prop() gif!: Gif;

  onClickedGif() {}
}
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}
</style>