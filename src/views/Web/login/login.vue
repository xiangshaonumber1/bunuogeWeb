<template>

  <div id="login" class="login" style="background-image: url(../../../../static/picture/lunbo1.jpg);filter:grayscale(0%);">

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
            <input class="form-control" id="blog-account" type="text" placeholder="请输入您的权限账号" style="height: 40px;font-size:20px;" :maxlength="25" v-model="account"/>
          </div>

          <div class="form-group">
            <label for="blog-password" class="login-label">密码：</label><label class="error-lable">{{error_password}}</label>
            <div class="">
              <input class="form-control" id="blog-password"  type="password" placeholder="请输入您的管理密码" style="height: 40px;font-size: 20px" :maxlength="18" v-model="password"/>
            </div>
          </div>

          <div class="form-group">
            <div class="checkbox">
              <label style="font-size: 18px"> <input type="checkbox" />记住我</label>
            </div>
          </div>

          <div class="form-group">
            <button type="submit" v-on:click="goto_login" class="btn btn-info btn-lg" style="width: 100%;font-size: 22px">登&nbsp;&nbsp;陆</button>
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
  import Header from 'src/views/Web/header/header'
  import Footer from 'src/views/Web/footer/footer'
  //axios 请求

    export default {
      name: "Login",
      error_account: '',
      // inject: ['reload'],
      data (){
        return{
          account:'',
          password:'',
          error_account:'',
          error_password:''
        }
      },
      components:{
        "blog-header":Header,
        "blog-footer":Footer
      },
      methods:{

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

</style>
