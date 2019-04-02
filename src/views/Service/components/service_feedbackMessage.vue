<template>
    <div id="feedbackMessage">
      <Table border :columns="feedbackModel" :data="feedbackData" >
        <template slot-scope="{ row, index }" slot="feedID">
          <span>{{ row.feedID }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="time">
          <span>{{ row.time }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="openID">
          <span>{{ row.openID }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="content">
          <Button @click="showFeedBackContentModal(row.content)">点击查看详情</Button>
          <!--<span>{{ row.content }}</span>-->
        </template>
        <template slot-scope="{ row, index }" slot="contactType">
          <span>{{ row.contactType }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="contactInfo">
          <span>{{ row.contactInfo }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="feedbackType">
          <span>{{ row.feedbackType }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="status">

          <i-select v-model="row.status" @on-change="updateStatus(row.feedID,$event)"
                    v-bind:class="{ status_pending : row.status === '待处理',
                    status_dealing : row.status === '处理中',
                    status_complete : row.status === '已处理',
                    status_refused : row.status === '已拒绝' }">
            <i-option value="待处理" style="color: rgb(237, 64, 20)">待处理</i-option>
            <i-option value="处理中" style="color: rgb(76, 157, 242)">处理中</i-option>
            <i-option value="已处理" style="color: rgb(65, 184, 131)">已处理</i-option>
            <i-option value="已拒绝" style="color: rgb(233, 105, 0)">已拒绝</i-option>
          </i-select>

        </template>
      </Table>
      <Page style="margin-top: 30px" class="text-center" show-total :total="feedbackTotal" @on-change="getFeedBackInfo" />

      <!--反馈建议内容详情-->
      <Modal v-model="showFeedBackContent" title="反馈内容详情" :mask-closable="false" :footer-hide="true">
        <p>
          {{this.feedbackContent}}
        </p>
      </Modal>

    </div>
</template>

<script>
    export default {
        name: "service_feedBackMessage",
      data() {
        return {
          feedbackModel:[
            {title:'序列号',slot:'feedID',align:'center'},
            {title:'反馈时间',slot:"time",sortable:true,align:'center'},
            {title:'用户ID',slot:'openID',align:'center'},
            {title:'反馈内容',slot:'content',align:'center'},
            {title:'联系类型',slot:'contactType',align:'center'},
            {title:'回联方式',slot:'contactInfo',align:'center'},
            {title:'反馈类型',slot:'feedbackType',align:'center'},
            {title:'处理状态',slot:'status',sortable:true,align:'center'}
          ],
          feedbackData:[],
          feedbackTotal:0,
          showFeedBackContent:false,  //是否显示反馈内容详情
          feedbackContent:'',   //反馈内容详情
        };
      },

      methods:{
        //获取用户的反馈信息
        async getFeedBackInfo(page) {
          const result = await this.$apis.AdminApi.getFeedBackInfo(page);
          if (result.total>0){
            this.feedbackData = result.feedBackMessageList;
            this.feedbackTotal = result.total;
          }

        },

        //修改反馈处理状态
        async updateStatus(feedID,status){
          console.log("输出当前ID：",feedID,"——输出状态：",status);
          await this.$apis.AdminApi.updateStatus(feedID,status);
        },

        //查看回馈信息详情
        showFeedBackContentModal(content){
          // consoole.log("输出content :",content);
          this.feedbackContent = content;
          this.showFeedBackContent = true;
        }

      },

      mounted() {
        console.log("执行mounted,请求加载反馈信息");
        //获取第一页信息
        this.getFeedBackInfo(1)
      },


    }
</script>

<style scoped>

  #feedbackMessage{
    width: 100%;
  }

  .status_pending{
    color: rgb(237, 64, 20);
  }
  .status_dealing{
    color: rgb(76, 157, 242);
  }
  .status_complete{
    color: rgb(65, 184, 131);
  }
  .status_refused{
    color: rgb(233, 105, 0);
  }

</style>
