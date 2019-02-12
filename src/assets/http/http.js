import myaxios from 'axios'
import Vue from 'vue'
import qs from 'qs'


//axios 参数格式
// Vue.prototype.$qs = qs;
//Vue 网络请求工具
// Vue.prototype.$axios = axios;  //全局注册，使用方法为：this.$axios
//axios 全局默认配置
// axios.defaults.baseURL = 'http://localhost:8888';
const axios = myaxios.create({
  baseURL:'http://localhost:8888'
});

//添加请求拦截器
axios.interceptors.request.use(config=>{
  //在发送请求之前做某事，比如设置token
  console.log("在发送请求之前做某事，比如设置token");
  config.headers["X-Auth-Token"] = this.$store.getters.userToken;
  return config;
},error => {
  //请求错误时做些事情
  console.log("请求失败");
  return Promise.reject(error); //方法返回一个带有拒绝原因reason参数的Promise对象。
});

//添加响应拦截器
axios.interceptors.response.use(response=>{
  //对响应数据做些事
  console.log("http 链接成功");
},error => {
  console.log("返回接口返回的错误信息");
  return Promise.reject(error.response.data); // 返回接口返回的错误信息
});

export default axios


