<template>
  <div class="container-fluid" style="border-bottom: 1px solid #212529">
    <div class="d-flex justify-content-between align-items-center p-4">
      <img src="~assets/img/logo/giphy-logo.png" height="30px" alt />
      <span class="text-primary">Type to search</span>
      <div class="d-flex justify-content-center align-items-center right-items">
        <fa class="text-white icon" :icon="['fas', 'plus-circle']" />
        <div class="vertical-bar"></div>
        <fa class="text-white icon" :icon="['far', 'bell']" />
        <img class="profile-image" src="~assets/img/profile/user.jpg" alt />
      </div>
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

<style lang="scss">

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