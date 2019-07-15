/**
 * Web无权限相关操作
 */

import request from '../common/request'
import qs from 'qs'

const common = {

  //获取首页海报图片
  getPostList(){
    return request({
      url:'/common/getPosterList',
      method:'get',
    }).then( res =>{
      // console.log("getPosterList 返回的信息:",res);
      return res.data;
    })
  },

  //提交反馈意见
  writeFeedBackMessage(feedBackInfo) {
    return request({
      url:'/common/writeFeedBackMessage',
      method: 'post',
      data:qs.stringify({
        openID:feedBackInfo.openID,
        content:feedBackInfo.content,
        contactType:feedBackInfo.contactType,
        contactInfo:feedBackInfo.contactInfo,
        feedbackType:feedBackInfo.feedbackType
      })
    }).then( res =>{
      return res.data;
    })
  },

  /**
   * 重置密码
   */
  resetPassword(username,email,emailCode){
    return request({
      url:'/common/resetPassword',
      method:'post',
      data:qs.stringify({
        username:username,
        email:email,
        emailCode:emailCode,
      })
    }).then( res =>{
      console.log("重置密码返回结果：",res);
      return res.data;
    })
  },

  /**
   * 获取底部导航栏信息
   */
  getBottomNavBar(){
    return request({
      url:'/common/getBottomNavBar',
      method:'get',
    }).then( res => {
      console.log("输出底部链接信息：",res.data);
      return res.data;
    })
  }
};

export default  common
