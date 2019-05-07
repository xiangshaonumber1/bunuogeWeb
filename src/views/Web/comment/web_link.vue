<template>
    <div>

      <Row type="flex" class="code-row-bg web-like" align="top" justify="center">

        <Col>
          <p class="text-center">友情链接</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'friend_link'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </Col>

        <Col>
          <p class="text-center">实用推荐</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'recommend'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </Col>

        <Col>
          <p class="text-center">联系站长</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'about_author'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </Col>

        <Col>
          <p class="text-center">网站相关</p>
          <ul>
            <li v-for="(link_data,index) in web_link_data" v-if="link_data.type === 'about_web'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </Col>

      </Row>

    </div>
</template>

<script>
    export default {
        name: "web_link",
      data() {
        return {
          web_link_data:[],
        }
      },

      methods:{
        async instanceLinkData() {
          this.web_link_data = await this.$apis.CommonApi.getBottomNavBar();
        }
      },

      mounted(){
        instanceLinkData();
      }

    }
</script>

<style scoped>

  ul li{
    list-style-type: none;
  }

</style>
