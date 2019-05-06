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
            <Form ref="loginInfoForm" :model="loginInfo" :rules="loginValidate">
              <form-item prop="username">
                <Input type="text" v-model="loginInfo.username" placeholder="在这里输入邮箱号" size="large"></Input>
              </form-item>
              <form-item prop="password">
                <Input type="password" v-model="loginInfo.password" placeholder="在这里输入您的密码" size="large" @on-enter="request_login"></Input>
              </form-item>
              <form-item>
                <span><a style="color: white;font-size: 16px;float: right" @click="forgotPasswordClick">忘记密码？</a></span>
                <Button type="info" size="large" @click="request_login" long style="margin:10px 0;" :loading="loading_login">
                  <span  style="color: white;font-size: 22px">登&emsp;录</span>
                </Button>
                <div class="text-center" style="margin-top: 20px;">
                  <span><a style="color:white;font-size: 16px" @click="goIndex">前往首页>></a></span>
                </div>
              </form-item>
              <!--<Spin v-if="loading_login" fix></Spin>-->
            </Form>
          </div>
        </div>

      </div>
      <!-- 用户登录模块（默认模块） end -->

      <!--点击忘记密码对话框-->

        <Modal v-model="forgotPasswordModal"  footer-hide :mask-closable="false" title="申请重置密码">
            <Form ref="resetPasswordForm" :model="resetPasswordInfo" label-position="left" :label-width="100" :rules="resetValidate" >
              <form-item label="重置账号" prop="username">
                <Input type="text" v-model="resetPasswordInfo.username" placeholder="请输入您的账号"></Input>
              </form-item>
              <form-item label="绑定邮箱" prop="email">
                <Input type="text" v-model="resetPasswordInfo.email" placeholder="请输入您的绑定邮箱......"></Input>
              </form-item>
              <form-item label="邮箱验证码" prop="emailCode">
                <Input type="text" v-model="resetPasswordInfo.emailCode" placeholder="请输入验证码......">
                  <Button slot="append" @click="getEmailCode(resetPasswordInfo.email)">获取验证码</Button>
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
          //登录用户信息
          loginInfo: {
            username: '',
            password: ''
          },
          //申请重置密码表单校验规则
          resetValidate:{
            username:[{required:true,message:'账号不能为空！',trigger:'blur'}],
            email:[
              {required:true,message:'邮箱不能为空！',trigger:'blur'},
              {type:'email',message:'请输入有效邮箱！',trigger:'blur'}
            ],
            emailCode:[{required:true,message:'验证码不能为空！',trigger:'blur'}]
          },
          //登录表单校验
          loginValidate:{
            username:[{required:true,message:'账号不能为空！',trigger:'blur'}],
            password:[{required:true,message:'密码不能为空！',trigger:'blur'}]
          },
          forgotPasswordModal: false, //忘记密码对话框
          loading_reset: false, // 密码重置等待
          loading_login:false,  //登录等待
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
           this.$refs.resetPasswordForm.validate((async valid => {
             if (valid) {
               //通过form表单的检验后
               this.loading_reset = true;  //设置spin加载中
               const result = await this.$apis.CommonApi.resetPassword(this.resetPasswordInfo.username, this.resetPasswordInfo.email, this.resetPasswordInfo.emailCode);
               if (result) {
                 this.$Message.success({
                   content: "恭喜你，密码重置成功，重置后的密码为123456789，建议登录后立即修改密码",
                   duration: 15
                 });
                 this.forgotPasswordModal = false;
               }
               this.loading_reset = false;
             }
           }));
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
        async request_login() {
          this.$refs.loginInfoForm.validate( async valid => {
            if (valid) {
              //通过form表单的检验后
              this.loading_login = true;  //设置spin加载中
              const result = await this.$apis.AuthenticationApi.login(this.loginInfo.username, this.loginInfo.password);
              console.log("登录返回结果：",result);
              if (result){
                this.$socket.emit("notification_login",this.$store.getters.openID);
              }
              //不论是否登录成功，取消登录等待状态
              this.loading_login = false;
            }
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
