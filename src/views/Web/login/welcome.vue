<template>

  <div id="login" class="login">
    <Row style="height: 80vh">
      <i-col span="24">

        <!-- 用户登录模块（默认模块） start -->
        <div class="login-form" v-if="login_or_register === 'login'">

          <div class="form-logo text-center">
            <a @click="goIndex"><img src="/static/picture/ok_blog_logo.png"></a>
          </div>

          <div class="login-form-content">
            <div class="login-info-form">
              <p>
                <label style="color: white;">用户登录</label>
                <a class="go-register" @click="goRegister">立即注册</a>
              </p>
              <p class="text-center" v-if="login_status === false"><span>账号或密码错误！</span><br/></p>
              <Input type="text" placeholder="在这里输入邮箱号" size="large" style="margin: 10px 0;"></Input>
              <Input type="password" placeholder="在这里输入您的密码" size="large" style="margin: 10px 0;"></Input>
              <span><a style="color: white;font-size: 16px;float: right">忘记密码？</a></span>
              <Button type="info" size="large" long style="margin:10px 0;">
                <span  style="color: white;font-size: 20px">登&emsp;录</span>
              </Button>
              <div class="text-center" style="margin-top: 20px;margin-bottom: 20px">
                <span><a style="color:white;font-size: 16px">前往首页>></a></span>
              </div>
            </div>
          </div>

        </div>
        <!-- 用户登录模块（默认模块） end -->

        <!-- 用户注册模块 start -->
        <div class="register-form" v-else>

          <div class="form-logo text-center">
            <a @click="goIndex"><img src="/static/picture/ok_blog_logo.png"></a>
          </div>

          <div class="register-form-content">
            <p>
              <label style="color: white;">新用户注册</label>
              <a class="go-login" @click="goLogin">前往登录</a>
            </p>

            <div class="register-form-info">

              <Row type="flex" class="code-row-bg myrow" align="middle">
                <i-col span="6">
                  <span>邮箱</span>
                </i-col>
                <i-col span="18">
                  <Input type="text" placeholder="请输入工作邮箱" size="large"></Input>
                </i-col>
              </Row>

              <Row type="flex" class="code-row-bg myrow" align="middle">
                <i-col span="6">
                  <span>邮箱验证</span>
                </i-col>
                <i-col span="18">
                  <Input type="text" placeholder="请输入邮箱验证码" size="large">
                    <Button type="text" slot="append">
                      <strong style="color:#0aac8e;font-weight: normal;font-size:14px;">获取验证码</strong>
                    </Button>
                  </Input>
                </i-col>
              </Row>


              <Row type="flex" class="code-row-bg myrow" align="middle">
                <i-col span="6">
                  <span>密码</span>
                </i-col>
                <i-col span="18">
                  <Input type="password" placeholder="密码不少于6位" size="large"></Input>
                </i-col>
              </Row>


              <Row type="flex" class="code-row-bg myrow" align="middle">
                <i-col span="6">
                  <span>确认密码</span>
                </i-col>
                <i-col span="18">
                  <Input type="password" placeholder="请再次输入密码" size="large"></Input>
                </i-col>
              </Row>

              <Row type="flex" class="code-row-bg myrow" align="middle">
                <Button type="info" style="background-color: rgb(0, 192, 145);border: none;margin:20px 0;" long>
                  <span style="font-size: 20px">注&emsp;册</span>
                </Button>
              </Row>




            </div>

          </div>

        </div>
        <!-- 用户注册模块 end -->

      </i-col>
    </Row>

    <Row style="height: 20vh;" type="flex" class="code-row-bg" align="bottom">
      <i-col span="24">
        <div class="login-footer">
          <blog-footer style="filter:opacity(70%);color: white;background-color: black"></blog-footer>
        </div>
      </i-col>
    </Row>

  </div>

</template>

<script>
  //局部注册部件
  import Header from 'src/views/Web/header/header'
  import Footer from 'src/views/Web/footer/footer'
  //axios 请求

    export default {
      name: "Login",
      data (){
        return{
          login_or_register:'login',
          login_status:null,
          userInfo:{
            account:null,
            password:null,
          }
        }
      },
      components:{
        "blog-header":Header,
        "blog-footer":Footer
      },
      methods:{

        //返回首页
        goIndex(){
          this.$router.push({name:'index'})
        },

        //前往注册
        goRegister(){
          this.login_or_register='register'
        },
        //前往登录
        goLogin(){
          this.login_or_register='login'
        },

        //用户登录
          goto_login: function () {
            if (this.account ===""){
              this.error_account = "账号不能为空"
              return
            }else {
              this.error_account = ""
            }
            if (this.password === ""){
              this.error_password = "密码不能为空"
              return
            }else {
              this.error_password = ""
            }
            //实现将数据post到登陆接口：http://localhost/user/login
            // 1. 获取用户填写的文本值只需要this.xxxx
            // 2. 调用ajax的post方法将数据post给服务器
            this.$http.post('http://localhost/myuser/login',
              {account:this.account,password:this.password},
              {emulateJSON:true})
              .then(function (response) {
                //承诺成功完成时要运行的履行处理程序函数。
                var user = response.body.data
                console.log(response.body)
                if (response.body.data===false){
                  console.log("未找到相关信息_404")
                }else{
                  //将相关信息放入vuex中
                  // this.$store.dispatch("saveLoginInfo",user)
                  this.$store.commit("saveLoginInfo",user)
                  //打印login状态
                  // this.reload()
                  this.$router.push({name:'home'})
                }
              },function (response) {
                //承诺被拒绝时要运行的错误处理程序函数。
                console.log('服务器跑到火星去了'+'\n'+'Code:'+response.status)
              })
          },

        //重新拉取数据
        fetchDate(){
          //使用 axios获取数据
          console.log('当前路由地址：'+this.$route.path)
        }
      },
      created(){
        //组件创建完成后获取数据
        //此时 data 已经被 observed
        this.fetchDate();
      },
      watch:{
        //如果路由有变化，会再次执行
        "$route":"fetchDate"
      },

    }
</script>

<style scoped>

  .go-register, .go-login{
    float: right;
    font-size: 20px;
    color:#0aac8e;
    font-family:'简楷体',serif;
    font-weight: bold;
    text-decoration: none;
  }

  .login-form{
    float: right;
    width: 25vw;
    background:rgba(102,139,139,0.5);
    margin-right: 10vw;
    max-height: 80vh;
    margin-top: 15vh;
  }

  .register-form{
    float: right;
    width: 30vw;
    background:rgba(102,139,139,0.5);
    margin-right: 10vw;
    max-height: 80vh;
    margin-top: 10vh;
  }

  .form-logo{
    margin: 20px 0;
  }

  .form-logo img{
    width: 40%;
  }

  .login-form-content, .register-form-content{
    padding-left: 40px;
    padding-right: 40px;
  }

  .login-info-form label, .register-form-content label{
    font-size: 20px;
    font-family: "简楷体", cursive;
    color: #0aac8e;
  }

  .login-info-form span, .login-info-form span{
    color: red;
    font-size: 20px;
    font-weight: bold;
    font-family: "简楷体", cursive;
  }

  .register-form-info span{
    font-size: 16px;
    font-family: "简楷体", cursive;
    font-weight: bold;
    color: white;
  }
  .register-form-info > .myrow {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .login-footer{
    height: 100%;
    width: 100%;
  }
</style>
