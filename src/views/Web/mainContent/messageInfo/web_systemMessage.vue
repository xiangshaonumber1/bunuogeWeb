<template>
    <div class="systemMessage">
      <Divider orientation="left" ><span class="message-title">系统消息</span></Divider>
      <Card v-for="message in systemMessageData" :key="message.messageID" style="margin-bottom: 10px">
        <div>
          <span style="font-weight: bold">{{message.title}}</span>
          <span style="margin-left: 20px;color: gray">{{message.time}}</span>
        </div>
        <div>
          <span style="letter-spacing: 1px;color: dimgrey">{{message.content}}</span>
        </div>
      </Card>
    </div>
</template>

<script>
    export default {
      name: "web_systemMessage",
      data(){
        return {
          systemMessageData:[]
        }
      },

      methods:{
        //获取信息详情
        async getMessageDetails() {
          const result = await this.$apis.UserApi.getSystemMessageDetails();
          this.systemMessageData = result.system_message_infos;
        }
      },

      mounted() {
        this.getMessageDetails();
      }
    }
</script>

<style scoped>
  .message-title{
    font-size: 18px;
    letter-spacing: 5px;
    font-weight: bold;
    color: dimgrey;
  }
</style>
