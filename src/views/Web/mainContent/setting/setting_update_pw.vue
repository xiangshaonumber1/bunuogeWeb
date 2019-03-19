<template>
    <div ref="update_pw" style="border: 1px solid red">

      <!--验证旧密码实现修改密码-->
      <Row v-if="update_way === 'password'" type="flex" class="code-row-bg" justify="center">
        <i-col span="24">
          <i-form ref="password" :model="passwordWay" label-position="left" :label-width="150" :rules="password_rules">
            <form-item label="旧密码：" prop="pw_old_pw">
              <Input type="password" v-model="passwordWay.old_pw" placeholder="请输入您现在的密码" size="large" />
            </form-item>
            <form-item label="新密码：" prop="pw_new_pw">
              <Input type="password" v-model="passwordWay.new_pw" placeholder="请输入您的新密码" size="large"/>
            </form-item>
            <form-item label="确认密码：" prop="pw_confirm_pw">
              <Input type="password" v-model="passwordWay.confirm_pw" placeholder="请输入再次输入您的新密码" size="large"/>
            </form-item>
            <form-item>
              <Button type="info"><span style="font-size: 16px">&emsp;确&nbsp;认&nbsp;修&nbsp;改&emsp;</span></Button>&emsp;
              <a style="font-size: 16px" @click="change_update_way('password')">忘记密码？邮箱修改密码 >></a>
            </form-item>
          </i-form>
        </i-col>
      </Row>

      <!--通过邮箱验证码来实现修改密码-->
      <Row v-if="update_way === 'email'" type="flex" class="code-row-bg" justify="center">
        <i-col span="24">
          <i-form ref="email" :model="emailWay" label-position="left" :label-width="150" :rules="email_rules">
            <form-item label="新密码：" prop="email_new_pw">
              <Input type="password" v-model="emailWay.new_pw" placeholder="请输入您的新密码" size="large"/>
            </form-item>
            <form-item label="确认密码：" prop="email_confirm_pw">
              <Input type="password" v-model="emailWay.confirm_pw" placeholder="请输入再次输入您的新密码" size="large"/>
            </form-item>
            <!--iview 的方法有问题，同样的代码，第一个 append 不能加上去，第二个append 能加上去, what the fuck -->

            <form-item label="邮箱验证码" prop="email_code">
              <div class="input-group">
                <input type="text" v-model="emailWay.email_code" class="form-control" placeholder="请输入我们发送到您邮箱的验证码"></input>
                <span class="input-group-btn"><button class="btn btn-default" type="button">发送验证码</button></span>
              </div>
            </form-item>

            <form-item>
              <Button type="info"><span style="font-size: 16px">&emsp;确&nbsp;认&nbsp;修&nbsp;改&emsp;</span></Button>&emsp;
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
          return{
            update_way:'password',  //密码的修改方式
            passwordWay:{},  //密码信息
            emailWay:{},
            password_rules:{  //密码验证规则
              pw_old_pw:[{required:true,message:'旧密码不能为空',trigger:'blur'}],
              pw_new_pw:[{required:true,message:'新密码不能为空',trigger:'blur'}],
              // pw_confirm_pw:[{required:true,message:'确认密码不能为空',trigger:'blur'}],
            },

            email_rules:{
              email_new_pw:[{required:true,message:'新密码不能为空',trigger:'blur'}],
              email_confirm_pw:[{required:true,message:'确认密码不能为空',trigger:'blur'}],
              email_code:[{required:true,message:'邮箱验证码不能为空',trigger:'blur'}],
            }
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
          }
      }
    }
</script>

<style scoped>

</style>
