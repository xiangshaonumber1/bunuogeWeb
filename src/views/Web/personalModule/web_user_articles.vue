<template>
    <div class="my-articles">

      <!-- Title 部分 -->
      <Row>
        <i-col>
          <span style="font-size: 20px;font-weight: bold">文章数据详情</span>
          <div style="float: right">
            <span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>
          </div>
          <hr>
        </i-col>
      </Row>

      <loading v-if="isLoading"></loading>

      <not-found v-else-if="isNotFound"></not-found>

      <!-- 查询结果 部分 -->
      <div class="myArticleInfo" v-else  v-for="myArticle in myArticleInfoList">
        <Card :bordered="false">
          <!--文章标题-->
          <div class="myArticleTitle">
            <Tag color="rgb(251, 114, 153)" v-if="myArticle.type === 'original' ">原创</Tag>
            <Tag color="rgb(0, 192, 145)" v-else-if="myArticle.type === 'reprint' ">转载</Tag>
            <Tag color="rgb(2, 181, 218)" v-else-if="myArticle.type === 'translate' ">翻译</Tag>
            <a @click="goArticleInfo(myArticle.articleID,myArticle.openID)"><span v-html="myArticle.title"></span></a>
          </div>

          <!--文章内容-->
          <div class="myArticleContent">
            <span v-html="replaceHtml(myArticle.content)"></span>
          </div>

          <!--文章作者和文章状态信息-->
          <div class="myArticleOtherInfo">
            <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="16"/>&nbsp;点赞量：<label>{{myArticle.like}}</label></span>&emsp;
            <span><Icon type="md-eye" size="16" />&nbsp;浏览量：<label>{{myArticle.watch}}</label></span>
            <span style="float: right;margin-right: 20px">发表时间：<Icon type="md-time" size="16" />&nbsp;<Time :time="myArticle.time"/></span>
          </div>
        </Card>
        <!--底部分割线样式-->
        <Divider style="margin-top: 0"/>
      </div>

      <!--分页部分 pagesize默认为10-->
      <Page class="text-center" @on-change="get_userArticle" show-total :total="listTotal" />

    </div>
</template>

<script>
    import NotFound from "../otherModule/404";
    import Loading from "../../Common/loading";
    export default {
        name: "management_articles",
      components: {Loading, NotFound},
      data(){
          return {
            myArticleInfoList:[],
            isLoading:true,
            isNotFound:false,
            listTotal:0,
          }
      },
      methods:{

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

        //获取当前用户所创作的文章
       async get_userArticle(page) {
         const result = await this.$apis.ArticleApi.get_userArticle(this.$route.params.open_id,page);
          if (result === null && page === 1 ) {
            this.isLoading = false; //取消正在加载
            this.isNotFound = true; //显示404
          }else {
            this.listTotal = result.total;
            this.myArticleInfoList = result.articleInfoList;
            this.isLoading = false;
            this.isNotFound = false;
          }
        },

        //前往文章详情页面
        goArticleInfo(article_id,open_id){
          //新建窗口跳转
          let ArticleInfo = this.$router.resolve({
            name:'web_articleInfo',
            params:{
              article_id:article_id,
              open_id:open_id
            }
          });
          window.open(ArticleInfo.href,'_blank');
        },

      },

       mounted() {
          //从后台拉取数据
        this.get_userArticle(1);
      }
    }
</script>

<style scoped>

  span{
    font-size: 14px;
  }

  hr{
    margin: 10px 0;
  }

  label{
    margin: 0;
    padding: 0;
  }

  .my-articles{
    /*padding: 15px 35px;*/
    padding: 0;
    margin: 0;
  }


  .myArticleInfo{
    margin: 5px 0;
  }

  /*.myArticleInfo >>> .ivu-card-body{*/
    /*padding: 16px 16px 5px 16px;*/
  /*}*/

  .myArticleType{
    float: left;
    background: green;
    padding: 15px;
  }

  .myArticleTitle a, .myArticleTitle span{
    color: black;
    font-size: 20px;
    font-weight: bold;
    padding: 5px;
  }

  .myArticleTitle >>> .ivu-tag{
    padding: 3px 8px;
    height: 28px
    /*border: 1px solid salmon;*/
  }


  .myArticleContent{

    overflow: hidden;   /* 超出容器隐藏，不然会撑破容器。 */

    text-overflow: ellipsis;    /* 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。 */
    display:-webkit-box;    /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。 */
    /*! autoprefixer: off */
    -webkit-line-clamp: 4;      /* -webkit-box-orient: vertical;这行样式上下需要加上上文中的注释，否则用webpack后-webkit-box-orient样式会丢失  需要显示的文本行数 */
    /* autoprefixer: on */
    -webkit-box-orient: vertical;   /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。 */

    word-wrap:break-word;
    white-space: pre-wrap;

  }


  .myArticleOtherInfo{
    margin-top: 20px;
  }
  .myArticleContent >span{
    color: gray;
    font-size: 14px;
    font-weight: normal;
  }
  .myArticleOtherInfo span, .myArticleOtherInfo label{
    font-size: 14px;
    font-weight: normal;
  }

</style>
