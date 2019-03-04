<template>
  <div class="moreChoose">
    <ButtonGroup>
      <Tooltip content="返回首页" placement="left" ><Button @click="goIndex"><Icon type="md-arrow-back" size="30" /></Button></Tooltip><br><hr>
      <Tooltip content="前往个人中心" placement="left" ><Button @click="goPersonalCenter"><Icon type="md-person" size="30"/></Button></Tooltip><br><hr>
      <Tooltip content="反馈信息" placement="left" ><Button @click="goFeedback"><Icon type="md-chatboxes" size="30" /></Button></Tooltip><br><hr>
    </ButtonGroup>
  </div>
</template>

<script>
    export default {
        name: "quickRouter",
      methods:{

        goIndex(){//前往首页
          this.$router.push({name:'index'})
        },

        goPersonalCenter(){//前往个人中心
          this.$router.push({name:'web_personal_info'})
        },

        goFeedback(){//前往反馈中心
          this.$router.push({name:'web_feedback'})
        },
      }
    }
</script>

<style scoped>

  .moreChoose{
    position: absolute;
    /*border: 1px solid red;*/
    right: 5vw;
    bottom: 5vh;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }

  .moreChoose hr{
    padding: 0;
    margin: 0;
    border-color: lightgrey;
  }

  .moreChoose button{
    border: none;
    padding: 13px 15px;
  }
</style>
