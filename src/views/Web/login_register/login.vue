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
                <span><a style="color: white;font-size: 16px;float: right" @click="forgotPasswordClick">忘记密码？</a></span>
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

      <!--点击忘记密码对话框-->

        <Modal v-model="forgotPasswordModal"  footer-hide :mask-closable="false" title="申请重置密码">

            <Form :model="resetPasswordInfo" label-position="left" :label-width="100">
              <form-item label="重置账号">
                <Input type="text" v-model="resetPasswordInfo.username" placeholder="请输入您的账号"></Input>
              </form-item>
              <form-item label="绑定邮箱">
                <Input type="text" v-model="resetPasswordInfo.email" placeholder="请输入您的绑定邮箱......"></Input>
              </form-item>
              <form-item label="邮箱验证码">
                <Input type="text" v-model="resetPasswordInfo.emailCode" placeholder="请输入验证码......">
                  <Button slot="append" type="primary" style="background-color: lightskyblue" @click="getEmailCode(resetPasswordInfo.email)">获取验证码</Button>
                </Input>
              </form-item>
              <Button class="center-block" type="primary" size="large" @click="resetPassword">确认并验证</Button>
            </Form>
          <spin v-if="loading_reset" fix></spin>
        </Modal>


    </div>
</template>

<script>
    export default {
        name: "login",
      data: function () {
        return {
          loginInfo: {
            username: '',
            password: ''
          },
          forgotPasswordModal: false, //忘记密码对话框
          loading_reset: false, //重置等待
          resetPasswordInfo: {  //重置密码确认信息
            username: '', //用户名（账号）
            email: '',  //用户绑定邮箱
            emailCode: '',  //邮箱验证码
          }
        };
      },
      methods:{

        //请求获取新的验证码到指定邮箱
        getEmailCode(email){
          console.log("目标邮箱：",email);
          this.$apis.UserApi.mailCode(email,"emailReset")
        },

          //通过验证，重置密码
        async resetPassword() {
          //这里还要对表单元素做检查

          /**
           * 待完成...............................
           */

          this.loading_reset = true;  //设置spin加载中
          const result = await this.$apis.CommonApi.resetPassword(this.resetPasswordInfo.username,this.resetPasswordInfo.email,this.resetPasswordInfo.emailCode);
          if (result){
            this.$Message.success({
              content:"恭喜你，密码重置成功，重置后的密码为123456789，建议登录后立即修改密码",
              duration:10
            });
            this.forgotPasswordModal = false;
          }else {
            this.$Message.error({
              content:'修改密码时遇到错误，请稍后再试，或联系管理员'
            })
          }
          this.loading_reset = false;
        },

        //忘记密码操作
        forgotPasswordClick(){
          console.log("忘记密码了？我来帮你......")
          this.forgotPasswordModal = true;
        },
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
