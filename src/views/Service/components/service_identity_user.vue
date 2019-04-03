<template>
    <div id="management_user">

      <Row type="flex" class="code-row-bg" align="middle" justify="space-around" style="border: 1px solid red">

        <i-col span="24">
          <Divider horization orientation="left"><span>用户权限管理</span></Divider>
        </i-col>

        <i-col span="24">
          <div class="identity_header">
            <Input search v-model="searchKey" :maxlength="20" style="width: 400px;" @on-search="doSearch()" placeholder="用户openID / 昵称 / 邮箱" size="large"></Input>
            <Button type="info" size="large" @click="doSearch">搜&emsp;索</Button>
          </div>
        </i-col>

        <!--表单数据展示-->
        <i-col span="24">
          <Table ref="userDataTable" :columns="tabHead" :data="userDataList" border>
            <template slot-scope="{ row, index }" slot="openID">
              <span>{{ row.openID }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="nickname">
              <span v-html="row.nickname"></span>
            </template>
            <template slot-scope="{ row, index }" slot="email">
              <span>{{ row.email }}</span>
            </template>
            <template slot-scope="{ row, index }" slot="role">
              <!--超级管理员无法被更改，删除，新增-->
              <div v-if="row.role === 'admin'">
                <span class="center-block" style="color: red;font-size: 14px">超级管理员</span>
              </div>
              <i-select v-else v-model="row.role" @on-change="updateRole(row.openID,$event)"
                        v-bind:class="{rootColor : row.role === 'root',userColor : row.role === 'user'}">
                <i-option value="root" label="管理员" style="color: rgb(65, 184, 131)"></i-option>
                <i-option value="user" label="普通用户" style="color:deepskyblue"></i-option>
              </i-select>
            </template>
            <template slot-scope="{ row, index }" slot="permission">
              <i-select v-model="row.permission" multiple>
                <i-option></i-option>
              </i-select>
            </template>
          </Table>
          <!-- 分页模块 -->
          <Page style="margin-top: 30px" class="text-center" show-total :total="userDataTotal" @on-change="getUserRoleAndPermissionList" />
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
            {title:'openID', slot:'openID',ellipsis:true,align:'center',minWidth:100},
            {title:'用户昵称', slot:'nickname',ellipsis:true,align:'center',minWidth:300},
            {title:'用户邮箱',slot:'email',ellipsis:true,align:'center',minWidth:300},
            {title:'用户身份',slot:'role',ellipsis:true,align:'center',minWidth:100},
            {title:'用户权限',slot:'permission',align:'center',minWidth:100}
          ],
          userDataList:[],
          userDataTotal:0,
        }
      },
      methods:{

        //  修改用户角色,默认返回的是value，显示label
        async updateRole(aim_openID, new_role) {
          await this.$apis.AdminApi.updateRoleOrPermission(aim_openID, new_role, "role");
        },

        //修改用户权限
        async updatePermission() {
          const result = await this.$apis.AdminApi.updateRoleOrPermission(this.selected_update_openID,this.data_permission_key,"permission");
          if (result){
            //关闭对话框，并初始化选择openID
            this.showModal_permission = false;
            this.selected_update_openID = '';
          }
        },

        /**
         * 获取用户部分信息、权限和身份
         */
          async getUserRoleAndPermissionList(page) {
            const result = await this.$apis.AdminApi.getUserRoleAndPermissionList(page);
            if (result.total>0){
              this.userDataList = result.userRoleAndPermissionList;
              this.userDataTotal = result.total;
            }
          },
          // 回车，点击搜索图标，或点击搜索按钮 时 执行
          doSearch(){
            this.$Message.error("对方不想执行，并向你抛出了一个异(bai)常(yan)")
          },






      },

      mounted() {
          this.getUserRoleAndPermissionList(1);
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
    margin: 20px 50px;
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
