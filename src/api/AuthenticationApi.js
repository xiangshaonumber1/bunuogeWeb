/**
 * 角色权限相关统一管理
 */
import request from '../common/request'
import router from '../router/router'
import store from '../blog_vuex/store'
import qs from 'qs'

const authentication = {
  //用户注册请求
  register(username,password,email,emailCode) {
    return request({
        url: '/Authentication/register',
        method: 'post',
        data:qs.stringify({
          username: username,//用户名
          password: password,//密码
          userMail: email,//绑定邮箱
          MailVerificationCode: emailCode//邮箱验证码
        })
    }).then(res =>{
      console.log("register 输出返回信息：", res.data);
      const userInfo = {
        openID: res.data.data.openID,
        nickname: res.data.data.nickname,
        avatar: store.getters.serverPath + JSON.parse(res.data.data.avatar),
        token: res.data.data.token,
      };
      store.dispatch("saveLoginInfo",userInfo);
      return res.data;
    })
  },

  //登录请求
  login(username,password) {
    return request({
      url: '/Authentication/login',
      method: 'post',
      data:qs.stringify({
        username: username,
        password: password,
      })
    }).then(res => {
      console.log("login 输出返回信息：", res.data);
      const userInfo = {
        openID: res.data.data.openID,
        nickname: res.data.data.nickname,
        avatar: store.getters.serverPath+JSON.parse(res.data.data.avatar)[0],
        token: res.data.data.token,
      };
      store.dispatch("saveLoginInfo", userInfo);
      router.push({name: 'index'});
      return res.data;
    })
  },

  //注销请求，需要带token，但这个token并不用于验证，所以不需要判断10401
  logout(){
   return request({
     url:'/Authentication/logout',
     method:"post",
    }).then(res =>{
      return res.data;
   })
  },


  //token过期，请求重新获取token,header中需要带上token，但同样不用于验证，不用判断10401,失败返回405
  refreshToken(){
    return request({
      url:'/Authentication/refreshToken',
      method:'get',
    }).then(res=>{
      console.log("refreshToken 输出: ",res.data);
      return res.data;
    });
   },

  //判断邮箱是否可用（已注册）
  isExist(email){
    return request({
      url:'/Authentication/isExist',
      method:'get',
      params:{
        username:email,
      }
    }).then( res =>{
      return res.data;
    })
  },

};

export default authentication
