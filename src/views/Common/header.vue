<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="CommonHeader">
        <b-navbar toggleable="lg" type="light" style="background-color: white">
          <b-navbar-brand href="#">布诺阁</b-navbar-brand>
          <!--界面过小时，用于展开更多按钮-->
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>

            <b-navbar-nav>
              <b-nav-item class="mr-2" @click="whereGo('feedback')">意见反馈</b-nav-item>
              <b-nav-item class="mr-2" @click="whereGo('index')">首页</b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav>
              <b-nav-form>
                <Input search v-model.trim="searchKeyWord" @on-search="goSearchResult(searchKeyWord)" placeholder="请输入搜索关键字..." />
              </b-nav-form>
            </b-navbar-nav>

            <!--用户已登录功能栏-->
            <b-navbar-nav v-if="true" class="ml-auto">
              <b-button variant="outline-info">文稿创作</b-button>
              <!--用户快捷导航-->
              <b-nav-item-dropdown variant="b-popover-dark">
                <template v-slot:button-content>小博主_1654654651354</template>
                <b-dropdown-item>我的主页</b-dropdown-item>
                <b-dropdown-item>账户安全</b-dropdown-item>
                <b-dropdown-item>设置</b-dropdown-item>
                <b-dropdown-item>帮助和反馈</b-dropdown-item>
                <b-dropdown-item>退出</b-dropdown-item>
              </b-nav-item-dropdown>
              <!--用户消息-->
              <b-nav-item-dropdown text="消息">
                <b-dropdown-item href="#"><Badge :count="$store.getters.userInfo.replyMessageCount"/> 动态信息</b-dropdown-item>
                <b-dropdown-item href="#"><Badge :count="$store.getters.userInfo.personalMessageCount"/> 我的消息</b-dropdown-item>
                <b-dropdown-item href="#"><Badge :count="$store.getters.userInfo.systemMessageCount"/> 系统消息</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

            <!--未登录功能栏-->
            <b-navbar-nav v-else class="ml-auto">
              <b-button variant="outline-success" class="mx-2">注册</b-button>
              <b-button variant="outline-dark" class="mx-2">登录</b-button>
            </b-navbar-nav>

          </b-collapse>
        </b-navbar>

    </div>
</template>

<script>
    export default {
        name: "CommonHeader",
      data(){
        return {
          searchKeyWord:'',//搜索框关键字
          userInfo:{
            openID:'',//用户ID
            nickname:'',//用户昵称
            avatar:'',//用户头像地址
            token:'',//用户登录后持有的token
          },
        }
      },

      methods:{

        /*************************************************** 搜索暂行解决方法（新建窗口跳转）********************************************************/
        //前往搜索结果页面
        goSearchResult(key_word){
          if (key_word !== null && key_word.length>=2){
            this.$router.push({
              name:"search",
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
              this.$router.push({name:'user_info',params:{open_id:this.$store.getters.openID}});break;
            case 'userSetting'://前往用户设置，默认展示账号信息
              this.$router.push({name:'update_pd',params:{open_id:this.$store.getters.openID}});break;
            // case 'userManager'://前往管理中心
            //   this.$router.push({name:'userManager'});break;
            case 'userFeedback'://前往帮助与反馈
              this.$router.push({name:'feedback'});break;
            case 'userExit': // 注销当前登录
              const result = await this.$apis.AuthenticationApi.logout();
              if (result){
                this.$store.dispatch("clearLoginInfo");
                this.$router.push({name:"index"});
              }else {
                this.$Notice.error({
                  title:'操作结果：',
                  desc:'用户登出失败'
                });
              }
              break;
          }
        },

        //前往文章创作版块
        go_writeArticle(){
          this.$router.push({name:'write_article'})
        },

        //前往笔记创作页面
        go_writeDiary(){
          this.$router.push({name:'write_diary'})
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

      },


      async mounted() {

        this.userInfo = await this.$store.getters.userInfo;
        this.isLogin = await this.$store.getters.isLogin;

        if (this.isLogin) {
          //获取未读消息数量（这个可以考虑优化下，不用每次加载header就获取一次）
          this.getUnreadMessage();

          //如果用户有登录的话，再执行emit，去记录用户当前client信息，因为刷新也会执行
          this.$socket.emit("notification_connect", this.$store.getters.openID);
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
  .CommonHeader{
    padding: 0 10vw;
    background-color: white;
  }

</style>
