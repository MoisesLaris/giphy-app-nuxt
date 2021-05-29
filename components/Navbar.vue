<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-between p-2">
      <img src="~assets/img/logo/giphy-logo.png" height="30px" alt />
      <span class="text-white">Type here</span>
      <div ></div>
      <fa class="text-white fa-2x" :icon="['fas', 'plus-circle']" />
      <fa class="text-white fa-2x" :icon="['far', 'bell']" />

    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch
} from "nuxt-property-decorator";
interface User {
  firstName: string;
  lastName: string;
}

@Component
export default class Navbar extends Vue {
  message: string = "This is a message";
}
</script>

<style>
</style>