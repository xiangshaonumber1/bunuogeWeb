<!--反馈信息-->

<template>
    <div id="feedback">

      <!--logo-->
      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="12" class="text-center">
          <a @click="goIndex"><img src="/static/picture/getok.jpg" style="height: 80px;" alt="img_none"></a>
        </i-col>
      </Row>

      <!--留言书写模块-->
      <div>
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
          <!--留言模块-->
          <i-col  span="12">
            <!--表单-->
            <i-form :model="form_input" label-position="left" :label-width="120" style="font-size: 15px">
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
            <p class="text-center">
              <Button class="center-block" type="success" size="large" @click="writeFeedBackMessage">&emsp;确 认 发 送&emsp;</Button>
            </p>
          </i-col>
        </Row>
      </div>

      <!--留言成功后选择模块-->
      <div>

      </div>


      <!--快速链接-->
      <quick-router style="margin-right: 100px"></quick-router>

    </div>
</template>

<script>
    import QuickRouter from "../../Common/quickRouter";
    export default {
      name: "feedback",
      components: {QuickRouter},
      data(){
          return {
            //意见反馈内容详情
            form_input:{
              openID:'',
              content:'',
              contactType:'',
              contactInfo:'',
              feedbackType:'',
            },
            writing_feedback:true, //是否正在书写眼见
          }
      },

      methods:{

        goIndex(){
          this.$router.push({name:'index'})
        },

        //提交一条意见反馈
        async writeFeedBackMessage() {

          if (this.$store.getters.openID === null) {
            //是游客提交反馈
            this.form_input.openID = new Date().getTime();
            this.form_input.feedbackType = "游客";
          } else {
            //是用户提交反馈
            this.form_input.openID = this.$store.getters.openID;
            this.form_input.contactType = "其他";
            this.form_input.contactInfo = this.$store.getters.openID; //因为本地没有存储邮箱(因为注册用户的账号是邮箱，避免暴露)，所以这里填用户的openID
            this.form_input.feedbackType = "用户"
          }

          let openID = this.form_input.openID.length;
          let content = this.form_input.content.length;
          let contactType = this.form_input.contactType.length;
          let contactInfo = this.form_input.contactInfo.length;
          //如果信息填写不规范
          if (openID <=0 || content<=0 || contactType<=0 || contactInfo<=0){
            return this.$Notice.error({
              title:'有尚未填写的地方：',
              desc:'信息填写不完整，请注意检查，填写完毕后再继续!',
            })
          }

          const result = await this.$apis.CommonApi.writeFeedBackMessage(this.form_input);
          if (result){
            this.$Notice.success({
              title:'提交成功',
              desc:'非常感谢您提供的宝贵意见，本站能越来越好，离不开你的一份帮助! 3秒后即将为你跳转到首页'
            });

            //反馈完毕后
            this.writing_feedback = false;

            //三秒后跳转到首页
            setTimeout(()=>{
              return this.$router.push({name:'index'});
            },3000);
          }
        },

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
