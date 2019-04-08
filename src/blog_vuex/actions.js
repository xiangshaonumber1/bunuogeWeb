//应用mutation
//用于登陆，保存信息
export const saveLoginInfo = ({commit},user) => {
  console.log("正在执行 存储用户登录信息");
  commit("saveLoginInfo",user)
};

//用于注销，清除信息
export const clearLoginInfo = ({commit})=>{
  console.log("正在执行 清理用户信息");
  commit("clearLoginInfo")
};

export const saveAvatar = ({commit},newAvatar)=>{
  commit("saveAvatar",newAvatar)
};

