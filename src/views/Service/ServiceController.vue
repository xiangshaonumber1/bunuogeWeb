<template>
  <div class="layout">

    <Row v-if="isAdmin" type="flex">

      <!-- 左侧，导航栏 -->
      <i-col span="4" class="layout-menu-left">
        <Menu :theme="theme" width="auto" class="menu-controller" :active-name="activeName">
          <div class="layout-logo-left" v-on:click="goIndex">GetOk<span>后台管理</span></div>
          <Submenu v-for="submenu in submenuList" :key="submenu.parent_index" :name="submenu.parent_index">
            <template slot="title"><Icon :type="submenu.icon" size="25"></Icon>{{submenu.parent_title}}</template>
            <MenuItem v-if="submenu.is_child" v-for="child in submenu.childList" :key="child.child_index" :name="child.child_index" @click.native="addTab(child.child_index,child.child_title,child.name)">
              {{child.child_title}}
            </MenuItem>
          </Submenu>
        </Menu>
      </i-col>

      <i-col  span="20" class="layout_main_right">
        <Tabs class="style-tab" type="card" v-model="activeName" :animated="false" closable @on-tab-remove="removeTab" @on-click="TabClick">
          <TabPane class="style-tabpane"
            v-for="item in openedTabPanes"
            :key="item.name"
            :label="item.title"
            :name="item.name">
            <div class="tabpane-content">
              <!-- v-if="activeName === item.name" -->
              <router-view v-if="activeName === item.name"></router-view>
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
      data() {
        return {
          isAdmin: false,    //判断当前用户是否是管理员
          submenuList: [

            //每一个父菜单和其子菜单的所有设置
            // {parent_index:'1',parent_icon:'el-icon-menu',parent_title:'博客详情',icon:'md-globe',is_child:true,
            //   childList:[
            //     {child_title:'统计详情',child_index:'1-1',to_path:'service_blog_state'},
            //     {child_title:'个人详情',child_index:'1-2',to_path:'service_user_info'},
            //     {child_title:'空白测试',child_index:'1-3',to_path:'service_user_info'},
            //   ]},
            //
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

            {
              parent_index: '4',
              parent_icon: 'el-icon-setting',
              parent_title: '系统管理',
              icon: 'md-settings',
              is_child: true,
              childList: [
                {child_title: '文章管理', child_index: '4-1', name: 'article_management'},
                // {child_title:'评论管理',child_index:'4-2',to_path:'commentsManagement'},
                {child_title: '反馈信息', child_index: '4-3', name: 'feedback_management'},
                {child_title: '用户管理', child_index: '4-4', name: 'user_management'},
                {child_title: '消息发送', child_index: '4-5', name: 'system_message_management'},
                {child_title: '链接编辑', child_index: '4-6', name: 'link_management'},
              ]
            },
          ],
          //以后给下面这些值给个默认值，用作展示首页帮助面板
          activeName: '',//当前激活的面板名
          openNames: [],
          openedTabPanes: [],
          theme: 'dark',
        }
      },

      //**********************  methods star ****************************
      methods: {

        //前往首页
        goIndex() {
          console.log("跳转到首页");
          this.$router.push({name: 'index'})
        },

        //实现点击面板，显示相应的界面
        TabClick(name) {
          this.$router.push({name: name})
        },

        //添加Tab标签内容
        addTab(index, title, name) {
          //点击后，立即激活当前面板
          this.activeName = name;

          for (let item of this.openedTabPanes){
            if (item.name === name){
              console.log("已打开了");
              return;
            }
          }

          //刷新全局的值
          this.openedTabPanes.push({
            index: index, //选项卡的编号
            title: title,//选项卡标题
            name: name,//可以是路径
          });

          // this.openNames.push(childIndex);//将刚创建的选项卡的编号存入openNames
          console.log('addTab 新增选项卡：', title);
          this.$router.push({name: name})
        },

        //删除指定tab标签的内容
        removeTab(name) {
          console.log("删除前：", this.openedTabPanes);
          this.openedTabPanes.some( (item,i)=>{
            if (item.name === name){
              console.log("需要删除的下标：",i);
              this.openedTabPanes.splice(i,1);
            }
          });
          console.log("删除后：", this.openedTabPanes);
          //为空时，跳控台
          this.$router.push({name:this.activeName})
        },

        //获取上次打开后未关闭的和已激活的页面
        getOpenAndActivePage() {
          console.log("getOpenAndActivePage 我正在执行");
          let opened = JSON.parse(localStorage.getItem("open-names"));
          let active = localStorage.getItem("active-name");
          console.log("输出 openedName:", opened);
          console.log("输出 activeName", active);
          this.$router.push({name: "ServiceController"})
        },

        //admin权限验证
        async service_login() {
          const token = localStorage.getItem("token");
          if (token) {
            const result = await this.$apis.AuthenticationApi.getToken();
            if (result) {
              //刷新成功
              this.isAdmin = result;
              this.getOpenAndActivePage();
            } else {
              //刷新失败
              return this.$router.push({name: 'index'})
            }
          } else {
            return this.$router.push({name: 'index'})
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
        console.log("ServiceController 即将销毁");
        localStorage.removeItem("open-names");
        localStorage.removeItem("active-name");
      },

      //实时监控数据变化并随之更新DOM，updated是更新之后的钩子，beforeUpdate是更新之前的钩子
      updated() {
        console.log(" 长度是否足够 ",this.openedTabPanes.length );
        if(this.activeName!==null){
          localStorage.setItem("active-name",this.activeName);
        }
        if (this.openedTabPanes.length >0){
          localStorage.setItem("open-names",JSON.stringify(this.openedTabPanes));//然后再保存新的 open-names
        }
      },

    }

</script>

<style scoped>

  a{
    /* 去除所有a标签的默认下划线 */
    text-decoration: none;
  }

  .menu-controller{
    height: 100vh;
    overflow: auto;
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
