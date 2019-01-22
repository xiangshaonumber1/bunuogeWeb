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
  </div>
</template>

<script>
    export default {
        name: "register",
      data() {
        return {

        }
      },
      methods:{
        //前往登录
        goLogin(){
          this.$router.push({name:'login'})
        },
      }
    }
</script>

<style scoped>

  .go-login{
    float: right;
    font-size: 20px;
    color:#0aac8e;
    font-family:'简楷体',serif;
    font-weight: bold;
    text-decoration: none;
  }

  .register-form{
    float: right;
    width: 30vw;
    height: auto;
    background:rgba(102,139,139,0.5);
    margin-right: 10vw;
    max-height: 80vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
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
</style>
