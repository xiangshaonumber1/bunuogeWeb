<template>
    <div id="articleInfo">
      <!-- ok导航栏（用户登录信息） -->
      <ok-header></ok-header>

      <!-- 是否显示404页面 -->
      <div  v-if="isNotFound">
        <not-found></not-found>
      </div>

      <!-- 否则显示主要内容页面 -->
      <div v-else>
        <!--Article 文章标题部分-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-title">
          <i-col span="12" >
          <span class="article_title">
            {{this.ArticleInfo.title}}
            {{$route.params.article_id}}
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

            <!--该div 用于显示文章作者你猜，喜欢数，不喜欢数，浏览量-->
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
          <i-col span="12" style="border: 1px solid red">

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
    import OkHeader from "../header/ok_header";
    import NotFound from "./404";
    export default {
        name: "articleInfo",
      components: {NotFound, OkHeader},
      data() {
        return {
          ArticleInfo:{
            articleID:'',       //文章ID
            openID:'',          //用户账号openID
            nickname:'',        //用户昵称
            userIcon:'',        //用户头像
            pictureCover:'',    //封面图
            title:'',           //文章标题
            content:'',         //文章内容
            label:'',           //文章标签
            time:'',            //发布时间
            watch:0,            //文章的浏览量
            like:0,             //文章的喜欢量
            dislike:0,          //文章的不喜欢量
          },
          isNotFound:false,
        };
      },
      methods:{
          //获取文章详情的方法
          getArticleInfo(){
            if (this.ArticleInfo.articleID !== ''){
              this.$axios({
                url:'/article/get_articleInfo',
                method:'get',
                params:{
                  articleID : this.ArticleInfo.articleID,
                }
              }).then((response)=>{
                console.log("web_articleInfo 第一次执行返回的信息:",response);
                if (response.data.code === '404'){
                  this.isNotFound = true;
                  console.log("404, NotFound")
                }else if (response.data.code === 'reTry'){
                  console.log("web_articleInfo reTry 时 执行");
                  this.getArticleInfo();
                } else {
                  this.ArticleInfo.nickname = response.data.data.nickname;
                  this.ArticleInfo.userIcon = response.data.data.userIcon;
                  this.ArticleInfo.content = response.data.data.content;
                  this.ArticleInfo.title = response.data.data.title;
                  this.ArticleInfo.label = response.data.data.label;
                  this.ArticleInfo.time = response.data.data.time;
                  this.ArticleInfo.watch = response.data.data.watch;
                  this.ArticleInfo.like = response.data.data.like;
                  this.ArticleInfo.dislike = response.data.data.dislike;
                }
              })
            }
          }
      },
      mounted(){
          this.ArticleInfo.articleID = this.$route.params.article_id;

          this.getArticleInfo();
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
    font-size: 25px;
    font-weight: bold;
  }
  .article_content{

  }

</style>
