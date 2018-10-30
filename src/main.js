// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//引入并安装vue-router插件
import Vue from 'vue'
import VueRouter from 'vue-router'
//全局安装路由功能
Vue.use(VueRouter)


//  1.定义（路由）组件
//加载组组件
import Login from './views/login/login'
import Home from './views/home/home'
import Header from './views/header/header'
import Footer from './views/footer/footer'
//  2.定义路由
//  每个路由应该映射一个组件
const routes = [
  {path:'/',component:Home},
  {path: '/login', component:Login},//前面to 指定的地方 path /login
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
  components:{
    "blog-header":Header,
    "blog-footer":Footer
  }
})//现在，可以试试启动喽
