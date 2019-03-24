<template>
    <div ref="update_pw" style="border: 1px solid red">

      <!--验证旧密码实现修改密码-->
      <Row v-if="update_way === 'password'" type="flex" class="code-row-bg" justify="center">
        <i-col span="24">
          <i-form ref="password" :model="updateInfo" label-position="left" :label-width="150" :rules="update_pw_rules">
            <form-item label="旧密码：" prop="password_old_pw">
              <Input type="password" v-model="updateInfo.password_old_pw" placeholder="请输入您现在的密码" size="large" />
            </form-item>
            <form-item label="新密码：" prop="password_new_pw">
              <Input type="password" v-model="updateInfo.password_new_pw" placeholder="请输入您的新密码" size="large"/>
            </form-item>
            <form-item label="确认密码：" prop="password_confirm_pw">
              <Input type="password" v-model="updateInfo.password_confirm_pw" placeholder="请输入再次输入您的新密码" size="large"/>
            </form-item>
            <form-item>
              <Button type="info" @click="update_pw('password')"><span style="font-size: 16px">&emsp;确&nbsp;认&nbsp;修&nbsp;改&emsp;</span></Button>&emsp;
              <a style="font-size: 16px" @click="change_update_way('password')">忘记密码？邮箱修改密码 >></a>
            </form-item>
          </i-form>
        </i-col>
      </Row>

      <!--通过邮箱验证码来实现修改密码-->
      <Row v-if="update_way === 'email'" type="flex" class="code-row-bg" justify="center">
        <i-col span="24">
          <i-form ref="email" :model="updateInfo" label-position="left" :label-width="150" :rules="update_pw_rules">
            <form-item label="新密码：" prop="email_new_pw">
              <Input type="password" v-model="updateInfo.email_new_pw" placeholder="请输入您的新密码" size="large"/>
            </form-item>
            <form-item label="确认密码：" prop="email_confirm_pw">
              <Input type="password" v-model="updateInfo.email_confirm_pw" placeholder="请输入再次输入您的新密码" size="large"/>
            </form-item>
            <!--iview 的方法有问题，同样的代码，第一个 append 不能加上去，第二个append 能加上去, what the fuck -->
            <form-item label="邮箱验证码" prop="email_code">
              <div class="input-group">
                <input type="text" v-model="updateInfo.email_code" class="form-control" placeholder="请输入我们发送到您邮箱的验证码"/>
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button" @click="request_mailCode" >发送验证码</button></span>
              </div>
            </form-item>
            <form-item>
              <Button type="info" @click="update_pw('email')"><span style="font-size: 16px">&emsp;确&nbsp;认&nbsp;修&nbsp;改&emsp;</span></Button>&emsp;
              <a style="font-size: 16px" @click="change_update_way('email')">记得密码，通过旧密码修改 >></a>
            </form-item>
          </i-form>
        </i-col>
      </Row>



    </div>
</template>

<script>
    export default {
        name: "personal_update_pw",
      data(){

        //不为空检验
        const notNull = (rule,value,callback)=>{
          console.log(" notNull 输出 value：",value);
          if (!value){
            return callback(new Error('不能为空'));
          }
          return callback();
        };

        //新密码检验
        const new_pw = (rule,value,callback)=>{
          if (value.length<6 || value.length>18){
            return callback(new Error("密码的有效长度应不低于6位，且不大于18位"))
          }
          return callback();
        };

        //确认密码检验
        const confirm_pw = (rule,value,callback)=>{
          if (this.update_way === 'password' && this.updateInfo.password_new_pw ===  value && value.length>0){
            return callback();
          } else if (this.update_way === 'email' && this.updateInfo.email_new_pw === value && value.length>0) {
            return callback();
          }else if (value.length === 0) {
            return callback(new Error("确认密码不能为空！"));
          }else {
            return callback(new Error("两次输入的密码不一致，请检查后继续"));
          }
        };


        return{
            update_way:'password',  //密码的修改方式
            updateInfo:{  //所有修改信息
              password_old_pw:'',
              password_new_pw:'',
              password_confirm_pw:'',
              email_new_pw:'',
              email_confirm_pw:'',
              email_code:'',
            },

          update_pw_rules:{  //密码验证规则
            password_old_pw:[{validator:notNull,trigger:'blur'}],
            password_new_pw:[{validator:new_pw,trigger:'blur'}],
            password_confirm_pw:[{validator:confirm_pw,trigger:'blur'}],

            email_code:[{validator:notNull,trigger:'blur'}],
            email_new_pw:[{validator:new_pw,trigger:'blur'}],
            email_confirm_pw:[{validator:confirm_pw,trigger:'blur'}],
            },

          }
      },

      methods:{
        //切换修改密码的方式
        change_update_way(name){
          this.$refs[name].resetFields();
          if (this.update_way === 'password'){
            this.update_way = 'email';
          }else {
            this.update_way = 'password';
          }
        },

        //获取邮箱验证码请求
        request_mailCode(){
          //请求发送验证码
          this.$apis.UserApi.mailCode(this.$store.getters.openID,"update_encrypt");
        },

        //修改密码的请求
        update_pw(name) {
         return this.$refs[name].validate(async (valid) => { //判断所有的验证是否通过
           if (valid) {
             //如果通过，则继续执行
             let new_pw = null;
             let old_pw = null;
             if (this.update_way === 'password') {
               new_pw = this.updateInfo.password_new_pw;
               old_pw = this.updateInfo.password_old_pw;
             } else if (this.update_way === 'email') {
               new_pw = this.updateInfo.email_new_pw;
             }
             return await this.$apis.UserApi.update_pw(new_pw, old_pw, this.updateInfo.email_code, this.update_way);
           }
           //如果没有通过，则什么也不做
         });
        },

      }
    }
</script>

<style scoped>

</style>
