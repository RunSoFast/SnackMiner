import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/Home.vue";
import store from "@/store";
import { getItem } from "@/utils/storage";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/user/register",
    name: "Register",
    component: () => import("views/users/Register")
  },
  {
    path: "/goods/management",
    name: "GoodsManagement",
    component: () => import("views/goods/Management"),
    beforeEnter: (to, from, next) => {}
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

// router.beforeEach((to, from, next) => {
//   //我在这里模仿了一个获取用户信息的方法
//   let isLogin = window.localStorage.getItem("tokenInfo");
//   if (isLogin)
//     //如果用户信息存在则往下执行。
//     next();
//   else {
//     //如果用户token不存在则跳转到login页面
//     next("/");
//   }
// });

export default router;
