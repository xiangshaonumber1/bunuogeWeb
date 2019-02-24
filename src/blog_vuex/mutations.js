//保存用户登陆信息
export const saveLoginInfo = (state,user) =>{
  if (user){
    console.log("mutations: user 有值，执行保存用户登录信息");
    state.openID = user.openID;
    state.nickname = user.nickname;
    state.avatar = user.avatar;
    state.isLogin = 'true';
    localStorage.setItem("token",user.token)
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
    state.isLogin = 'false';
    state.searchKey = null;
};

//保存用户搜索信息
export const saveSearchKey = (state,searchKey) =>{
  state.searchKey = searchKey;
};
