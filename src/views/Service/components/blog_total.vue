<template>
  <div class="blog_total">

    <Divider orientation="left"><span style="font-size: 20px">博客状态统计详情</span></Divider>

    <Row type="flex" justify="space-around" align="bottom" class="code-row-bg">
      <i-col>
        <!--文章获赞总计-->
        <div class="like_dislike_count text-center" style="float: left">
          <div class="like_dislike_circle">
            <span><Icon type="md-heart" color="rgb(251, 114, 153)" size="20"/>&nbsp;喜欢总计：</span>&nbsp;<label>1.88W</label>
          </div>
          <div class="like_dislike_circle">
            <span><Icon type="md-heart" color="black" size="20"/>&nbsp;差评总计：</span>&nbsp;<label>1.4W</label>
          </div>
          <i-circle
            :size="150"
            :trail-width="4"
            :stroke-width="5"
            :percent="75"
            stroke-linecap="square"
            stroke-color="rgb(251, 114, 153)"
            style="margin: 15px">
            <div class="circle-content">
              <p>优秀</p>
              <span>好评率</span><i>75%</i>
            </div>
          </i-circle>
        </div>
      </i-col>

      <i-col>
        <!--日记总计-->
        <div style="float: left;padding: 0 15px;">
          <div class="like_dislike_circle" style="border: none">
            <span><Icon type="md-copy" size="20" color="rgb(2, 181, 218)" />日记总篇数：<label>999</label>&nbsp;篇</span>
          </div>
          <div class="like_dislike_circle" style="text-align: left;border: none">
            <span><Icon type="md-unlock" size="20" color="rgb(35, 201, 237)" />&nbsp;公开数：<label>666</label>&nbsp;篇</span>
          </div>

          <div class="like_dislike_circle" style="text-align: left;border: none">
            <span><Icon type="md-lock" size="20" color="rgb(255, 102, 153)" />&nbsp;私密数：<label>333</label>&nbsp;篇</span>
          </div>

          <i-circle
            :size="150"
            :trail-width="5"
            :stroke-width="5"
            :percent="66"
            stroke-linecap="square"
            stroke-color="rgb(35, 201, 237)"
            trail-color="rgb(255, 102, 153)"
            style="margin: 15px">
            <div class="circle-content">
              <p>公开占有率</p>
              <i>66%</i>
            </div>
          </i-circle>

        </div>
      </i-col>
      <hr>
      <Divider/>
    </Row>

    <Row >
      <i-col>
        <div class="text-left" style="margin-left: 20px">
          <div class="like_dislike_circle" style="border: none;text-align: left">
            <Button type="info" ghost >原创</Button><span>原创总计： &nbsp;<label>1.4W</label> 篇</span>
            <Divider type="vertical" />
            <span>收获喜欢数：<label>2222</label></span>
            <Divider type="vertical" />
            <span>得到批评数：<label>2222</label></span>
          </div>

          <div class="like_dislike_circle" style="border: none;text-align: left">
            <Button type="success" ghost >转载</Button><span>转载总计： &nbsp;<label>1.4W</label>  篇</span>
            <Divider type="vertical" />
            <span>收获喜欢数：<label>46</label></span>
            <Divider type="vertical" />
            <span>得到批评数：<label>156</label></span>
          </div>

          <div class="like_dislike_circle" style="border: none;text-align: left">
            <Button type="warning" ghost>翻译</Button><span>翻译总计： &nbsp;<label>1.4W</label>  篇</span>
            <Divider type="vertical" />
            <span>收获喜欢数：<label>879</label></span>
            <Divider type="vertical" />
            <span>得到批评数：<label>0</label></span>
          </div>

          <i-circle
            :size="150"
            :trail-width="4"
            :stroke-width="5"
            :percent="75"
            stroke-linecap="square"
            stroke-color="rgb(87, 197, 247)"
            style="margin: 15px">
            <div class="circle-content">
              <p>优秀</p>
              <span>好评率</span><i>75%</i>
            </div>
          </i-circle>
          <Divider type="vertical" />
          <i-circle
            :size="150"
            :trail-width="4"
            :stroke-width="5"
            :percent="35"
            stroke-linecap="square"
            stroke-color="rgb(71, 203, 137)"
            style="margin: 15px">
            <div class="circle-content">
              <p>待提高</p>
              <span>好评率</span><i>35%</i>
            </div>
          </i-circle>
          <Divider type="vertical" />
          <i-circle
            :size="150"
            :trail-width="4"
            :stroke-width="5"
            :percent="55"
            stroke-linecap="square"
            stroke-color="rgb(255, 173, 51)"
            style="margin: 15px">
            <div class="circle-content">
              <p>一般</p>
              <span>好评率</span><i>55%</i>
            </div>
          </i-circle>
        </div>
      </i-col>
      <Divider/>
    </Row>

  </div>
</template>

<script>

    export default {
        name: "blog_total"
    }
</script>

<style scoped>

  svg{
    font-size: 25px;
  }

  label{
    margin: 0;
    padding: 0;
  }
  span{
    font-size: 16px;
  }

  .blog_total{
    padding: 5px 35px;
  }

  .like_dislike_circle{
    border-radius: 5px;
    border: 1px solid gray;
    margin: 15px 0;
    padding: 5px;
    text-align: center;
  }
  .like_dislike_circle span{
    font-size: 16px;
  }
  .like_dislike_circle button{
    margin-right: 10px;
  }

  .like_dislike_count{
    padding-left: 20px;
    padding-right: 20px;
  }
  .like_dislike_count span{
    font-size: 18px;
  }

  .circle-content{
    padding: 0;
    margin: 0;
  }

  .circle-content span{
    font-size: 16px;
  }

  .circle-content p{
    font-size: 20px;
  }

  .circle-content i{
    font-size: 16px;
  }

</style>


