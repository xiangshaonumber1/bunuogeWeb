<!-- 展示模板 -->
<template>
  <div id="app"  >
    <ok-header></ok-header>
    <router-view></router-view>
  </div>
</template>

<script>

import OkHeader from "./views/Web/header/ok_header";

export default {
  name:'App',
  components: {OkHeader},
  methods:{

    //登录检查
    async checkLogin(){
      await this.$apis.AuthenticationApi.getToken();
      //token刷新成功，什么都不做
      //token刷新失败（405），前往登录页面（已在拦截器中实现）
    },
  },

  mounted(){
    // this.checkLogin();
  }
}

</script>

<style>

  #app{
    /*border: 1px solid red;*/
    width: 100vm;
    height: auto;
  }

</style>
