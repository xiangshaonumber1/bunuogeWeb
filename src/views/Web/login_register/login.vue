<template>
    <div id="login">
      <!-- 用户登录模块（默认模块） start -->
      <div class="login-form">

        <div class="form-logo text-center">
          <a @click="goIndex"><img src="/static/picture/ok_blog_logo.png"></a>
        </div>

        <div class="login-form-content">
          <div class="login-info-form">
            <p>
              <label style="color: white;">用户登录</label>
              <a class="go-register" @click="goRegister">立即注册</a>
            </p>
            <i-form :rules="ruleLogin" :model="loginInfo">
              <form-item prop="ruleAccount">
                <Input type="text" v-model="loginInfo.account" placeholder="在这里输入邮箱号" size="large"></Input>
              </form-item>

              <form-item prop="rulePassword">
                <Input type="password" v-model="loginInfo.password" placeholder="在这里输入您的密码" size="large"></Input>
              </form-item>

              <form-item>
                <span><a style="color: white;font-size: 16px;float: right">忘记密码？</a></span>
                <Button type="info" size="large" long style="margin:10px 0;">
                  <span  style="color: white;font-size: 20px">登&emsp;录</span>
                </Button>
                <div class="text-center" style="margin-top: 20px;margin-bottom: 20px">
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
      data: function () {

        const validateAccount = (rule, value, callback) => {
          if (!value) {
            callback(new Error("账号不能为空!"))
          }else {
            callback();
          }
        };

        const validatePassword = (rule, value, callback) => {
          if (!value) {
            callback(new Error("密码不能为空!"))
          }else {
            callback();
          }
        };

        return {
          loginInfo:{
            account:'',
            password:''
          },
          ruleLogin: {
            rulePassword: [
              {validator: validatePassword, trigger: 'blur'}
            ],
            ruleAccount: [
              {validator: validateAccount, trigger: 'blur'}
            ]
          }
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
      }
    }
</script>

<style scoped>

  .go-register{
    float: right;
    font-size: 20px;
    color:#0aac8e;
    font-family:'简楷体',serif;
    font-weight: bold;
    text-decoration: none;
  }

  .login-form{
    /*float: right;*/
    /*width: 25vw;*/
    background:rgba(102,139,139,0.5);
    /*margin-right: 10vw;*/
    /*max-height: 80vh;*/
    /*margin-top: 15vh;*/
    border: 1px solid red;
  }

  .form-logo{
    margin: 20px 0;
  }

  .form-logo img{
    width: 40%;
  }

  .login-form-content{
    padding-left: 40px;
    padding-right: 40px;
  }

  .login-info-form label{
    font-size: 20px;
    font-family: "简楷体", cursive;
    color: #0aac8e;
  }

  .login-info-form span{
    color: red;
    font-size: 20px;
    font-weight: bold;
    font-family: "简楷体", cursive;
  }

</style>
