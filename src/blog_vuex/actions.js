const actions = {

  /**
   * 保存用户登录信息
   */
  saveLoginInfo(context,userData){  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    console.log("正在执行 存储用户登录信息");
    context.commit("saveLoginInfo",userData);
  },

  /**
   * 登录注销，清除信息
   */
  clearLoginInfo(context){
    console.log("正在执行 清理用户信息");
    context.commit("clearLoginInfo")
  },

  /**
   * 用户上传新头像后同步到用户信息
   */
  saveAvatar(context,newAvatar){
    context.commit("saveAvatar",newAvatar);
  },

  // 保存未读消息数量
  SaveUnreadMessageCount(context,unreadMessageCount){
    context.commit("SaveUnreadMessageCount",unreadMessageCount);
  },

  //增加未读消息数量
  addUnreadMessageCount(context,type){
    context.commit("addUnreadMessageCount",type)
  },

  //读取未读消息(清除指定类型的未读消息统计)
  readUnreadMessageCount(context,type){
    context.commit("readUnreadMessageCount",type)
  },

  //改变token刷新状态
  tokenRefreshStatus(context,status){
    console.log("每次请求前初始化token刷新状态");
    context.commit("tokenRefreshStatus",status);
  }

};

export default actions;
