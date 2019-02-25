<template>
  <div>

    <Row type="flex" class="code-row-bg" align="top" justify="center" style="margin-top: 3vh">

      <!--搜索类型选择-->
      <i-col span="4" style="margin-right:2vw">
        <Card icon="ios-options" :padding="0">
          <span slot="title">搜索类型</span>
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
                  <span>{{searchArticle.nickname}}</span>&emsp;
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
            <div class="searchInfo" v-for="searchUser in searchInfoList">
              <Card :bordered="false">

                <div>
                  <a @click="goUserInfo" style="color: black;text-decoration: none">
                  <Avatar :src="searchUser.userIcon" />
                    &nbsp;<span>{{searchUser.nickname}}</span>
                  </a>
                  <Button type="info" style="float: right">关注</Button>
                </div>


                <blockquote style="padding: 0 15px;margin: 5px 0;">
                  <div class="userDescribe">
                    <span style="font-size: 14px;color: gray;font-weight: normal">
                      {{searchUser.describe}}
                      在这里添加的个人描述，个人签名等等...在这里添加的个人描述，个人签名等等在这里添加的个人描述，个人签名等等...在这里添加的个人描述，个人签名等等
                      在这里添加的个人描述，个人签名等等...在这里添加的个人描述，个人签名等等在这里添加的个人描述，个人签名等等...在这里添加的个人描述，个人签名等等
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
          search_page:1,
          key_word:null,
          searchInfoList:[],
          isLoading:true,
          notFound:false,
          searchType:'article',
          key_word_list:[],//分词器拆分后的结果
        }
      },

      methods:{
        updateSearchInfo(type){  //修改搜索类型，并重新发送请求
          this.searchType = type;//修改当前的搜索类型
          this.getSearchInfo();//带上搜索类型，重新发起请求
        },

       async getSearchInfo(){//获取相应的搜索结果
         const result = await this.$apis.ArticleApi.get_search(this.$route.params.key_word,this.search_page,this.searchType);
         if (result === null && this.search_page === 1){
           this.isLoading = false; //取消正在加载
           this.notFound = true; //显示404
         }else {
           this.isLoading = false; //取消正在加载
           this.notFound = false; //取消显示404
           this.searchInfoList = result.articleInfo; //赋值获取到的文章数据
           this.key_word_list = result.key_word_list;  //赋值获取到的分词器
         }
        },

        replaceHtml(value){//去掉html标签
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

        goArticleInfo(id){ //前往文章详情页面
          //新建窗口跳转
          let ArticleInfo = this.$router.resolve({
            name:'articleInfo',
            params:{
              article_id:id
            }
          });
          window.open(ArticleInfo.href,'_blank')
          // this.$router.push({path:"/ai/"+id+""})
        },

        goUserInfo(){//前往用户详情页面

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
        brightenKeyword(content, keyword) {
          const Reg = new RegExp(keyword, 'i');
          if (content) {
            return content.replace(Reg, `<span style="color: red;">${keyword}</span>`);
          }
        }

      },

      mounted(){
        console.log("mounted 执行",this.$route.params.key_word);
        this.getSearchInfo();
      },


      beforeRouteUpdate(to,from,next){
        //在当前路由改变，但是该组件被复用时调用
        //对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候，
        // 由于会渲染同样的good组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        console.log('beforeRouteUpdate Update Update'); //当前组件实例
        console.log("web_searchInfo",this.searchType);
        next();
        this.getSearchInfo();
      },




    }
</script>

<style scoped>
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
    -webkit-line-clamp: 2;
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
