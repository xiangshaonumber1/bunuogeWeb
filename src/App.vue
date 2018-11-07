<!-- 展示模板 -->
<template>
  <div id="app"  >
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name:'App',
  // provide (){
  //   return{
  //     reload:this.reload
  //   }
  // },
  // data(){
  //   return{
  //     isRouterAlive:true,
  //   }
  // },
  // methods:{
  //   reload(){
  //     this.isRouterAlive = false;
  //     this.$nextTick(function () {
  //       this.isRouterAlive = true
  //     })
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #222222;
}
</style>
