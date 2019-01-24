<template>
  <!-- 可以尝试把编辑内容和编辑工具放在一个div1中，其他的放在另一个div2中，然后把这两个div放在最外层的divmian下，分别设置
   divmain 100vh ,div1 20vh div2 80vh 不晓得可以不可-->

  <div id="write_article" class="write_article">

    <!-- 第一行内容 -->
    <Row style="z-index: 10002;margin: 5px 0;">
      <i-col span="3">
        <Select v-model="select_type" class="article_type_select" size="large" :value="select_type">
          <Option value="原创文章" label="原创文章"></Option>
          <Option value="转载文章" label="转载文章"></Option>
          <Option value="翻译文章" label="翻译文章"></Option>
        </Select>
      </i-col>

      <i-col span="19">
        <Input v-model="input_title" placeholder="标题：请用简洁的标题来概括文章内容......" clearable size="large" class="article_title_input" />
      </i-col>

      <i-col span="2" class="article_confirm">
       <Button type="info" size="large">确认发布</Button>
      </i-col>
    </Row>

    <!--第二行（默认隐藏）  如何选择的是“转载文章”或者“翻译文章” 都必须要备注原文链接 -->
    <Row v-if="select_type!=='原创文章'" style="margin: 5px 0;">
      <i-col>
        <Input  v-model="input_origin_link" placeholder="请将原文链接复制在这里" clearable size="large" style="width:100%;"></Input>
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
          <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
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
            articleTitle:"",
            editorContent:"",
            input_title:'',
            select_type:"原创文章",
            input_origin_link:"",
            Editor:"",
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
        editor.customConfig.debug = location.href.indexOf('write') > 0
        //监听编辑器内容变化，并赋给editorContent
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
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
    border: 1px solid #ccc;
    border-radius: 5px 5px 0 0;
    width: 100vm;
  }

  .text {
    border: 1px solid #ccc;
    width: 100%;
    height: 75vh;
  }

</style>
