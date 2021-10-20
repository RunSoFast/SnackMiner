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
  },
  created() {
    // console.log('token',this.$store.state.tokenInfo);
    if (window.localStorage.tokenInfo == null) {
      this.$message.error("请登录");
    } else {
      // 从localStorage获取登录用户信息
      //       if(localStorage.getItem('login')=='null'){
      //       this.infoForm=this.$route.params
      //       localStorage.setItem('login',JSON.stringify(this.$route.params))
      //     }else{
      //       this.infoForm=JSON.parse(localStorage.getItem('login'))}
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
