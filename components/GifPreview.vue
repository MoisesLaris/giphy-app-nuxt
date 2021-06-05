<template>
  <nuxt-link v-if="gif" :to="'/gif/' + gif.id">
    <div class="animate">
      <div class="img-relative">
        <img class="img-absolute" :src="gif.images.fixed_height_small.url" />
      </div>
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

<style lang="scss">

</style>