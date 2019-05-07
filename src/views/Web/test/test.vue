<template>
    <div>
      <p class="text-center" style="font-size: 20px;color: red ">
        你好啊
      </p>
    </div>
</template>

<script>

    export default {
      name: "test",
      // sockets:{
      //   //与socket.io连接后回调
      //   connect() {
      //     console.log("socket 连接成功");
      //   },
      //
      //   connect_error(data){
      //     console.log("连接时出现错误，错误信息："+data)
      //   },
      //
      //   text1(data){
      //     console.log("监听text1: "+data)
      //   },
      //
      //   notification_article(data){
      //     console.log("监听 notification_article：",data)
      //   }
      //
      // },

      mounted(){
        /**
         * 触发socket连接，发送服务器给客户端
         */
        this.$socket.emit('text', JSON.stringify({userName:"caiyy",passWord:"123456"}));
      }
    }
</script>

<style scoped>

</style>
