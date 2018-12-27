// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入并安装vue-router插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Element from 'element-ui'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import 'axios/dist/axios.min'
import store from './vuex/store'
import 'element-ui/lib/index'
import 'element-ui/lib/theme-chalk/index.css'
//全局安装路由功能
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Element,{size:'small',zIndex:3000})


//  1.定义（路由）组件
//加载组组件
import Login from './views/login/login'
import Home from './views/home/home'
import Header from './views/header/header'
import Footer from './views/footer/footer'
import Controller from './views/Service/controller/ServiceController'
//  2.定义路由
//  每个路由应该映射一个组件
const routes = [
  {path:'/',component:Home,name:"home"},
  {path: '/login', component:Login,name:"login"},//前面to 指定的地方 path /login
  {path:"/ServiceController",component:Controller,name:"ServiceController"}
]
//  3.创建 router 实例，然后传‘routes’配置
//  还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes //缩写，相当于 routes: routes
})

//  4. 创建和挂载根实例。
//  记得要通过 router 配置参数注入路由，
//  从而让整个应用都有路由功能
const app = new Vue({
  el: '#app',
  /* 想要实现单独渲染vue，就不能添加下面的两句，否则，渲染的结果会直接出现在主页最后面 */
  // template: '<App/>',
  // components: { App },
  router,
  store,
  components:{
    "blog-header":Header,
    "blog-footer":Footer
  },
  //Vue对象创建完成时
  created(){
    // this.$store.commit("clearLoginInfo")
    if (localStorage.getItem("isLogin") === 'true' ){
      console.log("欢迎博主回来")
    }else {
      localStorage.setItem("isLogin","false")
      console.log("博主尚未登录")
    }
    this.$store.state.isLogin = localStorage.getItem("isLogin");
  }
})//现在，可以试试启动喽
