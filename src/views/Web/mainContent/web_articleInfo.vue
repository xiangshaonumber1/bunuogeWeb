<template>
    <div id="articleInfo">

      <!--ok_header 导航栏-->
      <ok-header></ok-header>

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
              <a style="text-decoration: none;margin: 0 10px" @click="goUserInfo">
                <img :src="this.ArticleInfo.userIcon"  alt="图片加载失败" class="img-circle" width="45px"/>
              </a>
            </div>

            <!--该div 用于显示文章作者，喜欢数，不喜欢数，浏览量，如果作者是自己，开启更多功能-->
            <div style="line-height: 30px;">
              <a @click="goUserInfo"><span v-html="ArticleInfo.nickname"></span></a>
              <br>
              <span style="color: gray">发布时间：{{ArticleInfo.time}}</span>&emsp;
              <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="22"/>&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.like}}</label></span>&emsp;
              <span><Icon type="md-eye" size="22" />&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.watch}}</label></span>
              <div class="more-function">
                <a href="javascript:void(0)">
                  <Dropdown trigger="click" @on-click="chooseFunction">
                    <span>更多功能&nbsp;<Icon type="ios-arrow-down" color="white" /></span>
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

        <!--Article 文章详情主要内容-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-content">
          <i-col span="12">

            <div class="article_content">
              <!-- 复制粘贴过来的，死样式，后面再删 start -->
              <span v-html="this.ArticleInfo.content"></span>
              <!-- 复制粘贴过来的，死样式，后面再删 end -->
            </div>

          </i-col>
        </Row>

        <!--用户点赞支持-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-likeButton">
          <i-col span="12" class="text-center">
            <!--点赞情况-->
            <Button class="likeButtonNormal" v-bind:class="{likeButtonClick:isClickLike}" @click="changeLikeStatus">
              <Icon type="md-heart"/>
              <span v-if="isClickLike === false">&nbsp;赞一个呗&nbsp;</span>
              <span v-else>&nbsp;已点赞&nbsp;</span>
            </Button>

            <!--收藏情况-->
            <Button class="collectButtonNormal" v-bind:class="{collectButtonClick:isClickCollect}">
              <span v-if="isClickCollect === false">&nbsp;喜欢就收藏呗&nbsp;</span>
              <span v-else>&nbsp;已收藏&nbsp;</span>
            </Button>

          </i-col>
        </Row>
      </div>

      <Divider />

      <!--返回顶部-->
      <BackTop></BackTop>


      <!-- ***********************************  其他调用显示类容 **************************************** -->
      <!--确认删除Modal-->
      <Modal v-model="functionConfirm" title="删除文章确认提示：" @on-ok="delete_article" :mask-closable="false">
        <p>正在确认是否删除标题为：【{{this.ArticleInfo.title}}】 的笔记</p>
        <p>如果非必要，我们不建议您删除您的任何一篇文章</p>
        <p>确认后，所有相关数据都将删除，且<strong style="color: red">无法恢复</strong>，请确认后再继续</p>
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
          isClickLike:false,//是否有点击过支持一下的按钮
          isClickCollect:true,//是否已收藏
          ArticleInfo:{},
          isNotFound:false,
          isLoading:true,
          functionConfirm:false,
        };
      },
      methods:{

        //根据选择的功能，进行对应的操作
        chooseFunction(name){
          switch (name) {
            case "update"://点击修改
              localStorage.setItem("update_articleInfo",JSON.stringify(this.ArticleInfo)); //临时保存文章信息
              this.$router.push({name:'article_update', params:{article_id:this.ArticleInfo.articleID,}});
              break;
            case "delete"://点击删除
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

        //确认删除该篇文章
        async delete_article(){
          const result = await this.$apis.ArticleApi.delete_article(this.$route.params.article_id,"article");
          console.log("返回的结果：",result);
          if (result.msg === 'success'){//表示删除成功
            this.$Notice.success({
              title: '操作成功',
              desc: '该篇文章已成功删除！所有人都将无法再获取该篇文章的信息'
            });
            // this.$router.go(-1);//返回上一页
            this.$router.push({name:'index'});//返回首页
          }
        },

        //改变点赞按钮当前的状态
       async changeLikeStatus(){
          if (this.$store.getters.openID === null){
            return this.$Message.info({
              content:"温馨提示：该功能需要登录后才能实现！"
            })
          }
          //点击后，判断this.isClickLike是什么状态
         //false 状态下点击，说明是点赞操作
         if (!this.isClickLike){ //如果当前点赞是非点亮状态，执行点赞操作
           console.log("执行点赞操作");
           const result = await this.$apis.ArticleApi.clickLike(this.ArticleInfo.articleID,this.$store.getters.openID);
           if (result){//后台点赞成功，前端也设置为true
             return this.isClickLike = true;
           }
         }
         //true状态下点击，说明是取消点赞操作
         else {
           console.log("执行取消点赞操作");
           const result = await this.$apis.ArticleApi.cancelLike(this.ArticleInfo.articleID,this.$store.getters.openID)
           if (result){//后台取消点赞成功，前端也设置为false
              return this.isClickLike = false;
           }
         }
        },

        //获取指定articleID的所有信息
        async getArticleInfo(articleID){
          const articleInfo = await this.$apis.ArticleApi.get_articleInfo(articleID);
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

        //获取用户对该篇文章的点赞状态  和 对该篇文章的收藏状态
        async getLikeStatusAndCollectStatus(articleID,openID){
          if (this.$store.getters.openID === null){
            return; //如果是游客或者尚未登录的用户，则不用进行检查
          }
          this.isClickLike = await this.$apis.ArticleApi.getLikeStatus(articleID,openID);
          this.isClickCollect = await this.$apis.ArticleApi.
        },


        //前往用户详情页面
        goUserInfo(){
          console.log("前往用户信息：");
          this.$router.push({name:'web_userInfo',params:{open_id:this.ArticleInfo.openID}})
        },
      },

     async mounted(){
        //请求获取该篇文章的所有信息
        this.getArticleInfo(this.$route.params.article_id);
        //请求用户对该篇文章的点赞状态
        this.getLikeStatus(this.$route.params.article_id,this.$store.getters.openID);
      },

    }
</script>

<style scoped>

  /* 点赞的非点亮常态 */
  .likeButtonNormal, .collectButtonNormal{
    padding: 10px 20px;
    background-color: white;
    border: 1px solid gray;
    border-radius: 5px;
    color: black;
  }
  .likeButtonNormal span, .collectButtonNormal span{
    float: left;
    font-size: 18px;
    /*font-weight: bold;*/
    color: black;
  }
  .likeButtonNormal i, .collectButtonNormal i{
    float: left;
    font-size: 27px;
    color: gray;
    /*color: rgb(251, 114, 153);*/
  }

  /* 点赞的点亮状态 */
  .likeButtonClick{
    background-color: rgb(251, 114, 153);
    border: 1px solid rgb(251, 114, 153);
  }
  .collectButtonClick{
    background-color: rgb(243, 160, 52);
    border: 1px solid rgb(243, 160, 52);
  }
  .likeButtonClick i, .collectButtonClick i{
    color: white;
  }
  .likeButtonClick span, .collectButtonClick span{
    color: white;
  }







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
    padding: 30px 0;
  }

  .row-content{
    padding: 20px 0;
  }

  .row-likeButton{
    padding: 30px 0;
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
    color: white;
    font-size: 14px;
  }
  .more-function >>> .ivu-dropdown-item{
    font-size: 14px!important;
  }

</style>
