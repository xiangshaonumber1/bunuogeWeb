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
              <span>{{ row.role }}</span>
              <Button style="float: right" @click="ready_update_role(row,index)">管理</Button>
            </template>

            <template slot-scope="{ row, index }" slot="permission">
              <Button @click="ready_update_permission(row,index)">详情</Button>
            </template>

          </Table>
        </i-col>


        <!-- 点击管理(用户身份),点击详情(用户权限) 时，出现的对话框 -->
        <Modal :title="ModalTitle" v-model="showModal" :closable="false" :mask-closable="false">
          <Transfer :data="role_or_permission" :target-keys="role_or_permission_key" :render-format="render"  @on-change="update_role_or_permission">
          </Transfer>
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
          showModal:false,
          ModalTitle:null,
          role_or_permission:this.getMockData(), //既可以用于存放role信息，也可以用于存放 permission 信息
          role_or_permission_key:[], //对应的key值
          tabHead:[
            {title:'ID', slot:'id',ellipsis:true,align:'center',minWidth:80},
            {title:'用户昵称', slot:'nickname',ellipsis:true,align:'center',minWidth:300},
            {title:'用户邮箱',slot:'email',ellipsis:true,align:'center',minWidth:300},
            {title:'用户身份',slot:'role',ellipsis:true,align:'center',minWidth:200},
            {title:'用户权限',slot:'permission',align:'center',minWidth:100}
          ],
          userData:[
            {id:1,nickname:'丿丶祥灬少',email:'821940979@qq.com',role:'admin',permission:'{"add","update","delete"}'},
            {id:2,nickname:'丿丶祥',email:'1051308182@qq.com',role:'root',permission:'{"add","update","delete"}'},
            {id:3,nickname:'丿丶少',email:'18482033263@sina.com',role:'user',permission:''}
          ],
        }
      },
      methods:{
          doSearch(){
            this.$Message.error("对方不想说话，并向你抛出了一个异常")
          },

        getMockData(){
          var mockData = [];
          var labels = ["admin","root","user"];
          for (let i =1 ;i<=3;i++){
            mockData.push({
              key:i.toString(),
              label: labels[i-1],
              disabled: false
            })
          }
          console.log("mockData:",mockData);

          return mockData;

        },
        //点击管理用户身份
        ready_update_role(row,index){
            this.showModal = true
        },

        //点击管理用户权限
        ready_update_permission(row,index){

        },

        update_role_or_permission(){

        },
        render (item) {
          return item.label;
        },
      },
      mounted() {
        //  全局配置
        this.$Message.config({
          top: 50,
          duration: 3
        });
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
