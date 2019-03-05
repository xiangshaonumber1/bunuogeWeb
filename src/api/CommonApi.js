/**
 * Web无权限相关操作
 */

import request from '../common/request'
import router from '../router/router'
import {Notice} from 'iview'
import qs from 'qs'


const common = {

  //获取首页海报图片
  getPostList(){
    return request({
      url:'/common/getPosterList',
      method:'get',
    }).then( res =>{
      console.log("getPosterList 返回的信息:",res);
      return res.data.data;
    })
  }

};

export default  common
