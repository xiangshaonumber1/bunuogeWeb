/**
 * 保存用户登陆信息
 */
export const saveLoginInfo = (state,user) =>{
  if (user){
    console.log("mutations: user 有值，执行保存用户登录信息");
    state.openID = user.openID;
    state.nickname = user.nickname;
    state.avatar = user.avatar;
    state.isLogin = true;
    localStorage.setItem("token",user.token)
  }
};

/**
 * 清除用户登录信息
 */
export const clearLoginInfo = (state)=>{
    console.log("mutations: 用户退出登录，执行清除用户登录信息");
    localStorage.clear();
    sessionStorage.clear();
    state.openID = null;//用户ID
    state.nickname = null;//用户昵称
    state.avatar = null;//用户头像地址
    state.isLogin = false;//判断当前用户是否已经登录
    state.serverPath = 'http://localhost:8089';
};

/**
 * 保存用户新修改的头像
 */
export const saveAvatar =(state,newAvatar) =>{
  state.avatar = newAvatar;
};
