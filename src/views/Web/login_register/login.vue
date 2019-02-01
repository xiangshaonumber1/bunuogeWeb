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
              <form-item prop="ruleUsername">
                <Input type="text" v-model="loginInfo.username" placeholder="在这里输入邮箱号" size="large"></Input>
              </form-item>

              <form-item prop="rulePassword">
                <Input type="password" v-model="loginInfo.password" placeholder="在这里输入您的密码" size="large"></Input>
              </form-item>

              <form-item>
                <span><a style="color: white;font-size: 16px;float: right">忘记密码？</a></span>
                <Button type="info" size="large" long style="margin:10px 0;">
                  <span  style="color: white;font-size: 20px" @click="request_login">登&emsp;录</span>
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
      data: function () {

        const validateUsername = (rule, value, callback) => {
          if (value ===null || value==='') {
            callback(new Error("账号不能为空!"))
          }else {
            callback();
          }
        };

        const validatePassword = (rule, value, callback) => {
          if (value===null || value==='') {
            callback(new Error("密码不能为空!"))
          }else {
            callback();
          }
        };

        return {
          loginInfo:{
            username:'',
            password:''
          },
          ruleLogin: {
            rulePassword: [
              {validator: validatePassword, trigger: 'blur'}
            ],
            ruleUsername: [
              {validator: validateUsername, trigger: 'blur'}
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
        //登录请求
        request_login(){
          console.log("username：",this.loginInfo.username,"password：",this.loginInfo.password)
          this.$axios({
            methods: 'post',
            url:'Authentication/login',
            data:{
              username:this.loginInfo.username,
              password:this.loginInfo.password,
            }
          }).then((response)=>{ //这里使用了 ES6 的语法
            console.log("返回的数据:",response)
          }).catch((error)=>{
            console.log("error 中的是：",error)
          })
        }
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
    background:rgba(102,139,139,0.3);
    /*border: 1px solid red;*/
    border-radius: 10px;
    padding: 20px 0;
  }

  .form-logo{
    margin: 15px 0;
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
