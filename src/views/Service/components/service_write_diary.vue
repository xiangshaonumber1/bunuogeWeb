<template>
    <div id="write_diary">

      <!--写笔记logo信息-->
      <Row type="flex" class="row-code-bg" justify="center" align="middle" style="height: 10vh;">
        <i-col span="20">
          <Divider orientation="left">
            <a @click="goIndex">
             <span style="font-size: 30px;padding: 5px" >
               <span style="color: lightskyblue;font-size: 35px">Getok</span>
               &nbsp;记&nbsp;录&nbsp;点&nbsp;滴
             </span>
            </a>
          </Divider>
        </i-col>
      </Row>

      <!--主要配置-->
      <div style="height: 90vh">
        <!--日记编辑类型选择-->
        <Row type="flex" class="row-code-bg" justify="center" align="middle" style="margin-bottom: 10px">
          <i-col span="3" style="z-index: 10002; padding-right: 10px;">
            <Select v-model="select_type" size="large" :value="select_type">
              <Option value="public" label="公开 (所有人可见)"></Option>
              <Option value="private" label="私密 (仅自己可见)"></Option>
            </Select>
          </i-col>

          <!--trim 去除前后空格-->
          <i-col span="9">
            <Input v-model.trim="diaryTitle" size="large" placeholder="标题：请为本次的日记起个简介的描述吧" clearable/>
          </i-col>

          <!-- 确认发布按钮 -->
          <i-col span="2" style="padding-left: 10px">
            <Button v-if="this.type ==='update' " type="success" size="large" long @click="request_update_diary">修&nbsp;改&nbsp;保&nbsp;存</Button>
            <Button v-else type="info" size="large" long @click="request_push_diary">确&nbsp;认&nbsp;发&nbsp;布</Button>
          </i-col>

        </Row>

        <!--编辑器工具栏-->
        <Row type="flex" class="row-code-bg" justify="center" align="middle">
          <i-col span="14">
            <div ref="editorMenu" class="toolbar"></div>
          </i-col>
        </Row>

        <!--编辑内容 -->
        <Row type="flex" class="row-code-bg" justify="center" align="middle">
          <i-col span="14">
            <div ref="diaryContent" class="text">
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
      name: "write_diary",
      components: {QuickRouter},
      data() {
        return {
          diaryContent:"",
          diaryTitle:"",
          select_type:'public',
          type:'write', //write,update 是新建文章，还是修改文章,
          DiaryInfo:[],
        }
      },

      methods:{

        goIndex(){//前往首页
          this.$router.push({name:'index'})
        },

        //发起提交日记的请求
        request_push_diary(){
          if (this.diaryTitle.length<=5 || this.diaryContent.length<=5){//检查日记标题和日记内容长度是否小于5
           return this.$Notice.warning({
              title:'格式不规范',
              desc:'日记标题和日记内容的长度应该不小6位有效字符，请修改后再继续'
            })
          }
          this.$apis.ArticleApi.write_diary(this.diaryTitle,this.diaryContent,this.select_type)
        },

        //发起修改日记内容的请求
        request_update_diary(){

        },

        //初始化文本编辑器
        editorCreate(){
          let editor = new E(this.$refs.editorMenu,this.$refs.diaryContent);
          //加上这个句，才能在编辑器中粘贴图片
          editor.customConfig.uploadImgShowBase64 = true;
          editor.customConfig.uploadImgMaxSize = 3 * 1024 *1024;
          editor.customConfig.uploadFileName = 'file';
          // 通过 url 参数配置 debug 模式。url 中带有 write 才会开启 debug 模式
          editor.customConfig.debug = location.href.indexOf('write') > 0;
          //监听编辑器内容变化，并赋给diaryContent
          editor.customConfig.onchange = (html) => {
            this.diaryContent = html
          };
          editor.create()
        }


      },

      mounted(){
        console.log("write_article : mounted 正在执行");
        this.editorCreate();//执行初始化文本编辑器

        if (this.$route.path.endsWith("update")){
          console.log("update 结尾，是修改文章的请求");
          this.type = 'update'
        }

      },
    }
</script>

<style scoped>

  a{
    color: black;
    text-decoration: none;
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
    height: 78vh;
  }


</style>
