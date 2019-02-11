<template>
  <!-- 可以尝试把编辑内容和编辑工具放在一个div1中，其他的放在另一个div2中，然后把这两个div放在最外层的divmian下，分别设置
   divmain 100vh ,div1 20vh div2 80vh 不晓得可以不可-->

  <div id="write_article" class="write_article">

    <!-- 第一行内容 -->
    <Row style="margin: 5px 0;">
      <i-col span="3" style="z-index: 10002">
        <i-select v-model="select_type" class="article_type_select" size="large" :value="select_type">
          <Option value="原创文章" label="原创文章"></Option>
          <Option value="转载文章" label="转载文章"></Option>
          <Option value="翻译文章" label="翻译文章"></Option>
        </i-select>
      </i-col>

      <!--trim 去除前后空格-->
      <i-col span="19">
        <Input v-model.trim="articleTitle" placeholder="标题：请用简洁的标题来概括文章内容......" clearable size="large" class="article_title_input"  />
      </i-col>

      <i-col span="2" class="article_confirm">
       <Button type="info" size="large" long @click="request_push_article">确认发布</Button>
      </i-col>
    </Row>

    <!--第二行（默认隐藏）  如何选择的是“转载文章”或者“翻译文章” 都必须要备注原文链接 -->
    <Row v-if="select_type!=='原创文章'" style="margin: 5px 0;">
      <i-col>
        <Input  v-model.trim="origin_link" placeholder="请将原文链接复制在这里" clearable size="large" style="width:100%;"></Input>
      </i-col>
    </Row>

    <!--第三行 编辑器工具栏-->
    <Row>
      <i-col>
        <div ref="editorMenu" class="toolbar"></div>
      </i-col>
    </Row>

    <!--第四行，编辑内容 -->
    <Row>
      <i-col>
        <div ref="editorContent" class="text">
        </div>
      </i-col>
    </Row>


  </div>

</template>

<script>

  import E from 'wangeditor'

    export default {
    name: "write_article",
      data(){
          return{
            articleTitle:'',
            editorContent:'',
            select_type:"原创文章",
            origin_link:'',
            onlyText:''
          }
      },

      methods:{
        //用户向服务器提交发布的文章
        request_push_article(){
          if (this.articleTitle.length <6){  //检查标题是否符合规范
            return this.$Notice.warning({
              title:'标题不规范提示',
              desc:'文章标题不符合规范，标题应该至少有6位有效字符'
            })
          }
          if (this.select_type !== '原创文章' && this.origin_link.length <6){ //如果不是原创文章，检查原文链接是否符合规范
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

          const userInfo = this.$store.getters.userInfo;
          console.log("获取到的userInfo:",userInfo);
          const token = this.$store.getters.userToken;
          console.log("获取到的token:",token);

          this.$axios({
            url:'/article/write_article',
            method:'post',
            headers:{
              'X-Auth-Token':this.$store.getters.userToken
            },
            data:this.$qs.stringify({
              title:this.articleTitle,
              content:this.editorContent,
              label:this.select_type,
              origin_link:this.origin_link,
            })
          }).then((response)=>{
            console.log("提交成功:",response)
          }).catch((error)=>{
            console.log("出现了一个错误",error.response);
            if (error.response.data.code === '401'){
              this.$Notice.error({
                title:'尚未登录',
                desc:'抱歉，检测到您尚未进行有效登录，无法继续，即将前往登录页面，请登录后再继续操作',
                duration:8
              });
              this.$router.push({name:'login'})
            }
          })


        }
      },

      mounted(){
        console.log("write_article : mounted 正在执行");
        //这句不能加，加了反而不会显示
        // var E = window.wangEditor
        let editor = new E(this.$refs.editorMenu,this.$refs.editorContent);
        //加上这个句，才能在编辑器中粘贴图片
        editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.uploadImgMaxSize = 3 * 1024 *1024;
        editor.customConfig.uploadFileName = 'file';
        // 通过 url 参数配置 debug 模式。url 中带有 write 才会开启 debug 模式
        editor.customConfig.debug = location.href.indexOf('write') > 0;
        //监听编辑器内容变化，并赋给editorContent
        editor.customConfig.onchange = (html) => {
          //带html格式的文本
          this.editorContent = html;
          //纯文字文本
          this.onlyText = html.replace(/<[^>]+>/g,"").replace(/&nbsp;/ig,"").trim();
        };
        editor.create()
      }
    }



</script>

<style scoped>

  .write_article{
    padding: 0 35px;
    height: auto;
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
    height: 75vh;
  }

</style>
