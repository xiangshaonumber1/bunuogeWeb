/**
 * 认证用户相关操作统一管理
 */
import request from '../common/request'
import {Notice} from  'iview'
import AuthenticationApi from './AuthenticationApi'


const user = {

  //请求邮箱验证码
  mailCode(email,type){
    return request({
      url:'/user/request_mail',
      method:'get',
      params:{
        userMail:email,
        type:type
      }
    }).then(res=>{
      if (res.status === 200){
        Notice.success({
          title:'邮件发送成功',
          desc:'邮件已成功发送，请注意查收'
        })
      }else {
        Notice.error({
          title:'邮箱验证码发送失败',
          desc:'网络连接异常，请检查后再继续',
        })
      }
    })
  },


  //获取用户信息（不包括密码等重要隐私信息）
  getMyUserInfo(openID){
    return request({
      url: '/user/getUserInfo',
      method: 'get',
      params: {
        openID:openID,
      }
    }).then( async res => {
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.getMyUserInfo(openID)
        }else {
          return null;
        }
      }else if (res.data.code === '404') {
        return null;
      }else{
        return res.data.data;
      }
    })
  }

};

export default user
