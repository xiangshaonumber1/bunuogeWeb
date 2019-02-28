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
      url: '/user/getMyUserInfo',
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
  },

  /**
   * 保存修改后的我的个人信息
   */
  updateMyUserInfo(userInfo) {
    return request({
      url:'/user/updateMyUserInfo',
      method:'post',
      data:{
        nickname:userInfo.nickname,
        wishCard:userInfo.wishCard,
        gender:userInfo.gender,
        myDescribe:userInfo.myDescribe
      }
    }).then( async res => {
      if (res.data.code === '200') {
        return true;
      } else if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result)
          return this.updateMyUserInfo(userInfo);
        else
          return null;
      } else {
        return res.data.data;
      }
    })
  },

  /**
   * 用户更换头像
   */
  updateUserIcon(formData){
    return request({
      url:'user/updateUserIcon',
      method:'post',
      data:formData,
    }).then( res =>{
      console.log("updateUserIcon 输出：",res);
      return res;
    }).catch( err =>{
      console.log("updateUserInfo 输出：",err);
      return err;
    })
  }

};

export default user
