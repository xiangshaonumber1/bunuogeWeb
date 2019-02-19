/**
 * 对axios 做一个统一的处理
 */

import axios from 'axios';
import qs from 'qs'
import {Message,Notice} from 'iview'
import router from '../router/router'


//axios默认设置
const request = axios.create({
  baseURL:'http://localhost:8888',
  timeout:'30000',
});

//http request 拦截器
request.interceptors.request.use(config=>{
  //在请求发送前做某些事情
  if(config.method === "post"){//如果是post请求
    config.data = qs.stringify(config.data)
  }
  //设置token
  config.headers["X-Auth-Token"] = localStorage.getItem("token");
  return config;
},error => {
  Notice.error({
    title:'服务器连接异常：',
    desc:'当前服务器连接异常，请稍后再试',
    duration:5
  });
  return Promise.reject(error); //方法返回一个带有拒绝原因reason参数的Promise对象。
});

//响应拦截器,http请求后，后台返回的一些状态码，包括我们自己的服务器返回的错误码进行一个逻辑处理
request.interceptors.response.use(response=>{
  /*
  * 不拦截的有 200，402
  * 200 变成正常，不用拦截，
  * 402 因为涉及到重新发送请求，不方便在拦截器里设置
  * 404 因为404页面是组件化到其他组件中，所以也不方便统一拦截
  * */
  switch (response.data.code) {

    case '401'://如果返回401，则表示要继续实现该功能则需要进一步的登录，否则无法继续，直接跳转到登录页面，不需要返回response
      Notice.info({
        title: "登录提示：",
        desc: "该功能需要登录后才能操作，请先进行登录后再继续",
      });
      router.push({name:'login'});
      break;

    case '403': //服务器拒绝处理
      Notice.info({
        title: "验证失败：",
        desc: "您的操作有误，无法正确执行",
      });
      break;

    case '405': // 如果 Token 不允许刷新（登录过期等等复杂情况）,提示token失效，跳转到登录页面
      Notice.info({
        title:'身份过期提示：',
        desc:response.data.msg,
      });
      router.push({name:'login'});
      break;

    case '407': //表示没有足够的身份或者权限去获取对应的信息,不需要返回response
      Notcie.warning({
        title:'拒绝访问提示：',
        desc:response.data.msg,
      });
      break;

    case '500'://表示服务器处理该请求的时候，出现了错误,不需要返回response
      Notice.error({
        title:'服务处理异常：',
        desc:response.data.msg,
      });
      break;
  }
  //不论最终是否需要跳转，都将返回response信息，然后再判断之前没判断的code
  return response;
},error => { //请求返回错误信息时
  Notice.warning({
    title : '网络链接阻塞',
    desc : '服务器被外星人拐跑了  @oo(▼皿▼メ;)o'
  });
  console.log("网络链接阻塞\n服务器被外星人拐跑了  @oo(▼皿▼メ;)o");
  return Promise.reject(error); // 返回接口返回的错误信息
});

//导出模块
export default request
