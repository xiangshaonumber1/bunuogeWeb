/**
 * 文章相关请求统一管理
 */

import request from '../common/request'
import AuthenticationApi from './AuthenticationApi'

const article = {

  /**
   * 发布新文章，需要验证token
   */
  write_article(ArticleTitle,ArticleContent,ArticleLabel,origin_link){
    console.log(" 获取到的 ArticleTitle",ArticleTitle);
    console.log(" 获取到的 ArticleContent",ArticleContent);
    console.log(" 获取到的 ArticleLabel",ArticleLabel);
    console.log(" 获取到的 origin_link",origin_link);
    return request({
      url:'/article/write_article',
      method:'post',
      data:{
        title:ArticleTitle,
        content:ArticleContent,
        label:ArticleLabel,
        origin_link:origin_link,
      }
    }).then(response=>{
      //发布成功后，立即跳转到刚编辑的文章
      if (response.data.code === '200'){
        console.log("发布成功的文章的ID:",response.data.msg);
        const id = response.data.msg;
        this.$router.push({path:'/ai/'+id+''})
      }else if (response.data.code === '402') {//如果token过期，则重新发送请求，拦截器中已重新刷新token
        if (AuthenticationApi.getToken()){ //表示刷新token成功
          this.write_article(ArticleTitle,ArticleContent,ArticleLabel,origin_link)
        }
        //Token刷新失败（405）这里不做任何处理，拦截器中会跳转
      }else {
        console.log("write_article else info :",response)
      }
    })
  },

  /**
   *  根据文章ID获取相应的文章信息
   *
   */
  get_articleInfo(articleID){
    return request({
      methods:'get',
      url:'/article/get_articleInfo',
      params:{
        articleID:articleID
      }
    }).then(response=>{
      if (response.data.code === '200'){
        console.log(" 获取指定articleID文章信息成功 ");
        return response.data.data;
      }else {
        console.log("get_articleInfo else info :",response);
      }
    })
  }
};

export default article
