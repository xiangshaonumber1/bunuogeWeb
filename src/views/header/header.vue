<template>
  <!--导航栏的设置 star-->
  <div id="header">
        <nav class="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">

          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <!-- 通过传入 `to` 属性指定在main.js文件设置的别名链接，如/1 -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <button class="navbar-brand" :click="cancel()" v-if="isLogin()===true">XiangShao的个人博客</button>
            <router-link class="navbar-brand" to="/login" v-else="isLogin()===false">XiangShao的个人博客</router-link>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li v-for="navbar in navbars">
                <a href="#">{{navbar.bar}}</a>
              </li>

            </ul>
            <form class="navbar-form navbar-right " role="search" style="margin-right: 20px">

              <div class="form-group">
                <input class="form-control" type="text" />
              </div>

              <button type="submit" class="btn btn-default">快速搜索</button>
            </form>
          </div>

        </nav>
  </div>

  <!--导航栏的设置 end-->
</template>

<script>
    export default {
        name: "blog-header",
      data(){
          return{
            navbars:[
              {bar:'SpringBoot相关'},
              {bar:'Android相关'},
              {bar:'MySQL相关'},
              {bar:'服务器相关'},
              {bar:'Vue相关'},
            ],
          }
      },
      methods:{
          //判断用户是否登录
          isLogin:function () {
            console.log("isLogin："+localStorage.getItem("isLogin"))
            return localStorage.getItem("isLogin")
          },
        cancel:function () {
            this.$store.commit("clearLoinInfo")
        }
      }
    }
</script>

<style scoped>

</style>
