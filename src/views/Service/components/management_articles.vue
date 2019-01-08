<template>
    <div class="myarticles">

      <!-- Title 部分 -->
      <div>
        <Row>
          <i-col span="24">
            <span style="font-size: 16px">文章数据详情</span>
            <div style="float: right">
              <span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>
            </div>
            <hr>
          </i-col>
        </Row>
      </div>

      <!-- Content 部分 -->
      <div class="content_article">
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>

      <!--手动复制部分，无用，之后再删  start-->
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>

      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>

      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>

      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>

      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>1.4W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>9.9W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>9.9W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>
      <div>
        <Row>
          <i-col span="5">
            <div class="count_like_and_dislike">
              <Icon type="md-heart" color="#FF3030" /><span>9.9W</span>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" /><span>1.0W</span>
              <Divider type="vertical" />
              <Icon type="md-eye" /><span>2.5W</span>
            </div>
          </i-col>
          <i-col span="16">
            <div class="title_article">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>
          <i-col span="3">
            <Divider type="vertical" />
            <Time :time="push_time" type="date" />
          </i-col>
        </Row>
        <hr style="margin-top: 5px;">
      </div>

      <!--手动复制部分，无用，之后再删  end-->

    </div>
</template>

<script>
    export default {
        name: "management_articles",
      data(){
          return {
            push_time:(new Date()).getTime()
          }
      }
    }
</script>

<style scoped>

  span{
    font-size: 14px;
  }
  hr{
    margin-bottom: 10px;
  }

  .myarticles{
    padding: 15px 35px 90px 35px;
    height: 100vh;
    overflow: auto;
  }

  .content_article{
    white-space: nowrap;/* 超出不换行 */
    /* 超出长度时，出现省略号  */
    overflow:hidden;
    text-overflow:ellipsis
  }


  .count_like_and_dislike{
    width: auto;
    /*border: 1px solid seagreen;*/
    padding: 2px 2px;

  }
  .count_like_and_dislike > span{
    color:  black;
    text-align: center;
    padding: 5px;
  }

  .title_article{
    padding: 1px 2px;
    font-size: 16px;
    /*border: 1px solid red;*/

    white-space: nowrap;/* 不换行 */
    /* 超出长度时，出现省略号  */
    overflow:hidden;
    text-overflow:ellipsis
  }



</style>
