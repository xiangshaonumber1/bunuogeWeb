<template>
    <div class="my-diaries">

      <loading v-if="isLoading"></loading>

      <not-found v-else-if="notFound"></not-found>

      <!-- Title 部分 -->
      <Row>
        <i-col>
          <span style="font-size: 20px;font-weight: bold">日记创作详情</span>
          <div style="float: right">
            <span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>
          </div>
          <hr>
        </i-col>
      </Row>

      <div class="diaries_content" v-for="myDiary in myDiaryInfoList">

        <div class="diary_data">
          <Button type="success" ghost>公开</Button>&nbsp;
          <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
        </div>

        <!--文章作者和文章状态信息-->
        <div class="myArticleOtherInfo">
          <span>{{myDiary.nickname}}</span>&emsp;
          <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="16"/>&nbsp;<label>{{myDiary.like}}</label></span>&emsp;
          <span><Icon type="md-eye" size="16" />&nbsp;<label>{{myDiary.dislike}}</label></span>
          <span style="float: right;margin-right: 20px"><Icon type="md-time" size="16" />&nbsp;<Time :time="myDiary.time"/></span>
        </div>

        <hr style="margin: 5px 0;">
      </div>


    </div>
</template>

<script>
    import Loading from "../../Web/loading/loading";
    import NotFound from "../../Web/mainContent/404";
    export default {
      name: "management_diaries",
      components: {NotFound, Loading},
      data(){
        return {
          myDiaryInfoList:[],
          isLoading:true,
          notFound:false,
        }
      }
    }
</script>

<style scoped>

  span{
    font-size: 14px;
  }

  hr{
    margin: 5px 0;
  }

  label{
    margin: 0;
    padding: 0;
  }

  .my-diaries{
    padding: 15px 35px;
  }

  .diary_title, .diary_data, .diary_time{
    /* 超出不换行 */
    white-space: nowrap;
    /* 超出长度时，出现省略号  */
    overflow: hidden;
    text-overflow:ellipsis;
  }

  .diary_data label{
    margin: 0;
    padding: 0;
  }
</style>
