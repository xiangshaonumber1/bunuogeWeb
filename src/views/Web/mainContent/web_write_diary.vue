<template>
  <div id="web_diary_write">
    <!--笔记标题-->
    <Row type="flex" class="row-code-bg" justify="center" align="middle">
      <i-col span="24">
        <Divider orientation="left">
          <a @click="goIndex">
             <span style="font-size: 30px;padding: 5px" >
               <span style="color: lightskyblue;font-size: 30px">Getok</span>
               &nbsp;记&nbsp;录&nbsp;点&nbsp;滴
             </span>
          </a>
        </Divider>
      </i-col>
    </Row>

    <Row type="flex" class="row-code-bg" justify="center" align="middle">
      <i-col span="18">
        <div>
          <write_diary></write_diary>
        </div>
      </i-col>
    </Row>

  </div>
</template>

<script>
    import Write_diary from "../../Service/components/service_write_diary";
    export default {
        name: "web_write_diary",
      components: {Write_diary}
    }
</script>

<style scoped>
  #web_diary_write{
    height: 100vh;
  }

  a{
    color: black;
    text-decoration: none;
  }
</style>
