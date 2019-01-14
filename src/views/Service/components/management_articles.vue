<template>
    <div class="my-articles">

      <!-- Title 部分 -->
      <div>
        <Row>
          <i-col span="24">
            <span style="font-size: 20px;font-weight: bold">文章数据详情</span>
            <div style="float: right">
              <span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>
            </div>
            <hr>
          </i-col>
        </Row>
      </div>

      <!-- Content 部分 -->
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <!--手动复制部分，无用，之后再删  start-->
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
      </div>
      <div class="content_article">
        <Row type="flex" justify="start" align="middle" class="code-row-bg">

          <i-col span="5">
            <div class="article_data">
              <Icon type="md-heart" color="#FF3030" size="18" />&nbsp;<label>1.42W</label>
              <Divider type="vertical" />
              <Icon type="md-heart" color="#000000" size="18" />&nbsp;<label>1.02W</label>
              <Divider type="vertical" />
              <Icon type="md-eye" size="18" />&nbsp;<label>2.52W</label>
            </div>
          </i-col>

          <i-col span="16">
            <div class="article_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="article_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>

        </Row>
        <hr>
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
    margin: 10px 0;
  }

  label{
    margin: 0;
    padding: 0;
  }

  .my-articles{
    padding: 15px 35px;
  }

  .article_data, .article_title, .article_time{
    /* 超出不换行 */
    white-space: nowrap;
    /* 超出长度时，出现省略号  */
    overflow:hidden;
    text-overflow:ellipsis
  }

</style>
