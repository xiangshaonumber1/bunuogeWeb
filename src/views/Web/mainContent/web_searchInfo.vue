<template>
  <div>

    <!--ok header -->
    <ok-header></ok-header>


    <!--数据获取完成前显示正在加载-->
    <loading v-if="isLoading"></loading>

    <!--如果没有数据，显示404-->
    <not-found v-else-if="notFound"></not-found>


    <!--如果有数据，正常显示-->
    <Row v-else type="flex" class="code-row-bg" align="middle" justify="center">

      <i-col span="4" style="border: 1px solid salmon">
          <Table :data="searchData" :columns="searchColumn">

          </Table>
          <ul class="searchType">
            <li><a><Icon type="md-copy" color="gray" size="25"/>&emsp;文章</a></li>
            <li><a><Icon type="md-contact" color="gray" size="25" />&emsp;用户</a></li>
          </ul>
      </i-col>

      <i-col span="10" style="border: 1px solid red">

      </i-col>

    </Row>




    {{this.$route.params.key_word}}

  </div>
</template>

<script>
    import OkHeader from "../header/ok_header";
    import NotFound from "./404";
    import Loading from "../loading/loading";
    export default {
        name: "web_searchInfo",
      components: {Loading, NotFound, OkHeader},
      data(){
        return {
          search_page:1,
          key_word:null,
          searchInfoList:[],
          isLoading:true,
          notFound:false,
          searchColumn:[
            {title:'搜索类型',key:'type'}
          ],
          searchData:[
            {type:'文章'},
            {type:'用户'}
          ]
        }
      },

      async mounted(){
          this.key_word = this.$route.params.key_word;
          const result = await this.$apis.ArticleApi.get_search(this.$route.params.key_word,this.search_page);
          if (result === null && this.search_page === 1){
            this.isLoading = false; //取消正在加载
            // this.notFound = true; //显示404
          }else {
            this.isLoading = false; //取消正在加载
            this.notFound = false; //取消显示404
            this.searchInfoList = result; //赋值获取到的数据
            this.search_page++;
          }
      },

    }
</script>

<style scoped>
  span{
    font-size:18px;
    font-weight: bold;
    font-family: "Microsoft YaHei UI",serif;
  }

  .searchTypeCard >>> .ivu-card-body{
    padding-left: 0;
    padding-right: 0;
  }

  .searchType{
    list-style-type: none;
  }

  .searchType li{
    /*border: 1px solid red;*/
    margin-top: 5px;
    margin-bottom: 5px;
    border: 1px solid salmon;
  }



</style>
