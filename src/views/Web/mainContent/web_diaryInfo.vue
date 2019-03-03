<template>
    <div class="web_diaryInfo">

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
                <img :src="DiaryInfo.userIcon"  alt="图片加载失败" class="img-circle" width="45px"/>
              </a>
            </div>

            <!--该div 用于显示文章作者，喜欢数，不喜欢数，浏览量-->
            <div style="line-height: 30px;">
              <a><span>{{DiaryInfo.nickname}}</span></a>
              <br>
              <span style="color: gray">发布时间：{{DiaryInfo.time}}</span>&emsp;
              <div class="more-function">
                <a href="javascript:void(0)">
                  <Dropdown trigger="click" @on-click="chooseFunction">
                    <span style="color: white;">更多功能&nbsp;<Icon type="ios-arrow-down" color="white" /></span>
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

    </div>
</template>

<script>
    import Loading from "../loading/loading";
    import NotFound from "./404";
    export default {
        name: "web_diaryInfo",
      components: {NotFound, Loading},
      data(){
        return {
          isLoading:true,
          isNotFound:false,
          DiaryInfo:{}
        }
      },

      methods:{

        async getDiaryInfo(){//根据diaryID，获取对饮的信息
          const result = await this.$apis.ArticleApi.get_diaryInfo(this.$route.params.diary_id);
          console.log("返回的信息：",result);
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
              break;
            case "delete"://点击删除
              console.log("点击删除按钮");
              break;
            case "report"://点击举报
              console.log("点击举报按钮")
              break
          }
        }

      },

      mounted(){
          this.getDiaryInfo();
      }

    }
</script>

<style scoped>

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
  }
  .more-function >>> .ivu-dropdown-item{
    font-size: 14px!important;
  }

</style>
