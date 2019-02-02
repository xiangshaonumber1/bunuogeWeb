<template>
    <div class="index" >
      <!-- 固定在顶部的导航栏  -->
      <ok-header></ok-header>

      <!--首页主要内容-->
      <div class="index-content center-block">

        <Row type="flex" align="middle" class="code-row-bg" justify="space-between">
          <i-col span="15">
            <Carousel autoplay v-model="CarouselOrder" loop :autoplay-speed="autoplaySpeed">
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo1.jpg" alt="none"> </div>
              </CarouselItem>
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo2.jpg"  alt="none"></div>
              </CarouselItem>
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo3.jpg"  alt="none"></div>
              </CarouselItem>
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo4.jpg" alt="none"></div>
              </CarouselItem>
            </Carousel>
          </i-col>

          <i-col span="8" class="official-activities">
            <div>
              <p class="bg-info">官方活动版块一</p>
              <p class="bg-success">官方活动版块二</p>
              <p class="bg-danger">官方活动版块三</p>
            </div>

            <div class="excellent-articles">

              <p style="font-size: 20px;margin-bottom: 0"><Icon type="md-star-outline" size="25" color="rgb(251, 114, 153)" />&nbsp;今日星推荐</p>

              <div>
                <Button type="text" style="background-color: rgba(255,255,0,0.7);"><span>Top 1</span></Button>
                <strong>&nbsp;{{topList[0]}}</strong>
              </div>

              <div>
                <Button type="text" style="background-color: rgba(220,220,220,0.7);"><span>Top 2</span></Button>
                <strong>&nbsp;{{topList[1]}}</strong>
              </div>

              <div>
                <Button type="text" style="background-color: rgba(205, 154, 98,0.7);"><span>Top 3</span></Button>
                <strong>&nbsp;{{topList[2]}}</strong>
              </div>

            </div>

          </i-col>
        </Row>

        <hr>

        <Row>
          <i-col span="24">
            <p style="font-size: 20px;font-weight: bold;float: left">为你推送</p>
            <!--<div style="float: right">-->
              <!--<span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>-->
            <!--</div>-->
          </i-col>
        </Row>

        <Row>
          <i-col span="24">

            <div class="articles" v-for="article in articleList">
              <Card :bordered="false">
                <div class="articles-title">
                  <p><a @click="goArticleInfo(666)">现代浏览器探秘（part4）：事件处理</a></p>
                </div>
                <div class="articles-content">
                  <span>Content of no border type. Content of no border type.
                    <br>Content of no border type. Content of no border type.
                    Content of no border type. Content of no border type.
                    Content of no border type. Content of no border type.
                  </span>
                </div>
                <div class="articles-info">
                  <img src="https://i.loli.net/2017/08/21/599a521472424.jpg" class="img-circle"/>
                  <span>UserNickName</span>
                  <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="20"/>&nbsp;<label>1.88W</label></span>&emsp;
                  <span><Icon type="md-eye" size="20" />&nbsp;<label>1.88W</label></span>
                  <span style="float: right;margin-right: 20px"><Icon type="md-time" size="20" /><Time :time="push_time"></Time></span>
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
    import BlogFooter from "../footer/footer";
    import OkHeader from "../header/ok_header";
    export default {
      name: "index",
      components: {OkHeader, BlogFooter},
      data(){
        return {
          autoplaySpeed:5000,
          CarouselOrder:0,
          top_menu_theme:'light',
          top_menuItem_name:'articles',
          topList:['Centos下安装docker以及docker-composer以及docker-composer',
            '【跃迁之路】【696天】程序员高效学习方法论探索系列（实验阶段453-2019.1.16）',
            '“崩溃了？不可能，我全 Catch 住了” | Java 异常处理 '],
          articleList:[
            {},{},{},{},{},{},{},{},{},{},
          ],
          push_time: ((new Date()).getTime() - (60 * 3 * 1000)),
        }
      },
      methods:{
        goArticleInfo(id){
          this.$router.push({path:"/ai/"+id+""})
        }
      },
      mounted(){

      }

    }
</script>

<style scoped>

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
    text-align: center;
    color: white;
    margin: 0;
    padding: 0;
  }
  .my-carousel img{
    width: 100%;
    height: 100%;
  }

  .index{
    /*border: 1px solid red;*/
    width: 100vm;
    height: auto;
  }

  .index-content{
    margin-top: 20px;
    padding: 0;
    /*border: 1px solid gold;*/
    /*background-color: rgb(248, 248, 248);*/
    width: 75%;
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
