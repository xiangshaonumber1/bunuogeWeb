/**
 * Web无权限相关操作
 */

import request from '../common/request'
import router from '../router/router'
import {Notice} from 'iview'
import qs from 'qs'

const common = {

  //获取首页海报图片
  getPostList(){
    return request({
      url:'/common/getPosterList',
      method:'get',
    }).then( res =>{
      // console.log("getPosterList 返回的信息:",res);
      return res.data.data;
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
      return res.data.data === true;
    })
  },

  /**
   * 重置密码
   */
  resetPassword(email,emailCode){
    return request({
      url:'/common/resetPassword',
      method:'post',
      data:qs.stringify({
        email:email,
        emailCode:emailCode,
      })
    }).then( res =>{
      return res.data.data;
    })

  }

};

export default  common
