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
            <template slot-scope="{ row, index }" slot="id">
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
              <Button @click="ready_update_permission(row,index)">权限详情</Button>
            </template>
          </Table>
          <!-- 分页模块 -->
          <Page style="margin-top: 30px" class="text-center" show-total :total="userDataTotal" @on-change="getUserRoleAndPermissionList" />
        </i-col>

        <!-- 点击管理(用户身份),出现的对话框 -->
        <!--<Modal title="用户身份管理" v-model="showModal_role" :mask-closable="false" @on-ok="save_role" @on-cancel="cancel_role">-->
          <!--<Transfer :data="data_role"-->
                    <!--:target-keys="data_role_key"-->
                    <!--:render-format="render_role_permission"-->
                    <!--:titles="title_role"-->
                    <!--style="border: 1px solid gold;"-->
                    <!--@on-change="change_role"/>-->
        <!--</Modal>-->

        <!-- 点击详情(用户权限) 时，出现的对话框 -->
        <Modal title="用户权限管理" v-model="showModal_permission" :mask-closable="false" @on-ok="updatePermission" @on-cancel="cancel_permission">
          <Transfer :data="data_permission"
                    :target-keys="data_permission_key"
                    :render-format="render_role_permission"
                    :titles="title_permission"
                    style="border: 1px solid red;"
                    @on-change="change_permission"/>
        </Modal>

      </Row>
    </div>
</template>

<script>
    export default {
        name: "management_user",
      data(){
        return {
          searchKey:null,//搜索关键字
          showModal_role:false, //是否显示修改角色身份对话框
          showModal_permission:false, //是否显示修改角色权限对话框
          data_permission:[], //权限字典
          data_permission_key:[], //拥有的权限的对应的key
          title_permission:["未拥有权限","已拥有权限"],
          tabHead:[
            {title:'ID', slot:'id',ellipsis:true,align:'center',minWidth:100},
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
        async updatePermission(aim_openID) {
          console.log("输出 localStorage.getItem(\"data_permission\")：",localStorage.getItem("data_permission"));
          const data_permission = localStorage.getItem("data_permission").split(",");
          console.log("输出 data_permission：",data_permission);
          console.log("输出 this.data_permission_key：",this.data_permission_key);
          if (data_permission.toString() === this.data_permission_key.toString()){
            console.log(" permission 改变前 和 改变后 数据一致，不用保存")
          }else {
            console.log(" permission 改变前 和 改变后 数据不一致，需要保存")
          }
          this.showModal_permission = false;
          console.log("save_permission 完成")

          // await this.$apis.AdminApi.updateRoleOrPermission(aim_openID, new_permission, "permission");
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


        //permission 修改：点击 弹出对话框，可修改 permission
        ready_update_permission(row,index){
            //显示修改权限对话框
            this.showModal_permission = true;
            //权限字典,生成对饮的key和label,必须要
            const permission_template = ["add","delete","update"];
            let temp_permission=[];
            for (let k=0;k<permission_template.length;k++){
              temp_permission.push({
                  key:permission_template[k],
                  label:permission_template[k],
                  disable:false,
                })
            }
            //将字典排序后赋给 data_permission
            this.data_permission = temp_permission.sort();


          //data_permission 用户目前拥有的 权限
          const data_permission = JSON.parse(row.permission);
          //保存现有的权限到session中
          localStorage.setItem("data_permission",data_permission);
          let temp_permission_key = [];
          //根据现有的权限，转换成对应的key
          for (let l=0;l<data_permission.length;l++){
            temp_permission_key.push(data_permission[l])
          }
          this.data_permission_key = temp_permission_key.sort();
        },


        /**
         * permission 穿梭框， 有数据移动时，执行
         * @param newTargetKeys 改变后的值
         * @param direction 移动方向
         * @param moveKeys 被移动的值
         */
        change_permission(newTargetKeys,direction,moveKeys){
          this.data_permission_key = newTargetKeys;
        },


        //permission 对话框，取消后执行
        cancel_permission(){
          console.log("permission 对话框关闭");
          localStorage.removeItem("data_permission");
          this.data_permission = [];
          this.data_permission_key=[];
        },

        //每行数据显示的格式函数，默认优先显示 label 值，没有时显示 key 值，可以自己组合出需要的数据格式。
        render_role_permission (item) {
          return item.label;
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
