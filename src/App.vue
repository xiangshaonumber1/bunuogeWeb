<!-- 展示模板 -->
<template>
  <div id="app"  >
    <affix>
      <Header></Header>
    </affix>
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>

import Header from "./views/Common/header";

export default {
  name:'App',
  components: {Header},
  methods:{
    //登录检查
    async checkLogin(){
      const result = await this.$apis.AuthenticationApi.getToken();
      console.log("App.vue 中输出 result : ",result)
      //token刷新成功，什么都不做
      //token刷新失败（405），前往登录页面（已在拦截器中实现）
    },

  },

  mounted(){
    this.sockets.subscribe('receive_article', (data) => {
      console.log("监听 receive_article 文章通知：", data)
    });
    this.sockets.subscribe('receive_connect', (data) => {
      console.log("监听 receive_connect：连接通知", data)
    });
    this.sockets.subscribe('notification_system_message', data => {
      console.log("监听到系统有发布新的系统消息", data);
      this.systemMessageCount++;
    });
    this.sockets.subscribe('notification_reply',() =>{
      console.log("监听到有新的回复消息，请注意查收！");
      this.$store.dispatch("addUnreadMessageCount","reply")
    })
  }
}

</script>

<style>

  #app{
    /*border: 1px solid red;*/
    width: 100%;
    height: auto;
    background-color: rgb(245, 247, 249);
  }

  textarea{
    resize: none;
  }

  .router-view{
    padding: 30px 20% 0 20%;
  }

</style>
