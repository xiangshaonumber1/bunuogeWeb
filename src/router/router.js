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
import SendMssage from '../views/Service/components/service_send_message'
import White from '../views/Service/components/service_white'
import DataArticles from '../views/Service/components/service_data_articles'
import DataDiaries from '../views/Service/components/service_data_diaries'
import UserInfo from '../views/Service/components/service_user_info'
import BlogTotal from '../views/Service/components/service_blog_total'
import Register from '../views/Web/login_register/register'
import Login from '../views/Web/login_register/login'
import Identity from '../views/Service/components/service_identity_user'
import service_management_link from '../views/Service/components/service_management_link'
import service_feedbackMessage from '../views/Service/components/service_feedbackMessage'
import Management_article from '../views/Service/components/service_management_article'
import Management_comments from '../views/Service/components/service_management_comments'

import Web_articleInfo from '../views/Web/mainContent/articleInfo/web_articleInfo'
import Web_diaryInfo from '../views/Web/mainContent/articleInfo/web_diaryInfo'
import CommentAndReply from '../views/Web/mainContent/articleInfo/commentAndReply'
import WebModule_message from '../views/Web/mainContent/messageInfo/web_module_message'
import Web_replyMessage from '../views/Web/mainContent/messageInfo/web_replyMessage'
import Web_systemMessage from '../views/Web/mainContent/messageInfo/web_systemMessage'
import Web_personalMessage from '../views/Web/mainContent/messageInfo/web_personalMessage'
import Web_feedBack from '../views/Web/mainContent/web_feedback'
import Web_search from '../views/Web/mainContent/web_searchInfo'
import Web_user from '../views/Web/mainContent/web_user'
import Web_messageWall from '../views/Web/mainContent/web_messageWall'
import NotFound from '../views/Web/mainContent/404'

import Setting from '../views/Web/mainContent/web_setting'
import Setting_update_pw from '../views/Web/mainContent/setting/setting_update_pw'

import Test from '../views/Web/test/test'

//  2.定义路由
//  每个路由应该映射一个组件
const routes = [
  //首页
  {path:'/', component: App,children:[
      //首页详情，默认子组件
      {path:'',component:Index, name:'index'},
      //留言墙
      {path:'message',component:Web_messageWall, name:'message_wall'},
      //搜索详情
      {path:'search/:key_word',component:Web_search, name:'web_search'},
      //用户信息相关
      {path:'user/:open_id',component:Web_user,
        children:[
          {path: 'info', component: UserInfo, name:"web_userInfo"},                 //用户信息页面(可公开信息)
          {path: 'articles', component: DataArticles, name:"web_data_articles"},        //用户文章数据页
          {path: 'diaries', component: DataDiaries, name:"web_data_diaries"},           //用户文章日记页(只显示作者设置为公开的)
        ]},
      //用户设置相关
      {path:'setting/:open_id',component:Setting,                                       //个人设置的导航页
        children:[
          {path: 'update_pd', component:Setting_update_pw, name:"update_password"},     //修改密码
        ]},

      //文章详情
      {path:"/",component:Web_articleInfo,
        children:[
          //默认子组件，父组件不需要name
          {path:'/article/:article_id&:open_id',component:CommentAndReply,name:'web_articleInfo',}
        ]},

      //日记详情页面
      {path:"/diary/:diary_id",component:Web_diaryInfo,
        children:[
          //默认子组件，父组件不需要name
          {path:'/',component:CommentAndReply,name:'web_diaryInfo'}
        ]},
    ]},

  //消息通知模块
  {path:'/message/:openID',component:WebModule_message,
    children:[
      {path:'replyMessage',component:Web_replyMessage,name:'replyMessage'},
      {path:'systemMessage',component:Web_systemMessage,name:'systemMessage'},
      {path:'personalMessage',component:Web_personalMessage,name:'personalMessage'},
    ]},

  //测试页面
  {path:'/test',component:Test, name:'test'},

  //用户文章修改页
  {path:'/article/update/:article_id',component:WriteArticle,name:'article_update'},
  //用户修改日记页面
  {path:'/diary/update/:diary_id',component:WriteDiary, name:'diary_update'},

  //用户文章编辑页
  {path:'/write/article',component:WriteArticle,name:'web_write_article'},
  //用户文章编辑页
  {path:'/write/diary',component:WriteDiary,name:'web_write_diary'},

  //意见反馈页
  {path:'/feedback',component:Web_feedBack, name:'web_feedback'},
  //个人博客页
  {path:'/home', component: Home, name:"home"},

  //登录页面
  {path: '/', component: Welcome,
    children:[
      //登录页
      {path:'login',component:Login, name:"login"},
      //注册页
      {path:'register' , component: Register , name:"register"}
    ]},

  //后台管理相关
  {path:"/ServiceController", component: Controller, name:"ServiceController",
    children:[
      //博客信息统计，待开发
      {path: 'blogState',component: BlogTotal,name:"service_blog_state"},
      //邮件发送，待开发
      {path: 'sendMessage',component: SendMssage,name:"service_send_message"},
      //用户管理
      {path: 'identityUser',component: Identity, name:"service_user_management"},
      //反馈信息管理
      {path: 'feedbackInfo',component: service_feedbackMessage,name:"service_feedback_management"},
      //链接管理
      {path: 'identityLink',component: service_management_link, name:"service_link_management"},
      //文章管理
      {path: 'articleManagement',component: Management_article, name:"service_article_management"},
      //评论管理，待开发
      {path: 'commentsManagement',component: Management_comments, name:"service_comments_management"},
      //空白页面
      {path: 'whitePage',component: White, name:"service_white_page"},
    ]},
  //404页面配置
  {path:'*',component:NotFound,name:'404'},

];

//  3.创建 router 实例，然后传‘routes’配置
//  还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  base:'/',
  mode:'history', //history去掉 '#' , hash 是有#的
  routes //缩写，相当于 routes: routes
});

export default router
