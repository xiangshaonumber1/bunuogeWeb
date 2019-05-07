<template>
    <div id="link_edit">

      <Divider orientation="left">
        <span style="font-size: 20px;font-weight: bold">链接管理</span>
      </Divider>

      <div class="text-right" style="margin: 0 20px 20px 0">
        <Button type="info" size="large" @click="add_link"><span style="font-size: 16px">新 增 链 接</span></Button>
      </div>

      <row type="flex" class="code-row-bg link_edit" align="top" justify="space-around">
        <!--友情连接部分-->
        <i-col>
          <p class="text-center">友情链接</p>
          <ul>
            <li v-for="(link_data,index) in service_link_data" v-if="link_data.type === 'friend_link'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>

        <!--实用推荐-->
        <i-col>
          <p class="text-center">实用推荐</p>
          <ul>
            <li v-for="(link_data,index) in service_link_data" v-if="link_data.type === 'recommend'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>

        <!--联系站长-->
        <i-col>
          <p class="text-center">联系站长</p>
          <ul>
            <li v-for="(link_data,index) in service_link_data" v-if="link_data.type === 'about_author'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>

        <!--网站相关-->
        <i-col>
          <p class="text-center">网站相关</p>
          <ul>
            <li v-for="(link_data,index) in service_link_data" v-if="link_data.type === 'about_web'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
            </li>
          </ul>
        </i-col>
      </row>

      <!--************************************************* 新增链接对话框modal *************************************************-->
      <Modal v-model="add_link_modal" :mask-closable="false" title="新增链接" >
        <i-form :model="link_info" label-position="left" label-width="100" style="font-size: 16px">
          <form-item>
            <span slot="label" style="font-size: 14px">类型</span>
            <i-select placeholder="请选择新增链接类型" size="large" v-model="link_info.type">
              <i-option label="友情链接" value="friend_link"></i-option>
              <i-option label="实用推荐" value="recommend"></i-option>
              <i-option label="联系站长" value="about_author"></i-option>
              <i-option label="网站相关" value="about_web"></i-option>
            </i-select>
          </form-item>

          <form-item>
            <span slot="label" style="font-size: 14px">链接描述</span>
            <Input type="text" v-model="link_info.label"></Input>
          </form-item>

          <form-item>
            <span slot="label" style="font-size: 14px">链接网址</span>
            <Input type="text" v-model="link_info.website"></Input>
          </form-item>
          <!-- 2019-5-7  明天继续这里 -->

        </i-form>
      </Modal>

      <!--********************************************** 编辑链接对话框modal ****************************************************-->
      <Modal v-model="edit_link_modal" :mask-closable="false" title="编辑链接">

      </Modal>

    </div>
</template>

<script>

    export default {
        name: "link_edit",
      data() {
        return {
          service_link_data:[],
          add_link_modal:false,
          edit_link_modal:false,
          link_info:{
            type:'',
            label:'',
            website:''
          }
        };
      },
      methods:{

          add_link(){
            this.add_link_modal = true;
          },

          edit_link(){
            this.edit_link_modal = true;
          }
      }
    }
</script>

<style scoped>

  ul li{
    list-style-type: none;
  }

  p{
    font-size: 15px;
    font-weight: bold;
  }

  .link_edit{
    padding-top: 20px;
    background-color: rgb(245, 245, 245);
  }

</style>
