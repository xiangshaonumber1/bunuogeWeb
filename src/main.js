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
import store from './blog_vuex/store'
//方便在main.js中，this尚未指向Vue的情况下，也能使用Message和Notice
import {Message,Notice} from 'iview'

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

/******************************************** 添加请求拦截器  start **************************************************** */

/************************************************   config 设置  ****************************************************** */
axios.interceptors.request.use(config=>{
  //在发送请求之前做某事，比如设置token
  config.headers["X-Auth-Token"] = localStorage.getItem("token");
  return config;
},error => {
  //请求错误时做些事情
  console.log("请求失败");
  return Promise.reject(error); //方法返回一个带有拒绝原因reason参数的Promise对象。
});
/*******************************************  添加请求拦截器  end ****************************************************** */

/******************************************** 添加响应拦截器  start *****************************************************/
axios.interceptors.response.use((response)=>{
  //对接入成功的请求返回的信息做默认处理
  //注 403 是拒绝处理，情况比较复杂，就根据不同请求单独处理，不在这里做统一处理
  //注 404 页面由于是组件化的，不是直接跳转到404页面，所以需要单独处理
  switch (response.data.code) {
    case '401': //如果返回401，则表示要继续实现该功能则需要进一步的登录，否则无法继续，直接跳转到登录页面，不需要返回response
      Notice.info({
        title: "登录提示：",
        desc: "该功能需要登录后才能操作，请先进行登录后再继续",
      });
      router.push({name:'login'});
      break;

    case '402': //如果返回的是402，则表示token获取，需要重新获取token,这个工作由程序完成，不用提示用户需要重新登录（符合刷新token原则的情况下）,需要返回response 继续下一步操作
      return axios({
        url:'/Authentication/getToken',
        method:'get',
      }).then((response)=>{
        if (response.data.code === '200') {
          console.log("我是1");
          console.log("刷新Token成功");
          localStorage.setItem("token",response.data.data);
          response.data.code = 'reTry';
          return response;
        }else {// 如果 Token 不允许刷新（登录过期等等复杂情况），跳转到登录页面
          console.log("Return Info："+response.data.code+"："+response.data.msg);
          router.push({name:'login'});
          return response;
        }
      });


    case '407': //表示没有足够的身份或者权限去获取对应的信息,不需要返回response
      Notcie.warning({
        title:'拒绝访问提示：',
        desc:response.data.msg,
      });
      break;

    case '500'://表示服务器处理该请求的时候，出现了错误,不需要返回response
      Notice.error({
        title:'服务处理异常：',
        desc:response.data.msg,
      });
      break;

    default:
      return response;
  }

},error => { //连接发送错误时的处理
  Notice.warning({
    title : '网络链接阻塞',
    desc : '服务器被外星人拐跑了  @oo(▼皿▼メ;)o'
  });
  console.log("网络链接阻塞\n服务器被外星人拐跑了  @oo(▼皿▼メ;)o");
  return Promise.reject(error); // 返回接口返回的错误信息

});

/******************************************** 添加响应拦截器  end *****************************************************/



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
import NotFound from './views/Web/mainContent/404'


//  2.定义路由
//  每个路由应该映射一个组件
const routes = [
  {path:'/', component: Index, name:"index"},
  {path:"/ai/:article_id",component:Web_articleInfo, name:'articleInfo'}, //ai —— article info
  {path:'/home', component: Home, name:"home"},
  {path:'/feedback',component:Web_feedBack, name:'feedback'},
  {path:'/404',component:NotFound,name:'404'},
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
  base:'/',
  mode:'history', //history去掉 '#' , hash 是有#的
  routes //缩写，相当于 routes: routes
});




// **********************************************************  必须放到最后系列  ****************************************************************************
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
  mounted(){
    // this.$store.commit("clearLoginInfo")
    if (this.$store.getters.isLogin === 'true' ){
      console.log("欢迎博主回来")
    }else {
      console.log("博主尚未登录")
    }
  },

});//现在，可以试试启动喽
// ***********************************************************   必须放到最后系列   ************************************************************************************



