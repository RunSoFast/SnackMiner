import Vue from "vue";
import VueRouter from "vue-router";
import Home from "views/Home.vue";
import axios from "axios";
import url from "@/serviceAPI.config.js";

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
  if (to.meta.requiresAuth) {
    axios({
      url: url.verifyToken,
      method: "post"
    })
      .then(response => {
        if (response.data.code === 200) {
          Vue.prototype.$message.success("token验证通过");
          next();
        } else {
          Vue.prototype.$message.error(
            "token验证未通过,用户未登录或token已过期"
          );
          next("/");
        }
      })
      .catch(error => {
        console.log(error);
        next("/");
      });
  }
  else{
    next()
  }
});

export default router;
