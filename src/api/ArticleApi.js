/**
 * 文章相关请求统一管理
 */

import request from '../common/request'

const article = {

  //发布新文章
  write_article(title,content,label){
    return request({
      url:'/article/write_article',
      method:'post',
      data:{
        title:this.articleTitle,
        content:this.editorContent,
        label:this.select_type,
        origin_link:this.origin_link,
      }
    }).then(response=>{
      //发布成功后，立即跳转到刚编辑的文章
      if (response.data.code === '200'){
        console.log("发布成功的文章的ID:",response.data.msg);
        const id = response.data.msg;
        this.$router.push({path:'/ai/'+id+''})
      }else {
        console.log("write_article:",response)
      }
    })
  },

  //根据文章ID获取相应的文章信息
  get_articleInfo(articleID){
    return request({
      methods:'get',
      url:'/article/get_articleInfo',
      params:{
        articleID:articleID
      }
    }).then(response=>{

    })
  }
};

export default article
