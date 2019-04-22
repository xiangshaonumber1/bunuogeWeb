<template>
    <div id="ok-header">
      <Affix>
        <nav class="navbar navbar-default" style="background-color: white;border: none;border-radius:0;border-bottom: 1px solid lightgrey">
          <!--品牌图标-->
          <div class="navbar-header navbar-left">
            <!--Logo-->
            <a class=" navbar-left" @click="goIndex">
              <img src="/static/picture/getok-2.png" alt="Brand" style="height: 60px">
            </a>
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <Icon type="md-menu" />
            </button>
          </div>

          <!-- 导航栏快捷菜单内容 -->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <!--快捷导航菜单-->
            <Menu class="navbar-left" mode="horizontal" theme="light" :active-name="menuActive" >
              <MenuItem name="web_feedback" @click.native="goFeedBackMessage"><span>意见反馈</span></MenuItem>
              <!--<MenuItem name="message_wall" @click.native="goMessage_wall"><span>留言墙</span></MenuItem>-->
              <MenuItem name="index" @click.native="goIndex" ><span>首页</span></MenuItem>
              <!--<MenuItem name="collection" @click.native="goCollections"><span>收藏</span></MenuItem>-->
              <!--<MenuItem name="dynamic" @click.native="goDynamic"><span>动态</span></MenuItem>-->
            </Menu>

            <!--搜索框-->
            <div class="navbar-left container-fluid" style="height: 60px;padding-top: 3px">
              <Input class="navbar-btn" search enter-button="搜 索" v-model.trim="search_key_word" size="large" @on-search="goSearchResult(search_key_word)"></Input>
            </div>

            <!-- 1.靠右的用户信息和写作快捷导航 / 2.靠右的登录注册提示-->
            <div class="navbar-right" style="margin-right: 10px; height:60px;padding-top: 3px;">
              <!-- 个人信息 -->
              <div v-if="$store.getters.isLogin">
                <Dropdown placement="bottom" @on-click="to_user_function">
                  <a><img :src="userInfo.avatar"  alt="none" class="img-circle" width="40px" height="40px"/>&nbsp;<Icon type="ios-arrow-down"></Icon></a>&emsp;
                  <DropdownMenu slot="list">
                    <DropdownItem name="userCenter"><Icon type="md-contact" size="20" /><span>&emsp;个人中心&emsp;</span></DropdownItem>
                    <DropdownItem name="userSetting"><Icon type="md-settings" size="20" /><span>&emsp;设置&emsp;</span></DropdownItem>
                    <!--<DropdownItem name="userManager"><Icon type="ios-cloudy" size="20" /><span>&emsp;管理中心&emsp;</span></DropdownItem>-->
                    <DropdownItem name="userFeedback"><Icon type="md-chatboxes" size="20" /><span>&emsp;帮助和反馈&emsp;</span></DropdownItem>
                    <DropdownItem name="userExit"><Icon type="md-exit" size="20" /><span>&emsp;退出&emsp;</span></DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Button class="navbar-btn" type="info" icon="md-create" size="large" @click="go_writeArticle"><span>创作文章</span></Button>
                <Button class="navbar-btn" type="success" icon="ios-paper" size="large" @click="go_writeDiary"><span>写笔记</span></Button>
              </div>
              <!-- 没有登录时显示 立即登录和 免费注册的按钮 -->
              <div v-else>
                <Button class="navbar-btn" type="text" ghost @click="to_sign_in()"><span style="color: rgb(35, 201, 237);font-weight: bolder">立 即 登 录</span></Button>&emsp;
                <Button class="navbar-btn" type="success" style="background-color: rgb(0, 192, 145);font-weight: bolder;" @click="to_sign_up"><span>免 费 注 册</span></Button>
              </div>
            </div>
          </div>

        </nav>
      </Affix>
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
        }

      },

      mounted() {
        this.userInfo = this.$store.getters.userInfo;
        console.log("当前头像地址",this.userInfo.avatar);
        this.isLogin = this.$store.getters.isLogin;
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

</style>
