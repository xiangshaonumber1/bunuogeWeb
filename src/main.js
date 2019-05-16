// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入并安装vue-router插件
import Vue from 'vue'
import VueCropper from 'vue-cropper'
import VueSocketIO from 'vue-socket.io'
import iview from 'iview';
import 'iview/dist/styles/iview.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
//引入状态管理 storet
import store from './blog_vuex/store'
import apis from './api/Api'
import router from './router/router'
//引入BootstrapVue UI框架
Vue.use(BootstrapVue);
//Iview UI 框架
Vue.use(iview);
//Vue 截图工具
Vue.use(VueCropper);
// 将api挂载到vue的原型上复制代码,让其可以在vue实例中 通过this.$apis 调用其中的接口
Vue.prototype.$apis = apis;
//Socket链接
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8100', //开发环境
  // connection: 'http://www.getok.top:8100',  //生产环境
}));


// **********************************************************  必须放到最后系列  ****************************************************************************
//  4. 创建和挂载根实例。
//  记得要通过 router 配置参数注入路由，
//  从而让整个应用都有路由功能
const app = new Vue({
  el: '#app', // el和$mount并没有本质上的不同
  router,//使用router
  store,//使用store
});//现在，可以试试启动喽
// ***********************************************************   必须放到最后系列   ************************************************************************************



