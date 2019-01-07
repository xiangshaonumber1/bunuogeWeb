<template>
    <div id="myarticles" class="myarticles">

      <div>
        <Row>

          <i-col span="24">
            <span style="font-size: 20px">文章数据详情</span>
            <div style="float: right">
              排序：<Button type="text">时间</Button>|<Button type="text">喜欢</Button>
            </div>
            <hr>
          </i-col>


        </Row>
      </div>

      <div id="content">
        <Row>

          <i-col span="4" style="background-color: #0aac8e">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" size="23" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="23" /><span>9999</span>
              <Divider type="vertical" />
            </div>
          </i-col>

          <i-col span="15" style="background-color: red">
            <div class="title_article">
              <span>具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="5" style="background-color: rebeccapurple">
            12456
          </i-col>



        </Row>
      </div>

    </div>
</template>

<script>
    export default {
        name: "management_articles"
    }
</script>

<style scoped>

  .myarticles{
    padding: 15px 35px;
  }


  .count_like_and_dislike{
    /*border: 1px solid #ccc;*/
    width: auto;
    height: auto;
    border-radius: 5px;
    display: block;
    float: left;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px;
  }
  .count_like_and_dislike > span{
    color:  black;
    text-align: center;
    padding: 5px;
  }

  .title_article{
    display: block;
    float: left;
    padding: 5px;
    /*border: 1px solid red;*/
    border-radius: 5px;
  }

  .title_article > span{
    font-size: 20px;
  }



</style>
