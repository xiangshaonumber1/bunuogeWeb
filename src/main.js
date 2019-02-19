// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入并安装vue-router插件
import Vue from 'vue'
import VueCropper from 'vue-cropper'
import Iview from 'iview';
import 'iview/dist/styles/iview.css'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
//引入状态管理 store
import store from './blog_vuex/store'
import apis from './api/Api'
import router from './router/router'
//方便在main.js中，this尚未指向Vue的情况下，也能使用Message和Notice

//Iview UI 框架
Vue.use(Iview);
//Vue 截图工具
Vue.use(VueCropper);
// 将api挂载到vue的原型上复制代码,让其可以在vue实例中 通过this.$apis 调用其中的接口
Vue.prototype.$apis = apis;


import Header from './views/Web/header/header'
import Footer from './views/Web/footer/footer'
import OkHeader from './views/Web/header/ok_header'

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



