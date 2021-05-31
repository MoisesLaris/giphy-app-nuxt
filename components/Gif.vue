<template>
    <img v-on:click="counter += 1" class="gif" :src="url" alt="">
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { Gif_model } from "../models/test";

@Component
export default class Gif extends Vue {
  @Prop() url!: string;
  @Prop() width!: string;
  @Prop() height!: string;

  onClickedGif(){
  }

}
</script>

<style lang="scss">
  .gif{
    position: relative;
    transition: all 0.3s;

    &:hover{
      cursor: pointer;
      transform: scale(1.05, 1.05);
    }
  }
</style>