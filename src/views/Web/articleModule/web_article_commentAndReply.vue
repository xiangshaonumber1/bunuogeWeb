<template>
    <div class="commentAndReply">

      <!--文章评论编辑区-->
      <Row v-if="$store.getters.isLogin" type="flex" class="code-row-bg" align="middle" justify="start">
        <i-col span="24">
          <Divider />
          <b-img class="c-img-avatar" rounded="circle" :src="this.$store.getters.avatar" alt="none"></b-img>
          <span class="c-span-nickname" v-html="this.$store.getters.userInfo.nickname"></span><br>
          <Input class="c-input-comment" type="textarea" v-model.trim="comment_content" :rows="5" placeholder="自古套路留不住，评论底下出人才，你想说什么呢？"></Input><br>
          <Button class="c-button-article" type="info" size="large" @click="write_comment(comment_content)"><span>发送评论</span></Button>
        </i-col>
      </Row>

      <!--文章的评论和回复的展示部分-->
      <div>
        <!--循环展示评论及下的回复信息-->
        <div v-for="(commentAndReplyInfo,comment_index) in commentAndReplyInfoList" :key="comment_index">
          <Divider/>
          <!--文章的评论信息，有则加载，无则不显示，该div下包含回复（reply）部分的div-->
          <div class="comment">
            <!--评论头部机构-->
            <div class="comment-header">
              <a @click="goUserInfo(commentAndReplyInfo.from_openID)">
                <b-img class="c-header-avatar" rounded="circle" :src="commentAndReplyInfo.from_userIcon" alt="..."></b-img>
                <span class="c-header-nickname" v-html="commentAndReplyInfo.from_nickname"></span>
              </a>
              <span class="c-header-time" v-html="commentAndReplyInfo.comment_time"></span>
            </div>

            <!--评论内容详情结构-->
            <blockquote class="comment-content">
              <span v-html="commentAndReplyInfo.comment_content"></span>
              <span class="iconfont icon-huifu c-content-button" @click="edit_comment_reply(comment_index)">回复ta</span>
            </blockquote>

            <!--回复相关信息部分-->
            <div v-if="commentAndReplyInfo.isEdit" class="comment-reply">
              <Input v-model="commentAndReplyInfo.answer_comment" type="textarea" :rows="3" placeholder="想对他说......" autofocus></Input><br>
              <Button class="c-reply-button" type="primary" ghost @click="write_reply(commentAndReplyInfo.from_openID,commentAndReplyInfo.answer_comment,commentAndReplyInfo.commentID)">确认评论ta</Button>
            </div>

            <!--文章评论下的回复信息，有则加载，无则不加载-->
            <div class="comment-replyInfo" v-if="commentAndReplyInfo.replyInfoList.length >0" >
              <Timeline>
                <TimelineItem color="cadetblue" v-for="(replyInfo,reply_index) in commentAndReplyInfo.replyInfoList" :key="reply_index">
                  <div class="comment-replyInfo-info">
                    <span class="reply-time" v-html="replyInfo.reply_time"></span>
                    <span class="from-nickname" v-html="replyInfo.from_nickname" @click="goUserInfo(replyInfo.from_openID)"></span>
                    <span>@to</span>
                    <span class="to-nickname" v-html="replyInfo.to_nickname" @click="goUserInfo(replyInfo.to_openID)"></span>
                    <span>说:</span>
                    <span class="reply-content" v-html="replyInfo.reply_content"></span>
                    <span class="iconfont icon-huifu reply-button" @click="edit_reply_reply(comment_index,reply_index)">回复ta</span>
                  </div>
                  <!--文章的评论下的回复的编辑框-->
                  <div v-if="replyInfo.isEdit">
                    <Input v-model="replyInfo.answer_reply" type="textarea" :rows="3" :placeholder="'@to '+replaceHtml(replyInfo.from_nickname)+'：'"></Input>
                    <p class="text-right">
                      <Button class="c-replyInfo-button" type="primary" ghost @click="write_reply(replyInfo.from_openID,replyInfo.answer_reply,replyInfo.commentID)">确认回复ta</Button>
                    </p>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </div>
        </div>

        <!-- 加载更多按钮 -->
        <p class="comment-getAll text-center" v-if="isLoadMoreComment">
          <Button type="info" @click="getCommentAndReplyInfo($route.params.article_id,0)" size="large">
            <span>查看全部>></span>
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
          this.$router.push({name:'user_info',params:{open_id:openID}})
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
  *{
    font-size: 16px;
  }

  >>> .ivu-timeline-item-tail{
    border-left: 1px solid cadetblue;
  }

  >>> .ivu-input{
    resize: none;
  }

  a{
    text-decoration: none;
  }

  /*文章评论编辑部分*/
  .c-button-article{
    float: right;
    margin-top: 5px;
    letter-spacing: 5px;
    font-size: 16px;
  }
  .c-input-comment{
    margin-top: 10px;
  }
  .c-img-avatar{
    float: left;
    height: 40px;
  }
  .c-span-nickname{
    float: left;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    /*border: 1px solid red;*/
  }

  /*评论展示-头部*/
  .comment{
    border-radius: 8px;
    padding: 5px 20px;
    background-color: rgba(238, 238, 238,0.6);
    /*border: 1px solid red;*/
  }
  .comment-header{
    display: block;
    height: 40px;
    line-height: 40px;
  }
  .c-header-avatar{
    float: left;
    height: 40px;
    line-height: 40px;
  }
  .c-header-nickname{
    display: block;
    height: 20px;
    line-height: 20px;
    text-indent: 10px;
  }
  .c-header-time{
    display: block;
    height: 20px;
    line-height: 20px;
    text-indent: 10px;
  }

  /*评论展示-评论详情*/
  .comment-content{
    margin-top: 15px;
  }
  .c-content-button {
    margin-left: 15px;
    color: rgb(95, 158, 160);
    letter-spacing: 1px;
    cursor: pointer;
  }

  /*回复相关信息部分*/
  .comment-reply{
    width: 100%;
    display: inline-block;
  }
  .c-reply-button{
    float: right;
    margin-top: 5px;
    letter-spacing: 2px;
    font-size: 14px;
  }

  /*评论下的回复信息*/
  .comment-replyInfo{
    display: block;
    margin-bottom: 5px;
  }
  /*.comment-replyInfo-info{*/
    /*font-size: 16px;*/
  /*}*/
  .comment-replyInfo-info > .reply-time{
    display: block;
  }
  .comment-replyInfo-info > .from-nickname{
    cursor: pointer;
    color: cadetblue;
    margin-right: 5px;
  }
  .comment-replyInfo-info > .to-nickname{
    cursor: pointer;
    color: cadetblue;
    margin-left: 5px;
  }
  .comment-replyInfo-info > .reply-content{
    margin-left: 5px;
    color: black;
    letter-spacing: 1px;
  }
  .comment-replyInfo-info > .reply-button{
    cursor: pointer;
    color: cadetblue;
    margin-left: 15px;
    letter-spacing: 1px;
  }

  .c-replyInfo-button{
    margin-top: 5px;
    font-size: 14px;
    letter-spacing: 2px;
  }

  .comment-getAll{
    margin-top: 50px;
  }


</style>
