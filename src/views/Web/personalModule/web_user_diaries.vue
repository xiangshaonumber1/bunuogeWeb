<template>

    <div class="my-diaries">

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

      <loading v-if="isLoading"></loading>

      <not-found v-else-if="isNotFound"></not-found>

      <div class="myDiaryInfo" v-else v-for="myDiary in myDiaryInfoList">
        <Card :bordered="false">
          <!--文章标题-->
          <div class="myDiaryTitle">
            <Tag color="rgb(255, 93, 71)" v-if="myDiary.type === 'private'">私有</Tag>
            <Tag color="rgb(35, 201, 237)" v-if="myDiary.type === 'public'">公开</Tag>
            <a @click="goDiaryInfo(myDiary.diaryID)" style="padding-top: 5px">
              <span v-html="myDiary.title" style="font-weight: bold;font-size: 20px;"></span>
            </a>
            <span style="float: right;margin-right: 20px;line-height: 30px">记录时间：<Icon type="md-time" size="16" />&nbsp;<Time :time="myDiary.time"/></span>
          </div>

          <!--文章内容-->
          <div class="myDiaryContent">
            <h5 v-html="replaceHtml(myDiary.content)"></h5>
          </div>
        </Card>

        <Divider style="margin-top: 0" />
      </div>

      <!--分页显示器 pagesize默认为10-->
      <Page class="text-center" @on-change="get_userDiary" :total="listTotal" show-total />

    </div>

</template>

<script>
    import Loading from "../../Common/loading";
    import NotFound from "../otherModule/404";
    export default {
      name: "management_diaries",
      components: {NotFound, Loading},
      data(){
        return {
          myDiaryInfoList:[],
          isLoading:true,
          isNotFound:false,
          listTotal:0, //总查询结果量
        }
      },

      methods:{

        async get_userDiary(page){  //获取当前用户的所发布的日记
          const result = await this.$apis.ArticleApi.get_userDiary(this.$route.params.open_id,page);
          console.log("获取日记信息：",result);
          if(result === null && page === 1){ //只有当第一次查询的结果为空（page为1时），显示notfound
            this.isNotFound = true;
            this.isLoading = false;
          }else {
            //赋值
            this.listTotal = result.total;
            this.myDiaryInfoList = result.diaryInfoList;
            this.isNotFound = false;
            this.isLoading = false;
          }
        },

        replaceHtml(value){ //去掉html标签
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

        goDiaryInfo(diaryID){ //前往日记详情页面
          //新建窗口跳转
          let DiaryInfo = this.$router.resolve({
            name:'web_diaryInfo',
            params:{
              diary_id:diaryID
            }
          });
          window.open(DiaryInfo.href,'_blank')
        },


      },

      mounted(){
        //根据传递过来的openID，获取对应的信息
        this.get_userDiary(1);
      },



    }
</script>

<style scoped>

  span{
    font-size: 14px;
  }

  a{
    color: black;
    text-decoration: none;
  }

  hr{
    margin: 10px 0;
  }

  .my-diaries{
    /*padding: 15px 35px;*/
    padding: 0;
    margin: 0;
  }

  .myDiaryInfo{
    margin: 5px 0;
  }

  .myDiaryTitle >>> .ivu-tag{
    padding: 3px 8px;
    height: 28px
    /*border: 1px solid salmon;*/
  }

  .myDiaryContent{

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



</style>
