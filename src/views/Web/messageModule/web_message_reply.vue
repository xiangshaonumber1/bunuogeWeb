<template>
  <div class="replyMessage">
    <Divider orientation="left" ><span class="r-message-title">回复我的</span></Divider>

    <!--主要内容-->
    <div ref="r-message-wrapper" class="r-message-wrapper">
      <Card class="r-message-card" v-for="message in replyMessageData" :key="message.messageID">

        <div v-if="message.type === 'comment'">
          <!--评论类型消息提示-->
          <span class="m-comment-fromNickname" v-html="message.from_nickname"></span>评论了您的文章<span class="m-comment-aimContent" v-html="message.aim_content"></span>说：
          <div class="m-comment-content" v-html="message.content"><span></span></div>
          回复时间：<span>{{message.time}}</span>
        </div>

        <!--回复类型消息提示-->
        <div v-else>
          <span class="m-comment-fromNickname" v-html="message.from_nickname"></span>回复了信息<span class="m-comment-aimContent" v-html="message.aim_content"></span>说：
          <div class="m-comment-content"><span v-html="message.content">{{message.content}}</span></div>
          回复时间：<span>{{message.time}}</span>
        </div>

      </Card>


    </div>


  </div>
</template>

<script>
    export default {
        name: "web_replyMessage",
      data(){
        return {
          replyMessageData:[],
          page:1,
          loadMore:true,  //判断是否允许请求加载数据
          scrollLoadSwitch:false, //判断数据加载开关，防止发起重复请求
        }
      },

      methods:{

        //获取信息详情
        async getMessageInfo(page) {
          if (this.loadMore){
            const result = await this.$apis.UserApi.getReplyMessageDetails(page);
            //判断返回数据长度，即是返回有效数据
            if (result.reply_message_details.length >0){
              //返回有数据时，才叠加载数据
              for (let data of result.reply_message_details){
                this.replyMessageData.push(data)
              }
            }
            //并且只有当查询的总量 大于 当前已存在数据长度时，才允许加载下一页
            if (result.total > this.replyMessageData.length){
              this.page++;
              this.loadMore = true;
            }else {
              this.loadMore = false;
            }
            //重新开启允许滚动加载
            this.scrollLoadSwitch = true;
          }else {
            console.log("loadMore:",this.loadMore,'不允许加载下一页数据');
          }
        },

        wrapperListener(){
          let container = this.$refs['r-message-wrapper'];
          //div可视高度
          var clientHeight = container.clientHeight;
          //滚动条的偏移量，即滚动条距离起点距离
          var scrollTop = container.scrollTop;
          //滚动条的固定高度
          var scrollHeight = container.scrollHeight;
          if (scrollHeight === (scrollTop + clientHeight)){
            //只有允许滚动加载时，才请求加载数据
            if (this.scrollLoadSwitch){
              this.scrollLoadSwitch = false;
              this.getMessageInfo(this.page);
            }
          }
        }

      },

      mounted() {
        //重新加载时，获取首页数据
        this.getMessageInfo(1);
        //注册scroll，滚动监听事件
        window.addEventListener('scroll',this.wrapperListener,true);
      },

      beforeDestroy(){
        //vue销毁前，移除滚动监听
        window.removeEventListener("scroll",this.wrapperListener,true)
      }

    }
</script>

<style scoped>
  .r-message-wrapper{
    height: 75vh;
    overflow: auto;
  }
  .r-message-card{
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .r-message-title{
    font-size: 18px;
    letter-spacing: 5px;
    font-weight: bold;
    color: dimgrey;
  }


  .m-comment-fromNickname{
    font-size: 16px;
    margin: 0 10px;
    color: rgb(95, 158, 160);
    font-weight: bold;
  }
  .m-comment-aimContent{
    font-weight: bold;
    font-size: 16px;
    margin: 0 10px;
  }
  .m-comment-content{
    background-color: rgb(245, 245, 245);
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
  }

</style>
