
const mutations = {

  /**
   * 保存用户登陆信息
   */
  saveLoginInfo(state,userData){
    if (state){
      console.log("mutations: user 有值，执行保存用户登录信息");
      state.openID = userData.openID;
      state.nickname = userData.nickname;
      state.avatar = userData.avatar;
      state.isLogin = true;
      localStorage.setItem("token",userData.token)
    }
  },

  /**
   * 清除用户登录信息
   */
  clearLoginInfo(state){
    console.log("mutations: 用户退出登录，执行清除用户登录信息");
    localStorage.clear();
    sessionStorage.clear();
    state.openID = null;//用户ID
    state.nickname = null;//用户昵称
    state.avatar = null;//用户头像地址
    state.isLogin = false;//判断当前用户是否已经登录
  },

  /**
   * 保存用户新修改的头像
   */
  saveAvatar(state,newAvatar){
    state.avatar = newAvatar;
  },

  /**
   * 保存未读消息数量
   * @constructor
   */
  SaveUnreadMessageCount(state,unreadMessageCount){
    state.systemMessageCount = unreadMessageCount.system;
    state.replyMessageCount = unreadMessageCount.reply;
    state.personalMessageCount = unreadMessageCount.personal;
    state.markedActivityCount = unreadMessageCount.marked;
  },

  /**
   * 读取未读消息(清除指定类型的未读消息统计)
   * @param state 源数据
   * @param type 消息类型（system/reply/personal/markedActivity）
   */
  readUnreadMessageCount(state,type){
    switch (type) {
      case 'system':
        state.systemMessageCount = 0;
        break;
      case 'reply':
        state.replyMessageCount = 0;
        break;
      case 'personal':
        state.personalMessageCount = 0;
        break;
      case 'markedActivity':
        state.markedActivityCount = 0;
        break;
      default:
        console.log("修改未读消息错误");
        break;
    }
  },

  /**
   * 未读消息数量增加
   * @param state 源数据
   * @param type 消息类型（system/reply/personal/markedActivity）
   */
  addUnreadMessageCount(state,type){
    switch (type) {
      case 'system':
        state.systemMessageCount++;
        break;
      case 'reply':
        state.replyMessageCount++;
        break;
      case 'personal':
        state.personalMessageCount++;
        break;
      case 'markedActivity':
        state.markedActivityCount++;
        break;
      default:
        console.log("修改未读消息错误");
        break;
    }
  },

  /**
   * token 刷新
   */
  tokenRefreshStatus(state,status){
    state.tokenRefreshStatus = status;
    console.log("tokenRefreshStatus 已改变：",state.tokenRefreshStatus);
  }

};
export default mutations

