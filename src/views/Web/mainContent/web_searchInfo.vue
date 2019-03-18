<template>
  <div>

    <Row type="flex" class="code-row-bg" align="top" justify="center" style="margin-top: 3vh">

      <!--搜索类型选择-->
      <i-col span="4" style="margin-right:2vw">
        <Card icon="ios-options" :padding="0">
          <h3 slot="title">搜索类型</h3>
          <CellGroup @on-click="updateSearchInfo">
            <Cell title="文章" name="article" :selected="searchType === 'article'"><Icon type="ios-paper" slot="icon" size="20"/></Cell>
            <Cell title="用户" name="user" :selected="searchType === 'user'"><Icon type="md-person" slot="icon" size="20"/></Cell>
          </CellGroup>
        </Card>
      </i-col>

      <!--反馈结果显示-->
      <i-col span="10">

        <!--数据获取完成前显示正在加载-->
        <loading v-if="isLoading"></loading>

        <!--如果没有数据，显示404-->
        <Card v-else-if="notFound">
          <not-found></not-found>
        </Card>

        <!--如果有数据，则正常显示搜索结果-->
        <div v-else>

          <!--显示文章搜索结果-->
          <div v-if="searchType === 'article' ">
            <div class="searchInfo" v-for="searchArticle in searchInfoList">
              <Card :bordered="false">

                <!--文章标题-->
                <div class="searchArticleTitle">
                  <a @click="goArticleInfo(searchArticle.articleID)"><span v-html="brightenKeyword(searchArticle.title,key_word_list)"></span></a>
                </div>

                <!--文章内容-->
                <div class="searchArticleContent">
                  <span v-html="brightenKeyword(replaceHtml(searchArticle.content),key_word_list)"></span>
                </div>

                <!--文章作者和文章状态信息-->
                <div class="searchArticleOtherInfo">
                  <span v-html="searchArticle.nickname"></span>&emsp;
                  <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="16"/>&nbsp;<label>{{searchArticle.like}}</label></span>&emsp;
                  <span><Icon type="md-eye" size="16" />&nbsp;<label>{{searchArticle.dislike}}</label></span>
                  <span style="float: right;margin-right: 20px"><Icon type="md-time" size="16" />&nbsp;<Time :time="searchArticle.time"/></span>
                </div>

              </Card>
              <Divider style="margin: 0;"/>
            </div>
          </div>

          <!--显示用户搜索结果-->
          <div v-else-if="searchType === 'user'">
            <div class="searchInfo" v-for="(searchUser,index) in searchInfoList">
              <Card :bordered="false">

                <div>
                  <a @click="goUserInfo(searchUser.openID)" style="color: black;text-decoration: none">
                  <Avatar :src="searchUser.userIcon" size="large" style="padding: 0;"/>
                    &nbsp;<span v-html="searchUser.nickname"></span>
                  </a>

                  <!-- 当前用户对目标用户的关注状态 -->
                  <Button v-if=" searchUser.openID !== $store.getters.openID" class="markButtonNormal"
                          v-bind:class="{markButtonClick:searchUser.isClickMark}" @click="changeMarkStatus(index,searchUser.openID,searchUser.isClickMark)">
                    <span v-if="searchUser.isClickMark === false">&nbsp;+加个关注&nbsp;</span>
                    <span v-else>&nbsp;已关注&nbsp;</span>
                  </Button>
                </div>

                <!--用户的个性描述-->
                <blockquote style="padding: 0 15px;margin: 5px 0;">
                  <div class="userDescribe">
                    <span style="font-size: 14px;color: gray;font-weight: normal">
                      {{searchUser.myDescribe}}
                    </span>
                  </div>
                </blockquote>

              </Card>
              <Divider style="margin: 0;"/>
            </div>
          </div>

        </div>

      </i-col>

    </Row>

  </div>
</template>

<script>
  import OkHeader from "../header/ok_header";
  import NotFound from "./404";
  import Loading from "../loading/loading";

  export default {
        name: "web_searchInfo",
      components: {Loading, NotFound, OkHeader},
      data(){
        return {
          search_page:1,        //查询页数
          key_word:null,        //搜索的关键字
          searchInfoList:[],    //搜索结果返回
          isLoading:true,       //是否等待加载中
          notFound:false,       //请求结果是否有有效的返回值
          searchType:'article', //首选搜索类型
          key_word_list:[],//分词器拆分后的结果
        }
      },

      methods:{

        //修改搜索类型，并重新发送请求
        updateSearchInfo(type){
          this.searchType = type;//修改当前的搜索类型
          this.getSearchInfo(this.$route.params.key_word);//带上搜索类型，重新发起请求
        },

        //获取相应的搜索结果
       async getSearchInfo(key_word){
         const result = await this.$apis.ArticleApi.get_search(key_word,this.search_page,this.searchType);
         if (result === null && this.search_page === 1){
           this.isLoading = false; //取消正在加载
           this.notFound = true; //显示404
         }else {
           this.isLoading = false; //取消正在加载
           this.notFound = false; //取消显示404
           console.log("输出返回的信息：",result);
           var TempSearchInfoList = result.result; //赋值获取到的文章数据
           if (this.searchType === "user"){
             for (var searchInfo of TempSearchInfoList){
               console.log("搜索类型为user，为搜索结果做一些调整");
               searchInfo.userIcon =  this.$store.getters.serverPath+ JSON.parse(searchInfo.userIcon)[0];
               searchInfo.isClickMark = await this.getMarkStatus(this.$store.getters.openID,searchInfo.openID);
               console.log("调整后的结果：",searchInfo)
             }
           }
           this.searchInfoList = TempSearchInfoList;
           console.log("赋值完后的 searchInfoList = ",this.searchInfoList);
           this.key_word_list = result.key_word_list;  //赋值获取到的分词器
         }
        },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

        //前往文章详情页面
        goArticleInfo(id){
          //新建窗口跳转
          let ArticleInfo = this.$router.resolve({
            name:'web_articleInfo',
            params:{
              article_id:id
            }
          });
          window.open(ArticleInfo.href,'_blank')
        },

        //前往用户详情页面
        goUserInfo(openID){
          console.log("前往用户信息：");
          this.$router.push({name:'web_userInfo',params:{open_id:openID}})
        },

        // 筛选变色,不过英文好像无法识别大小写
        // brightenKeyword(val, keyword) {
        //   val = val + '';
        //   if (val.indexOf(keyword) !== -1 && keyword !== '') {
        //     return val.replace(keyword, '<font color="#409EFF">' + keyword + '</font>')
        //   } else {
        //     return val
        //   }
        // },

        // 或者用正则表达式，能识别大小写，但是会根据搜索关键字的大小写而覆盖原本内容的大小写
        brightenKeyword(content, key_word_list) {
          for (var key_word of key_word_list){
            // console.log("需要加红的字：",key_word);
            const Reg = new RegExp(key_word, 'i');
            if (content) {
              content = content.replace(Reg, `<span style="color: red;">${key_word}</span>`);
            }
          }
          return content;
        },


        //改变当前关注状态
        async changeMarkStatus(index,aim_openID,executeType){
          console.log("传进来的值 index：",index);
          if (this.$store.getters.openID === null){
            return this.$Message.info({
              content:"温馨提示：该功能需要登录后才能实现！",
            })
          }
          this.searchInfoList[index].isClickMark = await this.$apis.UserApi.clickMark(this.$store.getters.openID, aim_openID, executeType);
        },

        //获取当前搜索用户对搜索结果的用户的关注情况
        async getMarkStatus(openID,aim_openID){
          if (this.$store.getters.openID === null || openID===aim_openID){
            return; //如果是游客或者尚未登录的用户,或者是作者本人，则不用进行检查
          }
          const result = await this.$apis.UserApi.getMarkStatus(openID,aim_openID);
          console.log("用户【",openID,"】对作者【",aim_openID,"】的关注情况：",result);
          return result;
        },
      },

      async mounted(){
        console.log("mounted 执行",this.$route.params.key_word);
        //获取搜索信息
        await this.getSearchInfo(this.$route.params.key_word);
        console.log("输出 store 信息2：",this.$store.getters.openID)

      },


      //在当前路由改变，但是该组件被复用时调用
      //对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
      // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
      beforeRouteUpdate(to,from,next){
        console.log('beforeRouteUpdate Update Update'); //当前组件实例
        console.log("web_searchInfo",this.searchType);
        next();
        this.getSearchInfo(this.$route.params.key_word);
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
    padding: 0;
  }
  /*关注的点亮状态 */
  .markButtonClick{
    background-color: rgb(71, 203, 137);
    border: 1px solid rgb(71, 203, 137);
  }
  .markButtonClick i{
    color: white;
  }
  .markButtonClick span{
    color: white;
  }


  span{
    font-size:18px;
    font-weight: bold;
    font-family: "Microsoft YaHei UI",serif;
  }

  .searchInfo{
    margin-bottom: 10px;
  }

  .searchInfo >>> .ivu-card-body{
    padding: 16px 16px 5px 16px;
  }

  .searchArticleTitle a,span{
    color: black;
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
  }


  .searchArticleContent{
    /* 超出长度时，出现省略号  */
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 5;
    /*autoprefixer: off;*/
    -webkit-box-orient: vertical;
    /*autoprefixer: on;*/
    display:-webkit-box;
    margin: 5px 0;
  }

  .searchArticleContent >span{
    color: gray;
    font-size: 14px;
    font-weight: normal;
  }

  .searchArticleOtherInfo span,label{
    font-size: 14px;
    font-weight: normal;
    color:cadetblue;
  }

  .userDescribe{
    /*border: 1px solid red;*/
    margin: 10px 0;
    overflow: hidden;
    text-overflow-ellipsis: true;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }

</style>
