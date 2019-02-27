<template>
    <div class="web_diaryInfo">

      <loading v-if="isLoading"></loading>

      <not-found v-else-if="isNotFound"></not-found>

      <div v-else>

        <Row type="flex" align="middle" justify="center" class="code-row-bg row-title">
          <i-col span="12" >
          <span class="diary_title">
            {{this.diaryInfo.title}}
          </span>
          </i-col>
        </Row>

        <!--Diary 文章用户信息-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-userInfo">
          <i-col span="12" style="line-height: 60px" >
            <!--该div用于显示用户头像-->
            <div style="float: left">
              <a style="text-decoration: none;margin: 0 10px">
                <img :src="this.diaryInfo.userIcon"  alt="图片加载失败" class="img-circle" width="45px"/>
              </a>
            </div>

            <!--该div 用于显示文章作者，喜欢数，不喜欢数，浏览量-->
            <div style="line-height: 30px;">
              <a><span>{{this.diaryInfo.nickname}}</span></a>
              <br>
              <span style="color: gray">发布时间：{{diaryInfo.time}}</span>&emsp;
            </div>

          </i-col>
        </Row>

        <!--Diary 文章主要内容-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-content">
          <i-col span="12">

            <div class="diary_content">
              <!-- 复制粘贴过来的，死样式，后面再删 start -->
              <span v-html="this.diaryInfo.content"></span>
              <!-- 复制粘贴过来的，死样式，后面再删 end -->
            </div>
          </i-col>
        </Row>

      </div>

      <!-- 分割线 -->
      <Divider />

      <!--返回顶部-->
      <BackTop></BackTop>

    </div>
</template>

<script>
    import Loading from "../loading/loading";
    import NotFound from "./404";
    export default {
        name: "web_diaryInfo",
      components: {NotFound, Loading},
      data(){
        return {
          isLoading:true,
          isNotFound:false,
          diaryInfo:{}
        }
      },

      methods:{

        async getDiaryInfo(){//根据diaryID，获取对饮的信息
          const result = await this.$apis.ArticleApi.get_diaryInfo(this.$route.params.diary_id);
          console.log("返回的信息：",result);
          if (result!==null){
            this.isLoading = false;
            this.isNotFound = false;
            this.diaryInfo = result;
          }else {
            this.isLoading = false;
            this.isNotFound = true;
          }
        }

      },

      mounted(){
          this.getDiaryInfo();
      }

    }
</script>

<style scoped>

  a{
    color: black;
    text-decoration: none;
  }

  .diary_title{
    font-size: 35px;
    font-weight: bold;
  }

  .diary_content{

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

</style>
