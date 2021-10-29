import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/Home.vue";
import store from "@/store";
import { getItem } from "@/utils/storage";
import axios from "axios";
import url from "@/serviceAPI.config.js";

// const fs = require('fs')
// const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwNAiZQKSICH+psi9k1NR
// 8x5+DqsnHfK/WAEqW6i2vLIbmcCwbJVx/rrf4g5z23qaZqV00PwMiDKCqgRNyGsY
// LeW6wdh9QeYUSoqM2LJKndmInQyUPt1zemPKo5Z9xDDDAguM//mi1jD1WWeVkCDN
// nKjviJkmYI+CU75QFjDl3b5yBKnuK15HeuKwROl80OZ5xaoH0NBGefdc5/ZsaWwa
// xfKCXCwj0PFC7UdtC2dHD0mU8C8pDmfK5hCY8E2RFm2CfI2qpda3JXYq7LbO6/nR
// u4U9Wv5vHqd07x495fHiKLsMTj1erzHEyqJGm9RwN2xuxfdK1nNkpP1X1bJd9Pen
// kwIDAQAB`
const jwt = require("jsonwebtoken");

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

export const routes = [
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
    name: "UserRegister",
    component: () => import("views/users/Register")
  },
  {
    path: "/user/profile",
    name: "UserProfile",
    meta: { requiresAuth: true },
    component: () => import("views/users/Profile")
  },
  {
    path: "/diet/management",
    name: "DietManagement",
    meta: { requiresAuth: true },
    component: () => import("views/diet/Management.vue")
  },
  {
    path: "/diet/order",
    name: "DietOder",
    meta: { requiresAuth: true },
    component: () => import("views/diet/Oder.vue")
  },
  {
    path: "/diet/shoppingcart",
    name: "ShoppingCart",
    meta: { requiresAuth: true },
    component: () => import("views/diet/ShoppingCart.vue")
    // beforeEnter: (to, from, next) => {
    //   // console.log("前端的toen"+window.localStorage.tokenInfo);
    //   axios({
    //     url: url.verifyToken,
    //     method: "post",
    //     data:{
    //       token:window.localStorage.tokenInfo
    //     }
    //   })
    //     .then(response => {
    //       console.log(response);
    //       if (response.data.code == 200) next()
    //       else{
    //           Vue.prototype.$message.error('用户未登录或权限不足')
    //           next('/')
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // }

    // beforeEnter: (to, from, next) => {

    //   let tokenRS256 = window.localStorage.getItem('tokenInfo')

    //   if(!tokenRS256){
    //     next('/')
    //     Vue.prototype.$message.error('请登录')
    //   }
    //   else{
    //     // 获取验证 JWT 时需要用的公钥
    //     // const publicKey = fs.readFileSync('@/config/public.key');

    //     // 验证 Token
    //     jwt.verify(tokenRS256, publicKey, (error, decoded) => {
    //       if (error) {
    //         console.log(error.message)
    //         Vue.prototype.$message.error('请登录')
    //         next('/')
    //         // return
    //       }
    //       else{
    //         next()
    //       }
    //       console.log(decoded)
    //     })
    //   }

    // }
  }
];

const createRouter = () =>
  new VueRouter({
    mode: "history", // require service support
    // scrollBehavior: () => ({ y: 0 }),
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    },
    routes: routes
  });

const router = createRouter();

router.beforeEach((to, from, next) => {
  // console.log(to.path);
  if (to.path == "/" || to.path == "/home") {
    next();
  } else if (to.path == "/user/register") {
    next();
  } else {
    axios({
      url: url.verifyToken,
      method: "post"
    })
      .then(response => {
        console.log(response);
        if (response.data.code == 200) {
          Vue.prototype.$message.succuss("token验证通过");
          next();
        } else {
          Vue.prototype.$message.error("用户未登录或权限不足");
          next("/");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
