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
      if (res.data.code === "402") {
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
        return res.data.data;
      }
    })
  },


  /**
   * 通过管理员身份，查看并修改权限
   */
  getUserRoleAndPermissionList(page,key_word){
    return request({
      url:'/admin/getUserRoleAndPermissionList',
      method:'get',
      params: {
        page:page,
        key_word:key_word
      }
    }).then( async res => {
      console.log("返回的是啥？",res.data);
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result) {
          return this.getUserRoleAndPermissionList(page,key_word)
        } else {
          return null;
        }
      } else {
        return res.data.data;
      }
    })
  },

  /**
   * 修改指定用户的权限或角色
   */
  updateRoleOrPermission(aim_openID,new_value,type){
    return request({
      url:'/admin/update_role_or_permission',
      method:'post',
      data: qs.stringify({
        aim_openID:aim_openID,
        new_value:new_value,
        type:type,
      })
    }).then( async res => {
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result) {
          return this.updateRoleOrPermission(aim_openID,new_value,type)
        } else {
          return null;
        }
      } else {
        return res.data.data;
      }
    })
  },




};

export default admin
