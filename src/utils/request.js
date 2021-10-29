// 此文件封装axios，设置请求拦截器，补充请求头token信息

/* 对axios进行二次封装
请求拦截器增加token
响应拦截器处理大数据
*/
import Vue from 'vue'
import store from "@/store";
import axios from "axios";

// 在Vue的原型上挂在一个$axios
Vue.prototype.$axios = axios

/*
自定义写法：const xxx = axios.create({})
一个项目中可能有不同的基地址 就要用自定义写法设置不同的基地址
create an axios instance
*/
const instance = axios.create({
  baseURL: "http://localhost:3000/"
});
// 在instance上添加请求拦截器 补充请求头token信息
instance.interceptors.request.use(
  config => {
    // 从vuex中取出token
    const token = store.state.tokenInfo;
    // 如果有token则 添加到headers中
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log("在request拦截器显示错误：", error.response)
    return Promise.reject(error);
  }
);


export default instance;
