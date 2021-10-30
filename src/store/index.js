// 配置vuex，将token值在此进行保存、处理等操作

import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem,removeitem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存公共数据 在设置vuex中的初值时，先从本地存储中取，如果取不到，则初始为空
    tokenInfo: getItem('tokenInfo') || {}
  },
  mutations: {
    mSetTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj
      // console.log(state.tokenInfo);
      // 因为刷新会丢失所以进行持久化 调用storage文件里方法
      setItem('tokenInfo', tokenObj)
    },
    del_token(state) {
      state.tokenInfo = "";
      removeitem("tokenInfo");
    }
  },
  actions: {
  },
  modules: {
  }
})

