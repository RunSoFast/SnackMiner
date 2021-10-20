<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="item in lubotu" :key="item.id">
        <img :src="item.image" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  data() {
    return {
      activeIndex2: "1",
      lubotu: [
        {
          image: require("assets/img/slideshow/hanbao.png")
        },
        {
          image: require("assets/img/slideshow/shutiao.png")
        },
        {
          image: require("assets/img/slideshow/tiantong.png")
        },
        {
          image: require("assets/img/slideshow/kele.png")
        },
        {
          image: require("assets/img/slideshow/peigeng.png")
        },
        {
          image: require("assets/img/slideshow/maileji.png")
        }
      ]
    };
  }
};
</script>

<style>
/* 轮播图 */
.carousel-item {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.carousel-img {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
}
</style>
