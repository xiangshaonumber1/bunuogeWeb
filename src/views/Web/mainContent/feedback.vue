<!--反馈信息-->

<template>
    <div id="feedback">
      <Row type="flex" justify="center" align="center" class="code-row-bg">
        <i-col span="12" style="border: 1px solid red;" class="text-center">
          <img src="/static/picture/ok_blog_logo.png" style="height: 80px;" alt="img_none">
        </i-col>
      </Row>

      <Row type="flex" justify="center" align="center" class="code-row-bg">
        <i-col span="12" style="border: 1px solid black">
          <Divider orientation="left"><span style="font-weight: bold;font-size: 22px">意见反馈</span></Divider>
        </i-col>
      </Row>

      <Row type="flex" justify="center" align="center" class="code-row-bg">
        <i-col span="12" style="border: 1px solid fuchsia;">

          <i-form :model="form_input" label-position="left" :label-width="150">

            <FormItem label="建议内容">
              <Input v-model="form_input.content" type="textarea" :autosize="{minRows:6,maxRows:6}"></Input>
            </FormItem>

            <FormItem label="联系方式">
              <Input v-model="form_input.contactInfo" type="text" placeholder="QQ / 微信 / 邮箱（推荐） / 手机号 均可"></Input>
            </FormItem>

            <FormItem>
              <Button type="success" size="large">确认反馈</Button>
            </FormItem>

          </i-form>

        </i-col>
      </Row>


    </div>
</template>

<script>
    export default {
        name: "feedback",
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
    margin: 0;
  }

  span{
    font-size: 16px;
  }

</style>
