
import Vue from 'vue'
import VueRouter from 'vue-router'

//全局安装路由功能
Vue.use(VueRouter);
//  1.定义（路由）组件
//加载组组件
import Welcome from '../views/Web/login_register/welcome'
import Home from '../views/Web/home/home'
import Controller from '../views/Service/controller/ServiceController'
import WriteArticle from '../views/Service/components/write_article'
import WriteDiary from '../views/Service/components/write_diary'
import WriteEmail from '../views/Service/components/write_email'
import White from '../views/Service/components/white'
import DataArticles from '../views/Service/components/data_articles'
import DataDiaries from '../views/Service/components/data_diaries'
import PersonalInfo from  '../views/Service/components/personal_info'
import BlogTotal from '../views/Service/components/blog_total'
import Index from '../views/Web/mainContent/index'
import Register from '../views/Web/login_register/register'
import Login from '../views/Web/login_register/login'
import Identity from '../views/Service/components/identity_user'
import LinkEdit from '../views/Service/components/link_edit'
import Web_articleInfo from '../views/Web/mainContent/web_articleInfo'
import Web_feedBack from '../views/Web/mainContent/web_feedback'
import Web_writeArticle from '../views/Web/mainContent/web_article_write'
import NotFound from '../views/Web/mainContent/404'


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

export default router
