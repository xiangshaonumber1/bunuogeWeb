<template>
    <div id="write_email" class="write_email">

      <Layout>

        <!--头部公共部分-->
        <Header style="background-color: white">
          <label style="font-size: 16px">发送类型：&emsp;</label>
          <RadioGroup v-model="messageInfo.sendType" size="large" @on-change="changeAcceptor">
            <Radio label="custom"><span>指定用户</span></Radio>
            <Radio label="all"><span>全体用户</span></Radio>
          </RadioGroup>

          <div style="float: right">
            <Button type="warning"  style="margin: 0 5px 0 10px">存 草 稿</Button>
            <Button type="success" style="margin: 0 10px 0 5px" @click="sendMessage">发 送</Button>
          </div>
        </Header>

        <Layout>

          <!--中间编辑部分-->
          <Content style="background-color: white;border: 1px solid black" class="messageContent">

            <i-form :modal="messageInfo" label-position="left" :label-width="150" class="m-auto" style="width: 90%;">
              <form-item>
                <span slot="label">指定收件人：</span>
                <i-input type="textarea" rows="1" :autosize="{minRows:1,maxRows:4}" v-model="messageInfo.acceptor" :disabled="allAcceptor"></i-input>
              </form-item>
              <form-item>
                <span slot="label">消息主题：</span>
                <i-input type="textarea" rows="1" :autosize="{minRows:1,maxRows:4}" v-model="messageInfo.title"></i-input>
              </form-item>
              <form-item>
                <span slot="label">消息详情：</span>
                <div ref="toolMenu" class="toolMenu" style="margin: 0"></div>
                <div ref="emailText" class="emailText" style="margin: 0"></div>
              </form-item>
            </i-form>

          </Content>

          <Sider style="border: 1px solid red;color: red">
            slider
          </Sider>

        </Layout>
      </Layout>

    </div>
</template>

<script>

  import E from 'wangeditor'

    export default {
        name: "write_email",
      data() {
        return {
          allAcceptor: true,
          messageInfo:{
            acceptor:'',
            title:'',
            content:'',
            sendType:'all', //默认为all,即全体发送
          }
        };
      },
      methods:{
        async sendMessage() {
          if (this.allAcceptor) {
            //如果是发送全体
            const result = await this.$apis.AdminApi.sendSystemMessage(this.messageInfo);
            if (result){
              return this.$Message.success({
                content:"系统消息已发送成功！",
                duration:5,
              })
            }
          } else {
            //如果是指定用户发送
            return this.$Notice.error({
              title: '开发中，敬请期待！',
              desc: '指定用户发送功能，尚在开发中',
              duration: 5
            })
          }
        },

        changeAcceptor(value) {
          this.messageInfo.sendType = value;
          this.allAcceptor = (value === 'all');
        }
      },
      mounted(){
        var editor = new E(this.$refs.toolMenu,this.$refs.emailText);
        //加上这个句，才能在编辑器中粘贴图片
        editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.uploadImgMaxSize = 3 * 1024 *1024;
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.onchange = (html) => {
          this.messageInfo.content = html;
        };
        editor.create();
      }
    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

    .tip{
    float: right;
    margin-right: 30%;
    font-size: 16px;
    font-weight: bold;
  }

  .write_email{
    border: 1px solid red;
  }

  .messageContent {

  }

  .messageContent div{
    margin: 5px 0;
  }

  .toolMenu {
    border: 1px solid #ccc;
    border-radius: 5px 5px 0 0;
    width: 100%;
  }

  .emailText {
    border: 1px solid #ccc;
    width: 100%;
    height: 500px;
  }

</style>
