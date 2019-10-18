<template>
    <div v-if="web_link_data.length >0 " class="web-link">
      <Row type="flex" class="code-row-bg web-like" align="top" justify="space-around">

        <!--友情连接部分-->
        <i-col>
          <p class="text-center">友情链接</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'friend_link'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>

        <!--实用推荐-->
        <i-col>
          <p class="text-center">实用推荐</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'recommend'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>

        <!--联系站长-->
        <i-col>
          <p class="text-center">联系站长</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'about_author'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>

        <!--网站相关-->
        <i-col>
          <p class="text-center">网站相关</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'about_web'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>

      </Row>
    </div>
</template>

<script>
    export default {
        name: "CommonWebLink",
      data() {
        return {
          web_link_data:[],
        }
      },

      methods:{
          //初始化连接信息
        async instanceLinkData() {
          let result = await this.$apis.CommonApi.getBottomNavBar();
          this.web_link_data = result.data;
        }
      },

      mounted(){
        this.instanceLinkData();
      }

    }
</script>

<style scoped>
  a{
    color: rgb(105, 105, 105);
    text-decoration: none;
  }
  a:hover{
    color: rgb(87, 163, 243);
  }
  ul li{
    list-style-type: none;
  }
  p{
    font-weight: bold;
  }
  .web-link{
    padding-top: 20px;
    background-color: rgb(245, 245, 245);
  }

</style>
