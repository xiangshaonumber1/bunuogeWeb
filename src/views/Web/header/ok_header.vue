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
                <MenuItem name="index" @click.native="goIndex" ><span>首页</span></MenuItem>
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
                  <DropdownItem name="userInfo"><Icon type="md-contact" size="20" /><span>&emsp;个人中心&emsp;</span></DropdownItem>
                  <DropdownItem name="userSetting"><Icon type="md-settings" size="20" /><span>&emsp;设置&emsp;</span></DropdownItem>
                  <DropdownItem name="userManager"><Icon type="ios-cloudy" size="20" /><span>&emsp;管理中心&emsp;</span></DropdownItem>
                  <DropdownItem name="userFeedback"><Icon type="md-chatboxes" size="20" /><span>&emsp;帮助和反馈&emsp;</span></DropdownItem>
                  <DropdownItem name="userExit"><Icon type="md-exit" size="20" /><span>&emsp;退出&emsp;</span></DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div style="line-height: 60px;padding-left: 15px">
                <Button type="info" icon="md-create" ghost size="large" @click="go_writeArticle"> <Icon type="" size="25" color="blue" />创作文章</Button>
              </div>

            </div>

            <!-- 登录注册提示 -->
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
          console.log("ok_header goSearchResult key_word :",key_word);
          if (key_word !== null && key_word.length>=2){
            //新建窗口跳转
            // let SearchInfo = this.$router.resolve({
            //   path:"/search/"+key_word+""
            // });
            // window.open(SearchInfo.href,'_blank');
            this.$store.dispatch("saveSearchKey",key_word);
            this.$router.push({
              name:"search",
              params:{
                key_word:key_word,
              }
            });
            console.log("goSearchResult 完成");
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
            case 'userInfo'://前往个人信息
              this.$router.push({name:'userInfo'});break;
            case 'userSetting'://前往用户设置
              this.$router.push({name:'userSetting'});break;
            case 'userManager'://前往管理中心
              this.$router.push({name:'userManager'});break;
            case 'userFeedback'://前往帮助与反馈
              this.$router.push({name:'feedback'});break;
            case 'userExit': // 注销当前登录
              const result = await this.$apis.AuthenticationApi.logout();
              console.log("返回的结果:",result);
              if (result === 'success'){
                this.$store.dispatch("clearLoginInfo");
                this.isLogin = 'false';
                this.$Notice.success({
                  title:'操作结果：',
                  desc:'用户登出成功'
                });
                this.$router.push({name:"index"});
              }else{
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
          this.$router.push({path:'/write/article'})
        },


      },

      mounted() {
        let key_word = this.$store.getters.searchKey;
        this.userInfo = this.$store.getters.userInfo;
        this.isLogin = this.$store.getters.isLogin;
        // if (this.isLogin === 'true'){
        //   this.$Message.success({
        //     content:"欢迎来到ok博客，把所有烦恼都忘掉，静下来感受知识的力量吧！",
        //     duration:4
        //   })
        // }
        this.search_key_word = key_word;
      },

      updated() {

      }

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
