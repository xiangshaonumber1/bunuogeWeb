
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
  }

};
export default mutations

