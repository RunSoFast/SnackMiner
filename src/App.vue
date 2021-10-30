<template>
  <div id="app">
    <main-nav-bar></main-nav-bar>
    <router-view />
  </div>
</template>

<script>
// import MainNavBar from "components/content/mainNavBar/MainNavBar";
import MainNavBar from "components/content/mainNavBar/MainNavBar.vue";

export default {
  name: "app",
  components: {
    MainNavBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
