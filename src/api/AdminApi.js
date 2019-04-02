/**
 * 管理员操作请求统一管理
 */
import request from '../common/request'
import AuthenticationApi from './AuthenticationApi'
import qs from 'qs'

const admin = {

  /**
   * 管理端登录验证
   */
  service_login() {
    return request({
      url:'/admin/service_login',
      method:'post'
    }).then( async res => {
      console.log("service_login 输出返回信息：", res);
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.service_login();
        }else {
          return null;
        }
      }else {
        return res.data.data;
      }
    })
  },

  /**
   * 获取用户提交的反馈信息
   */
  getFeedBackInfo(page) {
    return request({
      url:'/admin/getFeedBackMessage',
      method: 'get',
      params:{
        page:page
      }
    }).then( async res => {
      console.log("AdminApi 输出：", res.data);
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result) {
          return this.getFeedBackInfo(page)
        }else {
          return null;
        }
      }else {
        return res.data.data;
      }
    })
  },

  /**
   * 修改反馈信息状态
   */
  updateStatus(feedID,status){
    return request({
      url:'/admin/updateStatus',
      method:'post',
      data:qs.stringify({
        feedID:feedID,
        status:status,
      })
    }).then( async res => {
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result) {
          return this.updateStatus(feedID,status)
        } else {
          return false;
        }
      } else {
        console.log("执行操作的结果：",res.data.data);
        return res.data.data;
      }
    })
  }




};

export default admin
