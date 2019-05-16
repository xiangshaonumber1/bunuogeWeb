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

};

export default actions;
