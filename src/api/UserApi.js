/**
 * 认证用户相关操作统一管理
 */
import request from '../common/request'
import {Notice} from  'iview'
import AuthenticationApi from './AuthenticationApi'
import qs from  'qs'
import router from '../router/router'
import store from '../blog_vuex/store'

const user = {

  /**
   * 请求邮箱验证码
   */
  mailCode(email,type){
    return request({
      url:'/user/request_mail',
      method:'get',
      params:{
        value:email,
        type:type
      }
    }).then(res=>{
      console.log("发送邮件输出:",res);
      if (res.data.data){
        // Notice.success({
        //   title:'邮件发送成功',
        //   desc:'邮件已成功发送，请注意查收'
        // });
        return res.data;
      }
    })
  },


  /**
   * 获取用户信息（不包括密码等重要隐私信息）
   */
  getUserInfo(openID){
    return request({
      url: '/user/getUserInfo',
      method: 'get',
      params: {
        openID:openID,
      }
    }).then( async res => {
      return res.data;
    })
  },

  /**
   * 保存修改后的我的个人信息
   */
  updateUserInfo(userInfo) {
    return request({
      url:'/user/updateUserInfo',
      method:'post',
      data:qs.stringify({
        nickname:userInfo.nickname,
        wishCard:userInfo.wishCard,
        gender:userInfo.gender,
        myDescribe:userInfo.myDescribe
      })
    }).then( async res => {
      console.log("updateUserInfo 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
          return this.updateUserInfo(userInfo);
      }
      return res.data;
    })
  },

  /**
   * 用户更换头像,需要验证
   */
  updateUserIcon(formData){
    return request({
      url:'user/updateUserIcon',
      method:'post',
      data:formData,  //上传的为文件类型，不需要qs格式化
    }).then( async res => {
      console.log("updateUserIcon 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
          return this.updateUserIcon(formData);
      }
      return res.data;
    })
  },

  /**
   * 用户点击关注按钮，根据按钮点击前的状态，判断是执行新增关注还是取消关注
   */
  clickMark(openID,aim_openID,executeType){
    return request({
      url:'user/clickMark',
      method:"post",
      data:qs.stringify({
        openID:openID,
        aim_openID:aim_openID,
        executeType:executeType
      })
    }).then( res =>{
      return res.data;
    })
  },

  //获取请求用户对该目标用户的关注状态
  getMarkStatus(openID,aim_openID) {
    return request({
      url:'user/getMarkStatus',
      method:"get",
      params:{
        openID:openID,
        aim_openID:aim_openID,
      }
    }).then( res =>{
      return res.data;
    });
  },

  /**
   * @param new_pw 新密码
   * @param old_pw 旧密码
   * @param mail_code 邮箱验证码
   * @param type 修改方式(password,email)
   */
  update_pw(new_pw,old_pw,mail_code,type){
    return request({
      url:'/user/update_pw',
      method:'post',
      data:qs.stringify({
        new_password:new_pw,
        old_password:old_pw,
        mail_code:mail_code,
        type:type
      })
    }).then( async res => {
      console.log("updateUserIcon 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
          return this.update_pw(new_pw,old_pw,mail_code,type);
      }
      return res.data;
    })
  },

  //获取我的未读‘系统通知’类通知
  getUnreadMessageCount(){
    return request({
      url:'/user/getUnreadMessageCount',
      method:'get',
    }).then( res =>{
      console.log("getUnreadMessageCount ：",res);
      return res.data;
    })
  },

  //获取系统信息详情
  getSystemMessageDetails(page){
    return request({
      url:'/user/getSystemMessageDetails',
      method:'get',
      params:{
        page:page,
      }
    }).then( res =>{
      console.log("getSystemMessageDetails: ",res);
      return res.data;
    })
  },

  //获取回复类消息详情
  getReplyMessageDetails(page){
    return request({
      url:'/user/getReplyMessageDetails',
      method:'get',
      params:{
        page:page
      }
    }).then( res =>{
      return res.data;
    })
  }

};

export default user
