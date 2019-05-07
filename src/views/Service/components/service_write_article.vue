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
        <i-col span="3" style="z-index: 10003;padding-right: 10px;">
          <i-select v-model="select_type" size="large">
            <i-option value="original" label="原创文章"></i-option>
            <i-option value="reprint" label="转载文章"></i-option>
            <i-option value="translate" label="翻译文章"></i-option>
          </i-select>
        </i-col>

        <!--trim 去除前后空格-->
        <i-col span="9">
          <Input v-model.trim="articleTitle" placeholder="标题：请用简洁的标题来概括文章内容......" clearable size="large" class="article_title_input"  />
        </i-col>

        <i-col span="2" class="article_confirm">
          <Button v-if="this.type === 'update' " type="success" size="large" long @click="request_push_article">修&nbsp;改&nbsp;保&nbsp;存</Button>
          <Button v-else type="info" size="large" long @click="request_push_article" :loading="loading_push">确&nbsp;认&nbsp;发&nbsp;布</Button>
        </i-col>
      </Row>

      <!--第二行（默认隐藏）  如何选择的是“转载文章”或者“翻译文章” 都必须要备注原文链接 -->
      <Row v-if="select_type!=='original'" type="flex" class="row-code-bg" justify="center" align="middle" style="margin-bottom: 10px">
        <i-col span="14" style="z-index: 10002">
          <Input v-model.trim="origin_link" placeholder="请将原文链接复制在这里" clearable size="large" style="width:100%;">
          </Input>
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
  import store from '../../../blog_vuex/store'
  import {Message} from 'iview'

    export default {
    name: "write_article",
      components: {QuickRouter},
      data(){
          return{
            editor:'',
            articleTitle:'',
            articleContent:'',
            select_type:'',
            origin_link:"",
            onlyText:'',
            type:'write', //write,update 是新建文章，还是修改文章,
            ArticleInfo:{},
            loading_push:false, //发布上传等待中
          }
      },

      methods:{

        //前往首页
        goIndex(){
          this.$router.push({name:'index'})
        },

        //初始化文本编辑器
        editorCreate(){
          this.editor = new E(this.$refs.editorMenu,this.$refs.articleContent);
          // 忽略粘贴内容中的图片
          this.editor.customConfig.pasteIgnoreImg = true;
          // 将图片大小限制为 3M
          this.editor.customConfig.uploadImgMaxSize = 3 * 1024 *1024;
          // * 指定上传类型为file
          this.editor.customConfig.uploadFileName = 'file';
          // *  上传文件请求地址
          this.editor.customConfig.uploadImgServer = this.$store.getters.serverPath+'/common/uploadPicture?savePath=article';
          //监听编辑器内容变化，并赋给editorContent
          this.editor.customConfig.onchange = (html) => {
            //带html格式的文本
            this.articleContent = html;
            //纯文字文本
            this.onlyText = this.articleContent.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig,"").trim();
          };
          this.editor.customConfig.uploadImgHooks = {
            //图片上传并返回结果，图片插入成功之后触发
            success:function (xhr, editor, result) {
              Message.success({
                content:'图片上传成功 ヾ(๑╹◡╹)ﾉ" ',
                duration:3
              });
            },
            //图片上传并返回结果，但图片插入错误时触发
            fail:function(xhr, editor, result){
              Message.error({
                content:'图片插入过程中出现错误，请稍后再试 (＞人＜；)，任何问题均可联系管理员'
              })
            },
            //图片上传出错时触发
            error:function(xhr, editor){
              Message.error({
                content:'图片上传过程中出现错误，请稍后再试 (＞人＜；)，任何问题均可联系管理员 ',
                duration:3
              })
            },
            //图片上传超时时触发
            timeout:function (xhr, editor) {
              Message.error({
                content:'图片上传超时，请稍后再试 (＞人＜；)，任何问题均可联系管理员 ',
                duration:3
              })
            },

            //如果服务器返回的不是wangeditor指定的格式时，可使用该配置，但是服务器必须返回JSON格式字符串！！！ 否则会报错
            customInsert:function (insertImg,result,editor) {
              //图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片） insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
              console.log("返回的信息：",result);
              //表示上传图片成功,上传失败，在上面error中处理
              if (result.code === '200'){
                var url = store.getters.serverPath + result.data;
                insertImg(url);
              }
            }

          };
          this.editor.create();
        },

        //向服务器发送请求
       async request_push_article(){
          // return console.log("this. select_type 的值：",this.select_type);
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

         this.loading_push = true;
          let result = false;
         //新建文章请求
          if(this.type === 'write'){
            result = await this.$apis.ArticleApi.write_article(this.articleTitle,this.articleContent,this.select_type,null,this.origin_link);
            if (result){
              console.log("新的文章已发布，准备通知粉丝")
              this.$socket.emit("notification_article",this.$store.getters.openID)
            }
          }
          //修改已发布的文章
          else if (this.type === 'update'){
            if (this.select_type === 'original'){ //是其他类型的文章修改为原创文章，把original手动设置为null
              this.origin_link = null;
            }
            result = await this.$apis.ArticleApi.update_article(this.ArticleInfo.articleID,this.articleTitle,this.articleContent,this.select_type,null,this.origin_link);
          }
         this.loading_push = false;
        },

        //如果检查到时修改类型的请求：update操作类型初始化
        updateInstance(){
          this.type = 'update';
          //辨别操作类型
          this.ArticleInfo = JSON.parse(localStorage.getItem("update_articleInfo"));
          //取出存放在本地session中的文章信息
          console.log("赋值之前 的值：",this.select_type);
          this.select_type = this.ArticleInfo.type;
          //文章类型赋值
          console.log("this.select_type 的值：",this.select_type);
          console.log("对比结果：","reprint" === this.select_type)
          this.articleTitle = this.ArticleInfo.title;
          //文章标题赋值
          this.onlyText = this.ArticleInfo.content.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig,"").trim();
          //用于检验纯文本字数
          if (this.ArticleInfo.type !== 'original'){
            this.origin_link = this.ArticleInfo.originLink;
          }
          this.editor.txt.html(this.ArticleInfo.content);
          //文章主要内容赋值
          this.articleContent = this.ArticleInfo.content;
        }

      },

      async mounted() {

        //执行编辑工具初始化
        this.editorCreate();

        //如果是有值传递过来，表示是修改类型的操作，
        if (this.$route.params.article_id) {
          await this.updateInstance();
        } else {
          console.log("是新建文章的请求")
          this.select_type = "original"
        }
      },

      //当前页面销毁时需要做的一些事
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
