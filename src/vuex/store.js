import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'
Vue.use(Vuex)


const store = new Vuex.Store({
  //定义状态
  state:{
    id:null,//用户ID
    nickname:null,//用户昵称
    usericon:null,//用户头像地址
    token:null,//用户登录后持有的token
    isLogin:'',//判断当前用户是否已经登录
  },
  getters,
  mutations,
  actions
})
/*
* 实际上token也可以不保存在vuex中，因为vuex是一个状态管理器而非一个存储工具，
* 我在axios的headers里直接用sessionStorage里的token
* */
export default store
