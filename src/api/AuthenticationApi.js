/**
 * 角色权限相关统一管理
 */
import request from '../common/request'
import {Notice} from 'iview'
import router from '../router/router'



const authentication = {

  //用户注册请求
  register() {
    return request({
        url: '/Authentication/register',
        method: 'post',
        data:{
          username: this.registerInfo.email,//用户名
          password: this.registerInfo.password,//密码
          userMail: this.registerInfo.email,//绑定邮箱
          MailVerificationCode: this.registerInfo.emailCode//邮箱验证码
        }
    }).then(res =>{
      if (res.data.code === '200'){
        const userInfo = {
          openID: res.data.data.openID,
          nickname: res.data.data.nickname,
          avatar: res.data.data.avatar,
          token: res.data.data.token,
        };
        this.$store.dispatch("saveLoginInfo",userInfo);
        router.push({name:'index'});
      }else {
        console.log("注册失败，失败信息：",res);
        this.$Notice.error({
          title:"注册失败",
          desc:res.data.msg
        })
      }
    })

  },

  //登录请求
  login() {
    return request({
      url: '/Authentication/login',
      method: 'post',
      data: {
        username: this.loginInfo.username,
        password: this.loginInfo.password,
      }
    }).then(response => {
      if (response.data.code === '200') { //登录成功
        const userInfo = {
          openID: response.data.data.openID,
          nickname: response.data.data.nickname,
          avatar: response.data.data.avatar,
          token: response.data.data.token,
        };
        this.$store.dispatch("saveLoginInfo", userInfo);
        router.push({name: 'index'});
      } else {
        this.$Notice.error({ //登录失败
          title: '登录失败：',
          desc: response.data.msg
        })
      }
    })
  },

  //注销请求
  logout(){
    request({
     url:'/Authentication/logout',
     method:"post",
    }).then(res =>{
      if (res.data.code === '200'){
        return 'success'
      }else if (res.data.code === '402'){
       const result = this.getToken();
       if (result === 'success'){
         this.logout();
       }
      }else {
        return 'fail'
      }
   })
  },


  //token过期，请求重新获取token,失败返回405
  getToken(){
    request({
      url:'/Authentication/getToken',
      method:'get',
    }).then(res=>{//这里不用考虑402
      console.log("getToken 输出：",res);
      if (res.data.code === '200'){
        console.log("刷新Token成功");
        localStorage.setItem("token",res.data.data);
        return 'success'
      }else{
        console.log("其他情况 输出具体信息：",res)
      }
    });
  },




};

export default authentication
