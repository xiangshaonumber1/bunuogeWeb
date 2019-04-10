<template>
    <div id="management_user">

      <Row type="flex" class="code-row-bg" align="middle" justify="space-around">

        <i-col span="24">
          <Divider horization orientation="left"><span>用户权限管理</span></Divider>
        </i-col>

        <i-col span="24">
          <div class="identity_header">
            <Input search v-model.trim="searchKey" :maxlength="20" style="width: 400px;" @on-search="doSearch" placeholder="请输入 用户openID / 昵称 / 邮箱 进行搜索" size="large"></Input>
            <Button type="info" size="large" @click="doSearch">搜&emsp;索</Button>
            <Button type="error" size="large" style="float: right;margin: 0 10px" @click="resetPassword" :disabled="tableSelectedRow<0">重 置 密 码</Button>
            <Button type="success" size="large" style="float: right;margin: 0 10px" @click="refreshAll">刷 新 全 部</Button>

          </div>
        </i-col>

        <!--表单数据展示-->
        <i-col span="24">
          <Table ref="userDataTable" :columns="tabHead" :data="userDataList" border @on-row-click="selectedRow" highlight-row>
            <template slot-scope="{ row, index }" slot="openID">
              <span>{{ row.openID }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="nickname">
              <span v-html="row.nickname"></span>
            </template>
            <template slot-scope="{ row, index }" slot="email">
              <span>{{ row.email }}</span>
            </template>

            <!--用户角色身份-->
            <template slot-scope="{ row, index }" slot="role">
              <!--当前管理员和超级管理员无法被更改，删除，新增-->
              <div v-if="row.openID === '0' || row.openID === $store.getters.openID">
                <span style="font-size: 14px" class="center-block" v-bind:class="{adminColor : row.role === '超级管理员',rootColor : row.role === '管理员',userColor : row.role === '普通用户'}">{{row.role}}</span>
              </div>
              <i-select v-else v-model="row.role" @on-change="updateRole(row.openID,$event)" v-bind:class="{adminColor : row.role === '超级管理员',rootColor : row.role === '管理员',userColor : row.role === '普通用户'}">
                <i-option v-for="(role,index) in dictionary_role" v-if="!(role === '超级管理员')" :value="role" :label="role" :key="index" v-bind:class="{adminColor : role === '超级管理员',rootColor : role === '管理员',userColor : role === '普通用户'}"></i-option>
              </i-select>
            </template>

            <!--用户权限部分。超级管理员或者是用户自己，都不能编辑-->
            <template slot-scope="{ row, index }" slot="permission">
              <div v-if="row.openID === '0' || row.openID === $store.getters.openID">
                <Tag  v-for="(permission,index) in row.permission" :key="index">{{permission}}</Tag>
              </div>
              <i-select v-else v-model="row.permission" @on-open-change="allowedChangePermission" @on-change="updatePermission(row.openID,$event)" multiple>
                <i-option v-for="permission in dictionary_permission" :value="permission" :label="permission" :key="permission" ></i-option>
              </i-select>
            </template>

          </Table>
          <!-- 分页模块 -->
          <Page style="margin-top: 30px" class="text-center" show-total :current="page" :total="userDataTotal" @on-change="getUserRoleAndPermissionList($event,searchKey)" />
        </i-col>

      </Row>
    </div>
</template>

<script>
    export default {
        name: "management_user",
      data(){
        return {
          searchKey:null,//搜索关键字
          tabHead:[
            {title:'openID', slot:'openID',ellipsis:true,align:'center',width:100},
            {title:'用户昵称', slot:'nickname',ellipsis:true,align:'center'},
            {title:'用户邮箱',slot:'email',ellipsis:true,align:'center'},
            {title:'用户身份',slot:'role',ellipsis:true,align:'center'},
            {title:'用户权限',slot:'permission',align:'center',minWidth:100},
          ],
          userDataList:[],  //用户数据
          userDataTotal:0,  //数据总量
          dictionary_role:[], //用户身份字典
          dictionary_permission :[], //用户权限字典
          could_update : false,   //是否允许修改用户权限问题
          tableSelectedRow:-1,
          page:0,
        }
      },
      methods:{

        //表格选中某一行
        selectedRow(row,index){
          console.log("输出当前 index:",index);
          if (index){
            this.tableSelectedRow = index;
          }
        },

        //重置密码
        resetPassword(){
           let openID = this.userDataList[this.tableSelectedRow].openID;
           console.log("需要重置的目标ID",openID);
        },

        //是否允许修改用户权限问题
        allowedChangePermission(value){
          this.could_update = value;
        },

        //  修改用户角色,默认返回的是value，显示label
        async updateRole(aim_openID, new_role) {
          await this.$apis.AdminApi.updateRoleOrPermission(aim_openID, new_role, "role");
        },

        //修改用户权限
        async updatePermission(aim_openID,new_permission) {
          if (this.could_update){
            console.log("正在修改");
            await this.$apis.AdminApi.updateRoleOrPermission(aim_openID,JSON.stringify(new_permission),"permission");
          }
        },

        /**
         * 获取用户部分信息、权限和身份value
         */
          async getUserRoleAndPermissionList(page,key_word,pageCount) {
            const result = await this.$apis.AdminApi.getUserRoleAndPermissionList(page,key_word,pageCount);
            console.log("输出 返回的新信息 ：",result);
            if (result.total>0){
              let temp = result.userRoleAndPermission.userPartInfoList;
              for (let userPart of temp) {
                userPart.permission = JSON.parse(userPart.permission);
              }
              this.userDataList = temp;
              this.userDataTotal = result.total;
              this.dictionary_permission = JSON.parse(result.userRoleAndPermission.dictionary_permission);
              this.dictionary_role = JSON.parse(result.userRoleAndPermission.dictionary_role);
              this.page = page; //设置当前显示页号
              this.tableSelectedRow = -1; //重置当前选中行
            }
          },
          // 回车，点击搜索图标，或点击搜索按钮 时 执行
          doSearch(){
            this.getUserRoleAndPermissionList(1,this.searchKey);
          },

        //加载全部
        refreshAll(){
            //初始化搜索关键字
            this.searchKey = null;
            this.getUserRoleAndPermissionList(1,null)
        }


      },

      mounted() {
          this.getUserRoleAndPermissionList(1,this.searchKey);
        //  全局配置
        // this.$Message.config({
        //   top: 50,
        //   duration: 3
        // });
      },

      beforeDestroy(){
          console.log("identity_user 页面关闭，开始清楚localStorage 数据");
          localStorage.removeItem("data_role");
          localStorage.removeItem("data_permission");
          console.log("data_role,data_permission 已清除完毕");
      }

    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

  .identity_header{
    /*border: 1px solid red;*/
    margin: 20px 0;
    padding-left: 20px;
    padding-right: 20px;
  }
  .adminColor{
    color: red;
  }
  .rootColor{
    color: rgb(65, 184, 131);
  }
  .userColor{
    color: deepskyblue;
  }
</style>
