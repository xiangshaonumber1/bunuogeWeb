<template>
  <div class="layout">

    <Row type="flex">
      <!-- 左侧，导航栏 -->
      <Col span="4" class="layout-menu-left">
        <Menu :theme="theme" width="auto" style="height: 100vh;">
          <div class="layout-logo-left" v-on:click="goHome">OK博客<span>管理中心</span></div>
          <Submenu v-for="submenu in submenuList" :key="submenu.parent_index" :name="submenu.parent_title" style="font-size: 18px">
            <template slot="title"><Icon :type="submenu.icon" size="25"></Icon>{{submenu.parent_title}}</template>
            <MenuItem v-if="submenu.is_child" v-for="child in submenu.childList" :key="child.child_index" :name="child.child_title" @click.native="addTab(child.child_index,child.child_title,child.to_path)">
              {{child.child_title}}
            </MenuItem>
          </Submenu>
        </Menu>
      </Col>

      <Col  span="20">
        <Tabs class="style-tab" type="card" v-model="activeIndex" closable @on-tab-remove="removeTab" @on-click="TabClick">
          <TabPane class="style-tabpane"
            v-for="item in editableTabs"
            v-if="item.index!=null"
            :key="item.index"
            :label="item.title"
            :name="item.index"
          ><router-view></router-view></TabPane>
        </Tabs>
      </Col>
    </Row>

  </div>
</template>

<script>
  //导入Vue组件

    export default {
        name: "ServiceController",
      data(){
          return{
            animal: '爪哇犀牛',
            submenuList:[
              //每一个父菜单和其子菜单的所有设置
              {parent_index:'1',parent_icon:'el-icon-menu',parent_title:'博客详情',icon:'md-globe',is_child:true,
                childList:[
                  {child_title:'统计详情',child_index:'1-1',to_path:'ServiceController/white'},
                  {child_title:'个人详情',child_index:'1-2',to_path:'ServiceController/white'},
                ]},
              {parent_index:'2',parent_icon:'el-icon-edit',parent_title:'发布文章',icon:'md-create',is_child:true,
                childList:[
                  {child_title:'写文章',child_index:'2-1',to_path:'ServiceController/write'},
                  {child_title:'写日记',child_index:'2-2',to_path:'ServiceController/white'},
                  {child_title:'提问题',child_index:'2-3',to_path:'ServiceController/white'},
              ]},
              {parent_index:'3',parent_icon:'el-icon-location',parent_title:'文章管理',icon:'ios-copy',is_child:true,
                childList:[
                  {child_title:'博文统计',child_index:'3-1',to_path:'ServiceController/white'},
                  {child_title:'博文编辑',child_index:'3-2',to_path:'ServiceController/white'},
                ]},
              {parent_index:'4',parent_icon:'el-icon-share',parent_title:'友链管理',icon:'ios-link',is_child:true,
                childList:[
                  {child_title:'连接编辑',child_index:'4-1',to_path:'ServiceController/white'},
                ]},
              {parent_index:'5',parent_icon:'el-icon-location',parent_title:'标签管理',icon:'ios-bookmark',is_child:true,
                childList:[
                  {child_title:'标签编辑',child_index:'5-1',to_path:'ServiceController/white'},
                ]},
              {parent_index:'6',parent_icon:'el-icon-setting',parent_title:'系统管理',icon:'md-settings',is_child:true,
                childList:[
                  {child_title:'角色管理',child_index:'6-1',to_path:'ServiceController/white'},
                  {child_title:'权限管理',child_index:'6-2',to_path:'ServiceController/white'}
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
            intI:0
          }
      },

      //**********************  methods star ****************************
      methods: {
        goHome:function(){
          console.log("跳转到首页");
          this.$router.push({name:'home'})
        },


        //实现点击面板，传递子菜单
        TabClick:function(){
          var path = '/404';
          for (var i = 0 ;i<this.submenuList.length;i++){
            for (var j = 0;j<this.submenuList[i].childList.length;j++){
              if (this.submenuList[i].childList[j].child_index === this.activeIndex){
                path = this.submenuList[i].childList[j].to_path;
              }
            }
          }
          console.log('TabClick '+this.intI++);
          this.$router.push({name:path})
        },

        //添加Tab标签内容
        addTab: function (childIndex,childTitle,to_path) {
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
          console.log('addTab '+this.intI++);
          this.$router.push({name:to_path})
        },

        //删除指定tab标签的内容
        removeTab(childIndex) {
          var path = 'ServiceController';
          this.openNames.remove(childIndex);
          /** 勿删 **/
          let tabs = this.editableTabs;
          this.editableTabs = tabs.filter(tab => tab.index !== childIndex);

          for (var i = 0 ;i<this.submenuList.length;i++){
            for (var j = 0;j<this.submenuList[i].childList.length;j++){
              if (this.submenuList[i].childList[j].child_index === this.activeIndex){
                path = this.submenuList[i].childList[j].to_path;
              }
            }
          }
          console.log('removeTab '+this.intI++);
          this.$router.push({name:path})
        },

      },
      //**********************  methods end ****************************

      //此钩子中函数一般会做一些ajax请求获取数据进行数据初始化，mounted 在整个实例中只执行一次
      mounted:function () {
        var open = localStorage.getItem("open-names");
        var active = localStorage.getItem("active-name");
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
                    console.log('mounted '+this.intI++);
                    this.$router.push({name:this.submenuList[j].childList[k].to_path});
                    this.activeIndex = active;
                  }
                }
              }
            }
          }
        }else {//表示没有打开的选项卡，自然也没有正在显示的选项卡，则重新定位到ServiceController主页
          console.log('mounted '+this.intI++);
          this.$router.push({name:"ServiceController"})
        }
      },

      //实例销毁完成执行的钩子，跳转到其他页面时，清空保存的open-names和active-name
      destroyed:function () {
          localStorage.removeItem("open-names");
          localStorage.removeItem("active-name");
      },

      //实时监控数据变化并随之更新DOM，updated是更新之后的钩子，beforeUpdate是更新之前的钩子
      updated:function () {
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
    background: #f5f7f9;
    position: relative;
    height: 100vh;
  }


  .layout-logo-left{
    width: auto;
    border-radius: 3px;
    color: white;
    font-size: 35px;
    background: #464c5b;
    font-family: "简楷体", fantasy;
    padding: 5px;
    font-weight: bold;
  }
  .layout-logo-left span{
    font-size: 25px;
    padding: 5px;
  }


  .layout-menu-left{
    background: #464c5b;
    /*background-color: rgb(81, 90, 110);*/
  }

  .style-tabpane{
    font-size: 18px;
    /*color: cadetblue;*/
    /*background-color: lightskyblue;*/
    padding: 5px;
    /*border: 1px solid red;*/
    height: auto;
  }
  .style-tab{
    background-color: white;
    height: 100vh;
  }


</style>
