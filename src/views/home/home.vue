<template>
  <div id="home" class="container-fluid">

    <div class="row clearfix">
      <div class="col-md-12 column">

        <!--导航栏的设置 star-->
        <blog-header></blog-header>
        <!--导航栏的设置 end-->

        <!--轮播的设置 star-->
        <div class="carousel slide row" id="carousel-355329">
          <ol class="carousel-indicators">
            <li data-slide-to="0" data-target="#carousel-355329" class="active">
            </li>
            <li data-slide-to="1" data-target="#carousel-355329">
            </li>
            <li data-slide-to="2" data-target="#carousel-355329">
            </li>
          </ol>
          <!--轮播图片和标题-->
          <div class="carousel-inner">
            <div v-for="lunbo in lunbos" :class="lunbo.class">
              <img class="img-responsive" alt="" :src="lunbo.img" style="width: 100%;margin-top: -90px;filter:grayscale(50%)"/>
              <div class="picutre-word">
                <p>
                  {{lunbo.biaoti}}
                </p>
                <span>
                {{lunbo.fubiaoti}}
              </span>
              </div>
            </div>
          </div>
          <a class="left carousel-control" href="#carousel-355329" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
          </a>
          <a class="right carousel-control" href="#carousel-355329" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
          </a>
        </div>
        <!--轮播的设置 end-->

        <!--引用块设置 star-->
        <blockquote class="center-block" style="margin-top: 30px;margin-bottom: 30px;width: 75%;">
          <p style="color: white;font-size: 30px">
            XiangShao &nbsp;&nbsp;|&nbsp;&nbsp; 欢迎来到我的博客
          </p> <small>Well come to my blog ，thes are my learning experiences</small>
        </blockquote>
        <!--引用块设置 end-->

        <!--缩虐图和文本设置 star-->
        <div class="row" style="margin-left: 12.5%;margin-right: 12.5%">
          <div v-for="article in articleList" class="col-md-4">
            <div class="thumbnail">
              <img class="img-responsive" alt="300x200" src="http://ibootstrap-file.b0.upaiyun.com/lorempixel.com/600/200/people/default.jpg" />
              <div class="caption">
                <h3>
                  {{article.title}}
                </h3>
                <p>
                  {{article.content}}
                </p>
                <p>
                  <a class="btn btn-primary" href="#">详情</a> <a class="btn" href="#">Action ......</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!--缩虐图和文本设置 end-->

        <!--分页设置 star-->
        <nav aria-label="Page navigation" style="margin-bottom: 50px;margin-top: 50px">
          <ul class="pager" >
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;上一页</span>
              </a>
            </li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">下一页&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
        <!--分页设置 end-->

        <!--底部相关信息链接-->
        <div class="custom footerDIV" >
          <table >
            <tr>
              <td>
                <p>推荐链接</p>
              </td>
              <td>
                <p>本站最新</p>
              </td>
              <td>
                <p>关于博主</p>
              </td>
              <td>
                <p>其他相关</p>
              </td>
            </tr>
            <tr>
              <td><a>{{msg}}</a></td>
              <td></td>
              <td><a>个人简介</a></td>
              <td><a>意见反馈</a></td>
            </tr>
            <tr>
              <td><a>Spring Cloud 中国社区</a></td>
              <td></td>
              <td><a>邮箱联系</a></td>
              <td></td>
            </tr>
            <tr>
              <td><a>Spring For All社区</a></td>
              <td></td>
              <td><a>QQ联系</a></td>
              <td></td>
            </tr>
            <tr>
              <td><a>Spring Cloud  中文网</a></td>
              <td></td>
              <td><a>微信联系</a></td>
              <td></td>
            </tr>

            <tr>
              <td><a>Vue 中文官网</a></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

          </table>
        </div>

        <!-- 备案信息 -->
        <blog-footer></blog-footer>

      </div>
    </div>
  </div>
</template>

<script>
    import BlogHeader from "../header/header";
    import BlogFooter from "../footer/footer";
    export default {
      name:'App',
      components: {BlogFooter, BlogHeader},
      data (){
        return{
          articleList:[
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
            {title:'这里应该展示文章标题',content:'这里应该填写的是文章的部分内容，字数应该有一定的限制，超出部分应该用省略号显示'},
          ],
          lunbos:[
            {biaoti:'Hello World',fubiaoti:'每一个程序猿的开始，都是从 hello word 启程!',img:'static/picture/lunbo1.jpg',class: 'item active'},
            {biaoti:'Hello World',fubiaoti:'每一个程序猿的开始，都是从 hello word 启程!',img:'static/picture/lunbo2.jpg',class: 'item'},
            {biaoti:'Hello World',fubiaoti:'每一个程序猿的开始，都是从 hello word 启程!',img:'static/picture/lunbo4.jpg',class: 'item'},
          ]
        }
      },
    }
</script>

<style scoped>
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #222222;
  }
</style>
