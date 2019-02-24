<template>
  <div>

    <!--ok header -->
    <!--<ok-header></ok-header>-->



    <Row type="flex" class="code-row-bg" align="top" justify="center" style="margin-top: 3vh">

      <!--搜索类型选择-->
      <i-col span="4" style="margin-right:2vw">
        <Card icon="ios-options" :padding="0">
          <span slot="title">搜索类型</span>
          <CellGroup @on-click="getSearchInfo">
            <Cell title="文章" name="article" selected><Icon type="ios-paper" slot="icon" size="20"/></Cell>
            <Cell title="用户" name="user"><Icon type="md-person" slot="icon" size="20"/></Cell>
          </CellGroup>
        </Card>
      </i-col>

      <!--反馈结果显示-->
      <i-col span="10">

        <!--数据获取完成前显示正在加载-->
        <loading v-if="isLoading"></loading>

        <!--如果没有数据，显示404-->
        <Card v-else-if="notFound">
          <not-found></not-found>
        </Card>


        <!--如果有数据，则正常显示搜索结果-->
        <div v-else>
          <!--显示文章搜索结果-->
          <div v-if="searchType === 'article' ">
            <div class="searchArticle" v-for="searchArticle in searchInfoList">
              <Card :bordered="false">
                <!--文章内容和标题-->

                <div class="searchArticleTitle">
                  <a @click="goArticleInfo(searchArticle.articleID)">{{searchArticle.title}}</a>
                </div>

                <div class="searchArticleContent">
                  <span>
                    {{replaceHtml(searchArticle.content)}}
                  </span>
                </div>
                <!--文章作者和文章状态信息-->
                <div class="searchArticleOtherInfo">
                  <span>{{searchArticle.nickname}}</span>&emsp;
                  <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="16"/>&nbsp;<label>{{searchArticle.like}}</label></span>&emsp;
                  <span><Icon type="md-eye" size="16" />&nbsp;<label>{{searchArticle.dislike}}</label></span>
                  <span style="float: right;margin-right: 20px"><Icon type="md-time" size="16" />&nbsp;<Time :time="searchArticle.time"/></span>
                </div>
              </Card>
              <Divider style="margin: 0;"/>
            </div>



          </div>

          <!--显示用户搜索结果-->
          <div v-else-if="searchType === 'user'">
            选择用户
          </div>
        </div>

      </i-col>

    </Row>

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
          searchType:'article',
        }
      },

      methods:{

        //修改搜索类型，并重新发送请求
        getSearchInfo(type){
          this.searchType = type;
          console.log("name : ",this.searchType);
        },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

        //前往文章详情页面
        goArticleInfo(id){
          //新建窗口跳转
          let ArticleInfo = this.$router.resolve({
            name:'articleInfo',
            params:{
              article_id:id
            }
          });
          window.open(ArticleInfo.href,'_blank')
          // this.$router.push({path:"/ai/"+id+""})
        },



      },

      async mounted(){
        console.log("mounted 执行");
        this.key_word = this.$store.getters.searchKey;
        //保存key_word的值到vuex中

        const result = await this.$apis.ArticleApi.get_search(this.$route.params.key_word,this.search_page);
        if (result === null && this.search_page === 1){
          this.isLoading = false; //取消正在加载
          this.notFound = true; //显示404
        }else {
          this.isLoading = false; //取消正在加载
          this.notFound = false; //取消显示404
          this.searchInfoList = result; //赋值获取到的数据
          this.search_page++;
        }
      },

      async updated(){
        console.log("update 执行");
        // console.log("update key_word 的 值：",this.$route.params.key_word);
        console.log("this.key_word：——",this.key_word);
        console.log("this.$route.params.key_word：——",this.$route.params.key_word)
      },

      async created(){
        console.log("created 执行");
      }

    }
</script>

<style scoped>
  span{
    font-size:18px;
    font-weight: bold;
    font-family: "Microsoft YaHei UI",serif;
  }

  .searchArticle{
    margin-bottom: 10px;
  }

  .searchArticle >>> .ivu-card-body{
    padding: 16px 16px 5px 16px;
  }

  .searchArticleTitle a{
    color: black;
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
  }


  .searchArticleContent{
    /* 超出长度时，出现省略号  */
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /*autoprefixer: off;*/
    -webkit-box-orient: vertical;
    /*autoprefixer: on;*/
    display:-webkit-box;
    margin: 5px 0;
  }

  .searchArticleContent >span{
    color: gray;
    font-size: 14px;
    font-weight: normal;
  }

  .searchArticleOtherInfo span,label{
    font-size: 14px;
    font-weight: normal;
  }


</style>
