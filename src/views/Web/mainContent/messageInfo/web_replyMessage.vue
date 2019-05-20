<template>
  <div class="replyMessage">
    <Divider orientation="left" ><span class="r-message-title">回复我的</span></Divider>

    <!--主要内容-->
    <div ref="r-message-wrapper" class="r-message-wrapper">
      <Card class="r-message-card" v-for="message in replyMessageData" :key="message.messageID">
        <div>
          <span style="font-weight: bold">{{message.title}}</span>
          <span style="margin-left: 20px;color: gray">{{message.time}}</span>
        </div>
        <div>
          <span style="letter-spacing: 1px;color: dimgrey">{{message.content}}</span>
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
          scrollLoadSwitch:true, //判断数据加载开关，防止发起重复请求
        }
      },

      methods:{

        //获取信息详情
        async getMessageDetails(page) {
          if (this.loadMore){
            const result = await this.$apis.UserApi.getSystemMessageDetails(page);
            //判断返回数据长度，即是返回有效数据
            if (result.system_message_infos.length >0){
              //返回有数据时，才叠加载数据
              for (let data of result.system_message_infos){
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
              this.getMessageDetails(this.page);
            }
          }
        }

      },

      mounted() {
        //重新加载时，获取首页数据
        this.getMessageDetails(1);
        //注册scroll，滚动监听事件
        window.addEventListener('scroll',this.wrapperListener,true);
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
</style>
