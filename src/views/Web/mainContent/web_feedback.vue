<!--反馈信息-->

<template>
    <div id="feedback">

      <!--logo-->
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="12" class="text-center">
          <img src="/static/picture/getok.jpg" style="height: 80px;" alt="img_none">
        </i-col>
      </Row>

      <!--提示文字-->
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="12">
          <Divider orientation="left"><span style="font-weight: bold;font-size: 22px">意见反馈</span></Divider>
          <div class="word-tip">
            <p v-if="$store.getters.openID !== null">亲爱的用户：<span v-html="this.$store.getters.userInfo.nickname"></span></p>
            <p v-else>尊敬的<span style="color: red">游客</span>，您好</p>
            如果您有任何关于本站的意见、疑惑等，均可在此处写下您的宝贵意见。<br>
            为了方便站主联系您，请<span style="color: red">游客务必</span>留下您的联系方式之一（推荐邮箱）<br>
            本站由站主一人完成并主持维护，如果长时间没回复，可能是太忙了，望谅解。
          </div>
        </i-col>
      </Row>

      <!--主要内容-->
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="12">

          <!--表单-->
          <i-form :model="form_input" label-position="left" :label-width="120">
            <FormItem label="建议内容：">
              <Input v-model="form_input.content" size="large" type="textarea" :autosize="{minRows:12,maxRows:12}"></Input>
            </FormItem>
            <FormItem v-if="$store.getters.openID === null" label="联系方式：">
              <Input v-model="form_input.contactInfo" type="text" size="large" placeholder="邮箱（推荐） / QQ / 微信 / 手机号 均可 / 其他请说明">
                <i-select v-model="form_input.contactType" slot="prepend" style="width: 80px">
                  <Option value="邮箱">邮箱</Option>
                  <Option value="QQ">QQ</Option>
                  <Option value="微信">微信</Option>
                  <Option value="手机号">手机号</Option>
                  <Option value="其他">其他</Option>
                </i-select>
              </Input>
            </FormItem>
          </i-form>

          <!--确认按钮-->
          <Button class="center-block" type="success" size="large" @click="writeFeedBackMessage">&emsp;确 认 发 送&emsp;</Button>

        </i-col>
      </Row>

      <quick-router></quick-router>

    </div>
</template>

<script>
    import QuickRouter from "../../Common/quickRouter";
    export default {
        name: "feedback",
      components: {QuickRouter},
      data(){
          return {
            form_input:{
              openID:null,
              content:null,
              contactType:null,
              contactInfo:null,
            }
          }
      },

      methods:{

        //提交一条意见反馈
        async writeFeedBackMessage() {
          if (this.$store.getters.openID === null) {
            //是游客反馈
            this.form_input.openID = new Date().getTime();
          } else {
            //是用户反馈
            this.form_input.openID = this.$store.getters.openID;
          }
          const result = await this.$apis.CommonApi.writeFeedBackMessage(this.form_input);
          if (result){
            this.$Notice({
              title:'提交成功',
              desc:'非常感谢您提供的宝贵意见，本站能越来越好，离不开你的一份帮助！'
            })
          }
        }
      }
    }
</script>

<style scoped>

  #feedback{
    padding: 0;
    margin-top: 50px
  }


  .word-tip{
    padding-bottom: 15px;
  }

</style>
