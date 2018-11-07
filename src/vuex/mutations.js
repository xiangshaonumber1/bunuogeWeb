//保存用户登陆信息
export const saveLoginInfo = (state,user) =>{
  if (user){
    console.log("user 不为空，执行保存用户登录信息")
    state.id = user.id
    state.nickname = user.nickname
    state.usericon = user.usericon
    state.token = user.token
    state.isLogin = true
    localStorage.setItem("id",user.id)
    localStorage.setItem("nickname",user.nickname)
    localStorage.setItem("usericon",user.usericon)
    localStorage.setItem("token",user.token)
    localStorage.setItem("isLogin",true)
  }
  // else if (user == null){
  //   //登出的时候，清空sessionStorage里的东西
  //   sessionStorage.setItem("userName",null);
  //   sessionStorage.setItem("userToken","");
  //   state.currentUser = null;
  //   state.isLogin = false;
  //   state.token = "";
  // }
}

//清除用户登录信息
export const clearLoinInfo = (state)=>{
    console.log("用户退出登录，执行清除用户登录信息")
    //登出的时候，清空sessionStorage里的东西
    localStorage.clear()
    sessionStorage.clear()
    state.id = null
    state.nickname = null
    state.usericon = null
    state.token = null
    state.isLogin = false
}
