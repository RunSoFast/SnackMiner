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
          image: require("assets/img/01.jpg")
        },
        {
          image: require("assets/img/02.jpg")
        },
        {
          image: require("assets/img/03.webp")
        },
        {
          image: require("assets/img/04.webp")
        },
        {
          image: require("assets/img/05.webp")
        },
        {
          image: require("assets/img/06.webp")
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
