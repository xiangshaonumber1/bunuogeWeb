/**
 * 文章相关请求统一管理
 */

import request from '../common/request'
import AuthenticationApi from './AuthenticationApi'
import router from '../router/router'
import {Notice} from 'iview'
import qs from 'qs'

const article = {

  /**
   * 发布新文章，需要验证token
   */
  write_article(ArticleTitle,ArticleContent,ArticleType,ArticleLabel,origin_link){
   return request({
      url:'/article/write_article',
      method:'post',
      data:qs.stringify({
        title:ArticleTitle,
        content:ArticleContent,
        type:ArticleType,
        label:ArticleLabel,
        origin_link:origin_link,
      })
    }).then( async (response) => {
      //发布成功后，立即跳转到刚编辑的文章
      if (response.data.code === '200') {
        Notice.success({
          title: "发布成功：",
          desc: "文章发布成功，已为您跳转到当前页面"
        });
        return router.push({   //跳转到对应的文章详情页面
          name:'web_articleInfo',
          params:{
            article_id:response.data.data
          }
        });
      } else if (response.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result) {
          return this.write_article(ArticleTitle, ArticleContent,ArticleType,ArticleLabel, origin_link)
        }
        //Token刷新失败（405）这里不做任何处理，拦截器中会跳转
      } else {
        console.log("write_article else info :", response);
        return response;
      }
    })
  },


  /**
   * 修改已发布的文章的信息
   */
  update_article(ArticleID,ArticleTitle,ArticleContent,ArticleType,ArticleLabel,origin_link){
    return request({
      url:'/article/update_article',
      method:'post',
      data:qs.stringify({
        articleID:ArticleID,
        title:ArticleTitle,
        content:ArticleContent,
        type:ArticleType,
        label:ArticleLabel,
        origin_link:origin_link,
      })
    }).then( async res => {
      console.log("返回信息 ： ",res);
      if (res.data.code === '200'){
        return true;
      }
      else if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if(result){
          return this.update_article(ArticleID,ArticleTitle,ArticleContent,ArticleType,ArticleLabel,origin_link)
        }
      }
    })
  },

  /**
   * 发布新的日记，同样需要验证token
   */
  write_diary(title,content,type){
    return request({
      method:'post',
      url:'/article/write_diary',
      data:qs.stringify({
        title:title,
        content:content,
        type:type,
      })
    }).then( async res => {
      if (res.data.code === '200') {
        Notice.success({
          title: '日记保存成：',
          desc: "即将为你跳转到当前日记界面"
        });
        return router.push({
          name:'web_diaryInfo',
          params:{
            diary_id: res.data.data
          }
        })
      } else if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.write_diary(title,content,type);
        }else {
          return router.push({name:'login'})
        }
      }else {
        console.log("write_article else info :", res);
        return res;
      }
    })
  },


  /**
   * 修改已经发布的日记的信息
   */
  update_diary(diaryID,title,content,type){
    return request({
      url:"/article/update_diary",
      method:"post",
      data:qs.stringify({
        diaryID:diaryID,
        title:title,
        content:content,
        type:type,
      })
    }).then( async res => {
      if (res.data.code === '200'){
        return true;
      }
      else if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.update_diary(diaryID,title,content,type)
        }
      }
    })
  },

  /**
   *  根据文章ID获取相应的文章信息
   */
  get_articleInfo(articleID){
   return request({
      method:'get',
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
   * 根据日记ID(diaryID)，获取相应的日记信息
   */
  get_diaryInfo(diaryID){
    return request({
      method:'get',
      url:'/article/get_diaryInfo',
      params:{
        diaryID:diaryID,
      }
    }).then( res => {
      console.log("输出的信息 res：",res);
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
     method:'get',
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
      method:'get',
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
  get_userArticle(openID,page){
    return request({
      url:'/article/get_userArticle',
      method:"get",
      params:{
        openID:openID,
        page:page,
      }
    }).then( async (res) => {
      if (res.data.code === '404') {
        return null;
      } else {
        return res.data.data;
      }
    })
  },


  /**
   * 获取当前用户发布的日记
   */
  get_userDiary(openID,page) {
    return request({
      url:'/article/get_userDiary',
      method:"get",
      params:{
        openID:openID,
        page:page,
      }
    }).then( async (res) => {
      if (res.data.code === '404') {
        return null;
      } else {
        return res.data.data;
      }
    })
  },

  /**
   * 作者确认删除该片文章(type = article)或者日记(type = diary)
   * ID 为articleID,或者 DiaryID
   */
  delete_article(deleteID,type){
    return request({
      url:'/article/delete_article',
      method:"post",
      data:qs.stringify({
        deleteID:deleteID,
        type:type,
      })
    }).then( async res => {
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.delete_article(deleteID,type)
        }else{
          return null;
        }
      }else {
        return res.data;
      }
    })
  },

  /**
   * 获取近三日热门推荐文章
   */
  getTop(){
    return request({
      url:'/article/getTop',
      method:"get"
    }).then( res =>{
      return res.data.data;
    })
  },

  /**
   * 用户对该篇文章进行点赞,如果通过token来获取openID点赞
   * 如果token刷新失败，会强制返回到登录页，而且是在拦截器中执行的，这样体验不友好
   * 所以手动传入
   */
  clickLike(articleID,openID,executeType){
    return request({
      url:'/article/clickLike',
      method:"post",
      data:qs.stringify({
        articleID:articleID,
        openID:openID,
        executeType:executeType,
      })
    }).then( res =>{
      return res.data.data;
    })
  },

  /**
   * 用户点击收藏按钮，executeType为点击的按钮原本状态
   * 如果传入为false,则表示新增收藏操作
   * 如果传入为true,则表示删除收藏操作
   */
  clickCollect(articleID,openID,executeType){
    return request({
      url:"/article/clickCollect",
      method:"post",
      data:qs.stringify({
        articleID:articleID,
        openID:openID,
        executeType:executeType,
      })
    }).then( res =>{
      return res.data.data;
    })
  },


  /**
   * 判断用户是否对该篇文章进行有点赞和收藏
   */
  getLikeAndCollectStatus(articleID,openID){
    return request({
      url:'/article/getLikeAndCollectStatus',
      method:'get',
      params:{
        articleID:articleID,
        openID:openID
      }
    }).then( res =>{
      return res.data.data;
    })
  },

  /**
   * 获取指定ID的文章的评论和评论下的回复信息
   */
  getCommentAndReplyInfo(articleID,page){
    return request({
      url:'/article/getCommentAndReplyInfo',
      method:'get',
      params:{
        articleID:articleID,
        page:page
      }
    }).then( async res => {
      console.log("请求评论和回复结果：",res.data);
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result){
          return this.getCommentAndReplyInfo(articleID,page);
        }else {
          return null;
        }
      }else if (res.data.code === '404'){
        return null;
      }else {
        return res.data.data;
      }
    })
  },


  /**
   * 评论一篇文章
   * @param articleID 文章ID
   * @param from_openID 评论者ID
   * @param comment_content 评论内容
   */
  write_comment(articleID,from_openID,comment_content) {
    return request({
      url:'',
      method:'post',
      data:qs.stringify({
        articleID:articleID,
        from_openID:from_openID,
        comment_content:comment_content
      })
    }).then( async res => {
      if (res.data.code === '402') {
        const result = await AuthenticationApi.getToken();
        if (result) {
          return this.write_comment(articleID,from_openID,comment_content);
        }else {
          return null;
        }
      }else {
        return res.data.data;
      }
    })
  },

  /**
   * 给评论或者评论下回复，添加一条新的回复
   * @param replyInfo
   * replyInfo.commentID : 该条回复属于哪条评论下
   *
   */
  write_reply(replyInfo) {

  },

};


export default article
