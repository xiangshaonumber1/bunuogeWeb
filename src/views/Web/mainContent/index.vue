<template>

    <div class="index">

      <!--首页主要内容-->
      <div class="index-content center-block">

        <Row type="flex" align="middle" class="code-row-bg" justify="space-between">
          <i-col span="15">
            <Carousel autoplay v-model="CarouselOrder" loop :autoplay-speed="autoplaySpeed">
              <CarouselItem v-for="(poster,index) in posterList" :key="index">
                <div class="my-carousel">
                  <img :src="poster" alt="">
                </div>
              </CarouselItem>
            </Carousel>
          </i-col>

          <i-col span="8" class="official-activities">
            <div>
              <a @click="goSpecialArea()"><p class="bg-info">前端：Vue学习</p></a>
              <a @click="goSpecialArea()"><p class="bg-success">后端：SpringBoot</p></a>
              <a @click="goSpecialArea()"><p class="bg-danger">书籍：优质书籍推荐</p></a>
            </div>

            <div class="excellent-articles">

              <p style="font-size: 22px;margin-bottom: 0">
                <Icon type="md-star-outline" size="30" color="rgb(251, 114, 153)" />
                &nbsp;今日星推荐
              </p>

              <a>
                <div>
                  <Button type="text" style="background-color: rgba(255,255,0,0.7);"><span>Top&nbsp;1</span></Button>
                  <span>&nbsp;{{topList[0]}}</span>
                </div>
              </a>

              <a>
                <div>
                  <Button type="text" style="background-color: rgba(220,220,220,0.7);"><span>Top&nbsp;2</span></Button>
                  <span>&nbsp;{{topList[1]}}</span>
                </div>
              </a>

              <a>
                <div>
                  <Button type="text" style="background-color: rgba(205, 154, 98,0.7);"><span>Top&nbsp;3</span></Button>
                  <span>&nbsp;{{topList[2]}}</span>
                </div>
              </a>

            </div>

          </i-col>
        </Row>

        <hr>

        <Row>
          <i-col span="24">
            <p style="float: left;font-size: 20px;font-weight: bold;">
              <Icon type="md-trophy" style="float: left" size="25" color="goldenrod" />
              &nbsp;为你推送</p>
            <div style="float: right">
              <span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>
            </div>
          </i-col>
        </Row>

        <!--正文内容-->
        <Row type="flex" class="code-row-bg" justify="center">
          <i-col span="24">

            <!--数据获取完成前显示正在加载-->
            <loading v-if="isLoading"></loading>

            <!--如果没有数据，显示404-->
            <not-found v-else-if="notFound"></not-found>

            <!--如果有数据，正常显示-->
            <div  v-else v-for="article in articleList">
              <Card :bordered="false" class="articleCard">
                <div class="articles-title">
                  <p><a @click="goArticleInfo(article.articleID)">{{article.title}}</a></p>
                </div>
                <div class="articles-content">
                  <span style="color: gray;font-size: 14px">{{replaceHtml(article.content)}}</span>
                </div>
                <div class="articles-info">
                  作者：<span v-html="article.nickname"></span>&emsp;
                  <span>点赞量：<Icon type="md-heart" color="rgb(251, 114, 153)" size="20"/>&nbsp;<label>{{article.like}}</label></span>&emsp;
                  <span>浏览量：<Icon type="md-eye" size="20" />&nbsp;<label>{{article.watch}}</label></span>&emsp;
                  <span>收藏量：<Icon type="md-star" size="20" style="margin-bottom: 5px" />&nbsp;<label style="margin: 0;padding: 0">{{article.collection}}</label></span>
                  <span style="float: right;margin-right: 20px">发布时间：<Icon type="md-time" size="20" /><Time :time="article.time"></Time></span>
                </div>
              </Card>
              <Divider style="margin-top: 0;" />
            </div>

          </i-col>

          <!--加载更多Button,当自动加载次数超过三次时，需要手动加载更多-->
          <i-col span="12">
            <div class="loadMoreButton">
              <Button v-if="this.loadMore && this.page>3" type="info" size="large" @click="get_article_list(page)" long >
                <span>加 载 更 多 > > > </span>
              </Button>
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
    import store from '../../../blog_vuex/store'

    export default {
        name: "index",
      components: {BlogFooter, NotFound, Loading},
      data(){
        return {
          isLoading:true,       //第一次请求加载等待
          notFound:true,        //第一次请求失败显示
          page:1, //获取指定页号的信息
          loadMore:true, //是否允许加载下一页
          scrollLoadSwitch:true, //滚动数据加载开关,防止滚动到底部的时候，防止多次请求
          autoplaySpeed:5000, //轮播切换时间
          CarouselOrder:0,  //幻灯片的索引，从 0 开始
          topList:['暂无推荐，敬请期待...',
            '暂无推荐，敬请期待...',
            '暂无推荐，敬请期待...'],
          articleList:[], //首页基本文章信息
          posterList:[],  //首页海报信息
        }
      },

      methods:{

        //前往指定专区
        goSpecialArea(area){
          this.$Notice.info({
            title:'敬请期待：',
            desc:'该板块正开发，敬请期待'
          })
        },

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
          //只有允许加载下一页的情况下，才去请求数据
          if (this.loadMore){
            const result = await this.$apis.ArticleApi.get_article_list(articlePage);
            console.log("我看看你到底要输出什么:",result)
            if (result.total === 0 && articlePage === 1) {                     //情况一：第一次请求返回null，直接返回无资源
              this.notFound = true;
              this.isLoading = false;
            }else {                                                         //情况二：有具体的返回数据
              //循环向现有的文章数组中添加元素
              for (let value of result.newest_article){
                this.articleList.push(value)
              }
              //只有当当前显示的文章信息数小于总数时，才允许加载下一页
              if (result.total > this.articleList.length){
                this.loadMore = true;
                this.page++;
              }else {
                this.loadMore = false;
              }

              //防止意料之外的情况，设置 notFound 和 isLoading 为 false
              this.notFound = false;  //不显示404
              this.isLoading = false; //不显示第一次的正在加载
              //数据加载完毕，启用滚动加载开关，可滚动加载数据
              this.scrollLoadSwitch = true;
            }
          }else {
            this.$Message.info({
              top:0,
              content:'已经加载到底了，再往下也没有了！',
              duration:3,
            });
            console.log("数据已加载完毕")
          }
        },

        //滚动到底部，自定加载数据
        async scroll(){
          window.onscroll = () =>{
            /**
             * document.documentElement.offsetHeight：网页可见区域高，获取元素自身的高度（包含边框）
             * document.documentElement.scrollTop; 获取当前页面的滚动条纵坐标位置，网页被卷去的高
             * window.innerHeight：获取浏览器页面可用高度
             */
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < 100;
            //注：只有距离满足条件，允许加载下一页数据，且当前page为1,2,3时，才允许滚动加载
            if (bottomOfWindow && this.loadMore===true && this.page<=3 && this.scrollLoadSwitch === true){
              //打开滚动加载数据开关，防止重复请求
              this.scrollLoadSwitch = false;
              console.log("请求加载数据，请求page为",this.page);
              this.get_article_list(this.page);
            }
          }
        },


        //获取首页海报信息
        async getPosterList() {
          const result = await this.$apis.CommonApi.getPostList();
          if (result){
            for (let i=0;i<result.length;i++){ //为获取到的图片路径，添加服务器地址
              result[i] = store.getters.serverPath+result[i];
            }
            this.posterList = result;
          }else{
            this.posterList = [{},{},{},{},{}];
          }
          // console.log("this.posterList : ",this.posterList.length)
        },

        //获取近三日热门推荐文章
        async getTop(){
            const result = await this.$apis.ArticleApi.getTop();
        },

        //判断是否有必要刷新token
        async refreshToken() {
          const token = localStorage.getItem("token");
          if (token){
            const result = await this.$apis.AuthenticationApi.getToken();
            console.log("是否有刷新token：",result);
          }else {
            console.log("token 获取为空，不用刷新");
          }
        }

      },

      //首页数据获取
      mounted(){

        //首页刷新token，(如果有必要)
        this.refreshToken();

        //获取首页基本文章信息
        this.get_article_list(this.page);

        //获取首页轮播海报图片
        this.getPosterList();

        //滑到距离底部一定距离时，自动加载下一页的数据
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
    height: 400px;
    overflow: hidden;
    position: relative;
    color: white;
    background: rgb(217, 237, 247);
    border-radius: 5px;
    padding: 0;
    margin: 0;
  }

  .my-carousel img{
    margin: auto;
    padding: 0;
    border-radius: 5px;
    position: absolute;
    width: 100%;
    max-width: 100%;
    height: 100%;
  }

  .index-content{
    margin-top: 20px;
    padding: 0;
    /*border: 1px solid gold;*/
    /*background-color: rgb(248, 248, 248);*/
    width: 65vw;
  }

  .official-activities a{
    color: black;
    text-decoration: none;
  }

  .official-activities p{
    border-radius: 5px;
    padding: 15px 10px;
    font-size: 18px;
    font-family: "微软雅黑",serif;
  }

  .articleCard:hover{
    /*border: 1px solid red;*/
    margin-left: 15px;
    margin-right: -15px;
    margin-bottom: 15px;
  }


  .articles-title{
    font-size: 20px;
    font-weight: bold;
  }

  .articles-title a{
    color: black;
  }

  .articles-content{
    overflow: hidden;   /* 超出容器隐藏，不然会撑破容器。 */

    text-overflow: ellipsis;    /* 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。 */
    display:-webkit-box;    /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。 */
    /*! autoprefixer: off */
    -webkit-line-clamp: 3;      /* -webkit-box-orient: vertical;这行样式上下需要加上上文中的注释，否则用webpack后-webkit-box-orient样式会丢失  需要显示的文本行数 */
    /* autoprefixer: on */
    -webkit-box-orient: vertical;   /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。 */

    word-wrap:break-word;
    white-space: pre-wrap;
  }

  .articles-info{
    line-height: 30px;
    width: 100%;
    margin-top: 10px;
    color:cadetblue;
  }

  .articles-info img {
    width: 25px;
    float: left;
  }

  .articles-info span{
    margin-left: 5px;
    font-size: 14px;
  }

  .loadMoreButton{
    margin-top: 20px;
    margin-bottom: 50px;
  }

</style>
