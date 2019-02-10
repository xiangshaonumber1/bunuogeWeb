// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入并安装vue-router插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCropper from 'vue-cropper'
import qs from 'qs'
import axios from 'axios'
import Iview from 'iview';
import 'iview/dist/styles/iview.css'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
//引入状态管理 store
import store from './vuex/store'


//全局安装路由功能
Vue.use(VueRouter);
//Iview UI 框架
Vue.use(Iview);
//Vue 截图工具
Vue.use(VueCropper);

//axios 参数格式
Vue.prototype.$qs = qs;
//Vue 网络请求工具
Vue.prototype.$axios = axios;  //全局注册，使用方法为：this.$axios
//axios 全局默认配置
axios.defaults.baseURL = 'http://localhost:8888';


//  1.定义（路由）组件
//加载组组件
import Welcome from './views/Web/login_register/welcome'
import Home from './views/Web/home/home'
import Header from './views/Web/header/header'
import Footer from './views/Web/footer/footer'
import OkHeader from './views/Web/header/ok_header'
import Controller from './views/Service/controller/ServiceController'
import WriteArticle from './views/Service/components/write_article'
import WriteDiary from './views/Service/components/write_diary'
import WriteEmail from './views/Service/components/write_email'
import White from './views/Service/components/white'
import DataArticles from './views/Service/components/data_articles'
import DataDiaries from './views/Service/components/data_diaries'
import PersonalInfo from  './views/Service/components/personal_info'
import BlogTotal from './views/Service/components/blog_total'
import Index from './views/Web/mainContent/index'
import Register from './views/Web/login_register/register'
import Login from './views/Web/login_register/login'
import Identity from './views/Service/components/identity_user'
import LinkEdit from './views/Service/components/link_edit'
import Web_articleInfo from './views/Web/mainContent/web_articleInfo'
import Web_feedBack from './views/Web/mainContent/web_feedback'
import Web_writeArticle from './views/Web/mainContent/web_article_write'


//  2.定义路由
//  每个路由应该映射一个组件
const routes = [
  {path:'/', component: Index, name:"index"},
  {path:"/ai/:article_id",component:Web_articleInfo, name:'articleInfo'}, //ai —— article info
  {path:'/home', component: Home, name:"home"},
  {path:'/feedback',component:Web_feedBack, name:'feedback'},
  {path: '/welcome', component: Welcome, name:"welcome",children:[
      {path:'login',component:Login, name:"login"},
      {path:'register' , component: Register , name:"register"}
    ]},
  {path:'/write/article',component:Web_writeArticle,name:'web_write_article'},
  {path:'/write/'},
  {path:"/ServiceController", component: Controller, name:"ServiceController",
    children:[
      {path: 'article', component: WriteArticle, name:"write_article"},
      {path: 'diary', component: WriteDiary, name:"write_diary"},
      {path: 'articles', component: DataArticles, name:"data_articles"},
      {path: 'diaries', component: DataDiaries, name:"data_diaries"},
      {path: 'personalInfo', component: PersonalInfo, name:"personal_info"},
      {path: 'blogState',component: BlogTotal,name:"blog_state"},
      {path: 'email',component: WriteEmail,name:"write_email"},
      {path: 'identity',component: Identity, name:"identity_user"},
      {path: 'link',component: LinkEdit, name:"identity_link"},
      {path: 'white',component: White, name:"ServiceController/white"},
    ]},
  {path:'/wangeditor', component: WriteArticle, name:"wangeditor"},
];
//  3.创建 router 实例，然后传‘routes’配置
//  还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode:'history', //history去掉 '#' , hash 是由#的
  routes //缩写，相当于 routes: routes
});

//  4. 创建和挂载根实例。
//  记得要通过 router 配置参数注入路由，
//  从而让整个应用都有路由功能
const app = new Vue({
  el: '#app', // el和$mount并没有本质上的不同
  /* 想要实现单独渲染vue，就不能添加下面的两句，否则，渲染的结果会直接出现在主页最后面 */
  // template: '<App/>',
  // components: { App },
  router,
  store,
  components:{
    "OkHeader":OkHeader,
    "Header":Header,
    "Footer":Footer
  },
  //Vue对象创建完成时
  created(){
    // this.$store.commit("clearLoginInfo")
    if (localStorage.getItem("isLogin") === 'true' ){
      console.log("欢迎博主回来")
    }else {
      localStorage.setItem("isLogin","false");
      console.log("博主尚未登录")
    }
    this.$store.state.isLogin = localStorage.getItem("isLogin");
  }
});//现在，可以试试启动喽
