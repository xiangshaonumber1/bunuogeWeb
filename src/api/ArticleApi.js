/**
 * 文章相关请求统一管理
 */

import request from '../common/request'
import AuthenticationApi from './AuthenticationApi'
import router from '../router/router'
import {Notice} from 'iview'

const article = {
  /**
   * 发布新文章，需要验证token
   */
  write_article(ArticleTitle,ArticleContent,ArticleLabel,origin_link){
    console.log(" 获取到的 ArticleTitle",ArticleTitle);
    console.log(" 获取到的 ArticleContent",ArticleContent);
    console.log(" 获取到的 ArticleLabel",ArticleLabel);
    console.log(" 获取到的 origin_link",origin_link);
    request({
      url:'/article/write_article',
      method:'post',
      data:{
        title:ArticleTitle,
        content:ArticleContent,
        label:ArticleLabel,
        origin_link:origin_link,
      }
    }).then( async (response) => {
      //发布成功后，立即跳转到刚编辑的文章
      if (response.data.code === '200') {
        const id = response.data.msg;
        Notice.success({
          title: "发布成功：",
          desc: "文章发布成功，已为您跳转到当前页面"
        });
        router.push({path: '/ai/' + id + ''});
      } else if (response.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result) {
          return this.write_article(ArticleTitle, ArticleContent, ArticleLabel, origin_link)
        } else {
          console.log(" write_article ?????????? what the fuck ?????????")
          return this.write_article(ArticleTitle, ArticleContent, ArticleLabel, origin_link)
        }
        //Token刷新失败（405）这里不做任何处理，拦截器中会跳转
      } else {
        console.log("write_article else info :", response)
      }
    })
  },

  /**
   *  根据文章ID获取相应的文章信息
   */
  get_articleInfo(articleID){
   return request({
      methods:'get',
      url:'/article/get_articleInfo',
      params:{
        articleID:articleID
      }
    }).then(res=>{
      if (res.data.code === '404'){
        return null; //404返回null
      }else {
        return res.data.data //如果有数据，则返回获取的data
      }
    })
  },

  /**
   * 获取首页最新发布文章信息列表
   */
  get_article_list(page){
   return request({
     url:'/article/get_article_list',
     methods:'get',
     params:{
       page: page,
     }
    }).then( res =>{
      if (res.data.code === '404'){
        return null;
      }else {
        return res.data.data;
      }
    })
  },


  /**
   * 根据搜索框的关键字查询类似的文章
   */
  get_search(key_word,page,type){
    return request({
      url:'/article/get_search',
      methods:'get',
      params:{
        key_word:key_word,
        page:page,
        type:type,
      }
    }).then( res =>{
      console.log("get_search 输出:",res);
      if (res.data.code === '404'){
        return null;
      }else {
        return res.data.data;
      }
    })
  },

  /**
   * 获取当前用户发布的文章
   */
  get_myArticle(page){
    return request({
      url:'/article/get_myArticle',
      method:"get",
      params:{
        page:page,
      }
    }).then( async (res) => {
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.get_myArticle(page);
        }else {
          console.log("????????????????? get_myArticle: what the fuck ???????????")
          return this.get_myArticle(page);
        }
      } else if (res.data.code === '404') {
        return null;
      } else {
        return res.data.data;
      }
    })
  }

};

export default article
