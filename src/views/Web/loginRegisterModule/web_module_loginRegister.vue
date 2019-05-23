<template>

  <div id="login" class="login">
    <Row type="flex" class="code-row-bg" align="middle"  style="height: 85vh;">
      <i-col :span="module_span" :offset="module_offset">
        <router-view></router-view>
      </i-col>
    </Row>

    <Row type="flex" class="code-row-bg" align="bottom" justify="center" style="height: 15vh;">
      <i-col span="24">
        <div class="login-footer">
          <blog-footer style="color: black;background-color: transparent"></blog-footer>
        </div>
      </i-col>
    </Row>

  </div>

</template>

<script>
  //局部注册部件
  import Footer from '../../Common/footer'

    export default {
      name: "Login",
      components:{
        "blog-footer":Footer
      },
      data(){
        return{
          module_span:8,
          module_offset:14,
        }
      },
      methods:{
        //用户登录
          goto_login: function () {
            //实现将数据post到登陆接口：http://localhost/user/login
            // 1. 获取用户填写的文本值只需要this.xxxx
            // 2. 调用ajax的post方法将数据post给服务器
            this.$http.post('http://localhost/myuser/',
              {account:this.account,password:this.password},
              {emulateJSON:true})
              .then(function (response) {
                //承诺成功完成时要运行的履行处理程序函数。
                var user = response.body.data;
                console.log(response.body);
                if (response.body.data===false){
                  console.log("未找到相关信息_404")
                }else{
                  //将相关信息放入vuex中
                  // this.$store.dispatch("saveLoginInfo",user)
                  this.$store.commit("saveLoginInfo",user);
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
          console.log('当前路由地址：'+this.$route.path);
          if (this.$route.path.endsWith("login")){
            this.module_span = 6;
            this.module_offset = 16;
          } else{
            this.module_span = 8;
            this.module_offset = 14;
          }
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

  .login{
    width: 100%;
    background-image:url("/static/picture/welcome.jpg");
    background-size: 100% 100%;
    background-repeat:no-repeat;
    filter:grayscale(0%);
  }

  .login-footer{
    width: 100%;
  }



</style>
