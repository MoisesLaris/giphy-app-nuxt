<template>
  <GifGrind/>
</template>

<script lang="ts">
import { Component, Vue, Mutation } from "nuxt-property-decorator";
import GifGrind from "@/components/GifGrind.vue";

@Component({
  components: {
    GifGrind
  }
})
export default class Search extends Vue {}
</script>

<style>
</style>