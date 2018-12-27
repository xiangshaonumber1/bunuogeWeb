<template>
  <div id="ServiceController">

    <!--container 布局-->
      <el-container style="height: 100vh">
        <!--侧边栏容器-->
        <el-aside style="width: 210px;">
          <!--导航栏-->
          <el-menu
            default-active="1"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            style="height: 100%;width: 210px">

            <p class="menuTitle" v-on:click="goHome">XiangShao</p>

            <!--第一个导航条-->
            <el-submenu v-for="submenu in submenuList" :index="submenu.parent_index">
              <template slot="title">
                <i :class="submenu.parent_icon"></i>
                <span>{{submenu.parent_title}}</span>
              </template>
              <el-menu-item-group v-if="submenu.is_child">
                <el-menu-item v-for="child_menu in submenu.childList" :index="child_menu.child_index" @click="addTab(submenu.parent_index,child_menu.child_index,child_menu.child_title)">{{child_menu.child_title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-container>
          <!--主要区域容器-->
          <el-main style="">
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"  >
              <el-tab-pane
                v-for="item in editableTabs"
                v-if="item.name!=null"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                {{item.content}}
              </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </el-container>

  </div>
</template>

<script>
    export default {
        name: "ServiceController",
      data(){
          return{
            submenuList:[
              //每一个父菜单和其子菜单的所有设置
              {parent_index:'1',parent_icon:'el-icon-menu',parent_title:'网站统计',is_child:false},
              {parent_index:'2',parent_icon:'el-icon-edit',parent_title:'发布文章',is_child:false},
              {parent_index:'3',parent_icon:'el-icon-location',parent_title:'文章管理',is_child:false},
              {parent_index:'4',parent_icon:'el-icon-share',parent_title:'友链管理',is_child:false},
              {parent_index:'5',parent_icon:'el-icon-location',parent_title:'标签管理',is_child:false},
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
            tabsIndex:[]
          }
      },
      methods: {
        goHome:function(){
          console.log("跳转到首页")
          this.$router.push({name:'home'})
          },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClick(tab, event) {
          console.log(tab, event)
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
  .menuTitle{
    color: #0aac8e;
    text-align: center;
    font-size: xx-large;
    padding-top: 20px;
  }

  .el-header {
    background-color: #545c64;
    /*background-color: #B3C0D1;*/
    color: white;
    line-height: 60px;
  }

</style>
