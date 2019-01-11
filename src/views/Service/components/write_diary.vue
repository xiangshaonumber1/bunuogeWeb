<template>
    <div id="write_diary" class="write_diary">

      <!--日记标题-->
      <Row style="margin: 5px 0;">
        <i-col span="4" style="z-index: 10002; padding-right: 10px;margin-bottom: 10px">
          <Select v-model="select_type" size="large" :value="select_type">
            <Option value="公开 (所有人可见)" label="公开 (所有人可见)"></Option>
            <Option value="私密 (仅自己可见)" label="私密 (仅自己可见)"></Option>
          </Select>
        </i-col>

        <i-col span="17">
          <Input v-model="diary_title" size="large" placeholder="标题：请为本次的日记起个简介的描述吧" clearable/>
        </i-col>

        <i-col span="2" class="diary_confirm">
          <Button type="info" size="large">确认发布</Button>
        </i-col>

      </Row>

      <!--编辑器工具栏-->
      <Row>
        <i-col>
          <div ref="editorMenu" class="toolbar"></div>
        </i-col>
      </Row>

      <!--编辑内容 -->
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
      name: "write_diary",
      data() {
        return {
          editorContent:"",
          diary_title:"",
          select_type:'公开 (所有人可见)'
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
      },
    }
</script>

<style scoped>

  .write_diary{
    padding: 0 35px;
  }

  .diary_confirm{
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
    height: 80vh;
  }
</style>
