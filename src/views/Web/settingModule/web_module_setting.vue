<template>
    <div>
      <Row class="code-row-bg" type="flex" justify="center" align="top" style="margin-top: 3vh">

        <!--导航栏部分-->
        <i-col span="3">
          <Card :padding="0.2">
            <span slot="title" style="font-size: 18px;font-weight: bold">个人设置</span>
            <Menu mode="vertical" width="auto" @on-select="goSetting" :active-name="this.activeName">
              <MenuItem name="update_password">修改密码</MenuItem>
            </Menu>
          </Card>
        </i-col>

        <!--调用组件化部分-->
        <i-col offset="1" span="10">
          <Card>
            <router-view></router-view>
          </Card>
        </i-col>
      </Row>

    </div>
</template>

<script>
    export default {
        name: "Web_setting",
      data(){
          return{
            activeName:'update_password'
          }
      },
      methods:{

          //前往对应的设置中心
          goSetting(name){
            // console.log("我点击的是,",name)
            this.$router.push({name:name})
          },

          //获取当前路由名称
          getRouteName(){
            this.activeName = this.$route.name;
          }
      },

      mounted() {
          //检测，并设置路由
        this.getRouteName();
      },

      watch:{
          "$route":"getRouteName"
      }
    }
</script>

<style scoped>

</style>
