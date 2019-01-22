<template>
    <div id="write_email" class="write_email">

      <Layout>
        <Header style="background-color: white">
          <label style="font-size: 16px">收件人群体：&emsp;</label>
          <RadioGroup v-model="acceptor" size="large" @on-change="changeAcceptor">
            <Radio label="custom">
              <span>指定用户</span>
            </Radio>
            <Radio label="all">
              <span>全体用户</span>
            </Radio>
          </RadioGroup>

          <div style="float: right">
            <Button type="warning" size="large">
              &emsp;存草稿&emsp;
            </Button>
            <Button type="success" size="large">
              &emsp;发&emsp;送&emsp;
            </Button>
          </div>


        </Header>
        <Layout>
          <Content style="background-color: white;border: 1px solid black" class="emailContent">
            <div>
              <Row class="code-row-bg" type="flex" align="middle" justify="space-around">
                <i-col span="3">
                  <span class="tip">收件人</span>
                </i-col>
                <i-col span="21">
                  <Input type="textarea" :autosize="{ minRows: 1 }" clearable size="large" :disabled="allAcceptor"  />
                </i-col>
              </Row>
            </div>


            <div>
              <Row class="code-row-bg" type="flex" align="middle" justify="space-around">
                <i-col span="3">
                  <span class="tip">主题</span>
                </i-col>
                <i-col span="21">
                  <Input type="text" clearable size="large" />
                </i-col>
              </Row>
            </div>

            <div>
              <Row>
                <i-col span="3">
                  <span class="tip">邮件内容</span>
                </i-col>
                <i-col span="21" offset="3">
                  <div ref="toolMenu" class="toolMenu" style="margin: 0"></div>
                  <div ref="emailText" class="emailText" style="margin: 0"></div>
                </i-col>
              </Row>
            </div>


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
          acceptor:'all',
          allAcceptor: true,
        };
      },
      methods:{
        changeAcceptor:function(value) {
          this.allAcceptor = value !== 'custom';
        }
      },
      mounted(){
        var editor = new E(this.$refs.toolMenu,this.$refs.emailText);
        //加上这个句，才能在编辑器中粘贴图片
        editor.customConfig.uploadImgShowBase64 = true;
        editor.customConfig.uploadImgMaxSize = 3 * 1024 *1024;
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.onchange = (html) => {
          console.log(html)
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
    border: 1px solid gold;
  }

  .emailContent {

  }

  .emailContent div{
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
