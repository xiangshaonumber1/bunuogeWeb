<template>
  <div class="layout">

    <Row v-if="isAdmin" type="flex">
      <!-- 左侧，导航栏 -->
      <i-col span="4" class="layout-menu-left">
        <Menu :theme="theme" width="auto" style="height: 100%" :active-name="activeIndex">
          <div class="layout-logo-left" v-on:click="goHome">GetOk<span>管理中心</span></div>
          <Submenu v-for="submenu in submenuList" :key="submenu.parent_index" :name="submenu.parent_index">
            <template slot="title"><Icon :type="submenu.icon" size="25"></Icon>{{submenu.parent_title}}</template>
            <MenuItem v-if="submenu.is_child" v-for="child in submenu.childList" :key="child.child_index" :name="child.child_index" @click.native="addTab(child.child_index,child.child_title,child.to_path)">
              {{child.child_title}}
            </MenuItem>
          </Submenu>
        </Menu>
      </i-col>

      <i-col  span="20" class="layout_main_right">
        <Tabs class="style-tab" type="card" v-model="activeIndex" :animated="false" closable @on-tab-remove="removeTab" @on-click="TabClick">
          <TabPane class="style-tabpane"
            v-for="item in editableTabs"
            v-if="item.index!=null"
            :key="item.index"
            :label="item.title"
            :name="item.index"
          >
            <div class="tabpane-content">
              <router-view v-if="activeIndex === item.index"></router-view>
            </div>
          </TabPane>
        </Tabs>
      </i-col>

    </Row>

  </div>
</template>

<script>
  //导入Vue组件

    export default {
        name: "ServiceController",
      data(){
          return{
            isAdmin:false,    //判断当前用户是否是管理员
            submenuList:[
              //每一个父菜单和其子菜单的所有设置
              // {parent_index:'1',parent_icon:'el-icon-menu',parent_title:'博客详情',icon:'md-globe',is_child:true,
              //   childList:[
              //     {child_title:'统计详情',child_index:'1-1',to_path:'service_blog_state'},
              //     // {child_title:'个人详情',child_index:'1-2',to_path:'service_user_info'},
              //   ]},

              // {parent_index:'2',parent_icon:'el-icon-edit',parent_title:'发布文章',icon:'md-create',is_child:true,
              //   childList:[
              //     {child_title:'写文章',child_index:'2-1',to_path:'service_write_article'},
              //     {child_title:'写日记',child_index:'2-2',to_path:'service_write_diary'},
              //     {child_title:'提问题',child_index:'2-3',to_path:'service_white_page'},
              // ]},
              // {parent_index:'3',parent_icon:'el-icon-location',parent_title:'文章管理',icon:'ios-copy',is_child:true,
              //   childList:[
              //     {child_title:'我的文章',child_index:'3-1',to_path:'service_data_articles'},
              //     {child_title:'我的日记',child_index:'3-2',to_path:'service_data_diaries'},
              //     {child_title:'收藏文章',child_index:'3-3',to_path:'service_white_page'},
              //     {child_title:'我的评论',child_index:'3-4',to_path:'service_white_page'},
              //   ]},

              {parent_index:'4',parent_icon:'el-icon-setting',parent_title:'系统管理',icon:'md-settings',is_child:true,
                childList:[
                  {child_title:'文章管理',child_index:'4-1',to_path:'articleManagement'},
                  // {child_title:'评论管理',child_index:'4-2',to_path:'commentsManagement'},
                  {child_title:'反馈信息',child_index:'4-3',to_path:'service_feedback_message'},
                  {child_title:'用户管理',child_index:'4-4',to_path:'service_identity_user'},
                  // {child_title:'发送邮件',child_index:'4-5',to_path:'service_write_email'},
                  // {child_title:'链接编辑',child_index:'4-6',to_path:'service_identity_link'},
                ]
              },
            ],
            //以后给下面这些值给个默认值，用作展示首页帮助面板
            activeIndex:null,//当前显示的table
            editableTabs:[{
              title:null,
              index:null, //和activeIndex对应
              content:null,//一般是子组件的路径
            }],
            openNames:[],
            theme: 'light',
          }
      },

      //**********************  methods star ****************************
      methods: {

        //前往首页
        goHome(){
          console.log("跳转到首页");
          this.$router.push({name:'home'})
        },

        //实现点击面板，传递子菜单
        TabClick(){
          var path = '/404';
          for (var i = 0 ;i<this.submenuList.length;i++){
            for (var j = 0;j<this.submenuList[i].childList.length;j++){
              if (this.submenuList[i].childList[j].child_index === this.activeIndex){
                path = this.submenuList[i].childList[j].to_path;
              }
            }
          }
          console.log('点击选项卡，跳转到相应的页面 ',path);
          this.$router.push({name:path})
        },

        //添加Tab标签内容
        addTab(childIndex,childTitle,to_path) {
          let result = this.openNames.indexOf(childIndex);
          if (result === -1){
            //刷新全局的值
            this.editableTabs.push({
              title: childTitle,//选项卡标题
              index: childIndex, //选项卡的编号
              content: to_path,//可以是路径
            });
            this.openNames.push(childIndex);//将刚创建的选项卡的编号存入openNames
          }
          this.activeIndex = childIndex;
          console.log('addTab 新增选项卡：',to_path);
          this.$router.push({name:to_path})
        },

        //删除指定tab标签的内容
        removeTab(childIndex) {
          var path = 'ServiceController';
          this.openNames.remove(childIndex);
          /** 勿删 **/
          let tabs = this.editableTabs;
          this.editableTabs = tabs.filter(tab => tab.index !== childIndex);
``
          for (var i = 0 ;i<this.submenuList.length;i++){
            for (var j = 0;j<this.submenuList[i].childList.length;j++){
              if (this.submenuList[i].childList[j].child_index === this.activeIndex){
                path = this.submenuList[i].childList[j].to_path;
              }
            }
          }
          console.log("删除上一个选项卡后，即将前往路径：",path);
          this.$router.push({name:path})
        },

        //获取上次打开后未关闭的和已激活的页面
        getOpenAndActivePage(){
          console.log("getOpenAndActivePage 我正在执行");
          let open = localStorage.getItem("open-names");
          let active = localStorage.getItem("active-name");
          if (null != open){
            // console.log("初始化的 openNames value:"+this.openNames);
            this.openNames = open.split(",");
            // console.log("初始化后的 openNames value:"+this.openNames+' openNames 长度：'+this.openNames.length);
            for (var i=0;i<this.openNames.length;i++){
              // console.log(" 正在处理： "+this.openNames[i]);
              for (var j=0;j<this.submenuList.length;j++){
                for (var k=0;k<this.submenuList[j].childList.length;k++){
                  //如果储存的openNames中有，则添加到面板上
                  if (this.submenuList[j].childList[k].child_index === this.openNames[i]){
                    // console.log("成功找到："+this.submenuList[j].childList[k]);
                    this.editableTabs.push({
                      title: this.submenuList[j].childList[k].child_title,//选项卡标题
                      index: this.submenuList[j].childList[k].child_index, //选项卡的编号
                      content: this.submenuList[j].childList[k].to_path,//可以是路径
                    });
                    //如果该面板同时是正在显示的面板，则跳转到该页面上
                    if (this.submenuList[j].childList[k].child_index === active){
                      this.$router.push({name:this.submenuList[j].childList[k].to_path});
                      this.activeIndex = active;
                    }
                  }
                }
              }
            }
          }else {//表示没有打开的选项卡，自然也没有正在显示的选项卡，则重新定位到ServiceController主页
            this.$router.push({name:"ServiceController"})
          }
        },

        //admin权限验证
        async service_login(){
          const token = localStorage.getItem("token");
          if (token){
            const result = await this.$apis.AuthenticationApi.getToken();
            if (result){
              //刷新成功
              this.isAdmin = result;
              this.getOpenAndActivePage();
            }else {
              //刷新失败
              return this.$router.push({name:'index'})
            }
          }else {
            return this.$router.push({name:'index'})
          }
        }

      },
      //**********************  methods end ****************************

      //此钩子中函数一般会做一些ajax请求获取数据进行数据初始化，mounted 在整个实例中只执行一次
      mounted() {
        this.service_login();
      },

      //实例销毁完成执行的钩子，跳转到其他页面时，清空保存的open-names和active-name
      beforeDestroy() {//不过没起作用，也不知道是为什么，先留个问题在这
          console.log("ServiceController destoryed");
          localStorage.removeItem("open-names");
          localStorage.removeItem("active-name");
      },

      //实时监控数据变化并随之更新DOM，updated是更新之后的钩子，beforeUpdate是更新之前的钩子
      updated() {
        localStorage.setItem("active-name",this.activeIndex);
        localStorage.setItem("open-names",this.openNames);//然后再保存新的 open-names
      }

    }

    //用来删除数组中指定的val,原生js是没有这个功能的
    Array.prototype.remove = function(val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };

</script>

<style scoped>

  a{
    /* 去除所有a标签的默认下划线 */
    text-decoration: none;
  }

  .layout{
    background: white;
    position: relative;
    height: 100vh;
  }

  .layout-logo-left{
    width: auto;
    border-radius: 3px;
    color: white;
    font-size: 30px;
    background: #464c5b;
    font-family:"华文新魏",cursive;
    padding: 15px;
    font-weight: bold;
  }

  .layout-logo-left span{
    font-size: 25px;
    padding: 5px;
  }

  .layout-menu-left{
    background: white;
    /*background-color: rgb(81, 90, 110);*/
    height: auto;
    border: none;
  }

  .style-tab{
    /*background-color: red;*/
  }


  .style-tabpane{
    background-color: white;
  }

  .tabpane-content{
    height: 93vh;
    overflow: auto;
    /*border: 1px solid red;*/
  }


</style>
