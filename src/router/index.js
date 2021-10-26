import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/Home.vue";
import store from "@/store";
import { getItem } from "@/utils/storage";

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
  // console.log(111);
  next();
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

// //导航守卫，判断是否登录
// router.beforeEach(async (to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   const hasToken = localStorage.getItem("tokenInfo");
//   if (to.path === "/register" || to.path === "/") next();
//   if (hasToken) next();
//   else next("/home");
// });

//导航守卫，判断是否登录
// router.beforeEach(async (to, from, next) => {
//   if(to.meta.requiresAuth)
//   {
//     // console.log("需要token");
//     if(store.state.tokenInfo){
//       // next()
//       console.log(store.state.tokenInfo);
//     }
//   }
// });

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
