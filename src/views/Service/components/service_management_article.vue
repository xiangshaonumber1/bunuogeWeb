<template>
    <div id="service_management_article">
      <Divider orientation="left">
        <span style="font-size: 20px;font-weight: bold">文章信息管理</span>
      </Divider>

      <!-- 搜索部分 -->
      <Row type="flex" class="code-row-bg" justify="center" align="middle">

      </Row>

      <!--表单数据部分-->
      <Table :columns="articleTableModel" :data="articleTableData" size="large" border>

          <template slot-scope="{row ,index}" slot="articleID">{{row.articleID}}</template>

          <template slot-scope="{row ,index}" slot="openID">{{row.openID}}</template>

          <template slot-scope="{row ,index}" slot="username">{{row.username}}</template>

          <template slot-scope="{row ,index}" slot="nickname">
            <span v-html="row.nickname"></span>
          </template>

          <template slot-scope="{row ,index}" slot="email">{{row.email}}</template>

          <template slot-scope="{row ,index}" slot="title">{{replaceHtml(row.title)}}</template>

          <template slot-scope="{row ,index}" slot="content">{{replaceHtml(row.content)}}</template>

          <template class="articleType" slot-scope="{row ,index}" slot="type">
            <Tag color="rgb(251, 114, 153)" v-if="row.type === 'original' ">原创</Tag>
            <Tag color="rgb(0, 192, 145)" v-else-if="row.type === 'reprint' ">转载</Tag>
            <Tag color="rgb(2, 181, 218)" v-else-if="row.type === 'translate' ">翻译</Tag>
          </template>

          <template slot-scope="{row ,index}" slot="time">{{row.time}}</template>

          <template slot-scope="{row ,index}" slot="status">
            <i-select v-bind:class="{waitColor : row.status === '待审核',passColor : row.status === '已通过',refuseColor : row.status === '不通过'}"
                      v-model="row.status" @on-change="updateArticleStatus(row.articleID,$event)">
              <i-option v-bind:class="{waitColor : status === '待审核',passColor : status === '已通过',refuseColor : status === '不通过'}"
                        v-for="(status,index) in dictionary_articleStatus" :label="status" :value="status" :key="index"></i-option>
            </i-select>
          </template>

        </Table>


      <!--分页部分-->
      <Row>
        <Page show-total :total="articleTableDataTotal" class="text-center" style="margin-top: 30px" @on-change="getAdminArticleInfo($event,searchKey)"></Page>
        <Divider/>
      </Row>

    </div>
</template>

<script>

    export default {
        name: "service_management_article",
      data(){
          return {
            //搜索关键字
            searchKey:null,
            dictionary_articleStatus:[],
            //表格model
            articleTableModel:[
              {title:"文章ID",slot:"articleID",ellipsis:true,align:'center',width:100},
              {title:"openID",slot:"openID",ellipsis:true,align:'center',width:100},
              {title:"用户名",slot:"username",ellipsis:true,align:'center'},
              {title:"作者昵称",slot:"nickname",ellipsis:true,align:'center'},
              {title:"邮箱",slot:"email",align:'center'},
              {title:"文章标题",slot:"title",align:'center'},
              {title:'文章详情',slot:"content",ellipsis:true,align:'center'},
              {title:"文章类型",slot:"type",align:'center',width:100},
              {title:"发布时间",slot:"time",sortable:true,align:'center'},
              {title:"状态",slot:"status" ,sortable:true,align:'center'}
            ],
            //表格具体数据
            articleTableData:[],
            articleTableDataTotal:0,
          }
      },

      methods:{

          //修改文审核状态
          async updateArticleStatus(articleID, status) {
            const result = await this.$apis.AdminApi.updateArticleStatus(articleID, status);
            console.log("修改返回的信息：",result);
            if (result){
              return this.$Message.success({
                content:"【"+articleID+"】修改成功"
              })
            } else {
              return this.$Message.error({
                content:"【"+articleID+"】修改失败"
              })
            }
          },

          //管理员获取文章信息
          async getAdminArticleInfo(page, key_word, pageCount) {
            const result = await this.$apis.AdminApi.getAdminArticleInfo(page, key_word, pageCount);
            if (result.total > 0){
              console.log("输出返回的结果：",result);
              this.articleTableData = result.adminArticleInfo.adminArticleList;
              this.dictionary_articleStatus = JSON.parse(result.adminArticleInfo.dictionary_articleStatus.toString());
              this.articleTableDataTotal = result.total;
            }
          },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },


      },

      mounted() {
          this.getAdminArticleInfo(1,this.searchKey)
      }

    }
</script>

<style scoped>

  .passColor{
    color: rgb(65, 184, 131);
  }
  .waitColor{
    color: rgb(76, 157, 242)
  }
  .refuseColor{
    color: rgb(237, 64, 20)
  }
</style>
