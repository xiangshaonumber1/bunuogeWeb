<template>
    <div class="ok-header">
        <!-- bootstrap 导航条 -->
        <b-navbar toggleable="lg"  type="light" variant="light" fixed="top" style="border-bottom: 1px solid lightgray;padding: 4px 0">
          <b-navbar-brand @click="goIndex">
            <img src="/static/picture/getok-2.png" alt="getok" style="height: 50px;">
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <!-- 左对齐导航项 -->
            <b-navbar-nav class="navbar-header-left">
              <b-nav-item @click="goFeedBackMessage">&emsp;意见反馈&ensp;</b-nav-item>
              <b-nav-item @click="goIndex">&ensp;首页&emsp;</b-nav-item>
              <!--搜索框-->
              <b-nav-form>
                <Input search enter-button="搜 索" v-model.trim="search_key_word" @on-search="goSearchResult(search_key_word)" size="large"></Input>
              </b-nav-form>
            </b-navbar-nav>

            <!-- 右对齐导航项 -->
            <b-navbar-nav v-if="$store.getters.isLogin" class="navbar-header-right ml-auto">

              <!-- 个人信息 -->
              <b-nav-form>
                <Dropdown placement="bottom" @on-click="to_user_function">
                  <a><b-img :src="userInfo.avatar"  alt="none" rounded="circle" width="40px" height="40px"></b-img>&nbsp;<Icon type="ios-arrow-down"></Icon></a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="userCenter"><Icon type="md-contact" size="20" /><span>&emsp;个人中心&emsp;</span></DropdownItem>
                    <DropdownItem name="userSetting"><Icon type="md-settings" size="20" /><span>&emsp;设置&emsp;</span></DropdownItem>
                    <DropdownItem name="userFeedback"><Icon type="md-chatboxes" size="20" /><span>&emsp;帮助和反馈&emsp;</span></DropdownItem>
                    <DropdownItem name="userExit"><Icon type="md-exit" size="20" /><span>&emsp;退出&emsp;</span></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </b-nav-form>

              <!--消息通知 注:m-auto 垂直居中-->
              <b-nav-item class="m-auto">
                <Dropdown placement="bottom">
                  <span>&emsp;消息&ensp;</span>
                  <DropdownMenu slot="list">
                    <DropdownItem name="userCenter"><span>&emsp;回复我的&emsp;</span></DropdownItem>
                    <DropdownItem name="userCenter"><span>&emsp;我的消息&emsp;</span></DropdownItem>
                    <DropdownItem name="userCenter"><span>&emsp;系统通知&emsp;</span></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </b-nav-item>
              <!--动态-->
              <b-nav-item class="m-auto">
                <span>&ensp;动态&emsp;</span>
              </b-nav-item>
              <b-nav-item class="m-auto">
                <Button type="info" icon="md-create" size="large" @click="go_writeArticle"><span>创作文章</span></Button>
              </b-nav-item>
              <b-nav-item class="m-auto">
                <Button type="success" icon="ios-paper" size="large" @click="go_writeDiary"><span>写笔记</span></Button>
              </b-nav-item>
            </b-navbar-nav>

            <!-- 没有登录时显示 立即登录和 免费注册的按钮 -->
            <b-navbar-nav v-else class="ml-auto">
              <b-nav-item>
                <Button type="text" ghost @click="to_sign_in()"><span style="color: rgb(35, 201, 237);font-weight: bolder">立 即 登 录</span></Button>&emsp;
              </b-nav-item>
              <b-nav-item>
                <Button type="success" style="background-color: rgb(0, 192, 145);font-weight: bolder;" @click="to_sign_up"><span>免 费 注 册</span></Button>
              </b-nav-item>
            </b-navbar-nav>

          </b-collapse>

        </b-navbar>
    </div>
</template>

<script>
    export default {
        name: "ok-header",
      data(){
        return {
          menuActive:"",
          search_key_word:null,//搜索框关键字
          userInfo:{
            openID:'',//用户ID
            nickname:'',//用户昵称
            avatar:'',//用户头像地址
            token:'',//用户登录后持有的token
          }
        }
      },

      methods:{

        goFeedBackMessage(){
          // this.$Notice.info({
          //   title: '敬请期待：',
          //   desc: '非常抱歉，该模块尚在构建中，暂时无法使用，敬请期待'
          // })
          this.$router.push({name:'web_feedback'});
        },
        //前往本站的留言墙
        goMessage_wall(){
          this.$router.push({name:'message_wall'})
        },
          //前往首页
        goIndex(){
          this.$router.push({name:'index'});
        },

        //前往我的收藏页
        goCollections(){
          this.$Notice.info({
            title: '敬请期待：',
            desc: '非常抱歉，该模块尚在构建中，暂时无法使用，敬请期待'
          })
        },

        //获取关注对象的动态信息
        goDynamic(){
          this.$Notice.info({
            title: '敬请期待：',
            desc: '非常抱歉，该模块尚在构建中，暂时无法使用，敬请期待'
          })
        },

        //进行登录
        to_sign_in(){
          this.$router.push({name:'login'});
        },

        //进行注册
        to_sign_up(){
          this.$router.push({name:'register'});
        },

        /*************************************************** 搜索暂行解决方法（新建窗口跳转）********************************************************/
        //前往搜索结果页面
        goSearchResult(key_word){
          if (key_word !== null && key_word.length>=2){
            this.$router.push({
              name:"web_search",
              params:{
                key_word:key_word,
              }
            });
          }else {
              this.$Message.warning({
                content:"搜索的关键字不能低于2位有效字符",
                duration:4
              })
          }
        },
        /**************************************************** 搜索暂行解决方法（新建窗口跳转）************************************************************/

        //用户功能
       async to_user_function(item_name){
          switch (item_name) {
            case 'userCenter'://前往个人信息
              this.$router.push({name:'web_userInfo',params:{open_id:this.$store.getters.openID}});break;
            case 'userSetting'://前往用户设置，默认展示账号信息
              this.$router.push({name:'update_password',params:{open_id:this.$store.getters.openID}});break;
            // case 'userManager'://前往管理中心
            //   this.$router.push({name:'userManager'});break;
            case 'userFeedback'://前往帮助与反馈
              this.$router.push({name:'web_feedback'});break;
            case 'userExit': // 注销当前登录
              const result = await this.$apis.AuthenticationApi.logout();
              if (result === 'success'){
                this.$store.dispatch("clearLoginInfo");
                this.$router.push({name:"index"});
              }
              break;
          }
        },

        //前往文章创作版块
        go_writeArticle(){
          this.$router.push({name:'web_write_article'})
        },

        //前往笔记创作页面
        go_writeDiary(){
          this.$router.push({name:'web_write_diary'})
        },

        //获取当前routeName,并赋值给menuActive
        getRouteName(){
         console.log("ok_header 当前routeName :",this.$route.name);
         this.menuActive = this.$route.name;
        },

        //获取我的未读‘回复我的’类消息，待完成
        getUnreadReply(){

        },

        //获取我的未读‘我的消息’类通知，待完成
        getMyMessage(){

        },

        //获取我的未读‘系统通知’类通知，待完成
        getSystemMessage(){

        },

        //获取关注用户的动态消息，待完成
        getMarkerActivity(){

        }

      },


      mounted() {

        this.userInfo = this.$store.getters.userInfo;
        this.isLogin = this.$store.getters.isLogin;

        if (this.isLogin) {
          //如果用户有登录的话，再执行emit，去记录用户当前client信息，因为刷新也会执行
          // this.$socket.emit("connect",this.$store.getters.openID);
          this.$socket.emit("notification_connect",this.$store.getters.openID);
          this.sockets.subscribe('receive_article',(data)=>{
            console.log("监听 receive_article 文章通知：",data)
          });
          this.sockets.subscribe('receive_connect',(data)=>{
            console.log("监听 receive_connect：连接通知",data)
          });
        }
        //监听当前访问路径
        this.getRouteName();
      },

      beforeRouteEnter(to, from, next) {
        next(vm => {
          //因为当钩子执行前，组件实例还没被创建
          // vm 就是当前组件的实例相当于上面的 this，所以在 next 方法里你就可以把 vm 当 this 来用了。
          console.log(vm);//当前组件的实例
        });
      },

      watch: {
          //这里表示 监听 ‘$route’的值，如果值发生变化，执行函数getRouteName
        "$route":"getRouteName"
      },


    }
</script>

<style scoped>

  a{
    text-decoration: none;
  }

  span{
    font-size: 16px;
  }

  .navbar-header-left li{
    margin-right: 10px;
  }

  .ok-header{
    margin-top:100px;
  }


</style>
