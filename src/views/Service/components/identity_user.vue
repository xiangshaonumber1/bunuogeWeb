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
          <Table ref="userDataTable" :columns="tabHead" :data="userData" border>

            <template slot-scope="{ row, index }" slot="id">
              <span>{{ row.id }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="nickname">
              <span>{{ row.nickname }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="email">
              <span>{{ row.email }}</span>
            </template>

            <template slot-scope="{ row, index }" slot="role">
              <Button @click="ready_update_role(row,index)">身份详情</Button>
            </template>

            <template slot-scope="{ row, index }" slot="permission">
              <Button @click="ready_update_permission(row,index)">权限详情</Button>
            </template>

          </Table>
        </i-col>

        <!-- 点击管理(用户身份),出现的对话框 -->
        <Modal title="用户身份管理" v-model="showModal_role" :mask-closable="false" @on-ok="save_role" @on-cancel="cancel_role">
          <Transfer :data="data_role"
                    :target-keys="data_role_key"
                    :render-format="render_role_permission"
                    :titles="title_role"
                    style="border: 1px solid gold;"
                    @on-change="change_role"/>
        </Modal>

        <!-- 点击详情(用户权限) 时， -->
        <Modal title="用户权限管理" v-model="showModal_permission" :mask-closable="false" @on-ok="save_permission" @on-cancel="cancel_permission">
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
          showModal_role:false,
          showModal_permission:false,
          data_role:[],
          data_role_key:[],
          title_role:["可分配身份","当前身份"],
          data_permission:[],
          data_permission_key:[],
          title_permission:["未拥有权限","已拥有权限"],
          tabHead:[
            {title:'ID', slot:'id',ellipsis:true,align:'center',minWidth:100},
            {title:'用户昵称', slot:'nickname',ellipsis:true,align:'center',minWidth:300},
            {title:'用户邮箱',slot:'email',ellipsis:true,align:'center',minWidth:300},
            {title:'用户身份',slot:'role',ellipsis:true,align:'center',minWidth:100},
            {title:'用户权限',slot:'permission',align:'center',minWidth:100}
          ],
          userData:[
            {id:1,nickname:'丿丶祥灬少',email:'821940979@qq.com',role:'["admin","root","user"]',permission:'["add","update","delete"]'},
            {id:2,nickname:'丿丶祥',email:'1051308182@qq.com',role:'["root","user"]',permission:'["update","delete"]'},
            {id:3,nickname:'丿丶少',email:'18482033263@sina.com',role:'["user"]',permission:'["add","update"]'}
          ],
        }
      },
      methods:{
          // 回车，点击搜索图标，或点击搜索按钮 时 执行
          doSearch(){
            this.$Message.error("对方不想执行，并向你抛出了一个异(bai)常(yan)")
          },

        //点击 弹出对话框，可修改role
        ready_update_role(row,index){
            //data_role  目前拥有的身份数据
            const data_role = JSON.parse(row.role);
            /*
            同时保存到localStorage中，以便点击确认保存后，判断改变身份前的身份和改变后的身份是否一致，
            如果一致：点击保存，则不做任何处理
            如果不一致：点击保存，实现数据持久化
             */
            localStorage.setItem("data_role",data_role);
            // role_template 目前允许的，全部身份类型模板
            const role_template = ["admin","root","user"];
            this.showModal_role = true;
            let temp_role = [];
            for (let i = 0;i<role_template.length;i++){
              temp_role.push({
                key:role_template[i],
                label: role_template[i],
                disable: false,
              })
            }
            this.data_role = temp_role.sort();

            //根据 身份名，转为为对应的 key数组集合
            let temp_role_key = [];
            for (let j=0;j<data_role.length;j++){
              temp_role_key.push(data_role[j])
            }

            this.data_role_key = temp_role_key.sort();
        },

        //点击 弹出对话框，可修改 permission
        ready_update_permission(row,index){
            //data_permission 目前拥有的 权限
            const data_permission = JSON.parse(row.permission);
            localStorage.setItem("data_permission",data_permission);
            this.showModal_permission = true;
            const permission_template = ["add","delete","update"];
            let temp_permission=[];
            for (let k=0;k<permission_template.length;k++){
              temp_permission.push({
                  key:permission_template[k],
                  label:permission_template[k],
                  disable:false,
                })
            }
            this.data_permission = temp_permission.sort();

            //将从数据库中获取的json数组字符串 转化为json数组
            let temp_permission_key = [];
            for (let l=0;l<data_permission.length;l++){
              temp_permission_key.push(data_permission[l])
            }
            this.data_permission_key = temp_permission_key.sort();
        },

        //role 穿梭框，有数据移动时 执行
        change_role(newTargetKeys,direction,moveKeys){
          console.log("change_role newTargetKeys:",newTargetKeys);
          console.log("change_role direction:",direction);
          console.log("change_role moveKeys:",moveKeys);
          this.data_role_key = newTargetKeys;
        },

        //permission 穿梭框， 有数据移动时，执行
        change_permission(newTargetKeys,direction,moveKeys){
          console.log("change_permission newTargetKeys:",newTargetKeys);
          console.log("change_permission direction:",direction);
          console.log("change_permission moveKeys:",moveKeys);
          this.data_permission_key = newTargetKeys;
        },

        // role 对话框，点击确认后执行
        save_role(){
            // this.showModal_role = false;
          const data_role = localStorage.getItem("data_role").split(",");
          if (data_role.toString() === this.data_role_key.toString()){
            console.log(" role 改变前 和 改变后 数据一致，不用保存")
          }else {
            console.log(" role 改变前 和 改变后 数据不一致，需要保存")
          }
            console.log("save_role 完成")
        },
        // role 对话框，取消时 执行
        cancel_role(){
            console.log("role 对话框关闭");
          localStorage.removeItem("data_role");
          this.data_role =[]
          this.data_role_key=[]
        },

        //permission 对话框，点击确认后执行
        save_permission(){
            const  data_permission = localStorage.getItem("data_permission").split(",");
            if (data_permission.toString() === this.data_permission_key.toString()){
              console.log(" permission 改变前 和 改变后 数据一致，不用保存")
            }else {
              console.log(" permission 改变前 和 改变后 数据不一致，需要保存")
            }
            this.showModal_permission = false;
          console.log("save_permission 完成")
        },

        //permission 对话框，取消后执行
        cancel_permission(){
          console.log("permission 对话框关闭")
          localStorage.removeItem("data_permission")
          this.data_permission = []
          this.data_permission_key=[]
        },

        render_role_permission (item) {
          return item.label;
        },
      },
      mounted() {
        //  全局配置
        this.$Message.config({
          top: 50,
          duration: 3
        });
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

</style>
