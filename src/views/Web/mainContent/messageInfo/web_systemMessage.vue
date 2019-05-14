<template>
    <div>
      这是系统消息部分:
      {{this.$route.params.openID}}
      <br>输出data信息：<br>{{this.data.system_message_infos}}
      <br>{{this.array}}
      <br>长度：{{this.array.length}}
    </div>
</template>

<script>
    export default {
      name: "web_systemMessage",
      data(){
        return {
          data:'',
          array:[]
        }
      },
      methods:{

      },

      async mounted() {
        this.data = await this.$apis.UserApi.getSystemMessageDetails();
        // this.array = await this.data.system_message_infos;
      }
    }
</script>

<style scoped>

</style>
