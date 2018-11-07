//应用mutation
//用于登陆，保存信息
export const saveLoginInfo = ({commit},user) => {
  commit("saveLoginInfo",user)
}
//用于注销，清除信息
export const clearLoginInfo = ({commit},user)=>{
  commit("clearLoginInfo",user)
}

