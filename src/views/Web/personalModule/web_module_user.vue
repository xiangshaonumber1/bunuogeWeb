<template>
    <div>

      <Row type="flex" class="code-row-bg"  align="top" justify="center" style="margin-top: 3vh">
        <!-- 用户信息导航栏 -->
        <i-col span="4" style="margin-right: 1vw">
          <Card :padding="0" icon="md-options">
            <!--<Icon slot="icon" type="md-options" size="large" />-->
            <h4 slot="title"><strong>个人中心</strong></h4>
            <CellGroup @on-click="getUserInfo">
              <Cell name="web_userInfo" :selected="personalCenterType === 'web_userInfo'">
                <Icon slot="icon" type="md-person" size="20" />&nbsp;<span>{{who}}的主页</span>
              </Cell>
              <Cell name="web_data_articles" :selected="personalCenterType === 'web_data_articles'">
                <Icon slot="icon" type="ios-paper" size="20" />&nbsp;<span>{{who}}的文章</span>
              </Cell>
              <Cell name="web_data_diaries" :selected="personalCenterType === 'web_data_diaries'">
                <Icon slot="icon" type="md-bookmarks" size="20" />&nbsp;<span>{{who}}的日记</span>
              </Cell>
              <Cell name="web_data_collection" :selected="personalCenterType === 'web_data_collection'">
                <Icon slot="icon" type="md-star" size="20" />&nbsp;<span>{{who}}的收藏</span>
              </Cell>
            </CellGroup>
          </Card>

        </i-col>

        <!-- 对应的个人中心的内容 -->
        <i-col span="11">
          <router-view></router-view>
        </i-col>

        <Divider/>
      </Row>

    </div>
</template>

<script>
    export default {
        name: "web_user",
      data(){
        return {
          personalCenterType:'',
          who:'他'
        }
      },
      methods:{
        //根据选择的不同，切换不同的vue组件，显示相应的类容
        getUserInfo(name){
          switch (name) {
            case "web_userInfo":
              this.$router.push({name:"web_userInfo"});
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
          this.personalCenterType = this.$route.name
        },

        //判断是谁的信息
        whoseInfo(){
          this.who = (this.$route.params.open_id === this.$store.getters.openID)? '我':'他';
        }

      },

      mounted(){
          //判断当前用户是否是自己
          this.whoseInfo();
          //检测传递过来的open_id
          console.log("web_user 输出：",this.$route.params.open_id);
          //检测路由
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
