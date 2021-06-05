<template>
  <nuxt-link v-if="gif" :to="'/gif/' + gif.id">
    <div class="image mb-4">
      <img class="animate" :src="gif.images.preview_gif.url" alt />
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { Gif } from "~/models/gif.interface";

@Component
export default class GifPreview extends Vue {
  @Prop() gif!: Gif;

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