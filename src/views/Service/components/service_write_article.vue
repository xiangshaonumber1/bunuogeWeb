<template>
  <!-- 可以尝试把编辑内容和编辑工具放在一个div1中，其他的放在另一个div2中，然后把这两个div放在最外层的divmian下，分别设置
   divmain 100vh ,div1 20vh div2 80vh 不晓得可以不可-->

  <div id="write_article" class="write_article">

    <!--写博客logo-->
    <Row type="flex" class="row-code-bg" justify="center" align="middle" style="height: 10vh;">
      <i-col span="20">
        <Divider orientation="left">
          <a @click="goIndex">
             <span style="font-size: 30px;padding: 5px" >
               <span style="color: lightskyblue;font-size: 35px">Getok</span>
               &nbsp;文&nbsp;章&nbsp;创&nbsp;作
             </span>
          </a>
        </Divider>
      </i-col>
    </Row>

    <!--主要配置-->
    <div>
      <Row type="flex" class="row-code-bg" justify="center" align="middle" style="margin-bottom: 10px">

        <!-- 发布文章类型选择 -->
        <i-col span="3" style="z-index: 10002">
          <i-select v-model="select_type" class="article_type_select" size="large" :value="select_type">
            <Option value="original" label="原创文章"></Option>
            <Option value="reprint" label="转载文章"></Option>
            <Option value="translate" label="翻译文章"></Option>
          </i-select>
        </i-col>

        <!--trim 去除前后空格-->
        <i-col span="9">
          <Input v-model.trim="articleTitle" placeholder="标题：请用简洁的标题来概括文章内容......" clearable size="large" class="article_title_input"  />
        </i-col>

        <i-col span="2" class="article_confirm">
          <Button v-if="this.type === 'update' " type="success" size="large" long @click="request_update_article">修&nbsp;改&nbsp;保&nbsp;存</Button>
          <Button v-else type="info" size="large" long @click="request_push_article">确&nbsp;认&nbsp;发&nbsp;布</Button>
        </i-col>
      </Row>

      <!--第二行（默认隐藏）  如何选择的是“转载文章”或者“翻译文章” 都必须要备注原文链接 -->
      <Row v-if="select_type!=='original'" type="flex" class="row-code-bg" justify="center" align="middle" style="margin-bottom: 10px">
        <i-col span="14">
          <Input  v-model.trim="origin_link" placeholder="请将原文链接复制在这里" clearable size="large" style="width:100%;"></Input>
        </i-col>
      </Row>

      <!--第三行 编辑器工具栏-->
      <Row type="flex" class="row-code-bg" justify="center" align="middle">
        <i-col span="14">
          <div ref="editorMenu" class="toolbar"></div>
        </i-col>
      </Row>

      <!--第四行，编辑内容 -->
      <Row type="flex" class="row-code-bg" justify="center" align="middle">
        <i-col span="14">
          <div ref="articleContent" class="text">
          </div>
        </i-col>
      </Row>
    </div>

    <quick-router></quick-router>

  </div>

</template>

<script>

  import E from 'wangeditor'
  import QuickRouter from "../../Common/quickRouter";

    export default {
    name: "write_article",
      components: {QuickRouter},
      data(){
          return{
            editor:'',
            articleTitle:'',
            articleContent:'',
            select_type:"original",
            origin_link:'',
            onlyText:'',
            type:'write', //write,update 是新建文章，还是修改文章,
            ArticleInfo:{},
          }
      },

      methods:{

        goIndex(){//前往首页
          this.$router.push({name:'index'})
        },

        editorCreate(){   //初始化文本编辑器
          this.editor = new E(this.$refs.editorMenu,this.$refs.articleContent);
          //加上这个句，才能在编辑器中粘贴图片
          this.editor.customConfig.uploadImgShowBase64 = true;
          this.editor.customConfig.uploadImgMaxSize = 3 * 1024 *1024;
          this.editor.customConfig.uploadFileName = 'file';
          // 通过 url 参数配置 debug 模式。url 中带有 write 才会开启 debug 模式
          this.editor.customConfig.debug = location.href.indexOf('write') > 0;
          //监听编辑器内容变化，并赋给editorContent
          this.editor.customConfig.onchange = (html) => {
            //带html格式的文本
            this.articleContent = html;
            //纯文字文本
            this.onlyText = html.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig,"").trim();
          };
          this.editor.create()
        },

        //用户向服务器提交发布的文章
       async request_push_article(){
          if (this.articleTitle.length <6){  //检查标题是否符合规范
            return this.$Notice.warning({
              title:'标题不规范提示',
              desc:'文章标题不符合规范，标题应该至少有6位有效字符'
            })
          }
          if (this.select_type !== 'original' && this.origin_link.length <6){ //如果不是原创文章，检查原文链接是否符合规范
            return this.$Notice.warning({
              title:'原文链接不规范提示',
              desc:'原文链接不规范，请检查后再继续'
            })
          }
          if (this.onlyText.length<6){ //检查文章主要内容字数是否达标
            return this.$Notice.warning({
              title:'文章内容不规范提示',
              desc:'文章主要内容不能少于6个有效字符，请编写好后再继续'
            })
          }
         this.$apis.ArticleApi.write_article(this.articleTitle,this.articleContent,this.select_type,null,this.origin_link)
        },

        //向服务器提交修改文章的请求
        async request_update_article(){

        },

      },

      mounted(){

        this.editorCreate();
        console.log("write_article : mounted 正在执行");

        if (this.$route.params.article_id){
          console.log("是修改文章的请求");
          this.type = 'update';
          this.ArticleInfo = JSON.parse(localStorage.getItem("update_articleInfo"));
          console.log("localStorage 获取到的信息:",JSON.parse(localStorage.getItem("update_articleInfo")));
          this.articleTitle = this.ArticleInfo.title;
          this.select_type = this.ArticleInfo.type;
          this.origin_link = this.ArticleInfo.origin_link;
          this.editor.txt.html(this.ArticleInfo.content)
        }else {
          console.log("是新建文章的请求")
        }

      },

      Destroy(){
      console.log("执行删除");
      localStorage.removeItem("update_articleInfo");
      },
    }



</script>

<style scoped>

  a{
    color: black;
    text-decoration: none;
  }

  .article_type_select{
    padding-right: 10px;
  }

  .article_confirm{
    padding-left: 10px;
  }

  .toolbar {
    border-top: 2px solid lightgrey;
    border-left: 2px solid lightgrey;
    border-right: 2px solid lightgrey;
    border-radius: 5px 5px 0 0;
    width: 100vm;
    background-color: rgb(241, 241, 241);
  }

  .text {
    border: 2px solid lightgrey;
    width: 100%;
    height: 73vh;
  }

</style>
