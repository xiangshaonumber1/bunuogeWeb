<template>
    <div class="commentAndReply">

      <!--个人评论编辑区-->
      <Row type="flex" class="code-row-bg" align="middle" justify="start">
        <i-col style="line-height: 40px" span="24">
          <img :src="this.$store.getters.avatar" alt="..." class="img-circle" width="40px">
          <span style="font-size: 18px" v-html="this.$store.getters.userInfo.nickname"></span><br>
          <Input type="textarea" v-model.trim="comment_content" :rows="5"  placeholder="自古套路留不住，评论底下出人才，你想说什么呢？" class="write_comment"></Input><br>
          <Button type="info" size="large" style="float: right;margin: 5px 0" @click="write_comment(comment_content)"><span>发&nbsp;送</span></Button>
        </i-col>
      </Row>

      <div>
        <!--文章的评论信息-->
        <div v-for="(commentAndReplyInfo,index) in commentAndReplyInfoList">
          <Row type="flex" class="code-row-bg" justify="start">
            <i-col span="24">
              <img :src="commentAndReplyInfo.from_userIcon" alt="..." class="img-circle" width="40px">
              <span style="font-size: 16px;line-height: 20px" v-html="commentAndReplyInfo.from_nickname"></span>
              <span style="font-size: 16px;line-height: 20px" v-html="commentAndReplyInfo.comment_time"></span>

              <br>
              <div>
                <p v-html="commentAndReplyInfo.comment_content"></p>
              </div>

            </i-col>
          </Row>
          <!--文章评论下的回复信息-->
          <div v-if="comment">

          </div>`

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
        };
      },
      methods:{

        //针对当前文章，写评论
        write_comment(value){
          if (value.length === 0){
            this.$Message.error({
              content:"发送内容不能为空！",
              duration:3,
              top:200
            })
          }
        },

        //获取指定ID的文章的评论和评论下的回复信息
        async getCommentAndReplyInfo(articleID){
          const result = await this.$apis.ArticleApi.getCommentAndReplyInfo(articleID,1);
          if (result){
            for (let info of result){
              info.from_userIcon = this.$store.getters.serverPath+JSON.parse(info.from_userIcon)[0];
            }
            this.commentAndReplyInfoList = result;
            console.log("输出信息看看：",this.commentAndReplyInfoList);
          }else {
            console.log("数据为空哦！！！！！！！！！！！！！！！！！！！！！！")
          }
        },
        
      },

      mounted(){
          //获取文章的评论和回复信息
          this.getCommentAndReplyInfo(this.$route.params.article_id)
      }
    }
</script>

<style scoped>

  .write_comment >>> .ivu-input{
    resize: none;
    margin-top: 10px;
  }

</style>
