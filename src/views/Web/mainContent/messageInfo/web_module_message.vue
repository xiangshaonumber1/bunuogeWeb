<template>
  <Layout class="module-message">

    <Sider class="message-left">
      <Menu theme="light" class="message-menu" width="auto" :active-name="$route.name">
        <div class="menu-title text-center">消息中心</div>
        <menu-item name="replyMessage">回复我的</menu-item>
        <menu-item name="personalMessage">我的消息</menu-item>
        <menu-item name="systemMessage">系统通知</menu-item>
      </Menu>
    </Sider>

    <Layout>

    </Layout>

  </Layout>
</template>

<script>
    export default {
        name: "web_message_module",
      data() {
        return {

        };
      },

      methods:{

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
    font-size: 18px;
    border: 1px solid red;
    padding: 15px 0;
    font-weight: bold;
    letter-spacing: 10px;
  }

</style>
