<template>
  <Layout class="index">
    <Header>这里是属于头部</Header>
    <Layout>
      <Content>
        <List item-layout="vertical">
          <ListItem v-for="item in articleInfoList" :key="item.articleId" >
            <ListItemMeta>
              <span slot="title" class="articleInfoListTitle">{{item.title}}</span>
              <span slot="description" class="articleInfoListContent">{{item.content}}</span>
            </ListItemMeta>
            <template slot="action">
              <li>{{item.nickname}}</li>
              <li><Icon type="md-star" /> {{item.collectCount}}</li>
              <li><Icon type="md-thumbs-up" />  {{item.lickCount}}</li>
              <li><Icon type="md-chatbubbles" />  {{item.comments}}</li>
              <li><Icon type="md-time" /> {{item.creatTine}}</li>
            </template>
          </ListItem>
        </List>
      </Content>
      <Sider>这个是侧边</Sider>
    </Layout>
    <Footer>
      <CommonFooter></CommonFooter>
    </Footer>
  </Layout>
</template>

<script>
    import CommonLoading from "../Common/loading";
    import CommonFooter from "../Common/footer";
    import store from '../../../static/js/vuex/store'

    export default {
      name: "index",
      components: {CommonFooter,CommonLoading},
      data(){
        return {
          isLoading:true,       //第一次请求加载等待
          notFound:true,        //第一次请求失败显示
          page:1, //获取指定页号的信息
          loadMore:true, //是否允许加载下一页
          scrollLoadSwitch:true, //滚动数据加载开关,防止滚动到底部的时候，防止多次请求
          autoplaySpeed:5000, //轮播切换时间
          CarouselOrder:0,  //幻灯片的索引，从 0 开始
          topList:['暂无推荐，敬请期待...',
            '暂无推荐，敬请期待...',
            '暂无推荐，敬请期待...'],
          articleInfoList:[
            {articleId:1,title:'标题搞成最高不能超过15个字不久搞定了',content:'内容11内容11111内容11111内容11111内容内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容1111111111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111内容11111111',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
            {articleId:2,title:'标题2',content:'内容22222',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
            {articleId:3,title:'标题3',content:'内容33333',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
            {articleId:4,title:'标题4',content:'内容44444',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
            {articleId:5,title:'标题5',content:'内容55555',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
            {articleId:6,title:'标题6',content:'内容66666',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
            {articleId:7,title:'标题7',content:'内容77777',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
            {articleId:8,title:'标题8',content:'内容88888',nickname:'作者昵称',lickCount:1237,collectCount:111,comments:465,creatTine:'2019-10-16 20:30:33'},
          ], //首页基本文章信息
          posterList:[],  //首页海报信息
        }
      },

      methods:{

        //前往指定专区
        goSpecialArea(area){
          this.$Notice.info({
            title:'敬请期待：',
            desc:'该板块正开发，敬请期待'
          })
        },

        //前往文章详情页面
        goArticleInfo(articleID,openID){
          //新建窗口跳转
          let ArticleInfo = this.$router.resolve({
            name:'article_info',
            params:{
              article_id:articleID,
              open_id:openID
            }
          });
          window.open(ArticleInfo.href,'_blank')
        },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

        //获取首页基本文章信息
        async get_article_list(articlePage) {
          //只有允许加载下一页的情况下，才去请求数据
          if (this.loadMore){
            const result = await this.$apis.ArticleApi.get_article_list(articlePage);
            if (result.total === 0 && articlePage === 1) {                     //情况一：第一次请求返回null，直接返回无资源
              this.notFound = true;
              this.isLoading = false;
            }else {                                                         //情况二：有具体的返回数据
              //循环向现有的文章数组中添加元素
              for (let value of result.data.newest_article){
                this.articleList.push(value)
              }
              //只有当当前显示的文章信息数小于总数时，才允许加载下一页
              if (result.total > this.articleList.length){
                this.loadMore = true;
                this.page++;
              }else {
                this.loadMore = false;
              }

              //防止意料之外的情况，设置 notFound 和 isLoading 为 false
              this.notFound = false;  //不显示404
              this.isLoading = false; //不显示第一次的正在加载
              //数据加载完毕，启用滚动加载开关，可滚动加载数据
              this.scrollLoadSwitch = true;
            }
          }else {
            this.$Message.info({
              top:0,
              content:'已经加载到底了，再往下也没有了！',
              duration:3,
            });
            console.log("数据已加载完毕")
          }
        },

        //滚动到底部，自定加载数据
        async scroll(){
          window.onscroll = () =>{
            /**
             * document.documentElement.offsetHeight：网页可见区域高，获取元素自身的高度（包含边框）
             * document.documentElement.scrollTop; 获取当前页面的滚动条纵坐标位置，网页被卷去的高
             * window.innerHeight：获取浏览器页面可用高度
             */
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight < 100;
            //注：只有距离满足条件，允许加载下一页数据，且当前page为1,2,3时，才允许滚动加载
            if (bottomOfWindow && this.loadMore===true && this.page<=3 && this.scrollLoadSwitch === true){
              //打开滚动加载数据开关，防止重复请求
              this.scrollLoadSwitch = false;
              this.get_article_list(this.page);
            }
          }
        },


        //获取首页海报信息
        async getPosterList() {
          const result = await this.$apis.CommonApi.getPostList();
          if (result){
            for (let i=0;i<result.length;i++){ //为获取到的图片路径，添加服务器地址
              result[i] = store.getters.serverPath+result[i];
            }
            this.posterList = result;
          }else{
            this.posterList = [{},{},{},{},{}];
          }
        },

        //获取近三日热门推荐文章
        async getTop(){
            const result = await this.$apis.ArticleApi.getTop();
        },

      },

      mounted(){

        //获取首页基本文章信息
        this.get_article_list(this.page);

        //获取首页轮播海报图片
        this.getPosterList();

        //滑到距离底部一定距离时，自动加载下一页的数据
        this.scroll();
      },

    }
</script>

<style scoped>

  .articleInfoListTitle{
    font-weight: bold;
    font-size: 18px;
  }
  .articleInfoListContent{
    overflow: hidden;   /* 超出容器隐藏，不然会撑破容器。 */

    text-overflow: ellipsis;    /* 可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。 */
    display:-webkit-box;    /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。 */
    /*! autoprefixer: off */
    -webkit-line-clamp: 2;      /* -webkit-box-orient: vertical;这行样式上下需要加上上文中的注释，否则用webpack后-webkit-box-orient样式会丢失  需要显示的文本行数 */
    /* autoprefixer: on */
    -webkit-box-orient: vertical;   /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。 */

    word-wrap:break-word;
    white-space: pre-wrap;
  }


</style>
