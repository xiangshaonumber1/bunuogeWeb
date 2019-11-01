/**
 * 管理员操作请求统一管理
 */
import request from '../request'
import qs from 'qs'
import store from '../vuex/store'

const admin = {

  /**
   * 管理端登录验证
   */
  service_login() {
    return request({
      url:'/admin/service_login',
      method:'post'
    }).then( async res => {
      console.log("service_login 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.service_login();
      }
      //正常情况下直接返回响应数据
      return res.data;
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
      console.log("getFeedBackInfo 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.getFeedBackInfo(page)
      }
      return res.data;
    })
  },

  /**
   * 修改反馈信息状态
   */
  updateFeedBackStatus(feedID,status){
    return request({
      url:'/admin/updateFeedBackStatus',
      method:'post',
      data:qs.stringify({
        feedID:feedID,
        status:status,
      })
    }).then( async res => {
      console.log("updateFeedBackStatus 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.updateStatus(feedID,status)
      }
      return res.data;
    })
  },


  /**
   * 通过管理员身份，查看并修改权限
   */
  getUserRoleAndPermissionList(page,key_word,pageCount){
    return request({
      url:'/admin/getUserRoleAndPermissionList',
      method:'get',
      params: {
        page:page,
        key_word:key_word,
        pageCount:pageCount
      }
    }).then( async res => {
      console.log("getUserRoleAndPermissionList 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.getUserRoleAndPermissionList(page,key_word)
      }
      return res.data;
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
      console.log("updateRoleOrPermission 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.updateRoleOrPermission(aim_openID,new_value,type)
      }
      return res.data;
    })
  },


  /**
   * 修改文章审核状态
   */
  updateArticleStatus(aim_articleID,new_status){
    return request({
      url:"/admin/updateArticleStatus",
      method:"post",
      data:qs.stringify({
        articleID:aim_articleID,
        new_status:new_status
      })
    }).then( async res => {
      console.log("updateArticleStatus 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.updateArticleStatus(aim_articleID, new_status);
      }
      return res.data;
    })
  },

  /**
   * 管理员后台获取审核文章信息
   */
  getAdminArticleInfo(page, key_word, pageCount){
    return request({
      url:"/admin/getAdminArticleInfo",
      method:"get",
      params:{
        page:page,
        key_word:key_word,
        pageCount:pageCount
      }
    }).then( async res => {
      console.log("getAdminArticleInfo 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.getAdminArticleInfo(page, key_word, pageCount);
      }
      return res.data;
    })
  },

  /**
   * 管理员重置指定用户密码
   */
  adminResetPassword(aim_openID,email){
    return request({
      url:'/admin/adminResetPassword',
      method:'post',
      data:qs.stringify({
        aim_openID:aim_openID,
        email:email,
      })
    }).then( async res => {
      console.log("adminResetPassword 输出返回信息：", res.data);
      if (store.getters.tokenRefreshStatus) {
        return this.adminResetPassword(aim_openID,email);
      }
      return res.data;
    })
  },

  //编辑底部链接信息
  edit_link(link_info){
    return request({
      url:'/admin/edit_link',
      method:'post',
      data:qs.stringify({
        linkID:link_info.linkID,
        type:link_info.type,
        label:link_info.label,
        website:link_info.website,
        operation:link_info.operation
      })
    }).then( res=>{
      return res.data;
    })
  },

  //发送全体系统消息
  sendSystemMessage(message_info){
    return request({
      url:'/admin/sendSystemMessage',
      method:'post',
      data:qs.stringify({
        sendType:message_info.sendType,
        acceptor:message_info.acceptor,
        title:message_info.title,
        content:message_info.content,
      })
    }).then( res =>{
      return res.data;
    })
  },


};

export default admin
