<template>

    <div class="web_diaryInfo">

      <!-- ok_header 导航栏-->
      <ok-header></ok-header>

      <loading v-if="isLoading"></loading>

      <not-found v-else-if="isNotFound"></not-found>

      <div v-else>

        <Row type="flex" align="middle" justify="center" class="code-row-bg row-title">
          <i-col span="12" >
              <span class="diary_title">
                <Tag color="rgb(255, 93, 71)" v-if="DiaryInfo.type === 'private'">私有</Tag>
                <Tag color="rgb(35, 201, 237)" v-if="DiaryInfo.type === 'public'">公开</Tag>
                {{DiaryInfo.title}}
              </span>
          </i-col>
        </Row>

        <!--Diary 文章用户信息-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-userInfo">
          <i-col span="12" style="line-height: 60px" >
            <!--该div用于显示用户头像-->
            <div style="float: left">
              <a style="text-decoration: none;margin: 0 10px">
                <img :src="DiaryInfo.userIcon"  alt="图片加载失败" class="img-circle" width="45px" height="45px"/>
              </a>
            </div>

            <!--该div 用于显示文章作者，喜欢数，不喜欢数，浏览量-->
            <div style="line-height: 30px;">
              <a><span v-html="DiaryInfo.nickname"></span></a>
              <br>
              <span style="color: gray">发布时间：{{DiaryInfo.time}}</span>&emsp;
              <div class="more-function">
                <a href="javascript:void(0)">
                  <Dropdown trigger="click" @on-click="chooseFunction">
                    <span>更多功能&nbsp;<Icon type="ios-arrow-down" color="white" /></span>
                    <DropdownMenu slot="list">
                      <!--这里表示如果该片文章的作者是当前用户的话，开放修改和删除功能-->
                      <div v-if="DiaryInfo.openID === this.$store.getters.openID">
                        <DropdownItem name="update">修改</DropdownItem>
                        <DropdownItem name="delete">删除</DropdownItem>
                      </div>
                      <!--如果不是作者本人，则只开放举报功能-->
                      <div v-else>
                        <DropdownItem name="report">举报</DropdownItem>
                      </div>
                    </DropdownMenu>
                  </Dropdown>
                </a>
              </div>
            </div>

          </i-col>
        </Row>

        <!--Diary 文章主要内容-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-content">
          <i-col span="12">

            <div class="diary_content">
              <!-- 复制粘贴过来的，死样式，后面再删 start -->
              <span v-html="DiaryInfo.content"></span>
              <!-- 复制粘贴过来的，死样式，后面再删 end -->
            </div>
          </i-col>
        </Row>

      </div>

      <!-- 分割线 -->
      <Divider />

      <!--返回顶部-->
      <BackTop></BackTop>


      <!-- ***********************************  其他调用显示类容 **************************************** -->
      <!--确认删除Modal-->
      <Modal v-model="functionConfirm" title="请确认是否继续：" @on-ok="delete_diary" :mask-closable="false">
        <p>正在确认是否删除标题为：【{{this.DiaryInfo.title}}】 的笔记</p>
        <p>如果非必要，我们不建议您删除您的任何一篇文章</p>
        <p>确认后，所有相关数据都将删除，<strong style="color: red">无法恢复</strong>，请确认后再继续</p>
      </Modal>

    </div>

</template>

<script>
    import Loading from "../../Common/loading";
    import NotFound from "../otherModule/404";
    import OkHeader from "../../Common/ok_header";
    export default {
        name: "web_diaryInfo",
      components: {OkHeader, NotFound, Loading},
      data(){
        return {
          isLoading:true,
          isNotFound:false,
          DiaryInfo:{},
          functionConfirm:false,  //控制是否显示确认删除对话框
        }
      },

      methods:{

        async getDiaryInfo(){   //根据diaryID，获取对饮的信息
          const result = await this.$apis.ArticleApi.get_diaryInfo(this.$route.params.diary_id);
          if (result!==null){
            this.isLoading = false;
            this.isNotFound = false;
            this.DiaryInfo = result;
            this.DiaryInfo.userIcon = this.$store.getters.serverPath+JSON.parse(result.userIcon)[0]
          }else {
            this.isLoading = false;
            this.isNotFound = true;
          }
        },

        //根据选择的功能，进行对应的操作
        chooseFunction(name){
          switch (name) {
            case "update"://点击修改
              console.log("点击了修改按钮");
              localStorage.setItem("update_diaryInfo",JSON.stringify(this.DiaryInfo));
              this.$router.push({
                name:'diary_update',
                params:{
                  diary_id:this.DiaryInfo.diaryID,
                }
              });
              break;
            case "delete"://点击删除
              console.log("点击删除按钮");
              this.functionConfirm = true;
              break;
            case "report"://点击举报
              this.$Notice.info({
                title:'敬请期待：',
                desc:'客官大人，该功能正在开发中，敬请期待！'
              });
              break;
          }
        },

        //确认删除该篇日记
        async delete_diary() {
          const result = await this.$apis.ArticleApi.delete_article(this.$route.params.diary_id, "diary");
          if (result.msg === 'success') {
            this.$Notice.success({
              title: '删除成功',
              desc: '该篇日记已成功删除！所有人都将无法再获取该篇文章的信息'
            });
            this.$router.push({name: "index"})//前往首页
          }

        }

      },

      mounted(){
          this.getDiaryInfo();
      }

    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

  a{
    color: black;
    text-decoration: none;
  }

  .diary_title{
    font-size: 35px;
    font-weight: bold;
  }

  .diary_title >>> .ivu-tag{
    font-size: 20px;
    font-family:"Microsoft YaHei UI Light",serif ;
    line-height: 35px;
    height: 35px;
  }

  .diary_content{

  }

  .row-title{
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .row-userInfo{
  }

  .row-content{
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .more-function{
    float: right;
    background-color: rgb(45, 183, 245);
    border-radius: 3px;
  }
  .more-function span{
    padding: 0 10px;
    line-height: 35px;
    color: white;
    font-size: 14px;
  }
  .more-function >>> .ivu-dropdown-item{
    font-size: 14px!important;
  }

</style>
