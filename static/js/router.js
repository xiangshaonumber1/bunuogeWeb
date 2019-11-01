import Vue from 'vue'
import VueRouter from 'vue-router'

//全局安装路由功能
Vue.use(VueRouter);
//  1.定义（路由）组件

//主页内容
import App from '../../src/App'
import Index from '../../src/views/Web'

//loginRegisterInfo登录注册模块
import ModuleLoginRegister from '../../src/views/Web/loginRegisterModule/web_module_loginRegister'
import Register from '../../src/views/Web/loginRegisterModule/web_loginRegister_register'
import Login from '../../src/views/Web/loginRegisterModule/web_loginRegister_login'

//文章相关模块
import ArticleInfo from '../../src/views/Web/articleModule/web_article_info'
import ArticleEdit from '../../src/views/Web/articleModule/web_article_edit'
import ArticleCommentAndReply from '../../src/views/Web/articleModule/web_article_commentAndReply'

//日记相关模块
import DiaryInfo from '../../src/views/Web/diaryModule/web_diary_info'
import DiaryEdit from '../../src/views/Web/diaryModule/web_diary_edit'

//账号设置相关
import ModuleSetting from '../../src/views/Web/settingModule/web_module_setting'
import SettingPW from '../../src/views/Web/settingModule/web_setting_pw'

//用户信息相关模块
import ModuleUser from '../../src/views/Web/personalModule/web_module_user'
import UserArticles from '../../src/views/Web/personalModule/web_user_articles'
import UserDiaries from '../../src/views/Web/personalModule/web_user_diaries'
import UserInfo from '../../src/views/Web/personalModule/web_user_info'

//站内消息模块
import ModuleMessage from '../../src/views/Web/messageModule/web_module_message'
import MessageReply from '../../src/views/Web/messageModule/web_message_reply'
import MessageSystem from '../../src/views/Web/messageModule/web_message_system'
import MessagePersonal from '../../src/views/Web/messageModule/web_message_personal'

//其他独立模块
import Feedback from '../../src/views/Web/otherModule/web_feedback'
import Search from '../../src/views/Web/otherModule/web_searchInfo'
import MessageWall from '../../src/views/Web/otherModule/web_messageWall'
import NotFound from '../../src/views/Web/otherModule/404'

//后台管理相关模块
import ServiceController from '../../src/views/Service/ServiceController'
import ManagementSystemMessage from '../../src/views/Service/components/service_management_systemMessage'
import ManagementUser from '../../src/views/Service/components/service_management_user'
import ManagementLink from '../../src/views/Service/components/service_management_link'
import ManagementFeedback from '../../src/views/Service/components/service_management_feedback'
import ManagementArticle from '../../src/views/Service/components/service_management_article'
import ManagementComments from '../../src/views/Service/components/service_management_comments'

//  2.定义路由
//  每个路由应该映射一个组件
const routes = [
  //首页
  {path:'/', component: App,children:[
      //首页详情，默认子组件
      {path:'/',component:Index, name:'index'},
      //留言墙
      {path:'message_wall',component:MessageWall, name:'message_wall'},
      //搜索详情
      {path:'search/:key_word',component:Search, name:'search'},
      //用户信息相关
      {path:'user_about/:open_id',component:ModuleUser,
        children:[
          {path: 'user_info', component: UserInfo, name:"user_info"},                 //用户信息页面(可公开信息)
          {path: 'user_articles', component: UserArticles, name:"user_articles"},        //用户文章数据页
          {path: 'user_diaries', component: UserDiaries, name:"user_diaries"},           //用户文章日记页(只显示作者设置为公开的)
        ]},
      //用户设置相关
      {path:'setting/:open_id',component:ModuleSetting,                                       //个人设置的导航页
        children:[
          {path: 'update_pd', component:SettingPW, name:"update_pd"},     //修改密码
        ]},

      //文章详情
      {path:"article_info/",component:ArticleInfo,
        children:[
          //默认子组件，父组件不需要name
          {path:':article_id&:open_id', component:ArticleCommentAndReply,  name:'article_info'}
        ]},

      //日记详情页面
      {path:"diary/:diary_id",component:DiaryInfo}

    ]},

  //消息通知模块
  {path:'/message/:openID',component:ModuleMessage,
    children:[
      {path:'replyMessage',component:MessageReply,name:'replyMessage'},
      {path:'systemMessage',component:MessageSystem,name:'systemMessage'},
      {path:'personalMessage',component:MessagePersonal,name:'personalMessage'},
    ]},

  //用户文章编辑页
  {path:'/write/article',component:ArticleEdit,name:'write_article'},
  //用户文章修改页
  {path:'/article/update/:article_id',component:ArticleEdit,name:'article_update'},

  //用户文章编辑页
  {path:'/write/diary',component:DiaryEdit,name:'write_diary'},
  //用户修改日记页面
  {path:'/diary/update/:diary_id',component:DiaryEdit, name:'diary_update'},



  //意见反馈页
  {path:'/feedback',component:Feedback, name:'feedback'},

  //登录注册模块
  {path: '/', component: ModuleLoginRegister,
    children:[
      //登录页
      {path:'login',component: Login, name:"login"},
      //注册页
      {path:'register' , component: Register , name:"register"}
    ]},

  //后台管理相关
  {path:"/ServiceController", component: ServiceController, name:"ServiceController",
    children:[
      //博客信息统计，待开发
      // {path: 'blogState',component: BlogTotal,name:"service_blog_state"},
      //系统消息发送，待完善
      {path: 'system_message_management',component: ManagementSystemMessage,name:"system_message_management"},
      //用户管理
      {path: 'user_management',component: ManagementUser, name:"user_management"},
      //反馈信息管理
      {path: 'feedback_management',component: ManagementFeedback,name:"feedback_management"},
      //链接管理
      {path: 'link_management',component:ManagementLink, name:"link_management"},
      //文章管理
      {path: 'article_management',component: ManagementArticle, name:"article_management"},
      //评论管理，待开发
      // {path: 'comments_management',component: ManagementComments, name:"comments_management"},
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
