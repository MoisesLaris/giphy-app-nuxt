<template>
  <div class="error-container d-flex justify-content-center align-items-center flex-column">
    <img class="border-bottom" src="~assets/img/logo/giphy-logo.png" alt="logo" />
    <h1 v-if="error.statusCode === 404" class="text-white">Page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error"
};
</script>

<style>
.error-container {
  background-color: rgb(18, 18, 18);
  width: 100%;
  height: 100vh;
}
.border-bottom {
  padding: 1rem 0;
  border-bottom: 0.5px solid rgb(255, 255, 255);
}
</style>