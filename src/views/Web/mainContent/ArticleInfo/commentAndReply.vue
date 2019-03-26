<template>
    <div class="commentAndReply">

      <!--新建文章评论编辑区-->
      <Row type="flex" class="code-row-bg" align="middle" justify="start">
        <i-col style="line-height: 40px" span="24">
          <img :src="this.$store.getters.avatar" alt="..." class="img-circle" width="40px">
          <span style="font-size: 18px" v-html="this.$store.getters.userInfo.nickname"></span><br>
          <Input type="textarea" v-model.trim="comment_content" :rows="5"  placeholder="自古套路留不住，评论底下出人才，你想说什么呢？" class="write_comment"></Input><br>
          <Button type="info" size="large" style="float: right;margin: 5px 0" @click="write_comment(comment_content)"><span>发&nbsp;送&nbsp;评&nbsp;论</span></Button>
        </i-col>
      </Row>

      <!--文章的评论和回复 部分-->
      <div>

        <!--包含文章的评论和回复信息,循环部分-->
        <div v-for="(commentAndReplyInfo,comment_index) in commentAndReplyInfoList" :key="comment_index">
          <Divider/>
          <!--文章的评论信息，有则加载，无则不显示，该div下包含回复（reply）部分的div-->
          <div class="div-commentInfo">
            <a @click="goUserInfo(commentAndReplyInfo.from_openID)">
              <img style="float: left" :src="commentAndReplyInfo.from_userIcon" alt="..." class="img-circle" width="45px">
              <span style="margin-left: 10px" v-html="commentAndReplyInfo.from_nickname"></span>
            </a>
            <br>
            <span style="margin-left: 10px">{{commentAndReplyInfo.comment_time}}</span>
            <!--具体的评论内容 隔行-->
            <blockquote style="margin:10px 0;padding: 3px 20px">
              <h4 style="font-size: 20px;">{{commentAndReplyInfo.comment_content}}&emsp;
                <a @click="edit_comment_reply(comment_index)"><Icon type="md-chatboxes" />&nbsp;回复ta</a>
              </h4>
            </blockquote>
            <!--文章的评论的编辑框-->
            <div v-if="commentAndReplyInfo.isEdit">
              <Input v-model="commentAndReplyInfo.answer_comment" type="textarea" :rows="3" placeholder="在这里写下你对这篇文章的看法......" autofocus></Input><br>
              <p class="text-right"><Button type="primary" style="margin-top: 5px" ghost @click="write_reply(commentAndReplyInfo.from_openID,commentAndReplyInfo.answer_comment,commentAndReplyInfo.commentID)">确&nbsp;认&nbsp;评&nbsp;论&nbsp;ta</Button></p>
            </div>

            <!--文章评论下的回复信息，有则加载，无则不加载-->
            <div class="div-replyInfo">
              <div >
                <Timeline>
                  <TimelineItem color="rgb(45, 140, 240)" v-for="(replyInfo,reply_index) in commentAndReplyInfo.replyInfoList" :key="reply_index">
                    <span><span style="color: gray">{{replyInfo.reply_time}}</span></span>
                    <br>
                    <a @click="goUserInfo(replyInfo.from_openID)"><span style="color: cadetblue" v-html="replyInfo.from_nickname"></span></a>
                    <span style="font-size: 18px;font-weight: bolder;margin: 0 8px;">@to</span>
                    <a @click="goUserInfo(replyInfo.to_openID)"><span style="color: cadetblue" v-html="replyInfo.to_nickname"></span></a>
                    <span>：&nbsp;{{replyInfo.reply_content}}</span>&emsp;<a @click="edit_reply_reply(comment_index,reply_index)"><Icon type="md-chatboxes" />&nbsp;回复ta</a>
                    <!--文章的评论下的回复的编辑框-->
                    <div v-if="replyInfo.isEdit">
                      <Input v-model="replyInfo.answer_reply" type="textarea" :rows="3" :placeholder="'@to '+replaceHtml(replyInfo.from_nickname)+'：'"></Input>
                      <p class="text-right">
                        <Button type="primary" style="margin-top: 5px" ghost @click="write_reply(replyInfo.from_openID,replyInfo.answer_reply,replyInfo.commentID)">确&nbsp;认&nbsp;回&nbsp;复&nbsp;ta</Button>
                      </p>
                    </div>
                  </TimelineItem>
                </Timeline>

              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
</template>

<script>
    export default {
        name: "commentAndReply",
      data() {
        return {
          comment_content:'',     //评论内容
          commentAndReplyInfoList:{},

          //用户准备回复，所包含的信息，
          reply_content:[{
            comment_reply_content:'',
            reply_reply_content:[],
          }],
        };
      },
      methods:{

        //针对当前文章，写评论
        async write_comment(value) {
          if (value.length === 0) {
            this.$Message.error({
              content: "发送内容不能为空！",
              duration: 3,
              top: 200
            })
          }
          //参数未加
          const result = await this.$apis.ArticleApi.write_comment();
        },

        //获取指定ID的文章的评论和评论下的回复信息
        async getCommentAndReplyInfo(articleID){
          const result = await this.$apis.ArticleApi.getCommentAndReplyInfo(articleID,1);
          if (result){
            for (let info of result){
              info.from_userIcon = this.$store.getters.serverPath+JSON.parse(info.from_userIcon)[0];
              info.isEdit = false;  //文章评论编辑框默认显示为false
              info.answer_comment = '';   //为回复评论信息做初始化
              for (let replyInfo of info.replyInfoList){
                replyInfo.isEdit = false;   //评论回复编辑框默认显示为false
                replyInfo.answer_reply = ''; //为回复 评论下的回复信息 做初始化
              }
            }
            this.commentAndReplyInfoList = result;
            // console.log("输出信息看看：",this.commentAndReplyInfoList);
          }else {
            console.log("数据为空哦！！！！！！！！！！！！！！！！！！！！！！")
          }
        },

        //前往查看用户信息
        goUserInfo(openID){
          this.$router.push({name:'web_userInfo',params:{open_id:openID}})
        },

        //点击回复，激活编辑
        edit_comment_reply(comment_index){
          this.commentAndReplyInfoList[comment_index].isEdit = !this.commentAndReplyInfoList[comment_index].isEdit;
        },

        //点击回复，点亮编辑
        edit_reply_reply(comment_index,reply_index){
          this.commentAndReplyInfoList[comment_index].replyInfoList[reply_index].isEdit = !this.commentAndReplyInfoList[comment_index].replyInfoList[reply_index].isEdit;
        },

        //给该篇的某个评论信息留下一条回复
        write_reply(aim_openID,reply_content,commentID){
          console.log("当前articleID：",this.$route.params.article_id);
          console.log("当前commentID：",commentID);
          console.log("当前from_openID：",this.$store.getters.openID);
          console.log("当前reply_content：",reply_content);
          console.log("当前aim_openID：",aim_openID);
          console.log("reply_reply_content，所有信息：",this.reply_reply_content);
          console.log("reply_comment_content，所有信息：",this.reply_comment_content);
        },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },


      },

      mounted(){
          //获取文章的评论和回复信息
          this.getCommentAndReplyInfo(this.$route.params.article_id)
      }
    }
</script>

<style scoped>

  >>> .ivu-timeline-item-tail{
    border-left: 1px solid rgb(45, 140, 240);
  }

  >>> .ivu-input{
    resize: none;
    margin-top: 10px;
  }

  a{
    text-decoration: none;

  }

  .div-replyInfo{
    /*border: 1px solid blue;*/
    float: none;
    border-radius: 8px;
    padding: 5px 20px;
    background-color: rgba(238, 238, 238,0.6);
  }
  .div-replyInfo div{
    margin: 5px 0;
    /*border: 1px solid red;*/
  }
  .div-replyInfo span{
    font-size: 16px;
    /*border: 1px solid blue;*/
    line-height: 28px;
  }
  .div-commentInfo{
    /*border: 1px solid red;*/
    margin-top: 20px;
    margin-bottom: 5px;
  }
  .div-commentInfo span{
    font-size: 18px;
  }
</style>
