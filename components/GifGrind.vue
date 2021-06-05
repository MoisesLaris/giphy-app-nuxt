<template>
  <div>
    <client-only>
      <div class="row" v-if="$store.state.gifState.gifs.length > 5">
        <div class="col-lg-6 col-sm-12">
          <GifPreview :gif="$store.state.gifState.gifs[0]" />
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <GifPreview :gif="$store.state.gifState.gifs[1]" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <GifPreview :gif="$store.state.gifState.gifs[2]" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <GifPreview :gif="$store.state.gifState.gifs[3]" />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <GifPreview :gif="$store.state.gifState.gifs[4]" />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <template v-for="(gif, index) in $store.state.gifState.gifs">
          <div
            class="col-lg-3 col-md-6 col-sm-12"
            v-if="index > 4 && $store.state.gifState.gifs.length > 5"
            :key="gif.id + '-' + index"
          >
            <GifPreview :gif="gif" />
          </div>
          <div
            class="col-lg-3 col-md-6 col-sm-12"
            v-if="$store.state.gifState.gifs.length < 5"
            :key="gif.id + '-' + index"
          >
            <GifPreview :gif="gif" />
          </div>
        </template>
      </div>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mutation } from "nuxt-property-decorator";

@Component
export default class GifGrind extends Vue {}
</script>

<style>
</style>