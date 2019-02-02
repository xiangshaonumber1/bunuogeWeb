<template>
    <div id="ok-header">
      <Affix>
        <Row style="height: 60px;background-color: white;"  align="middle" class="code-row-bg index-top-affix" >

          <i-col span="24" class="top-info">
            <!-- logo -->
            <div>
              <img src="/static/picture/ok_blog_logo.png" style="height: 60px;" alt="img_none">
            </div>

            <!-- 导航栏 -->
            <div>
              <Menu mode="horizontal" theme="light" :active-name="menuActive" style="border: none">
                <MenuItem name="index"><span>首页</span></MenuItem>
                <MenuItem name="collection"><span>收藏</span></MenuItem>
                <MenuItem name="recommend"><span>推荐</span></MenuItem>
              </Menu>
            </div>

            <!-- 搜索框 -->
            <div>
              <form class="navbar-form navbar-left" style=";line-height: 60px;margin: 0;padding:0 15px;">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-info" style="margin-left: 15px">搜索</button>
              </form>
            </div>

            <!-- 个人信息 -->
            <div style="line-height: 60px;float: right;padding: 0 10px;" v-if="isLogin === 'true' ">

              <Dropdown placement="bottom" @on-click="to_user_function">
                <a style="text-decoration: none;line-height: 60px;">
                  <img src="https://i.loli.net/2017/08/21/599a521472424.jpg"  alt="none" class="img-circle" width="40px"/>
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
                <Button type="info" icon="md-create" ghost size="large"> <Icon type="" size="25" color="blue" />创作文章</Button>
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
          userInfo:{
            openID:null,//用户ID
            nickname:null,//用户昵称
            avatar:null,//用户头像地址
            token:null,//用户登录后持有的token
          }
        }
      },
      methods:{
        to_sign_in(){//进行登录
          this.$router.push({name:'login'});
        },
        to_sign_up(){//进行注册
          this.$router.push({name:'register'});
        },
        to_user_function(item_name){
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
              this.$store.dispatch("clearLoginInfo");
              this.isLogin = 'false';
              this.$Notice.success({
                title:'操作结果：',
                desc:'用户登出成功'
              });
              this.$router.push({name:"index"});
              break;
          }
        }
      },
      mounted() {
        this.userInfo = this.$store.getters.userInfo;
        this.isLogin = this.$store.getters.isLogin;
        if (this.isLogin === 'true'){
          this.$Message.success({
            content:"欢迎来到ok博客，把所有烦恼都忘掉，静下来感受知识的力量吧！",
            duration:4
          })
        }
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
