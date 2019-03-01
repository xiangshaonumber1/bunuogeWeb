<template>
    <div id="articleInfo">


      <loading v-if="isLoading"></loading>

      <!-- 是否显示404页面 -->
      <not-found v-else-if="isNotFound"></not-found>

      <!-- 否则显示主要内容页面 -->
      <div v-else>
        <!--Article 文章标题部分-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-title">
          <i-col span="12" >
          <span class="article_title">
            <Tag color="rgb(251, 114, 153)" v-if="ArticleInfo.type === 'original' ">原创</Tag>
            <Tag color="rgb(0, 192, 145)" v-else-if="ArticleInfo.type === 'reprint' ">转载</Tag>
            <Tag color="rgb(2, 181, 218)" v-else-if="ArticleInfo.type === 'translate' ">翻译</Tag>
            {{this.ArticleInfo.title}}
          </span>
          </i-col>
        </Row>

        <!--Article 文章用户信息和状态信息-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-userInfo">
          <i-col span="12" style="line-height: 60px" >
            <!--该div用于显示用户头像-->
            <div style="float: left">
              <a style="text-decoration: none;margin: 0 10px">
                <img :src="this.ArticleInfo.userIcon"  alt="图片加载失败" class="img-circle" width="45px"/>
              </a>
            </div>

            <!--该div 用于显示文章作者，喜欢数，不喜欢数，浏览量-->
            <div style="line-height: 30px;">
              <a><span>{{this.ArticleInfo.nickname}}</span></a>
              <br>
              <span style="color: gray">{{ArticleInfo.time}}</span>&emsp;
              <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="22"/>&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.like}}</label></span>&emsp;
              <span><Icon type="md-eye" size="22" />&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.watch}}</label></span>
            </div>

          </i-col>
        </Row>

        <!--Article 文章主要内容-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-content">
          <i-col span="12">

            <div class="article_content">
              <!-- 复制粘贴过来的，死样式，后面再删 start -->
              <span v-html="this.ArticleInfo.content"></span>
              <!-- 复制粘贴过来的，死样式，后面再删 end -->
            </div>

          </i-col>
        </Row>
      </div>

      <Divider />

      <!--返回顶部-->
      <BackTop></BackTop>

    </div>
</template>

<script>
    import NotFound from "./404";
    import OkHeader from "../header/ok_header";
    import Loading from "../loading/loading";
    export default {
        name: "articleInfo",
      components: {Loading, OkHeader, NotFound},
      data() {
        return {
          ArticleInfo:{},
          isNotFound:false,
          isLoading:true,
        };
      },
     async mounted(){
        this.ArticleInfo.articleID = this.$route.params.article_id;
        const articleInfo = await this.$apis.ArticleApi.get_articleInfo(this.$route.params.article_id);
        console.log("web_articleInfo",articleInfo);
          if (articleInfo!=null){ //如果不为空，则赋值
            this.isLoading = false;
            this.isNotFound = false;
            this.ArticleInfo = articleInfo;
            this.ArticleInfo.userIcon = this.$store.getters.serverPath+JSON.parse(articleInfo.userIcon)[0]
          }else { //如果为空，则显示404组件
            this.isNotFound = true;
            this.isLoading = false;
          }
      },
      created(){
          //根据传递过来的ID，去请求相应文章的所有内容

      },
    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

  a{
    text-decoration: none;
    color: black;
  }

  #articleInfo{
    padding: 0;
    margin: 0;
  }

  .row-title{
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .row-userInfo{
  }

  .row-content{
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .article_title{
    font-size: 35px;
    font-weight: bold;
  }

  .article_title >>> .ivu-tag{
    font-size: 20px;
    font-family:"Microsoft YaHei UI Light",serif ;
    line-height: 35px;
    height: 35px;
  }


  .article_content{

  }

</style>
