<template>
  <client-only>
    <div class="card-columns mb-5">
      <GifPreview v-for="gif in $store.state.gifState.gifs" :key="gif.id + '-' + index" :gif="gif" />
    </div>
  </client-only>
</template>

<script lang="ts">
import { Component, Vue, Mutation } from "nuxt-property-decorator";

@Component
export default class Search extends Vue {
}
</script>

<style>
</style>