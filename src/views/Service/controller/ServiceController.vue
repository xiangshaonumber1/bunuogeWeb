<template>
  <div class="layout">

    <Row type="flex">
      <!-- 左侧，导航栏 -->
      <Col span="4" class="layout-menu-left">
        <Menu :theme="theme" width="auto" style="height: 100vh;">
          <div class="layout-logo-left" v-on:click="goHome">OK博客<span>管理中心</span></div>
          <Submenu v-for="submenu in submenuList" :key="submenu.parent_index" :name="submenu.parent_title" style="font-size: 18px">
            <template slot="title"><Icon :type="submenu.icon" size="25"></Icon>{{submenu.parent_title}}</template>
            <MenuItem v-if="submenu.is_child" v-for="child in submenu.childList" :key="child.child_index" :name="child.child_title" @click.native="addTab(child.child_index,child.child_title)" >{{child.child_title}}</MenuItem>
          </Submenu>
        </Menu>
      </Col>

      <Col  span="20">
        <Tabs class="style-tab" type="card" v-model="activeName" closable @on-tab-remove="removeTab">
          <TabPane class="style-tabpane"
            v-for="item in editableTabs"
            v-if="item.name!=null"
            :key="item.name"
            :label="item.title"
            :name="item.name">{{item.content}}</TabPane>
        </Tabs>
      </Col>
    </Row>

  </div>
</template>

<script>
    export default {
        name: "ServiceController",
      data(){
          return{
            animal: '爪哇犀牛',
            submenuList:[
              //每一个父菜单和其子菜单的所有设置
              {parent_index:'1',parent_icon:'el-icon-menu',parent_title:'博客详情',icon:'md-globe',is_child:true,
                childList:[
                  {child_title:'统计详情',child_index:'1-1'},
                  {child_title:'个人详情',child_index:'1-2'},
                ]},
              {parent_index:'2',parent_icon:'el-icon-edit',parent_title:'发布文章',icon:'md-create',is_child:true,
                childList:[
                  {child_title:'写文章',child_index:'2-1'},
                  {child_title:'写日记',child_index:'2-2'},
                  {child_title:'提问题',child_index:'2-3'},
              ]},
              {parent_index:'3',parent_icon:'el-icon-location',parent_title:'文章管理',icon:'ios-copy',is_child:true,
                childList:[
                  {child_title:'博文统计',child_index:'3-1'},
                  {child_title:'博文编辑',child_index:'3-2'},
                ]},
              {parent_index:'4',parent_icon:'el-icon-share',parent_title:'友链管理',icon:'ios-link',is_child:true,
                childList:[
                  {child_title:'连接编辑',child_index:'4-1'},
                ]},
              {parent_index:'5',parent_icon:'el-icon-location',parent_title:'标签管理',icon:'ios-bookmark',is_child:true,
                childList:[
                  {child_title:'标签编辑',child_index:'5-1'},
                ]},
              {parent_index:'6',parent_icon:'el-icon-setting',parent_title:'系统管理',icon:'md-settings',is_child:true,
                childList:[
                  {child_title:'角色管理',child_index:'6-1'},
                  {child_title:'权限管理',child_index:'6-2'}
                ]
              },

            ],
            //以后给下面这些值给个默认值，用作展示首页帮助面板
            activeName:null,//当前显示的table
            editableTabs:[{
              title:null,
              name:null, //和activeName对应
              content:null
            }],
            openNames:[],
            theme: 'light'
          }
      },
      methods: {
        //**********************  methods star ****************************
        goHome:function(){
          console.log("跳转到首页");
          this.$router.push({name:'home'})
        },

        //添加Tab标签内容
        addTab: function (childIndex,childTitle) {
          let result = this.openNames.indexOf(childIndex);
          if (result === -1){
            //刷新全局的值
            this.editableTabs.push({
              title: childTitle,//选项卡标题
              name: childIndex, //选项卡的编号
              content: "New Tab Content" + "_" + childIndex + "_" //选项卡的正文内容
            });
            this.openNames.push(childIndex);//将刚创建的选项卡的编号存入openNames
          }
          this.activeName = childIndex
        },

        //删除指定tab标签的内容
        removeTab(childIndex) {
          this.openNames.remove(childIndex);
          /** 勿删 **/
          let tabs = this.editableTabs;
          this.editableTabs = tabs.filter(tab => tab.name !== childIndex);
        },

      },
      //**********************  methods end ****************************

      //此钩子中函数一般会做一些ajax请求获取数据进行数据初始化，mounted 在整个实例中只执行一次
      mounted:function () {
        var open = localStorage.getItem("open-names");
        var active = localStorage.getItem("active-name");
        console.log("从localStorage中获取到的"+"\n"+ "open:"+open+'\n'+"active:"+active);
        if (null != open){
          console.log("初始化的 openNames value:"+this.openNames);
          this.openNames = open.split(",");
          console.log("初始化后的 openNames value:"+this.openNames+' openNames 长度：'+this.openNames.length);
          for (var i=0;i<this.openNames.length;i++){
            console.log(" 正在处理： "+this.openNames[i]);
            for (var j=0;j<this.submenuList.length;j++){
              for (var k=0;k<this.submenuList[j].childList.length;k++){
                if (this.submenuList[j].childList[k].child_index === this.openNames[i]){
                  console.log("成功找到："+this.submenuList[j].childList[k]);
                  this.editableTabs.push({
                    title: this.submenuList[j].childList[k].child_title,//选项卡标题
                    name: this.submenuList[j].childList[k].child_index, //选项卡的编号
                    content: "New Tab Content" + "_" + this.submenuList[j].childList[k].child_index + "_" //选项卡的正文内容
                  });
                }
              }
            }
          }
          if (null != active){
            console.log("初始化的 activeName value:"+this.activeName);
            this.activeName = active;
            console.log("赋值后的 activeName value:"+this.activeName)
          }
        }
        console.log('最后'+'\n'+'openNames:'+this.openNames+'\n'+'activeName:'+this.activeName+'\n')
      },
      //实例销毁完成执行的钩子，跳转到其他页面时，清空保存的open-names和active-name
      destroyed:function () {
          localStorage.removeItem("open-names");
          localStorage.removeItem("active-name");
      },
      //实时监控数据变化并随之更新DOM，updated是更新之后的钩子，beforeUpdate是更新之前的钩子
      updated:function () {
        localStorage.setItem("active-name",this.activeName);
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
    font-size: 20px;
    color: cadetblue;
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
