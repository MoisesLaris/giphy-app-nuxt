<template>
  <div>
    <div
    id="app-main"
    tabindex="-1"
    @keyup="onType"
    ></div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Main extends Vue {
    created() {
      const component = this;
      this.handler = function (e) {
        console.log(e);
        component.$emit('keyup', e);
      }
      window.addEventListener('keyup', this.handler);
    }
    beforeDestroy() {
      window.removeEventListener('keyup', this.handler);
    }
}

</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.animate {
  transition: all 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05, 1.05);
  }
}
</style>
