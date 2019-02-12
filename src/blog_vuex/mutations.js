//保存用户登陆信息
export const saveLoginInfo = (state,user) =>{
  if (user){
    console.log("mutations: user 有值，执行保存用户登录信息");
    state.openID = user.openID;
    state.nickname = user.nickname;
    state.avatar = user.avatar;
    state.token = user.token;
    state.isLogin = 'true';
  }
};

//清除用户登录信息
export const clearLoginInfo = (state)=>{
    console.log("mutations: 用户退出登录，执行清除用户登录信息");
    localStorage.clear();
    sessionStorage.clear();
    state.openID = null;
    state.nickname = null;
    state.avatar = null;
    state.token = null;
    state.isLogin = 'false';
};
