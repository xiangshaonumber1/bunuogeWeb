/**
 * 对axios 做一个统一的处理
 */

import axios from 'axios';
import {Message,Notice} from 'iview'
import router from '../router/router'

//axios默认设置
const request = axios.create({
  baseURL:'http://localhost:8888',
  timeout:'10000',
  // retry:4,
  // retryDelay:1000,
});

//http request 拦截器
request.interceptors.request.use(config=>{
  //在请求发送前做某些事情
  // if(config.method === "post"){//如果是post请求
  //   config.data = qs.stringify(config.data)
  // }
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
  * 402(只有带需要token的请求才判断) 因为涉及到重新发送请求，不方便在拦截器里设置
  * 404(查询信息类根据需要是否判断) 因为404页面是组件化到其他组件中，所以也不方便统一拦截
  * */
  switch (response.data.code) {
    case '401':// 表示该功能需要登录才能继续,
      Notice.info({
        title: "登录提示：",
        desc: response.data.msg,
      });
      router.push({name:'login'});
      break;

    case '403': // 服务器请求成功，但有，比如注册失败，登录失败，等等失败操作
      Notice.info({
        title: "验证失败：",
        desc: response.data.msg,
      });
      break;

    case '405': // 仅仅用于表示token拒绝刷新等处理
      Notice.info({
        title:'身份过期提示：',
        desc:response.data.msg,
      });
      router.push({name:'login'});
      break;

    case '406': //用于修改，删除等需要对数据进行变动，但变动无效的，类似无效的修改，或者删除已删除的信息
      Notice.info({
        title:'无效的操作：',
        desc:response.data.msg
      });
      break;

    case '407': //表示没有足够的 权限 或者 身份
      Notice.warning({
        title:'无权访问提示：',
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
    desc : '服务器被外星人拐跑了 \n @oo(▼皿▼メ;)o'
  });
  return error; // 返回接口返回的错误信息
});

//导出模块
export default request
