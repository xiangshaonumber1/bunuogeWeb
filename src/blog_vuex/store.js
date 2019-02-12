import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex);

// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const state = {
  openID:null,//用户ID
  nickname:null,//用户昵称
  avatar:null,//用户头像地址
  token:null,//用户登录后持有的token
  isLogin:'false',//判断当前用户是否已经登录
}

const store = new Vuex.Store({
  plugins:[createPersistedState()],
  //定义状态
  state,
  getters,  //注册getters
  mutations,  //注册mutations
  actions,  //注册actions
});
/*
* 实际上token也可以不保存在vuex中，因为vuex是一个状态管理器而非一个存储工具，
* 我在axios的headers里直接用sessionStorage里的token
* */
export default store
