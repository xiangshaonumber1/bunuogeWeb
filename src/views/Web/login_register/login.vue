<template>
    <div id="login">
      <!-- 用户登录模块（默认模块） start -->
      <div class="login-form">

        <div class="form-logo text-center">
          <a @click="goIndex"><img src="/static/picture/getok-2.png"></a>
        </div>

        <div class="login-form-content">
          <div class="login-info-form">
            <p>
              <label style="color: white;">用户登录</label>
              <a class="go-register" @click="goRegister">立即注册</a>
            </p>
            <i-form :model="loginInfo">
              <form-item prop="username">
                <Input type="text" v-model="loginInfo.username" placeholder="在这里输入邮箱号" size="large"></Input>
              </form-item>

              <form-item prop="password">
                <Input type="password" v-model="loginInfo.password" placeholder="在这里输入您的密码" size="large" @on-enter="request_login"></Input>
              </form-item>

              <form-item>
                <span><a style="color: white;font-size: 16px;float: right">忘记密码？</a></span>
                <Button type="info" size="large" @click="request_login" long style="margin:10px 0;">
                  <span  style="color: white;font-size: 22px">登&emsp;录</span>
                </Button>
                <div class="text-center" style="margin-top: 20px;">
                  <span><a style="color:white;font-size: 16px" @click="goIndex">前往首页>></a></span>
                </div>
              </form-item>

            </i-form>
          </div>
        </div>

      </div>
      <!-- 用户登录模块（默认模块） end -->
    </div>
</template>

<script>
    export default {
        name: "login",
      data(){
        return {
          loginInfo:{
            username:'',
            password:''
          },
        };
      },
      methods:{
        //返回首页
        goIndex:function(){
          this.$router.push({name:'index'})
        },
        //前往注册
        goRegister(){
          this.$router.push({name:'register'})
        },
        //登录请求
        request_login(){
          if (this.loginInfo.username === null || this.loginInfo.username ===''
            || this.loginInfo.password === null || this.loginInfo.password ===''){
            return this.$Notice.error({
              title:'注意：',
              desc:'账号或密码不能用为空！'
            })
          }

          this.$apis.AuthenticationApi.login(this.loginInfo.username,this.loginInfo.password);

        }
      }
    }
</script>

<style scoped>

  .go-register{
    float: right;
    font-size: 20px;
    color:#0aac8e;
    font-family:cursive;
    font-weight: bold;
    text-decoration: none;
  }

  .login-form{
    background:rgba(102,139,139,0.3);
    /*border: 1px solid red;*/
    border-radius: 10px;
    padding: 20px 0;
  }

  .form-logo{
    margin: 15px 0;
  }

  .form-logo img{
    width: 60%;
  }

  .login-form-content{
    padding-left: 40px;
    padding-right: 40px;
  }

  .login-info-form label{
    font-size: 20px;
    font-family: cursive;
    color: #0aac8e;
  }

  .login-info-form span{
    color: red;
    font-size: 20px;
    font-weight: bold;
    font-family: cursive;
  }

</style>
