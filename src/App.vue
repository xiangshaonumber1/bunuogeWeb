<!-- 展示模板 -->
<template>
  <div id="app"  >
    <ok-header></ok-header>
    <router-view></router-view>
  </div>
</template>

<script>

import OkHeader from "./views/Web/header/ok_header";

export default {
  name:'App',
  components: {OkHeader},
}

</script>

<style>

  #app{
    /*border: 1px solid red;*/
    width: 100vm;
    height: auto;
  }

</style>
