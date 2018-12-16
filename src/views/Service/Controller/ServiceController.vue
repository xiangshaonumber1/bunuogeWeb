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
                <el-menu-item v-for="child_menu in submenu.childList" :index="child_menu.child_index" @click="addTab(submenu.parent_index,child_menu.child_index.split('-')[1])">{{child_menu.child_title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>

        <el-container>
          <!--<el-header>顶部导航栏</el-header>-->
          <!--主要区域容器-->
          <el-main style="">
            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
              <el-tab-pane
                v-for="(item, index) in editableTabs"
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
            editableTabsValue: '1',
            editableTabs:[{
              title:'Tab 1',
              name:'1',
              content:'Tab 1 content'
            }],
            tabIndex:1
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
        addTab(parentIndex,childIndex) {
          console.log("点击了："+ parentIndex +','+childIndex)
          let newTabIndex = ++this.tabIndex + '';
          console.log("点击了第"+parentIndex+"个父菜单下的第"+childIndex+"个子菜单 ")
          this.editableTabs.push({
            title:this.submenuList[parentIndex-1].childList[childIndex-1].child_title,
            name: newTabIndex,
            content: "New Tab Content"+this.tabIndex
          });
          this.editableTabsValue = newTabIndex
        },
        removeTab(childIndex) {
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
        },


      }
    }
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
