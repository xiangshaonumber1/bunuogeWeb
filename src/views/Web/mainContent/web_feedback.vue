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
            如果您有任何关于本站的意见、疑惑等，均可在此处写下您的宝贵意见。<br>
            联系方式可不填，不填则默认为匿名建议，我们也无法联系您，如果您期待我的回复，不妨留下您的联系方式（推荐邮箱）<br>
            本站由站主一人完成并主持维护，如果长时间没回复，可能是太忙了，望谅解。
          </div>
        </i-col>
      </Row>

      <!--主要内容-->
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="12">

          <i-form :model="form_input" label-position="left" :label-width="150">

            <FormItem label="建议内容">
              <Input v-model="form_input.content" size="large" type="textarea" :autosize="{minRows:12,maxRows:12}"></Input>
            </FormItem>

            <FormItem label="联系方式">
              <Input v-model="form_input.contactInfo" type="text" size="large" placeholder="QQ / 微信 / 邮箱（推荐） / 手机号 均可"></Input>
            </FormItem>

            <FormItem>
              <Button type="success" size="large">确&nbsp;认&nbsp;发&nbsp;送</Button>
            </FormItem>

          </i-form>

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
              content:'',
              contactInfo:'',
            }
          }
      },
    }
</script>

<style scoped>

  #feedback{
    padding: 0;
    margin-top: 50px
  }

  span{
    font-size: 16px;
  }

  .word-tip{
    padding-bottom: 15px;
  }

</style>
