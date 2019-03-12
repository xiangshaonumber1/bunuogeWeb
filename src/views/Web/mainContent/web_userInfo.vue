<template>
    <div class="userInfo">
      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-bottom: 5px">

        <!--头像部分-->
        <i-col span="5">
          <div class="text-center">
            <img :src="userInfo.userIcon" alt="..." class="img-circle img-thumbnail" style="width: 165px">
          </div>
        </i-col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "web_userInfo",
      data(){
          return {
            userInfo:{},
          }
      },

      methods:{

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

          //获取用户信息
        async getUserInfo(openID){ //获取用户信息
          const result = await this.$apis.UserApi.getMyUserInfo(openID);
          if (result === null){
            this.isLoading = false;
            this.isNotFound = true;
          }else {
            this.isLoading = false;
            this.isNotFound = false;
            this.userInfo = result;
            this.userInfo.label = JSON.parse(result.label);
            this.userInfo.userIcon = this.$store.getters.serverPath+JSON.parse(result.userIcon)[0];
            this.userInfo.nickname = this.replaceHtml(result.nickname);
            this.$store.dispatch("saveAvatar",this.userInfo.userIcon);
          }
        },
      },


      mounted(){

        console.log("用户ID：",this.$route.params.open_id);

          //获取指定用户信息
          this.getUserInfo(this.$route.params.open_id);

      }

    }
</script>

<style scoped>

</style>
