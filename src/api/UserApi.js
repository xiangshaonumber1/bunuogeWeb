/**
 * 认证用户相关操作统一管理
 */
import request from '../common/request'

const user = {
  //请求邮箱验证码
  mailCode(type){
    return request({
      url:'/user/request_mail',
      method:'get',
      params:{
        userMail:this.registerInfo.email,
        type:type
      }
    }).then(res=>{
      if (res.status === 200){
        this.$Notice.success({
          title:'邮件发送成功',
          desc:'邮件已成功发送，请注意查收'
        })
      }else {
        this.$Notice.error({
          title:'邮箱验证码发送失败',
          desc:'网络连接异常，请检查后再继续',
        })
      }
    })
  },


};

export default user
