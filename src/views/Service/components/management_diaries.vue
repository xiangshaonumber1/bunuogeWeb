<template>
    <div class="my-diaries">
      <!-- Title 部分 -->
      <Row>
        <i-col>
          <span style="font-size: 20px;font-weight: bold">日记创作详情</span>
          <div style="float: right">
            <span>排序：</span><Button type="text">时间</Button><Divider type="vertical" /><Button type="text">喜欢</Button>
          </div>
          <hr>
        </i-col>
      </Row>

      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="success" ghost>公开</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>

      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="error" ghost>私有</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>

      <!-- Content 部分（复制）， 之后可删除 star -->
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="success" ghost>公开</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="error" ghost>私有</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="success" ghost>公开</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="error" ghost>私有</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="success" ghost>公开</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="error" ghost>私有</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="success" ghost>公开</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="error" ghost>私有</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="success" ghost>公开</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <div class="diaries_content">
        <Row type="flex" justify="space-around" align="middle" class="code-row-bg">
          <i-col span="3">
            <div class="diary_data">
              <Button type="error" ghost>私有</Button>&nbsp;
              <Icon type="md-eye" size="18" />&nbsp;<label>2.5W</label>
            </div>
          </i-col>

          <i-col span="18">
            <div class="diary_title">
              <Divider type="vertical" />
              <span>具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题具体的文章的标题</span>
            </div>
          </i-col>

          <i-col span="3">
            <div class="diary_time">
              <Divider type="vertical" />
              <Time :time="push_time" type="date" />
            </div>
          </i-col>
        </Row>
        <hr style="margin: 5px 0;">
      </div>
      <!-- Content 部分（复制）， 之后可删除 end -->

    </div>
</template>

<script>
    export default {
      name: "management_diaries",
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
    margin: 5px 0;
  }

  label{
    margin: 0;
    padding: 0;
  }

  .my-diaries{
    padding: 15px 35px;
  }

  .diary_title, .diary_data, .diary_time{
    /* 超出不换行 */
    white-space: nowrap;
    /* 超出长度时，出现省略号  */
    overflow: hidden;
    text-overflow:ellipsis;
  }

  .diary_data label{
    margin: 0;
    padding: 0;
  }
</style>
