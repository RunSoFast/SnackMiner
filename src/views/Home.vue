<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="item in lubotu" :key="item.id">
        <img :src="item.image" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>

  <el-row>
    <el-col :span="3" v-for="(item, index) in cardContent" :key="item.index" :offset="index > 0 ? 1 : 0" style="margin: 38px;">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="item.imageurl" class="image">
        <div style="padding: 14px;">
          <span>{{item.name}}</span>
          <div class="bottom clearfix">
            <p class="time">{{ item.price }}元</p>
            <el-button type="text" class="button" @click="buyIt(item)">加入购物车</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
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
          image: require("assets/img/slideshow/caffe.png")
        }
      ],
      cardContent: [],
    };
  },
  methods:{
    initCard() {
      axios({
        url: url.dietManagementdefaultquery,
        method: "get"
      })
        .then(response => {
          // console.log(response);
          if (response.data.code == 200) this.cardContent = response.data.message;
          console.log(this.cardContent);
        })
        .catch(error => {
          console.log(error);
        });
    },
    buyIt(item) {
      // console.log("submit!");
      axios({
        url: url.shoppingCartAdd,
        method: "post",
        data: {
          username: window.localStorage.username,
          name: item.name,
          category: item.category,
          price: item.price,
          imageurl: item.imageurl,
          quantity: item.quantity
        }
      })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created(){
    this.initCard()
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
 .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 195px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
