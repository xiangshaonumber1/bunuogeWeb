const getters =  {  //实时监听state值的变化(最新状态)

  //获取用户openID
  openID(context){
    return context.openID;
  },

  //判断用户是否登录
  isLogin(context){
    return context.isLogin;
  },

  //获取完整用户基本信息(无隐私信息)
  userInfo(context){
    return context;
  },

  //获取用户头像
  avatar(context){
    return context.avatar;
  },

  //获取服务ip地址
  serverPath(context){
    return context.serverPath;
  },

  //获取token刷新状态
  tokenRefreshStatus(context){
    return context.tokenRefreshStatus;
  }


};
export default getters
