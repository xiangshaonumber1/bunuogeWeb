<template>
    <div>
      <p class="text-center">
        你好啊{{this.id}}
      </p>

    </div>
</template>

<script>
    export default {
        name: "test",
      sockets:{
        connect:function () {
          console.log("socket 链接中....");
        },
        text1(data){
          console.log("监听text1: "+data)
        },
      },

      mounted(){
        //触发socket连接
        this.$socket.emit('text', JSON.stringify({userName:"caiyy",passWord:"123456"}));
      }
    }
</script>

<style scoped>

</style>
