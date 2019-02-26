<template>
    <div id="ok-header">
      <Affix>
        <Row style="height: 60px;background-color: white;"  align="middle" class="code-row-bg index-top-affix" >

          <i-col span="24" class="top-info">
            <!-- logo -->
            <div>
              <img src="/static/picture/getok-2.png" style="height: 59px;" alt="img_none">
            </div>

            <!-- 导航栏 -->
            <div>
              <Menu mode="horizontal" theme="light" :active-name="menuActive" style="border: none">
                <MenuItem name="index" @click.native="goIndex"><span>首页</span></MenuItem>
                <MenuItem name="collection" @click.native="goCollections"><span>收藏</span></MenuItem>
                <MenuItem name="dynamic" @click.native="goDynamic"><span>动态</span></MenuItem>
              </Menu>
            </div>

            <!-- 搜索框 -->
            <div class="searchInput">
              <Input search enter-button="搜 索" v-model.trim="search_key_word"  size="large" style="margin-top: 11px" @on-search="goSearchResult(search_key_word)"></Input>
            </div>



            <!-- 个人信息 -->
            <div style="line-height: 60px;float: right;padding: 0 10px;" v-if="isLogin === 'true' ">

              <Dropdown placement="bottom" @on-click="to_user_function">
                <a style="text-decoration: none;line-height: 60px;">
                  <img :src="userInfo.avatar"  alt="none" class="img-circle" width="40px"/>
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="userCenter"><Icon type="md-contact" size="20" /><span>&emsp;个人中心&emsp;</span></DropdownItem>
                  <DropdownItem name="userSetting"><Icon type="md-settings" size="20" /><span>&emsp;设置&emsp;</span></DropdownItem>
                  <DropdownItem name="userManager"><Icon type="ios-cloudy" size="20" /><span>&emsp;管理中心&emsp;</span></DropdownItem>
                  <DropdownItem name="userFeedback"><Icon type="md-chatboxes" size="20" /><span>&emsp;帮助和反馈&emsp;</span></DropdownItem>
                  <DropdownItem name="userExit"><Icon type="md-exit" size="20" /><span>&emsp;退出&emsp;</span></DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div style="line-height: 60px;margin-left: 15px">
                <Button type="info" icon="md-create" size="large" @click="go_writeArticle"><span>创作文章</span></Button>
              </div>

              <div style="line-height: 60px;margin-left: 15px">
                <Button type="success" icon="ios-paper" size="large" @click="go_writeDiary"><span>写笔记</span></Button>
              </div>

            </div>

            <!-- 没有登录时显示 立即登录和 免费注册的按钮 -->
            <div style="line-height: 60px;float: right;padding: 0 10px;" v-else>
              <Button type="text" ghost @click="to_sign_in()"><span style="color: rgb(35, 201, 237);font-weight: bold">立即登录</span></Button>&emsp;
              <Button type="success" style="background-color: rgb(0, 192, 145);font-weight: bold;" @click="to_sign_up"><span>免费注册</span></Button>
            </div>

          </i-col>

        </Row>
      </Affix>
    </div>
</template>

<script>
    export default {
        name: "ok-header",
      data(){
        return {
          menuActive:"",
          isLogin:"false",//判断当前用户是否已经登录
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
              this.$router.push({name:'web_personal_info'});break;
            case 'userSetting'://前往用户设置
              this.$router.push({name:'userSetting'});break;
            case 'userManager'://前往管理中心
              this.$router.push({name:'userManager'});break;
            case 'userFeedback'://前往帮助与反馈
              this.$router.push({name:'web_feedback'});break;
            case 'userExit': // 注销当前登录
              const result = await this.$apis.AuthenticationApi.logout();
              if (result === 'success'){
                this.isLogin = 'false';
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

  #ok-header{

  }

  span{
    font-size: 16px;
  }

  .top-info div{
    float: left;
    /*border: 1px solid red;*/
  }

  .index-top-affix{
    border-bottom: 1px solid rgb(220, 222, 226);
  }


</style>
