<template>
    <div id="articleInfo">


      <loading v-if="isLoading"></loading>

      <!-- 是否显示404页面 -->
      <not-found v-else-if="isNotFound"></not-found>

      <!-- 否则显示主要内容页面 -->
      <div v-else>
        <!--Article 文章标题部分-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-title">
          <i-col span="12" >
          <span class="article_title">
            <Tag color="rgb(251, 114, 153)" v-if="ArticleInfo.type === 'original' ">原创</Tag>
            <Tag color="rgb(0, 192, 145)" v-else-if="ArticleInfo.type === 'reprint' ">转载</Tag>
            <Tag color="rgb(2, 181, 218)" v-else-if="ArticleInfo.type === 'translate' ">翻译</Tag>
            {{this.ArticleInfo.title}}
          </span>
          </i-col>
        </Row>

        <!--Article 文章用户信息和状态信息-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-userInfo">
          <i-col span="12" style="line-height: 60px" >
            <!--该div用于显示用户头像-->
            <div style="float: left">
              <a style="text-decoration: none;margin: 0 10px">
                <img :src="this.ArticleInfo.userIcon"  alt="图片加载失败" class="img-circle" width="45px"/>
              </a>
            </div>

            <!--该div 用于显示文章作者，喜欢数，不喜欢数，浏览量，如果作者是自己，开启更多功能-->
            <div style="line-height: 30px;">
              <a><span>{{this.ArticleInfo.nickname}}</span></a>
              <br>
              <span style="color: gray">{{ArticleInfo.time}}</span>&emsp;
              <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="22"/>&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.like}}</label></span>&emsp;
              <span><Icon type="md-eye" size="22" />&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.watch}}</label></span>
              <div class="more-function">
                <a href="javascript:void(0)">
                  <Dropdown trigger="click" @on-click="chooseFunction">
                    <span style="color: white;">更多功能&nbsp;<Icon type="ios-arrow-down" color="white" /></span>
                    <DropdownMenu slot="list">
                      <!--这里表示如果该片文章的作者是当前用户的话，开放修改和删除功能-->
                      <div v-if="ArticleInfo.openID === this.$store.getters.openID">
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

        <!--Article 文章主要内容-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-content">
          <i-col span="12">

            <div class="article_content">
              <!-- 复制粘贴过来的，死样式，后面再删 start -->
              <span v-html="this.ArticleInfo.content"></span>
              <!-- 复制粘贴过来的，死样式，后面再删 end -->
            </div>

          </i-col>
        </Row>
      </div>

      <Divider />

      <!--返回顶部-->
      <BackTop></BackTop>

      <!-- ***********************************  其他调用显示类容 **************************************** -->
      <!--确认删除Modal-->
      <Modal v-model="founctionConfirm"
             title="请确认是否继续："
             @on-ok="delete_article">

      </Modal>

    </div>
</template>

<script>

    import NotFound from "./404";
    import OkHeader from "../header/ok_header";
    import Loading from "../loading/loading";

    export default {
        name: "articleInfo",
      components: {Loading, OkHeader, NotFound},
      data() {
        return {
          ArticleInfo:{},
          isNotFound:false,
          isLoading:true,
          founctionConfirm:false,
        };
      },
      methods:{
        //根据选择的功能，进行对应的操作
        chooseFunction(name){
          this.founctionConfirm = true;
          switch (name) {
            case "update"://点击修改
              console.log("点击了修改按钮");
              break;
            case "delete"://点击删除
              console.log("点击删除按钮");
              break;
            case "report"://点击举报
              console.log("点击举报按钮");
              break
          }
        },

        //确认删除该篇文章
        async delete_article(){
          const result = await this.$apis.ArticleApi.delete_article(this.$route.params.article_id,"article");
          console.log("返回的结果：",result);
          if (result.msg === 'success'){//表示删除成功
            // this.$router.go(-1);//返回上一页
            this.$router.push({name:'index'});//返回首页
          }
        }

      },

     async mounted(){
        this.ArticleInfo.articleID = this.$route.params.article_id;
        const articleInfo = await this.$apis.ArticleApi.get_articleInfo(this.$route.params.article_id);
        console.log("web_articleInfo",articleInfo);
          if (articleInfo!=null){ //如果不为空，则赋值
            this.isLoading = false;
            this.isNotFound = false;
            this.ArticleInfo = articleInfo;
            this.ArticleInfo.userIcon = this.$store.getters.serverPath+JSON.parse(articleInfo.userIcon)[0]
          }else { //如果为空，则显示404组件
            this.isNotFound = true;
            this.isLoading = false;
          }
      },
      created(){
          //根据传递过来的ID，去请求相应文章的所有内容

      },
    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

  a{
    text-decoration: none;
    color: black;
  }

  #articleInfo{
    padding: 0;
    margin: 0;
  }

  .row-title{
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .row-content{
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .article_title{
    font-size: 35px;
    font-weight: bold;
  }

  .article_title >>> .ivu-tag{
    font-size: 20px;
    font-family:"Microsoft YaHei UI Light",serif ;
    line-height: 35px;
    height: 35px;
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
