<template>
    <div id="articleInfo">
      <ok-header></ok-header>

      <Row type="flex" align="middle" justify="center" class="code-row-bg row-title">
        <i-col span="12" >
          <span class="article_title">
            SpringBoot自动配置原理
            {{$route.params.article_id}}
          </span>
        </i-col>
      </Row>

      <Row type="flex" align="middle" justify="center" class="code-row-bg row-userInfo">
        <i-col span="12" style="line-height: 60px" >
          <div style="float: left">
            <a style="text-decoration: none;margin: 0 10px">
              <img src="https://i.loli.net/2017/08/21/599a521472424.jpg"  alt="none" class="img-circle" width="45px"/>
            </a>
          </div>

          <div style="line-height: 30px;">
            <a><span>丿丶祥灬少</span></a>
            <br>
            <span style="color: gray"> <Time :time="ArticleInfo.time" type="datetime" /></span>&emsp;
            <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="18"/>&nbsp;<label style="margin: 0;padding: 0">this.ArticleInfo.like</label></span>&emsp;
            <span><Icon type="md-eye" size="18" />&nbsp;<label style="margin: 0;padding: 0">this.ArticleInfo.watch</label></span>
          </div>

        </i-col>
      </Row>

      <Row type="flex" align="middle" justify="center" class="code-row-bg row-content">
        <i-col span="12" style="border: 1px solid red">

          <div class="article_content">
            <!-- 复制粘贴过来的，死样式，后面再删 start -->
            this.ArticleInfo.title
            this.ArticleInfo.content
            <!-- 复制粘贴过来的，死样式，后面再删 end -->
          </div>

        </i-col>
      </Row>

      <Divider />

      <BackTop></BackTop>

    </div>
</template>

<script>
    import OkHeader from "../header/ok_header";
    export default {
        name: "articleInfo",
      components: {OkHeader},
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
        };
      },
      created(){
          this.ArticleInfo.articleID = this.$route.params.article_id;
          console.log("created 文章ID:",this.ArticleInfo.articleID);

        if (this.ArticleInfo.articleID !== ''){
          this.$axios({
            url:'/article/get_articleInfo',
            method:'post',
            data:this.$qs.stringify({
              articleID : this.ArticleInfo.articleID,
            })
          }).then((response)=>{
            console.log("链接成功，返回的信息:",response);
            this.ArticleInfo.nickname = response.data.data.nickname;
            this.ArticleInfo.userIcon = response.data.data.userIcon;
            this.ArticleInfo.content = response.data.data.content;
            this.ArticleInfo.title = response.data.data.title;
            this.ArticleInfo.label = response.data.data.label;
            this.ArticleInfo.time = response.data.data.time;
            this.ArticleInfo.watch = response.data.data.watch;
            this.ArticleInfo.like = response.data.data.like;
            this.ArticleInfo.dislike = response.data.data.dislike;
          })
        }
      },
      mounted(){
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
