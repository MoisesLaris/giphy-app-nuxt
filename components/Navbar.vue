<template>
  <div class="container" style="border-bottom: 1px solid #212529">
    <div class="d-flex justify-content-between align-items-center p-4">
      <img @click="reloadPage" class="d-none d-md-block" src="~assets/img/logo/giphy-logo.png" height="30px" alt />
      <img @click="reloadPage" class="d-md-none" src="~assets/img/logo/logo.png" height="30px" alt />
      <span v-on:click="openSearchBar()" class="animate text-dark d-none d-md-block">Type enter to search</span>
      <div class="d-flex justify-content-center align-items-center right-items">
        <fa v-on:click="openSearchBar()" class="animate text-white icon d-md-none" :icon="['fas', 'search']" />
        <fa class="text-white icon d-none d-md-block" :icon="['fas', 'plus-circle']" />
        <div class="vertical-bar d-none d-md-block"></div>
        <fa class="text-white icon" :icon="['far', 'bell']" />
        <img class="profile-image" src="~assets/img/profile/user.jpg" alt />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Mutation,
  Vue,
} from "nuxt-property-decorator";

@Component
export default class Navbar extends Vue {
  @Mutation('gifState/setStatusBar') setStatusBar:any;

  openSearchBar(){
    this.setStatusBar(true);
  }

  reloadPage(){
    this.$nuxt.$router.push({ path: "/"});
  }
}
</script>

<style lang="scss" scoped>

.icon{
  font-size: 1.5rem;
}

.profile-image {
  border-radius: 10%;
  max-width: 2.75rem;
}

.vertical-bar {
  border: none;
  border-left: 1px solid white;
  width: 1px;
  height: 15px;
}

.right-items{
  & > *{
    margin: 0px 15px
  }
}
</style>