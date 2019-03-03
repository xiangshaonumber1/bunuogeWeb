import Vue from 'vue'
import VueRouter from 'vue-router'

//全局安装路由功能
Vue.use(VueRouter);
//  1.定义（路由）组件

//加载组组件
import App from '../App'
import Index from '../views/Web/mainContent/index'
import Welcome from '../views/Web/login_register/welcome'
import Home from '../views/Web/home/home'
import Controller from '../views/Service/controller/ServiceController'
import WriteArticle from '../views/Service/components/service_write_article'
import WriteDiary from '../views/Service/components/service_write_diary'
import WriteEmail from '../views/Service/components/service_write_email'
import White from '../views/Service/components/service_white'
import DataArticles from '../views/Service/components/service_data_articles'
import DataDiaries from '../views/Service/components/service_data_diaries'
import PersonalInfo from '../views/Service/components/service_personal_info'
import BlogTotal from '../views/Service/components/service_blog_total'
import Register from '../views/Web/login_register/register'
import Login from '../views/Web/login_register/login'
import Identity from '../views/Service/components/service_identity_user'
import LinkEdit from '../views/Service/components/service_link_edit'
import Web_articleInfo from '../views/Web/mainContent/web_articleInfo'
import Web_diaryInfo from '../views/Web/mainContent/web_diaryInfo'
import Web_feedBack from '../views/Web/mainContent/web_feedback'
import Web_writeArticle from '../views/Web/mainContent/web_write_article'
import Web_writeDiary from '../views/Web/mainContent/web_write_diary'
import NotFound from '../views/Web/mainContent/404'
import Web_search from '../views/Web/mainContent/web_searchInfo'
import Web_personalCenter from '../views/Web/mainContent/web_personal_center'

//  2.定义路由
//  每个路由应该映射一个组件
const routes = [
  {path:'/', component: App,children:[                                                  //
      {path:'',component:Index, name:'index'},                                          //首页
      {path:'search/:key_word',component:Web_search, name:'web_search'},                    //搜索结果页面
      {path:"article/:article_id",component:Web_articleInfo, name:'web_articleInfo'},            //文章详情页面
      {path:"diary/:diary_id",component:Web_diaryInfo, name:'web_diaryInfo'},            //文章详情页面
      {path:'setting/personalCenter',component:Web_personalCenter,name:'personal_center',
        children:[
          {path: 'personalInfo', component: PersonalInfo, name:"web_personal_info"},     //用户个人数据页
          {path: 'articles', component: DataArticles, name:"web_data_articles"},        //用户文章数据页
          {path: 'diaries', component: DataDiaries, name:"web_data_diaries"},           //用户文章日记页
        ]},
    ]},
  {path:'/write/article',component:Web_writeArticle,name:'web_write_article'},          //用户文章编辑页
  {path:'/write/diary',component:Web_writeDiary,name:'web_write_diary'},          //用户文章编辑页

  {path:'/feedback',component:Web_feedBack, name:'web_feedback'},                           //意见反馈页
  {path:'/404',component:NotFound,name:'404'},                                          //404
  {path:'/home', component: Home, name:"home"},                                         //个人博客页

  {path: '/welcome', component: Welcome,                                                        //登录注册页
    children:[
      {path:'login',component:Login, name:"login"},                                             //登录页
      {path:'register' , component: Register , name:"register"}                                 //注册页
    ]},

  {path:"/ServiceController", component: Controller, name:"ServiceController",                  //后台管理首页
    children:[
      {path: 'blogState',component: BlogTotal,name:"service_blog_state"},                       //博客统计
      {path: 'personalInfo', component: PersonalInfo, name:"service_personal_info"},            //个人数据
      {path: 'writeArticle', component: WriteArticle, name:"service_write_article"},            //文章编辑
      {path: 'writeDiary', component: WriteDiary, name:"service_write_diary"},                  //日记编辑
      {path: 'dataArticles', component: DataArticles, name:"service_data_articles"},            //文章数据
      {path: 'dataDiaries', component: DataDiaries, name:"service_data_diaries"},               //日记数据
      {path: 'identityUser',component: Identity, name:"service_identity_user"},                 //用户管理
      {path: 'writeEmail',component: WriteEmail,name:"service_write_email"},                    //发送邮件
      {path: 'identityLink',component: LinkEdit, name:"service_identity_link"},                 //链接管理
      {path: 'whitePage',component: White, name:"service_white_page"},                          //空白页
    ]},


];

//  3.创建 router 实例，然后传‘routes’配置
//  还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  base:'/',
  mode:'history', //history去掉 '#' , hash 是有#的
  routes //缩写，相当于 routes: routes
});

export default router
