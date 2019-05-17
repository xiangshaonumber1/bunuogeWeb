<template>
    <div class="systemMessage">
      <Divider orientation="left" ><span class="message-title">系统消息</span></Divider>

      <!--主要内容-->
      <Scroll :on-reach-bottom="getMore">
        <Card v-for="message in systemMessageData" :key="message.messageID" style="margin-bottom: 10px">
          <div>
            <span style="font-weight: bold">{{message.title}}</span>
            <span style="margin-left: 20px;color: gray">{{message.time}}</span>
          </div>
          <div>
            <span style="letter-spacing: 1px;color: dimgrey">{{message.content}}</span>
          </div>
        </Card>
      </Scroll>


    </div>
</template>

<script>
    export default {
      name: "web_systemMessage",
      data(){
        return {
          systemMessageData:[],
          page:1,
          loadMore:true,  //判断是否允许加载
        }
      },

      methods:{

        getFunciton(data){
          console.log("6666666666666666666666666666666666666666666666")
        },

        //获取信息详情
        async getMessageDetails(page) {
          if (this.loadMore){
            const result = await this.$apis.UserApi.getSystemMessageDetails(page);
            if (result.system_message_infos.length >0){
              //返回有数据时，才叠加载数据
              for (let data of result.system_message_infos){
                this.systemMessageData.push(data)
              }
            }

            //并且只有当查询的总量 大于 当前已存在数据长度时，才允许加载下一页
            if (result.total > this.systemMessageData.length){
              this.page++;
              this.loadMore = true;
            }else {
              this.loadMore = false;
            }
          }else {
            console.log("执行了个什么鬼？")
          }
        },

        getMore(){
          console.log("getMore执行！！！！")
          this.getMessageDetails(this.page)
        }



      },

      mounted() {
        this.getMessageDetails(1);
      }
    }
</script>

<style scoped>
  .message-wrapper{
    position: relative;
    border: 1px solid red;
    height: 50%;
  }

  .message-title{
    font-size: 18px;
    letter-spacing: 5px;
    font-weight: bold;
    color: dimgrey;
  }
</style>
