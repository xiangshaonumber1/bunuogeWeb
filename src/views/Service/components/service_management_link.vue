<template>
    <div>

      <Divider orientation="left">
        <span style="font-size: 20px;font-weight: bold">链接管理</span>
      </Divider>

      <div class="text-right" style="margin: 0 20px 20px 0">
        <Button type="info" size="large" @click="edit_link_modal('insert')"><span style="font-size: 16px">新 增 链 接</span></Button>
      </div>

      <row type="flex" class="code-row-bg link_edit" align="top" justify="space-around">
        <!--友情连接部分-->
        <i-col>
          <p class="text-left">友情链接</p>
          <ul>
            <li v-for="link_data in service_link_data" v-if="link_data.type === 'friend_link'">
              <a :href="link_data.website" target="_blank" :key="link_data.linkID">{{link_data.label}}</a>
              <Button type="error" size="small" ghost @click="delete_modal_confirm(link_data)">删除</Button>
              <Button type="info" size="small" ghost @click="edit_link_modal('update',link_data)">修改</Button>
            </li>
          </ul>
        </i-col>

        <!--实用推荐-->
        <i-col>
          <p class="text-left">实用推荐</p>
          <ul>
            <li v-for="link_data in service_link_data" v-if="link_data.type === 'recommend'">
              <a :href="link_data.website" target="_blank" :key="link_data.linkID">{{link_data.label}}</a>
              <Button type="error" size="small" ghost @click="delete_modal_confirm(link_data)">删除</Button>
              <Button type="info" size="small" ghost @click="edit_link_modal('update',link_data)">修改</Button>
            </li>
          </ul>
        </i-col>

        <!--联系站长-->
        <i-col>
          <p class="text-left">联系站长</p>
          <ul>
            <li v-for="link_data in service_link_data" v-if="link_data.type === 'about_author'">
              <a :href="link_data.website" target="_blank" :key="link_data.linkID">{{link_data.label}}</a>
              <Button type="error" size="small" ghost @click="delete_modal_confirm(link_data)">删除</Button>
              <Button type="info" size="small" ghost @click="edit_link_modal('update',link_data)">修改</Button>
            </li>
          </ul>
        </i-col>

        <!--网站相关-->
        <i-col>
          <p class="text-left">网站相关</p>
          <ul>
            <li v-for="(link_data,index) in service_link_data" v-if="link_data.type === 'about_web'">
              <a :href="link_data.website" target="_blank" :key="index">{{link_data.label}}</a>
              <Button type="error" size="small" ghost @click="delete_modal_confirm(link_data)">删除</Button>
              <Button type="info" size="small" ghost @click="edit_link_modal('update',link_data)">修改</Button>
            </li>
          </ul>
        </i-col>
      </row>

      <!--************************************************* 新增链接对话框modal *************************************************-->
      <Modal v-model="link_modal.show" footer-hide :mask-closable="false" :title="link_modal.title">
        <i-form ref="link_form" :model="link_info" :rules="link_validate" label-position="left" :label-width="100" style="font-size:16px">
          <form-item prop="type">
            <span slot="label" style="font-size: 14px">类型</span>
            <i-select :transfer="true" placeholder="请选择新增链接类型" size="large" v-model="link_info.type">
              <i-option label="友情链接" value="friend_link"></i-option>
              <i-option label="实用推荐" value="recommend"></i-option>
              <i-option label="联系站长" value="about_author"></i-option>
              <i-option label="网站相关" value="about_web"></i-option>
            </i-select>
          </form-item>
          <form-item prop="label">
            <span slot="label" style="font-size: 14px">链接描述</span>
            <Input type="text" v-model="link_info.label" placeholder="请输入显示的文字..."/>
          </form-item>
          <form-item prop="website">
            <span slot="label" style="font-size: 14px">链接网址</span>
            <Input type="text" v-model="link_info.website" placeholder="请输入链接网址..."/>
          </form-item>
          <Button class="center-block" type="primary" size="large" @click="push_insert_link">确 认</Button>
        </i-form>
        <spin v-if="link_modal.loading" fix></spin>
      </Modal>

      <!--*************************************************** 删除链接确认框 *****************************************************-->
      <Modal v-model="delete_modal" footer-hide :mask-closable="false" title="是否确认删除该条链接">
        <p>确认删除提示：</p>
        <p>您目前已选中
          <span style="color:red;">{{link_value_to_label(this.delete_modal_info.type)}}</span>
          下的，名为
          <span style="color: red">{{this.delete_modal_info.label}}</span>
          的连接，并准备删除
        </p>
        <p>确认删除后，将
          <span style="color: red">无法恢复</span>
          ，请问您是否继续？
        </p>
        <Divider/>
        <div class="text-center" style="margin-top: 20px;">
          <Button type="default" size="large" @click="delete_modal = false">取消</Button>&emsp;
          <Button type="error" size="large" @click="push_delete_link">确认并删除</Button>
        </div>
        <spin v-if="delete_modal_loading" fix></spin>
      </Modal>
    </div>
</template>

<script>

    export default {
        name: "link_edit",
      data() {
        return {
          service_link_data:[],
          delete_modal:false,
          delete_modal_info:{},
          delete_modal_loading:false,
          link_modal:{
            show:false,
            loading:false,
            title:'',
          },
          link_info:{
            linkID:'',
            type:'',
            label:'',
            website:'',
            operation:''
          },
          //校验规则
          link_validate:{
            type:[{type:'string'},{required:true,message:'请选择链接类型！'},{trigger:'change'}],
            label:[{type:'string'},{required:true,message:'该字段不能为空！'},{trigger:'change'},{min:2,max:10,message:'描述信息应为2-10个字符'}],
            website:[{type:'url',message:'不符合网址的标准格式！'},{required:true,message:'该字段不能为空！'},{trigger:'change'}],
          },
        };
      },
      methods:{
        //链接管理的value 转label
        link_value_to_label(value){
          switch (value) {
            case 'friend_link':return '友情链接';
            case 'recommend':return '实用推荐';
            case 'about_author':return '联系站长';
            case 'about_web':return '网站相关';
            default:return '错误类型';
          }
        },

        //删除modal初始化
        delete_modal_confirm(data){
          this.delete_modal = true;
          this.delete_modal_info = data;
          this.delete_modal_info.operation = 'delete';
        },

        //提交确认删除信息
        async push_delete_link() {
          this.delete_modal_loading = true;
          const result = await this.$apis.AdminApi.edit_link(this.delete_modal_info);
          if (result){
            this.delete_modal = false;
            this.$Message.success("删除成功！");
          }
          this.delete_modal_loading = false;
        },

        //链接编辑modal初始化
        edit_link_modal(operation,link_data){
          switch (operation) {
            case "insert":
              //初始化
              this.link_info = {};
              this.link_modal.title = '新增链接';
              break;
            case "update":
              this.link_modal.title = "修改链接";
              //赋值
              this.link_info = link_data;
              break;
            default:
              this.$Message.error("无法确认操作类型！");
              return this.link_modal.show = false;
          }
          this.link_info.operation = operation;
          this.link_modal.show = true;
        },

        push_insert_link(){
          this.$refs['link_form'].validate( async valid => {
            if (valid) {
              //确认并通过验证后，启动loading设置
              this.link_modal.loading = true;
              const result = await this.$apis.AdminApi.edit_link(this.link_info);
              if (result) {
                //执行成功，关闭对话框
                this.link_modal.show = false;
              }
              //不论最后是否操作成功，都取消loading设置
              this.link_modal.loading = false;
            } else {
              console.log("有未填完的信息！");
            }
          });
        },

        //初始化链接信息
        async instanceLinkData() {
          this.service_link_data = await this.$apis.CommonApi.getBottomNavBar();
        },

      },

      mounted(){
          this.instanceLinkData();
      },

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

  .link_edit{
    padding-top: 20px;
    background-color: rgb(245, 245, 245);
  }

</style>
