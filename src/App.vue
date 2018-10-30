<!-- 展示模板 -->
<template>
  <div id="app"  >
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
  //局部注册部件
  // import Header from './views/header/header'
  // import Footer from './views/footer/footer'
export default ({
  name:'App',
  // components:{
  //   "blog-header":Header,
  //   "blog-footer":Footer
  // }
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #222222;
}
</style>
