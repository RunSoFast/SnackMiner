import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import request from '@/utils/request'
import axios from "axios";

Vue.prototype.$req = request
Vue.config.productionTip = false

axios.interceptors.request.use(
  config => {
    // 从vuex中取出token
    const token = store.state.tokenInfo;
    // 如果有token则 添加到headers中
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    console.log("在request拦截器显示错误：", error.response)
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


