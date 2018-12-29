<template>
  <div class="layout">
    <Row type="flex">
      <!-- 左侧，导航栏 -->
      <i-col span="4" class="layout-menu-left">
        <Menu theme="dark" width="auto">
          <div class="layout-logo-left" v-on:click="goHome">OK博客</div>
          <Submenu v-for="submenu in submenuList" :key="submenu.parent_index" :name="submenu.parent_title" style="font-size: 18px">
            <template slot="title"><Icon type="ios-paper"></Icon>{{submenu.parent_title}}</template>
            <MenuItem v-if="submenu.is_child" v-for="child in submenu.childList" :key="child.child_index" :name="child.child_title" @click.native="addTab(submenu.parent_index,child.child_index,child.child_title)" >{{child.child_title}}</MenuItem>
          </Submenu>
        </Menu>
      </i-col>

      <i-col  span="20">
        <Tabs class="style-tab" type="card" v-model=" editableTabsValue" closable @on-tab-remove="removeTab">
          <TabPane class="style-tabpane"
            v-for="item in editableTabs"
            v-if="item.name!=null"
            :key="item.name"
            :label="item.title"
            :name="item.name">{{item.content}}</TabPane>
        </Tabs>
      </i-col>

    </Row>
  </div>
</template>

<script>
    export default {
        name: "ServiceController",
      data(){
          return{
            submenuList:[
              //每一个父菜单和其子菜单的所有设置
              {parent_index:'1',parent_icon:'el-icon-menu',parent_title:'网站统计',is_child:true,
                childList:[
                  {child_title:'网站统计子菜单一号',child_index:'1-1'},
                ]},
              {parent_index:'2',parent_icon:'el-icon-edit',parent_title:'发布文章',is_child:true,
                childList:[
                  {child_title:'发布文章子菜单一号',child_index:'2-1'},
              ]},
              {parent_index:'3',parent_icon:'el-icon-location',parent_title:'文章管理',is_child:true,
                childList:[
                  {child_title:'文章管理子菜单一号',child_index:'3-1'},
                ]},
              {parent_index:'4',parent_icon:'el-icon-share',parent_title:'友链管理',is_child:true,
                childList:[
                  {child_title:'友链管理子菜单一号',child_index:'4-1'},
                ]},
              {parent_index:'5',parent_icon:'el-icon-location',parent_title:'标签管理',is_child:true,
                childList:[
                  {child_title:'标签管理子菜单一号',child_index:'5-1'},
                ]},
              {parent_index:'6',parent_icon:'el-icon-setting',parent_title:'系统管理',is_child:true,
                childList:[
                  {child_title:'系统管理子菜单一号',child_index:'6-1'},
                  {child_title:'系统管理子菜单二号',child_index:'6-2'}
                ]
              },

            ],
            editableTabsValue:null,//当前显示的table
            editableTabs:[{
              title:null,
              name:null,
              content:null
            }],
            tabsIndex:[],
            theme2: 'light'
          }
      },
      methods: {
        goHome:function(){
          console.log("跳转到首页")
          this.$router.push({name:'home'})
          },

        //添加Tab标签内容
        addTab(parentIndex,childIndex,childtitle) {
          let newTabIndex = childIndex;
          let result = this.tabsIndex.indexOf(childIndex);
          console.log(" this.tabsIndex.indexOf(childIndex):"+result)
          if (result===-1) {
            console.log("不存在")
            this.tabsIndex.push(childIndex);
            this.editableTabs.push({
              title:childtitle,
              name: newTabIndex,
              content: "New Tab Content"+"_"+newTabIndex+"_"
            });
          }else {
            console.log("已存在")
          }
          console.log("点击 addTab 后 tabsindex 值为:"+this.tabsIndex);
          this.editableTabsValue = newTabIndex
        },

        //删除指定tab标签的内容
        removeTab(childIndex) {
          this.tabsIndex.remove(childIndex);
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === childIndex) {
            tabs.forEach((tab, index) => {
              if (tab.name === childIndex) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== childIndex);
          console.log("点击 removeTab 后的 tabsIndex:"+this.tabsIndex)
        },
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
  }

  .layout-menu-left{
    background: #464c5b;
    /*background-color: rgb(81, 90, 110);*/
    height: 100vh;
  }

  .layout-logo-left{
    width: 100%;
    border-radius: 3px;
    padding:15px;
    text-align: center;
    color: white;
    height: auto;
    font-size: 3em;
    background: #464c5b;
  }

  .style-tabpane{
    font-size: 25px;
    color: cadetblue;
    /*background-color: lightskyblue;*/
    padding: 5px;
    border: 1px solid red;
  }
  .style-tab{
    tab-size: 50px;
    font-size: 10em;
    height: 100vh;
    background-color: white;
  }


</style>
