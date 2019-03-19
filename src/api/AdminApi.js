/**
 * 管理员操作请求统一管理
 */
import request from '../common/request'
import AuthenticationApi from './AuthenticationApi'

const admin = {

  /**
   * 管理端登录验证
   */
  service_login() {
    return request({
      url:'/admin/service_login',
      method:'post'
    }).then( async res => {
      console.log("service_login 输出返回信息：", res);
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.service_login();
        }else {
          return null;
        }
      }else {
        console.log("即将返回数据");
        return res.data.data;
      }
    })
  },



};

export default admin
