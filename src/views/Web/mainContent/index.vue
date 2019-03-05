<template>

    <div class="index">

      <!--首页主要内容-->
      <div class="index-content center-block">

        <Row type="flex" align="middle" class="code-row-bg" justify="space-between">
          <i-col span="15">
            <Carousel autoplay v-model="CarouselOrder" loop :autoplay-speed="autoplaySpeed">
              <CarouselItem v-for="(poster,index) in posterList" :key="index">
                <div class="my-carousel"><img :src="poster" alt=""></div>
              </CarouselItem>
            </Carousel>
          </i-col>

          <i-col span="8" class="official-activities">
            <div>
              <p class="bg-info">前端：Vue学习</p>
              <p class="bg-success">后端：SpringBoot</p>
              <p class="bg-danger">书籍：优质书籍推荐</p>
            </div>

            <div class="excellent-articles">

              <p style="font-size: 22px;margin-bottom: 0"><Icon type="md-star-outline" size="30" color="rgb(251, 114, 153)" />&nbsp;&nbsp;今日星推荐</p>

              <div>
                <Button type="text" style="background-color: rgba(255,255,0,0.7);"><span>Top&emsp;1</span></Button>
                <span>&emsp;<a>{{topList[0]}}</a></span>
              </div>

              <div>
                <Button type="text" style="background-color: rgba(220,220,220,0.7);"><span>Top&emsp;2</span></Button>
                <span>&emsp;<a>{{topList[1]}}</a></span>
              </div>

              <div>
                <Button type="text" style="background-color: rgba(205, 154, 98,0.7);"><span>Top&emsp;3</span></Button>
                <span>&emsp;<a>{{topList[2]}}</a></span>
              </div>

            </div>

          </i-col>
        </Row>

        <hr>

        <Row>
          <i-col span="24">
            <p style="font-size: 20px;font-weight: bold;float: left">为你推送</p>
            <div style="float: right">
              <span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>
            </div>
          </i-col>
        </Row>

        <!--正文内容-->
        <Row>
          <i-col span="24">

            <!--数据获取完成前显示正在加载-->
            <loading v-if="isLoading"></loading>

            <!--如果没有数据，显示404-->
            <not-found v-else-if="notFound"></not-found>

            <!--如果有数据，正常显示-->
            <div class="articles" v-else v-for="article in articleList">
              <Card :bordered="false">
                <div class="articles-title">
                  <p><a @click="goArticleInfo(article.articleID)">{{article.title}}</a></p>
                </div>
                <div class="articles-content">
                  <span style="color: gray;font-size: 14px">{{replaceHtml(article.content)}}</span>
                </div>
                <div class="articles-info">
                  <span>{{article.nickname}}</span>
                  <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="20"/>&nbsp;<label>{{article.like}}</label></span>&emsp;
                  <span><Icon type="md-eye" size="20" />&nbsp;<label>{{article.dislike}}</label></span>
                  <span style="float: right;margin-right: 20px"><Icon type="md-time" size="20" /><Time :time="article.time"></Time></span>
                </div>
              </Card>
              <Divider style="margin-top: 0" />
            </div>

          </i-col>
        </Row>



      </div>

      <!--返回顶部-->
      <BackTop></BackTop>

      <blog-footer></blog-footer>

    </div>
</template>

<script>
    import Loading from "../loading/loading";
    import NotFound from "./404";
    import BlogFooter from "../footer/footer";

    export default {
        name: "index",
      components: {BlogFooter, NotFound, Loading},
      data(){
        return {
          isLoading:true,
          notFound:true,
          autoplaySpeed:5000, //轮播切换时间
          CarouselOrder:0,  //幻灯片的索引，从 0 开始
          topList:['Centos下安装docker以及docker-composer以及docker-composer',
            '【跃迁之路】【696天】程序员高效学习方法论探索系列（实验阶段453-2019.1.16）',
            '“崩溃了？不可能，我全 Catch 住了” | Java 异常处理 '],
          articleList:[], //首页基本文章信息
          posterList:[],  //首页海报信息
          index_article_page:1 //获取指定页号的信息
        }
      },

      methods:{
        //前往文章详情页面
        goArticleInfo(id){
          //新建窗口跳转
          let ArticleInfo = this.$router.resolve({
            name:'web_articleInfo',
            params:{
              article_id:id
            }
          });
          window.open(ArticleInfo.href,'_blank')
        },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

        //获取首页基本文章信息
        async get_article_list(articlePage) {
          const result = await this.$apis.ArticleApi.get_article_list(articlePage);
          if (result == null && articlePage === 1) { //没有返回数据时
            this.notFound = true;
            this.isLoading = false;
          } else { //如果获取到的数据不为空
            this.notFound = false;
            this.isLoading = false;
            this.index_article_page++;
            console.log("push 前 输出 this.articleList：", result);
            for (let value of result){
              console.log("执行push");
              this.articleList.push(value)
            }
            console.log("push 后 输出 this.articleList：",this.articleList)
          }
        },

        //获取首页海报信息
        async getPosterList() {
          const result = await this.$apis.CommonApi.getPostList();
          if (result){
            for (let i=0;i<result.length;i++){ //为获取到的图片路径，添加服务器地址
              result[i] = this.$store.getters.serverPath+result[i];
            }
            this.posterList = result;
          }else{
            this.posterList = [{},{},{},{},{}];
          }
          console.log("this.posterList : ",this.posterList.length)
        },

        //滚动到底部，自定加载数据
        scroll(){
          window.onscroll = () =>{
            /**
             * document.documentElement.offsetHeight：网页可见区域高，获取元素自身的高度（包含边框）
             * document.documentElement.scrollTop; 获取当前页面的滚动条纵坐标位置，网页被卷去的高
             * window.innerHeight：获取浏览器页面可用高度
             */
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <=200;
            if (bottomOfWindow && this.isLoading === false){
              this.isLoading = true;
              console.log("这时候加载数据");
              this.get_article_list();
            }
          }
        }

      },

      //首页数据获取
      async mounted(){
        //获取首页基本文章信息
        this.get_article_list(this.index_article_page);

        //获取首页轮播海报图片
        this.getPosterList();

        this.scroll();
      },

    }
</script>

<style scoped>

  a{
    color: black;
  }

  span{
    font-size: 16px;
  }

  .excellent-articles div{
    /* 超出不换行 */
    white-space: nowrap;
    /* 超出长度时，出现省略号  */
    overflow:hidden;
    text-overflow:ellipsis;
    margin: 10px 0;
  }

  .excellent-articles span{
    font-size: 14px;
    font-weight: bolder;
    font-family: '微软雅黑',serif;
    color: black;
  }

  .excellent-articles strong{
    font-size: 16px;
    font-weight: bolder;
    font-family: '微软雅黑',serif;
    color: black;
  }

  .my-carousel{
    height: 450px;
    color: white;
    background: rgb(217, 237, 247);
    border-radius: 5px;
    padding: 0;
    margin: 0;
  }

  .my-carousel img{
    margin: 0;
    padding: 0;
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }

  .index-content{
    margin-top: 20px;
    padding: 0;
    /*border: 1px solid gold;*/
    /*background-color: rgb(248, 248, 248);*/
    width: 65vw;
  }

  .official-activities p{
    border-radius: 5px;
    padding: 15px 10px;
    font-size: 18px;
    font-family: "微软雅黑",serif;
  }

  .articles{
    margin: 10px 0;
  }

  .articles-title{
    font-size: 20px;
    font-weight: bold;
  }

  .articles-title a{
    color: black;
  }

  .articles-content{
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /*autoprefixer: off;*/
    -webkit-box-orient: vertical;
    /*autoprefixer: on;*/
    display:-webkit-box;
  }

  .articles-info{
    line-height: 30px;
    width: 100%;
    margin-top: 10px;
  }

  .articles-info img {
    width: 25px;
    float: left;
  }

  .articles-info span{
    margin-left: 5px;
    font-size: 14px;
  }
</style>
