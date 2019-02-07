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



          <form-item label="密码" prop="password">
            <Input type="password" v-model="registerInfo.password" placeholder="密码不少于6位" size="large"></Input>
          </form-item>

          <form-item label="确认密码" prop="checkPassword">
            <Input type="password" v-model="registerInfo.checkPassword" placeholder="请再次输入密码" size="large"></Input>
          </form-item>


          <form-item label="邮箱验证">
            <Input type="text" v-model="registerInfo.emailCode" placeholder="请输入邮箱验证码" size="large">
              <Button type="text" slot="append" @click="request_mailCode">
                <strong style="color:#0aac8e;font-weight: normal;font-size:14px;">获取验证码</strong>
              </Button>
            </Input>
          </form-item>

          <Button type="info" @click="request_register" style="background-color: rgb(0, 192, 145);border: none;margin:20px 0;" long>
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
            //邮箱验证正则表达式
            var emailRule = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

            if (value === null ){//判断用户是否有输入
              return callback(new Error("邮箱作为您的登录凭证，必须输入！"));
            }

            console.log("正则表达式结果：",emailRule.test(value));

            if (!emailRule.test(value)){//判断用户输入的邮箱，是否符合规范
              return callback(new Error("邮箱格式有误，请检查"))
            }

            this.$axios({//如果前面的检查都能通过的话，就进行网络请求，判断是否被注册过
              url:'/Authentication/isExist',
              method:'post',
              data:this.$qs.stringify({
                username:this.registerInfo.email
              })
            }).then((response)=>{
              console.log("then 输出信息:",response);
              if (response.data.code === '200'){//等于200表示尚未被注册
                this.ok_email = true;
                return callback();
              }else {//返回其他表示被注册了
                return callback(new Error("该邮箱已被注册，请换一个邮箱再继续"))
              }
            }).catch((error)=>{
              return this.$Notice.error({
                title:'网络连接失败：',
                desc:'非常抱歉，目前网络连接失败，请检查后再继续'
              })
            })

          };
          //密码格式验证
          const validatePassword = (rule,value,callback)=>{
            if (value === null || value.length <6 || value.length >18 ){
             return callback(new Error("密码最短不能低于6位,最长不能超过18位"))
            }
            console.log("密码格式验证 成功");
            this.ok_password = true;
            return callback();
          };
          //密码相同验证
          const validateCheckPassword = (rule,value,callback)=>{
            if (this.registerInfo.password !== value){
             return callback(new Error("两次输入的密码不一致，请检查后重新输入"))
            }
            console.log("密码是否相同验证成功");
            this.ok_checkPassword = true;
            return callback();
          };
        return {
          ok_email:false,//用于检查，email是否符合注册条件
          ok_password:false,//用于检查，password是否符合规范
          ok_checkPassword:false,//用于检查password，并且两次输入是否相同
          registerInfo:{
            email:null,
            emailCode:null,
            password:null,
            checkPassword:null,
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
        },

        //获取邮箱验证码请求
        request_mailCode(){
          if (!this.ok_email){//如果不符合email规范，return 一个错误提示信息
            return this.$Notice.error({
              title:'获取验证码提示',
              desc:'请输入有效的工作邮箱后，再获取验证码'
            })
          }

          this.$axios({
            url:'/user/request_mail',
            method:'post',
            data:this.$qs.stringify({
              userMail:this.registerInfo.email,
              type:'register'
            })
          }).then((response)=>{
            if (response.status === 200){
              this.$Notice.success({
                title:'邮件发送成功',
                desc:'邮件已成功发送，请注意查收'
              })
            }
            console.log("输出response信息",response)
          }).catch((error)=>{
            console.log("出了个错误：",error)
          })
        },

        //注册请求
        request_register(){
          if (this.ok_email && this.ok_password && this.ok_checkPassword && this.registerInfo.emailCode!==null){
            this.$axios({
              url: '/Authentication/register',
              method: 'post',
              data:this.$qs.stringify({
                username: this.registerInfo.email,//用户名
                password: this.registerInfo.password,//密码
                userMail: this.registerInfo.email,//绑定邮箱
                MailVerificationCode: this.registerInfo.emailCode//邮箱验证码
              })
            }).then((response)=>{
              if (response.data.code === '200'){
                const userInfo = {
                  openID: response.data.data.openID,
                  nickname: response.data.data.nickname,
                  avatar: response.data.data.avatar,
                  token: response.data.data.token,
                };
                this.$store.dispatch("saveLoginInfo",userInfo);
                this.$router.push({name:'index'});
              }else {
                console.log("注册失败，失败信息：",response);
                this.$Notice.error({
                  title:"注册失败",
                  desc:response.data.msg
                })
              }
            }).catch((response)=>{
              console.log("连接出错了，错误信息：",response)
            })
          }else {
            this.$Notice.error({
              title:'信息不完善',
              desc:'尚有为未填完的信息，请补充完整后再继续'
            })
          }
        },

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
