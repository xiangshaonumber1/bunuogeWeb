<template>
  <div id="web_article_write">

    <Row type="flex" class="row-code-bg" justify="center" align="center">
      <i-col span="24">
        <Divider orientation="left"><span style="font-size: 30px;">文&emsp;章&emsp;写&emsp;作</span></Divider>
      </i-col>
    </Row>

    <Row type="flex" class="row-code-bg" justify="center" align="center">
      <i-col span="18">
        <div style="background-color: white">
          <write_article></write_article>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import Write_article from "../../Service/components/write_article";
    export default {
      name: "web_article_write",
      components: {Write_article}
    }
</script>

<style scoped>
#web_article_write{
  height: 100vh;

}

</style>
