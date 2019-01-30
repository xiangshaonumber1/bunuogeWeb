<template>
  <div id="register">
    <!-- 用户注册模块 start -->

    <div class="register-form">

      <div class="form-logo text-center">
        <a @click="goIndex"><img src="/static/picture/ok_blog_logo.png"></a>
      </div>

      <div class="register-form-content">
        <p>
          <label style="color: white;">新用户注册</label>
          <a class="go-login" @click="goLogin">前往登录</a>
        </p>

        <i-form label-position="left" :model="registerInfo" :label-width="100" class="formRegister">

          <form-item label="邮箱">
            <Input type="text" v-model="registerInfo.email" placeholder="请输入工作邮箱" size="large"></Input>
          </form-item>

          <form-item label="邮箱验证">
            <Input type="text" placeholder="请输入邮箱验证码" size="large">
              <Button type="text" slot="append">
                <strong style="color:#0aac8e;font-weight: normal;font-size:14px;">获取验证码</strong>
              </Button>
            </Input>
          </form-item>

          <form-item label="密码">
            <Input type="password" placeholder="密码不少于6位" size="large"></Input>
          </form-item>

          <form-item label="确认密码">
            <Input type="password" placeholder="请再次输入密码" size="large"></Input>
          </form-item>

            <Button type="info" style="background-color: rgb(0, 192, 145);border: none;margin:20px 0;" long>
              <span style="font-size: 20px">注&emsp;册</span>
            </Button>

        </i-form>

      </div>

    </div>
    <!-- 用户注册模块 end -->






  </div>
</template>

<script>
    export default {
        name: "register",
      data() {
        return {
          registerInfo:{
            email:'',
            emailCode:'',
            password:'',
            checkPassword:'',
          },
          formLeft: {
            input1: '',
            input2: '',
            input3: ''
          },
        }
      },
      methods:{
        //返回首页
        goIndex:function(){
          this.$router.push({name:'index'})
        },
        //前往登录
        goLogin(){
          this.$router.push({name:'login'})
        },
      }
    }
</script>

<style scoped>

  label{
    color: white;
  }

  .go-login{
    float: right;
    font-size: 20px;
    color:#0aac8e;
    font-family:'简楷体',serif;
    font-weight: bold;
    text-decoration: none;
  }

  .register-form{
    background:rgba(102,139,139,0.5);
    border: 1px solid blue;
  }

  .form-logo{
    margin: 20px 0;
  }

  .form-logo img{
    width: 40%;
  }

  .register-form-content{
    padding-left: 40px;
    padding-right: 40px;
  }

  .register-form-content label{
    font-size: 20px;
    font-family: "简楷体", cursive;
    color: #0aac8e;
  }
</style>
