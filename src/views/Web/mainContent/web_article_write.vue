<template>
  <div id="web_article_write">

    <Row type="flex" class="row-code-bg" justify="center" align="middle">
      <i-col span="24">
        <Divider orientation="left">
          <a @click="goIndex">
             <span style="font-size: 30px;padding: 5px" >
               <span style="color: lightskyblue;font-size: 30px">Getok</span>
               &nbsp;文&nbsp;章&nbsp;创&nbsp;作
             </span>
          </a>
        </Divider>
      </i-col>
    </Row>

    <Row type="flex" class="row-code-bg" justify="center" align="middle">
      <i-col span="18">
        <div>
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
      components: {Write_article},
      methods:{
        goIndex(){
          this.$router.push({name:'index'})
        }
      }
    }
</script>

<style scoped>
  #web_article_write{
    height: 100vh;
  }

  a{
    color: black;
    text-decoration: none;
  }

</style>
