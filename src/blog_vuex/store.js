import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);

const state = {
  openID:null,//用户ID
  nickname:null,//用户昵称
  avatar:null,//用户头像地址
  isLogin:false,//判断当前用户是否已经登录
  systemMessageCount:0, //未读 '系统消息' 数量
  replyMessageCount:0,  //未读 '回复我的' 消息数量
  personalMessageCount:0, //未读 '我的消息' 消息数量
  markedActivityCount:0,  //未读 '动态' 消息数量
  serverPath:'http://localhost:8089', //开发环境
};

const store = new Vuex.Store({
  plugins:[createPersistedState()], //vuex持久化插件
  state,
  getters,  //注册getters, 获取数据并渲染
  mutations,  //注册mutations,处理数据的唯一途径，state的改变或赋值只能在这里
  actions,  //注册actions,数据的异步操作
});
/*
* 实际上token也可以不保存在vuex中，因为vuex是一个状态管理器而非一个存储工具，
* 我在axios的headers里直接用sessionStorage里的token
* */
export default store
