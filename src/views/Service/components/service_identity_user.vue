<template>
    <div id="management_user">

      <Row type="flex" class="code-row-bg" align="middle" justify="space-around">

        <i-col span="24">
          <Divider horization orientation="left"><span>用户权限管理</span></Divider>
        </i-col>

        <i-col span="24">
          <div class="identity_header">
            <Input search v-model.trim="searchKey" :maxlength="20" style="width: 400px;" @on-search="doSearch(searchKey)" placeholder="请输入 用户openID / 昵称 / 邮箱 进行搜索" size="large"></Input>
            <Button type="info" size="large" @click="doSearch(searchKey)">搜&emsp;索</Button>
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

            <!--用户权限部分-->
            <template slot-scope="{ row, index }" slot="permission">
              <div v-if="row.openID === '0' || row.openID === $store.getters.openID">
                <Tag  v-for="(permission,index) in row.permission" :key="index">{{permission}}</Tag>
              </div>

              <i-select v-else v-model="row.permission" @on-open-change="allowedChange" @on-change="updatePermission(row.openID,$event)" multiple>
                <i-option v-for="permission in dictionary_permission" :value="permission" :label="permission" :key="permission" ></i-option>
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
            {title:'openID', slot:'openID',ellipsis:true,align:'center',width:100},
            {title:'用户昵称', slot:'nickname',ellipsis:true,align:'center'},
            {title:'用户邮箱',slot:'email',ellipsis:true,align:'center'},
            {title:'用户身份',slot:'role',ellipsis:true,align:'center'},
            {title:'用户权限',slot:'permission',align:'center',minWidth:100}
          ],
          userDataList:[],  //用户数据
          userDataTotal:0,  //数据总量
          dictionary_role:[], //用户身份字典
          dictionary_permission :[], //用户权限字典
          could_update : false,   //是否允许修改用户权限问题
        }
      },
      methods:{

        allowedChange(value){
          console.log("是否允许修改 ： ",value);
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
          async getUserRoleAndPermissionList(page,key_word) {
            const result = await this.$apis.AdminApi.getUserRoleAndPermissionList(page,key_word);
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
            }
          },
          // 回车，点击搜索图标，或点击搜索按钮 时 执行
          doSearch(key_word){
            this.getUserRoleAndPermissionList(1,key_word);
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
