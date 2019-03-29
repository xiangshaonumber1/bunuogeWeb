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
                <img :src="this.ArticleInfo.userIcon"  alt="图片加载失败" class="img-circle" width="45px" height="45px"/>
              </a>
            </div>

            <!--该div 用于显示文章作者，喜欢数，不喜欢数，浏览量，如果作者是自己，开启更多功能-->
            <div style="line-height: 30px;">
              <a @click="goUserInfo"><span v-html="ArticleInfo.nickname"></span></a>&emsp;
              <Button v-if="$store.getters.openID !== ArticleInfo.openID" class="markButtonNormal"
                      v-bind:class="{markButtonClick:isClickMark}" @click="changeMarkStatus">
                <span v-if="isClickMark === false">&nbsp;+加个关注&nbsp;</span>
                <span v-else>&nbsp;已关注&nbsp;</span>
              </Button>
              <br>
              <span style="color: gray">发布时间：{{ArticleInfo.time}}</span>&emsp;
              <span>点赞量：<Icon type="md-heart" color="rgb(251, 114, 153)" size="20" style="margin-bottom: 2px"/>&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.like}}</label></span>&emsp;
              <span>浏览量：<Icon type="md-eye" size="20" style="margin-bottom: 2px" />&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.watch}}</label></span>&emsp;
              <span>收藏量：<Icon type="md-star" size="20" style="margin-bottom: 5px" />&nbsp;<label style="margin: 0;padding: 0">{{this.ArticleInfo.collection}}</label></span>
              <div class="more-function">
                <a href="javascript:void(0)">
                  <Dropdown trigger="click" @on-click="chooseFunction">
                    <span>更多功能&nbsp;<Icon type="ios-arrow-down" color="white" /></span>
                    <DropdownMenu slot="list">
                      <!--这里表示如果该片文章的作者是当前用户的话，开放修改和删除功能-->
                      <div v-if="ArticleInfo.openID === $store.getters.openID">
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
            <Button class="collectButtonNormal" v-bind:class="{collectButtonClick:isClickCollect}" @click="changeCollectStatus">
              <span v-if="isClickCollect === false">&nbsp;喜欢就收藏呗&nbsp;</span>
              <span v-else>&nbsp;已收藏&nbsp;</span>
            </Button>

          </i-col>
        </Row>

        <!--评论和回复-->
        <Row type="flex" align="middle" justify="center" class="code-row-bg row-commentAndReply">
          <i-col span="12">
            <router-view></router-view>
          </i-col>
        </Row>

        <Divider style="margin: 50px 0" />
      </div>

      <!--返回顶部-->
      <BackTop style="margin-right: 10vw"></BackTop>


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

    import NotFound from "../404";
    import OkHeader from "../../header/ok_header";
    import Loading from "../../loading/loading";

    export default {
      name: "articleInfo",
      components: {Loading, OkHeader, NotFound},
      data() {
        return {
          isClickLike:false,//是否有点击过支持一下的按钮
          isClickCollect:false,//是否已收藏
          isClickMark:false,//是否关注该用户
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
          this.isClickLike = await this.$apis.ArticleApi.clickLike(this.ArticleInfo.articleID,this.$store.getters.openID,this.isClickLike);
        },

        //改变收藏按钮当前的状态
        async changeCollectStatus(){
          if (this.$store.getters.openID === null){
            return this.$Message.info({
              content:"温馨提示：该功能需要登录后才能实现！"
            })
          }
          this.isClickCollect = await this.$apis.ArticleApi.clickCollect(this.ArticleInfo.articleID,this.$store.getters.openID,this.isClickCollect);
        },

        //改变当前关注状态
        async changeMarkStatus(){
          if (this.$store.getters.openID === null){
            return this.$Message.info({
              content:"温馨提示：该功能需要登录后才能实现！"
            })
          }
          this.isClickMark = await this.$apis.UserApi.clickMark(this.$store.getters.openID,this.ArticleInfo.openID,this.isClickMark);
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
            //获取到文章信息后，再用文章的作者openID和请求用户的openID去判断请求者是否关注作者
            this.getMarkStatus(this.$store.getters.openID,articleInfo.openID)
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
          const result = await this.$apis.ArticleApi.getLikeAndCollectStatus(articleID,openID);
          console.log("文章状态信息：",result);
          this.isClickLike = result.likeStatus;
          this.isClickCollect = result.collectStatus
        },

        //获取当前搜索用户对作者的关注状态
        async getMarkStatus(openID,aim_openID){
          if (this.$store.getters.openID === null || openID===aim_openID){
            return; //如果是游客或者尚未登录的用户,或者是作者本人，则不用进行检查
          }
          const result = await this.$apis.UserApi.getMarkStatus(openID,aim_openID);
          console.log("用户【",openID,"】对作者【",aim_openID,"】的关注情况：",result);
          this.isClickMark = result;
        },


        //前往用户详情页面
        goUserInfo(){
          this.$router.push({name:'web_userInfo',params:{open_id:this.ArticleInfo.openID}})
        },
      },

     async mounted(){
        //请求获取该篇文章的所有信息
        this.getArticleInfo(this.$route.params.article_id);
        //请求用户对该篇文章的点赞状态
        this.getLikeStatusAndCollectStatus(this.$route.params.article_id,this.$store.getters.openID);
      },

    }
</script>

<style scoped>


  /* 比较特殊的关注的非点亮常态 */
  .markButtonNormal{
    padding: 0;
    margin: 0;
    background-color: rgb(45, 183, 245);
    border: 1px solid rgb(45, 183, 245);
    color: white;
  }
  .markButtonNormal span{
    color: white;
    float: left;
    font-size: 18px;
  }

  /* 点赞和收藏的非点亮常态 */
  .likeButtonNormal, .collectButtonNormal{
    margin: 0 10px;
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

  /* 点赞，收藏，关注的点亮状态 */
  .likeButtonClick{
    background-color: rgb(251, 114, 153);
    border: 1px solid rgb(251, 114, 153);
  }
  .collectButtonClick{
    background-color: rgb(243, 160, 52);
    border: 1px solid rgb(243, 160, 52);
  }
  .markButtonClick{
    background-color: rgb(71, 203, 137);
    border: 1px solid rgb(71, 203, 137);
  }
  .likeButtonClick i, .collectButtonClick i, .markButtonClick i{
    color: white;
  }
  .likeButtonClick span, .collectButtonClick span, .markButtonClick span{
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
  /* 标题行 */
  .row-title{
    padding: 30px 0;
  }

  /* 主要内容行 */
  .row-content{
    padding: 20px 0;
  }

  /* 文章态度行 收藏，喜欢 */
  .row-likeButton{
    padding: 30px 0;
  }

  /* 评论和回复信息行 */
  .row-commentAndReply{
    margin-top: 50px;
    /*margin-bottom: 120px;*/
    /*border: 1px solid red;*/
  }

  /* 文章标题 */
  .article_title{
    font-size: 30px;
    font-weight: bold;
  }



  .article_title >>> .ivu-tag{
    font-size: 20px;
    font-family:"Microsoft YaHei UI Light",serif ;
    line-height: 30px;
    height: auto;
    /*margin-bottom: 5px;*/
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
