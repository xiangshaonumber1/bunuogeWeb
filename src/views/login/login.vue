<template>

  <div id="login" class="login" style="background-image: url(../../../static/picture/lunbo1.jpg);filter:grayscale(0%);">

    <div id="body">
      <div class="top">
      </div>

      <div class="center">

        <!--登陆模块 start-->
        <form class="login-form">

          <div class="form-group">
              <label class="label-style-1">XiangShaoBlog</label>
          </div>

          <div class="form-group">
            <label for="blog-account" class="login-label">账号：</label><label class="error-lable">{{error_account}}</label>
            <input class="form-control" id="blog-account" ref="account" type="text" placeholder="请输入您的权限账号" style="height: 40px;font-size:20px;" :maxlength="25"/>
          </div>

          <div class="form-group">
            <label for="blog-password" class="login-label">密码：</label><label class="error-lable">{{error_password}}</label>
            <div class="">
              <input class="form-control" id="blog-password" ref="password" type="password" placeholder="请输入您的管理密码" style="height: 40px;font-size: 20px" :maxlength="18"/>
            </div>
          </div>

          <div class="form-group">
            <div class="checkbox">
              <label style="font-size: 18px"> <input type="checkbox" />记住我</label>
            </div>
          </div>

          <div class="form-group">
            <button type="submit" v-on:click="check" class="btn btn-info btn-lg" style="width: 100%;font-size: 22px">登&nbsp;&nbsp;陆</button>
          </div>

          <div class="form-group" style="text-align: center">
            <router-link to="/" style="font-size: 18px;color: white">前往首页</router-link>
          </div>

        </form>
        <!--登陆模块 end-->

      </div>

      <div class="bottom">
        <blog-footer style="bottom: 0;position: fixed;width: 100%;filter:opacity(70%);color: white;background-color: black"></blog-footer>
      </div>

    </div>



  </div>

</template>

<script>
  //局部注册部件
  import Header from 'src/views/header/header'
  import Footer from 'src/views/footer/footer'
  //axios 请求

    export default {
        name: "Login",
      error_account: '',
      data (){
        return{
          error_account:'账号不能为空',
          error_password:'密码不能为空'
        }
      },
      components:{
        "blog-header":Header,
        "blog-footer":Footer
      },
      methods:{
          check: function () {
            if (this.$refs.account.value ===""){
              return alert("账号不能为空")
            }
            if (this.$refs.password.value === ""){
              return alert("密码不能为空")
            }
          }
      }
    }
</script>

<style scoped>

</style>
