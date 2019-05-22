<template>
    <div class="commentAndReply">

      <!--新建文章评论编辑区-->
      <Row v-if="$store.getters.isLogin" type="flex" class="code-row-bg" align="middle" justify="start">
        <i-col style="line-height: 40px" span="24">
          <Divider />
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
              <h5 style="font-size: 20px;">{{commentAndReplyInfo.comment_content}}&emsp;
                <a @click="edit_comment_reply(comment_index)"><Icon type="md-chatboxes" />&nbsp;回复ta</a>
              </h5>
            </blockquote>

            <!--文章的评论的编辑框-->
            <div v-if="commentAndReplyInfo.isEdit">
              <Input v-model="commentAndReplyInfo.answer_comment" type="textarea" :rows="3" placeholder="在这里写下你对这篇文章的看法......" autofocus></Input><br>
              <p class="text-right"><Button type="primary" style="margin-top: 5px" ghost @click="write_reply(commentAndReplyInfo.from_openID,commentAndReplyInfo.answer_comment,commentAndReplyInfo.commentID)">确&nbsp;认&nbsp;评&nbsp;论&nbsp;ta</Button></p>
            </div>

            <!--文章评论下的回复信息，有则加载，无则不加载-->
            <div v-if="commentAndReplyInfo.replyInfoList.length >0" class="div-replyInfo">
              <div >
                <Timeline>
                  <TimelineItem color="cadetblue" v-for="(replyInfo,reply_index) in commentAndReplyInfo.replyInfoList" :key="reply_index">
                    <span><span style="color: gray">{{replyInfo.reply_time}}</span></span>
                    <br>
                    <a @click="goUserInfo(replyInfo.from_openID)"><span style="color: cadetblue" v-html="replyInfo.from_nickname"></span></a>
                    <span style="font-size: 18px;font-weight: bolder;margin: 0 8px;">@to</span>
                    <a @click="goUserInfo(replyInfo.to_openID)"><span style="color: cadetblue" v-html="replyInfo.to_nickname"></span></a>
                    <span>：&nbsp;{{replyInfo.reply_content}}</span>&emsp;
                    <span><a @click="edit_reply_reply(comment_index,reply_index)"><Icon type="md-chatboxes" />&nbsp;回复ta</a></span>
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

        <!-- 加载更多按钮 -->
        <p class="text-center" v-if="isLoadMoreComment" style="margin-top: 50px">
          <Button type="info" @click="getCommentAndReplyInfo($route.params.article_id,0)" size="large">
            <span style="font-size: 18px">&emsp;查 看 全 部&emsp;>>&nbsp;</span>
          </Button>
        </p>
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
          isLoadMoreComment:false,   //是否显示并且允许加载剩下的全部内容评论信息
          isLoadMoreReply:false,    //是否显示并且允许加载剩下的全部回复内容信息
          //用户准备回复，所包含的信息，
          reply_content:[{
            comment_reply_content:'',
            reply_reply_content:[],
          }],
          commentTotal:0,
        };
      },
      methods:{

        //针对当前文章，写评论
        async write_comment(value) {
          if (value.length === 0 || value === null) {
            return this.$Message.error({
              content: "发送内容不能为空！",
              duration: 3,
              top: 200
            })
          }

          console.log("输出 articleID:", this.$route.params.article_id,);
          //参数未加 我为自己刚发布的一篇文章新增一条评论
          let authorID = this.$route.params.open_id;
          let articleID = this.$route.params.article_id;
          let openID = this.$store.getters.openID;
          const result = await this.$apis.ArticleApi.write_comment(articleID,authorID,openID,value);
          if (result) {
            this.$Message.success({
              content:"新增评论成功！",
            });

            //新增评论成功后，再获取一次评论和回复数据，并清除当前文本框
            this.comment_content = null;
            return this.getCommentAndReplyInfo(this.$route.params.article_id);
          }
        },

        //获取指定ID的文章的评论和评论下的回复信息
        async getCommentAndReplyInfo(articleID,pageCount){
          const result = await this.$apis.ArticleApi.getCommentAndReplyInfo(articleID,1,pageCount);
          if (result.total > 0){
            const commentAndReplyInfoList = result.commentAndReplyInfoList;
            for (let info of commentAndReplyInfoList){
              info.from_userIcon = this.$store.getters.serverPath+JSON.parse(info.from_userIcon)[0];
              info.isEdit = false;  //文章评论编辑框默认显示为false
              info.answer_comment = '';   //为回复评论信息做初始化
              for (let replyInfo of info.replyInfoList){
                replyInfo.isEdit = false;   //评论回复编辑框默认显示为false
                replyInfo.answer_reply = ''; //为回复 评论下的回复信息 做初始化
              }
            }
            const commentTotal = result.total;
            //判断下一页是否还有数据
            this.isLoadMoreComment = commentTotal>commentAndReplyInfoList.length;
            //把返回的结果传递到data中
            this.commentAndReplyInfoList = commentAndReplyInfoList;
          }else {
            console.log("数据为空哦！！！！！！！！！！！！！！！！！！！！！！");
          }
        },

        //
        isLogin(){
          if (!this.$store.getters.isLogin){
           return this.$Notice.warning({
              title:'登陆提示',
              desc:'当前操作需要登录后才能进行，请先进行登录或注册！',
            })
          }else {
            return true;
          }
        },

        //前往查看用户信息
        goUserInfo(openID){
          this.$router.push({name:'web_userInfo',params:{open_id:openID}})
        },

        //点击回复，激活编辑
        edit_comment_reply(comment_index){
          if (this.isLogin()){
            this.commentAndReplyInfoList[comment_index].isEdit = !this.commentAndReplyInfoList[comment_index].isEdit;
          }
        },

        //点击回复，点亮编辑
        edit_reply_reply(comment_index,reply_index){
          if (this.isLogin()){
            this.commentAndReplyInfoList[comment_index].replyInfoList[reply_index].isEdit = !this.commentAndReplyInfoList[comment_index].replyInfoList[reply_index].isEdit;
          }
        },

        //给该篇的某个评论信息留下一条回复
        async write_reply(aim_openID, reply_content, commentID) {
          //回复需要的信息
          let replyInfo = {
            articleID: this.$route.params.article_id,
            commentID: commentID,
            from_openID: this.$store.getters.openID,
            reply_content: reply_content,
            to_openID: aim_openID,
          };
          const result = await this.$apis.ArticleApi.write_reply(replyInfo);
          if (result){
            this.$Message.success({
              content:'回复成功'
            });
            return this.getCommentAndReplyInfo(this.$route.params.article_id);
          }
        },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },


      },

      mounted(){
          console.log("mounted 输出：",this.$store.getters.isLogin);
          //获取文章的评论和回复信息
          this.getCommentAndReplyInfo(this.$route.params.article_id)
      }
    }
</script>

<style scoped>

  >>> .ivu-timeline-item-tail{
    border-left: 1px solid cadetblue;
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
