<template>
    <div class="index" >
      <!-- 固定在顶部的导航栏  -->
      <Affix>
        <Row style="height: 60px;background-color: white;"  align="middle" class="code-row-bg index-top-affix" >

          <i-col span="24" class="top-info">
            <!-- logo -->
            <div>
              <img src="/static/picture/ok_blog_logo.png" style="height: 60px;" alt="...">
            </div>

            <!-- 导航栏 -->
            <div>
              <Menu mode="horizontal" theme="light" active-name="1" style="border: none">
                <MenuItem name="1" style="margin: 0 5px;"><span>首页</span></MenuItem>
                <MenuItem name="2" style="margin: 0 5px;"><span>收藏</span></MenuItem>
                <MenuItem name="3" style="margin: 0 5px;"><span>推荐</span></MenuItem>
              </Menu>
            </div>

            <!-- 搜索框 -->
            <div >
              <form class="navbar-form navbar-left" style=";height: 60px;margin: 0;padding: 15px 0;">
                <div class="form-group">
                  <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-info">搜索</button>
              </form>
            </div>

            <!-- 个人信息 -->

            <div style="height: 60px;float: right;padding: 0 10px;" v-if="isLogin">

              <Dropdown placement="bottom">
                <a style="text-decoration: none;line-height: 60px;">
                  <img src="https://i.loli.net/2017/08/21/599a521472424.jpg"  alt="none" class="img-circle" width="40px"/>
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem><Icon type="md-contact" size="20" /><span>&emsp;个人中心&emsp;</span></DropdownItem>
                  <DropdownItem><Icon type="md-settings" size="20" /><span>&emsp;设置&emsp;</span></DropdownItem>
                  <DropdownItem><Icon type="ios-cloudy" size="20" /><span>&emsp;管理中心&emsp;</span></DropdownItem>
                  <DropdownItem><Icon type="md-chatboxes" size="20" /><span>&emsp;帮助和反馈&emsp;</span></DropdownItem>
                  <DropdownItem><Icon type="md-exit" size="20" /><span>&emsp;退出&emsp;</span></DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <div style="line-height: 60px">
                <Button type="info" icon="md-create" ghost size="large"> <Icon type="" size="25" color="blue" />创作文章</Button>
              </div>

            </div>

            <div style="height: 60px;float: right;padding: 0 10px;" v-else>
              <div style="line-height: 60px">
                <Button type="text" ghost><span style="color: rgb(0, 192, 145);">立即登录</span></Button>&emsp;
                <Button type="success" style="background-color: rgb(0, 192, 145)"><span>免费注册</span></Button>
              </div>
            </div>

          </i-col>

        </Row>
      </Affix>


      <div class="index-content center-block">

        <Row type="flex" align="middle" class="code-row-bg" justify="space-between">
          <i-col span="15">
            <Carousel autoplay v-model="CarouselOrder" loop autoplay-speed="5000">
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo1.jpg" alt="none"> </div>
              </CarouselItem>
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo2.jpg"  alt="none"></div>
              </CarouselItem>
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo3.jpg"  alt="none"></div>
              </CarouselItem>
              <CarouselItem>
                <div class="my-carousel"><img src="/static/picture/lunbo4.jpg" alt="none"></div>
              </CarouselItem>
            </Carousel>
          </i-col>

          <i-col span="8" class="official-activities">
            <div>
              <p class="bg-info">官方活动版块一</p>
              <p class="bg-success">官方活动版块一</p>
              <p class="bg-danger">官方活动版块一</p>
            </div>

            <div class="excellent-articles">
              <p>优质推荐</p>
              <Button type="text" style="background-color: rgb(255, 218, 35);margin: 5px 0;"><span>Top 1</span></Button>
              <br>
              <Button type="text" style="background-color: rgb(226, 226, 226);margin: 5px 0;"><span>Top 2</span></Button>
              <br>
              <Button type="text" style="background-color: rgb(205, 154, 98);margin: 5px 0;"><span>Top 3</span></Button>
            </div>

          </i-col>
        </Row>

        <p class="demo-affix" style="margin-top: 50px">emmmmmmmm...........1</p><br>
        <p class="demo-affix">emmmmmmmm...........2</p><br>
        <p class="demo-affix">emmmmmmmm...........3</p><br>
        <p class="demo-affix">emmmmmmmm...........4</p><br>
        <p class="demo-affix">emmmmmmmm...........5</p><br>
        <p class="demo-affix">emmmmmmmm...........6</p><br>
        <p class="demo-affix">emmmmmmmm...........7</p><br>
        <p class="demo-affix">emmmmmmmm...........8</p><br>
        <p class="demo-affix">emmmmmmmm...........9</p><br>
        <p class="demo-affix">emmmmmmmm...........0</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
        <p class="demo-affix">emmmmmmmm...........</p><br>
      </div>


      <blog-footer></blog-footer>
    </div>
</template>

<script>
    import BlogFooter from "../footer/footer";
    export default {
      name: "index",
      CarouselOrder:'0',
      components: {BlogFooter},
      data(){
        return {
          top_menu_theme:'light',
          top_menuItem_name:'articles',
          isLogin:false,
        }
      },
      methods:{
        navbarClick(obj){
          console.log('输出：',obj)
        }
      }
    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

  .excellent-articles span{
    font-size: 14px;
    font-weight: bolder;
    font-family: '微软雅黑',serif;
    color: black;
  }

  .my-carousel{
    height: 400px;
    text-align: center;
    color: white;
    margin: 0;
    padding: 0;
  }
  .my-carousel img{
    width: 100%;
    height: 100%;
  }

  .top-info div{
    float: left;
    margin: 0 15px 0 15px;
  }

  .index-top-affix{
    border-bottom: 1px solid rgb(220, 222, 226);
  }

  .index{
    /*border: 1px solid red;*/
    width: 100vm;
    height: auto;
  }

  .index-content{
    margin-top: 20px;
    padding: 0;
    /*border: 1px solid gold;*/
    /*background-color: rgb(248, 248, 248);*/
    width: 70%;
  }

  .official-activities p{
    border-radius: 5px;
    padding: 15px 10px;
    font-size: 18px;
    font-family: "微软雅黑",serif;
  }

</style>
