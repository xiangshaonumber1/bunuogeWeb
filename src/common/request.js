/**
 * 对axios 做一个统一的处理
 */

import axios from 'axios';
import {Notice} from 'iview'
import router from '../router/router'
import store from '../blog_vuex/store'
import AuthenticationApi from '../api/AuthenticationApi'

//axios默认设置
const request = axios.create({
  baseURL: store.getters.serverPath,
  timeout: 10000,
  // retry:4, //请求次数
  // retryDelay:1000,  //请求的间隙
});

// request 请求拦截器
request.interceptors.request.use(config=>{
  //在请求发送前做某些事情

  //请求之前初始化token刷新状态，避免冲突
  store.dispatch("tokenRefreshStatus",false);

  //设置token
  config.headers["X-Auth-Token"] = localStorage.getItem("token");
  return config;
},error => {
  var config = error.config;
  //如果config不存在或者未设置重试选项，请拒绝
  if (!config || !config.retry){
    return Promise.reject(error);
  }
  //设置变量跟踪重试次数
  config.__retryCount = config.__retryCount || 0;
  //检查是否已达到最大重试次数
  if (config.__retryCount >= config.retry){
    //抛出错误信息
    Notice.error({
      title:'服务器连接异常提醒：',
      desc:'当前服务器连接异常，请稍后再试',
      duration:8
    });
    return Promise.reject(error);
  }
  //增加请求次数
  config.__retryCount += 1;
  //创建新的异步请求
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    },config.retryDelay || 1)
  });
  // 返回axios信息，重新请求
  return backoff.then(function () {
    return axios(config);
  });
});

//response 响应拦截器
request.interceptors.response.use(async response => {
  /*
  * 不拦截的有
  * 10200 变成正常，不用拦截，
  * 401(只有带需要token的请求才判断) 因为涉及到重新发送请求，不方便在拦截器里设置
  * */
  switch (response.data.code) {
    case 10201:
      Notice.error({title: '系统提示：', desc: '当前服务器繁忙，请稍后再试！\n∑(っ°Д°;)っ卧槽，忙死了，忙死了，忙死了'});
      break;
    case 10300:
      Notice.error({title: '系统提示：', desc: '认证信息异常，如有疑问，请联系网站管理员（联系网站首页下方）\no(´^｀)o'});
      break;
    case 10301:
      Notice.error({title: '登录提醒：', desc: '请登录后再继续该操作\n(✪ω✪) '});
      break;
    case 10302:
      Notice.error({title: '系统提示：', desc: '当前权限不足，如需更高权限，请联系管理员(联系方式网站首页下方)\n(σﾟ∀ﾟ)σ..:*☆欢迎哦'});
      break;
    case 10401:
      //token 过期 ，在拦截器中统一刷新token，并在各自的请求中，判断10401并重新请求
      let result= await AuthenticationApi.refreshToken();
      if (result.status){
        //刷新成功后......
        store.dispatch("tokenRefreshStatus",result.status); //改变token刷新状态
        localStorage.setItem("token",result.data); //保存刷新后的token到本地
      }
      break;
    case 10400: //非法token状态码
    case 10402: //token刷新异常状态码
      Notice.error({title: '系统提示：', desc: '当前信息已过期，即将为你跳转到登录页，请登录后再继续'});
      console.log("需要执行清除缓存用户信息");
      //注销存储在本地的用户信息
      store.dispatch("clearLoginInfo");
      return router.push({name: 'login'});
    case 10001:
      Notice.error({title: '邮件发送异常：', desc: '邮件发送失败，请稍后再试，或联系管理员解决'});
      break;
  }
  //不论最终是否需要跳转，都将返回response信息，然后再判断之前没判断的code
  return response;
},error => {
  console.log("error信息 :",error);
  return Notice.warning({title : '网络链接阻塞', desc : '服务器被外星人拐跑了 \n @oo(▼皿▼メ;)o'});
  //返回链接错误时的信息，模拟后台返回给前端的格式
  // return {
  //   code: 500,
  //   msg: '网络链接阻塞',
  //   data: false
  // }; // 返回接口返回的错误信息
});

//导出模块
export default request
