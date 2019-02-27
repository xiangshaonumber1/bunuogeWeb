<template>
    <div>

      <Row type="flex" class="code-row-bg"  align="top" justify="center" style="margin-top: 3vh">
        <!-- 个人中心导航栏 -->
        <i-col span="4" style="margin-right: 1vw">
          <Card :padding="0" icon="md-options">
            <!--<Icon slot="icon" type="md-options" size="large" />-->
            <h4 slot="title"><strong>个人中心</strong></h4>
            <CellGroup @on-click="getPersonalData">
              <Cell name="web_personal_info" :selected="personalCenterType === 'web_personal_info'">
                <Icon slot="icon" type="md-person" size="20" />&nbsp;<span>个人资料</span>
              </Cell>
              <Cell name="web_data_articles" :selected="personalCenterType === 'web_data_articles'">
                <Icon slot="icon" type="ios-paper" size="20" />&nbsp;<span>我的文章</span>
              </Cell>
              <Cell name="web_data_diaries" :selected="personalCenterType === 'web_data_diaries'">
                <Icon slot="icon" type="md-bookmarks" size="20" />&nbsp;<span>我的日记</span>
              </Cell>
              <Cell name="web_data_collection" :selected="personalCenterType === 'web_data_collection'">
                <Icon slot="icon" type="md-star" size="20" />&nbsp;<span>我的收藏</span>
              </Cell>
            </CellGroup>
          </Card>

        </i-col>

        <!-- 对应的个人中心的内容 -->
        <i-col span="10">
          <router-view></router-view>
        </i-col>
      </Row>

    </div>
</template>

<script>
    export default {
        name: "web_userInfo",
      data(){
        return {
          personalCenterType:'',
        }
      },
      methods:{
        //根据选择的不同，切换不同的vue组件，显示相应的类容
        getPersonalData(name){
          switch (name) {
            case "web_personal_info":
              this.$router.push({name:"web_personal_info"});
              break;
            case "web_data_articles":
              this.$router.push({name:"web_data_articles"});
              break;
            case "web_data_diaries":
              this.$router.push({name:"web_data_diaries"});
              break;
            case "myCollection":
              this.$router.push({path:""});
              break;
          }
        },

        //获取当前路由的Name
        getRouteName(){
          console.log("web_personal_center getRouteName:",this.$route.name);
          this.personalCenterType = this.$route.name
        }

      },

      mounted(){
          this.getRouteName();
      },

      watch:{
          "$route":"getRouteName"
      }
    }
</script>

<style scoped>

  span{
    font-size: 16px;
  }

</style>
