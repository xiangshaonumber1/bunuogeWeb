<template>
  <Layout class="module-message">

    <Sider class="message-left">
      <Menu theme="light" class="message-menu" width="auto" :active-name="$route.name" @on-select="changeMessage">
        <div class="menu-title text-center"><Icon type="md-paper-plane" />消息中心</div>
        <menu-item name="replyMessage"><Badge :count="$store.getters.userInfo.replyMessageCount" :offset="[0,-10]"><span>回复我的</span></Badge></menu-item>
        <menu-item name="personalMessage"><Badge :count="$store.getters.userInfo.personalMessageCount" :offset="[0,-10]"><span>我的消息</span></Badge></menu-item>
        <menu-item name="systemMessage"><Badge :count="$store.getters.userInfo.systemMessageCount" :offset="[0,-10]"><span>系统通知</span></Badge></menu-item>
      </Menu>
    </Sider>

    <Layout>
      <!-- ok-header 导航栏 -->
      <Header style="padding: 0;">
        <ok-header style="height: 100%"></ok-header>
      </Header>

      <Content class="message-content">
        <RouterView></RouterView>
      </Content>
    </Layout>

  </Layout>
</template>

<script>
    import OkHeader from "../../Common/ok_header";

    export default {
        name: "web_message_module",
      components: {OkHeader},
      data() {
        return {
          systemMessageCount:0,
          replyMessageCount:0,
          personalMessageCount:0,
        };
      },

      methods:{

        //改变查看的message的类型
        changeMessage(name){
          this.$router.push({name:name});
        },


      },

      mounted(){

      }

    }
</script>

<style scoped>

  .module-message{
    height: 100vh;
  }

  .message-left{
    background-color: white;
    height: 100%;
  }

  .message-menu{
    height: 100%;
  }

  .menu-title{
    color: black;
    font-size: 20px;
    border-bottom: 1px solid lightgrey;
    line-height: 60px;
    height: 60px;
    font-weight: bold;
    letter-spacing: 10px;
  }

  .message-content{
    padding: 20px 10% 1px 10%;
    background-color: white;
  }

</style>
