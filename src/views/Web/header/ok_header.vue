<template>
    <div class="ok-header">
        <!-- bootstrap 导航条 -->
        <b-navbar toggleable="lg"  style="padding: 0;background-color: white;" >
          <!--Iview 实现-->
          <Menu mode="horizontal">
            <img src="/static/picture/getok-2.png" alt="getok" style="height: 50px;background-color: white;">
          </Menu>

          <!--展开更多按钮-->
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <!-- bootstrap-vue 折叠导航栏 -->
          <b-collapse id="nav-collapse" is-nav >
            <!--导航栏菜单 Iview 实现-->
            <Menu mode="horizontal" style="width: 100%;">
              <!--顶部导航栏基本功能-->
              <div class="menu-common">
                <MenuItem name="1">
                  <a @click="goFeedBackMessage"><span>&emsp;意见反馈&ensp;</span></a>
                </MenuItem>
                <MenuItem name="2">
                  <a @click="goIndex"><span>&emsp;首页&ensp;</span></a>
                </MenuItem>
              </div>
              <!--搜索框-->
              <Input search v-model.trim="search_key_word" @on-search="goSearchResult(search_key_word)" placeholder="请输入关键字..." size="large" style="width: auto;margin-left: 20px" />
              <!--顶部导航栏登录用户功能-->
              <div v-if="$store.getters.isLogin" class="menu-user">
                <Dropdown style="float: left" placement="bottom" @on-click="to_user_function">
                  <a style="margin-right: 10px"><b-img :src="userInfo.avatar"  alt="none" rounded="circle" width="40px" height="40px"></b-img>&ensp;<Icon type="ios-arrow-down"/></a>
                  <DropdownMenu slot="list">
                    <DropdownItem name="userCenter"><Icon type="md-contact" size="20" /><span>&emsp;个人中心&emsp;</span></DropdownItem>
                    <DropdownItem name="userSetting"><Icon type="md-settings" size="20" /><span>&emsp;设置&emsp;</span></DropdownItem>
                    <DropdownItem name="userFeedback"><Icon type="md-chatboxes" size="20" /><span>&emsp;帮助和反馈&emsp;</span></DropdownItem>
                    <DropdownItem name="userExit"><Icon type="md-exit" size="20" /><span>&emsp;退出&emsp;</span></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <MenuItem name="4">
                  <Dropdown placement="bottom" @on-click="to_message_module">
                    <Badge :count="$store.getters.userInfo.replyMessageCount + $store.getters.userInfo.personalMessageCount + $store.getters.userInfo.systemMessageCount" :offset="[15,-5]">
                      <span style="height: 40px;width: 40px" class="text-center center-block mt-auto">&ensp;消息&ensp;</span>
                    </Badge>
                    <DropdownMenu slot="list" :padding="0">
                      <DropdownItem name="reply"><Badge :count="$store.getters.userInfo.replyMessageCount" /><span>&emsp;回复我的&emsp;</span></DropdownItem>
                      <DropdownItem name="personal"><Badge :count="$store.getters.userInfo.personalMessageCount" /><span>&emsp;我的消息&emsp;</span></DropdownItem>
                      <DropdownItem name="system"><Badge :count="$store.getters.userInfo.systemMessageCount" /><span>&emsp;系统通知&emsp;</span></DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </MenuItem>
                <MenuItem name="5">
                  <Badge :count="$store.getters.userInfo.markedActivityCount" dot :offset="[20,0]">
                    <span>&ensp;动态&ensp;</span>
                  </Badge>
                </MenuItem>
                <Button type="info" icon="md-create" size="large" @click="go_writeArticle" style="margin:0 5px 0 10px "><span>创作文章</span></Button>
                <Button type="success" icon="ios-paper" size="large" @click="go_writeDiary" style="margin: 0 10px 0 5px"><span>写笔记</span></Button>
              </div>
              <!--顶部导航栏游客功能-->
              <div v-else class="menu-guest" style="float: right">
                <Button type="text" ghost @click="to_sign_in()" style="margin:0 5px 0 10px "><span style="color: rgb(35, 201, 237);font-weight: bolder">立 即 登 录</span></Button>
                <Button type="success" style="background-color: rgb(0, 192, 145);font-weight: bolder;margin: 0 10px 0 5px" @click="to_sign_up"><span>免 费 注 册</span></Button>
              </div>
            </Menu>
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
          },
          // replyMessageCount:0,  //用户未读信息（评论回复类）
          // personalMessageCount:0, //我的消息，私聊类消息
          // systemMessageCount:0,  //系统发起的通知类消息
          // markedActivityCount:0, //关注用户的活动信息
        }
      },

      methods:{

        //前往消息模块
        to_message_module(type){
          switch (type) {
            //回复类消息
            case 'reply':
              this.$router.push({
                name:'replyMessage',
                params:{openID:this.$store.getters.openID,messageType:'reply'}
              });
              break;
            case 'personal':
              this.$router.push({
                name:'personalMessage',
                params:{openID:this.$store.getters.openID,messageType:'personal'}
              });
              break;
            case 'system':
              this.$router.push({
                name:'systemMessage',
                params:{openID:this.$store.getters.openID,messageType:'system'}
              });
              break;
            default:
              return;
          }
        },

        //前往意见反馈模块
        goFeedBackMessage(){
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
         // console.log("ok_header 当前routeName :",this.$route.name);
         this.menuActive = this.$route.name;
        },

        //获取未读消息数量
        async getUnreadMessage() {
          const result = await this.$apis.UserApi.getUnreadMessageCount();
          //同时保存到localstorage中，以便其消息中心需要显示
          this.$store.dispatch("SaveUnreadMessageCount",result);
        },

        //获取关注用户的动态消息，待完成
        getMarkerActivity(){

        }

      },


      async mounted() {

        this.userInfo = await this.$store.getters.userInfo;
        this.isLogin = await this.$store.getters.isLogin;

        //获取未读消息数量（这个可以考虑优化下，不用每次加载header就获取一次）
        this.getUnreadMessage();

        if (this.isLogin) {
          //如果用户有登录的话，再执行emit，去记录用户当前client信息，因为刷新也会执行
          this.$socket.emit("notification_connect", this.$store.getters.openID);
          this.sockets.subscribe('receive_article', (data) => {
            console.log("监听 receive_article 文章通知：", data)
          });
          this.sockets.subscribe('receive_connect', (data) => {
            console.log("监听 receive_connect：连接通知", data)
          });
          this.sockets.subscribe('notification_system_message', data => {
            console.log("监听到系统有发布新的系统消息", data);
            this.systemMessageCount++;
          });

          this.sockets.subscribe('notification_reply',() =>{
            console.log("监听到有新的回复消息，请注意查收！");
            this.$store.dispatch("addUnreadMessageCount","reply")
          })

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
    color: black;
  }

  span{
    font-size: 16px;
  }

  .ok-header{
    background-color: white;
  }

  .menu-user{
    float: right;
  }


</style>
