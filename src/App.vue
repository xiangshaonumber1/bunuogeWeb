<!-- 展示模板 -->
<template>
  <div id="app"  >
    <ok-header></ok-header>
    <router-view></router-view>
  </div>
</template>

<script>


import OkHeader from "./views/Web/header/ok_header";
import BlogFooter from "./views/Web/footer/footer";
import Loading from "./views/Web/loading/loading";
import NotFound from "./views/Web/mainContent/404";
export default {
  name:'App',
  components: {OkHeader}
}
</script>

<style>

  #app{
    /*border: 1px solid red;*/
    width: 100vm;
    height: auto;
  }

</style>
