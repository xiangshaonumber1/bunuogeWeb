<template>
    <div class="index">
      <!-- 固定在顶部的导航栏  -->
      <Affix>
        <Row style="height: 60px;">

          <i-col span="3">
            <img src="/static/picture/logo.png" style="max-width: 100%;height: 60px" alt="...">
          </i-col>

          <i-col span="14">
            <Menu mode="horizontal" theme="light" active-name="1">
              <MenuItem name="1">首页</MenuItem>
              <MenuItem name="2">收藏</MenuItem>
            </Menu>
          </i-col>

          <i-col span="3">

          </i-col>

        </Row>
      </Affix>


      <div class="index-content">
        <p class="demo-affix" style="margin-top: 50px">emmmmmmmm...........1</p><br>
        <p class="demo-affix">emmmmmmmm...........2</p><br>
        <p class="demo-affix">emmmmmmmm...........3</p><br>
        <p class="demo-affix">emmmmmmmm...........4</p><br>
        <p class="demo-affix">emmmmmmmm...........5</p><br>
        <p class="demo-affix">emmmmmmmm...........6</p><br>
        <p class="demo-affix">emmmmmmmm...........7</p><br>
        <p class="demo-affix">emmmmmmmm...........8</p><br>
        <p class="demo-affix">emmmmmmmm...........9</p><br>
        <p class="demo-affix">emmmmmmmm...........0</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>

      </div>
    </div>
</template>

<script>
    export default {
      name: "index",
      data(){
        return {
          top_menu_theme:'light',
          top_menuItem_name:'articles',
        }
      },
      methods:{
        navbarClick(obj){
          console.log('输出：',obj)
        }
      }
    }
</script>

<style scoped>
  .index{
    /*border: 1px solid red;*/
    width: 100vm;
    height: auto;
  }

  .index-content{
    padding: 0;
    border: 1px solid gold;
    background-color: rgb(248, 248, 248);
  }

</style>
