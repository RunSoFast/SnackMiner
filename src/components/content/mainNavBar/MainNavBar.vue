<template>
  <!-- 导航栏 -->
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1" @click="home">首页推荐</el-menu-item>
    <el-submenu index="2">
      <template slot="title">点餐</template>
      <el-menu-item index="2-1">营养早餐</el-menu-item>
      <el-menu-item index="2-2">特色小吃</el-menu-item>
      <el-menu-item index="2-3">美味主食</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">甜点饮品</template>
        <el-menu-item index="2-4-1">奶茶果茶</el-menu-item>
        <el-menu-item index="2-4-2">醒脑咖啡</el-menu-item>
        <el-menu-item index="2-4-3">面包蛋糕</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"
      ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
    >
    <!-- <span class="el-icon-user-solid"></span> -->
    <span class="right" @click="login">
      <!-- <span class="el-icon-s-custom"></span> -->
      <el-menu-item index="5">登录</el-menu-item>
    </span>
  </el-menu>
</template>

<script>
export default {
  name: "MainNavBar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    login() {
      this.$router.push("/login");
    },
    home() {
      this.$router.push("/").catch(err => {
        // console.log(err);
      });
    }
  }
};
</script>

<style scoped>
/* 导航栏 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.right {
  position: absolute;
  right: 0px;
  /* width: 300px; */
  /* border: 3px solid #73AD21; */
  /* padding: 10px; */
}
</style>
