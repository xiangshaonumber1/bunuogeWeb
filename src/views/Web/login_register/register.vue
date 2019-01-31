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

        <i-form label-position="left" :model="registerInfo" :rules="registerRule" :label-width="100" class="formRegister">

          <form-item label="邮箱" prop="email">
            <Input type="text" v-model="registerInfo.email" placeholder="请输入工作邮箱" size="large"></Input>
          </form-item>

          <form-item label="邮箱验证">
            <Input type="text" placeholder="请输入邮箱验证码" size="large">
              <Button type="text" slot="append">
                <strong style="color:#0aac8e;font-weight: normal;font-size:14px;">获取验证码</strong>
              </Button>
            </Input>
          </form-item>

          <form-item label="密码" prop="password">
            <Input type="password" v-model="registerInfo.password" placeholder="密码不少于6位" size="large"></Input>
          </form-item>

          <form-item label="确认密码" prop="checkPassword">
            <Input type="password" v-model="registerInfo.checkPassword" placeholder="请再次输入密码" size="large"></Input>
          </form-item>

          <Button type="info" style="background-color: rgb(0, 192, 145);border: none;margin:20px 0;" long>
            <span style="font-size: 20px">注&emsp;册</span>
          </Button>

          <p style="color: white;text-align: center">
            注册即代表您同意并遵守
            <a @click="goArticleInfo(0)" style="color: white">《用户协议》</a>
            和
            <a @click="goArticleInfo(1)" style="color: white">《隐私协议》</a>
          </p>

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
          //邮箱验证
          const validateEmail = (rule,value,callback)=>{
            if (value === null || value === ''){
              callback(new Error("邮箱作为您的登录凭证，必须输入！"))
            }
            callback();
          };
          //密码格式验证
          const validatePassword = (rule,value,callback)=>{
            if (value === null || value ==='' || value.length <6 || value.length >18 ){
              callback(new Error("密码最短不能低于6位,最长不能超过18位"))
            }
            callback();
          };
          //密码相同验证
          const validateCheckPassword = (rule,value,callback)=>{
            if (this.registerInfo.password !== value){
              callback(new Error("两次输入的密码不一致，请检查后重新输入"))
            }
            callback();
          };
        return {
          registerInfo:{
            email:'',
            emailCode:'',
            password:'',
            checkPassword:'',
          },
          registerRule:{
            email:[
              { validator: validateEmail, trigger: 'blur' }
            ],
            password:[
              { validator: validatePassword, trigger: 'blur' }
            ],
            checkPassword:[
              { validator: validateCheckPassword, trigger: 'blur' }
            ]
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
        //前往指定文章
        goArticleInfo(id){
          this.$router.push({path:"/ai/"+id+""})
        }
      }
    }
</script>

<style scoped>

  .formRegister >>> .ivu-form-item-label{
    color: white;
  }

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
    background:rgba(102,139,139,0.3);
    /*border: 1px solid blue;*/
    border-radius: 10px;
    padding: 15px 0;
  }

  .form-logo{
    margin: 20px 0;
  }

  .form-logo img{
    width: 40%;
  }

  .register-form-content{
    padding-left: 50px;
    padding-right: 50px;
  }

  .register-form-content label{
    font-size: 20px;
    font-family: "简楷体", cursive;
    color: #0aac8e;
  }

</style>
