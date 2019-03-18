<template>
    <div class="personal">

      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-bottom: 5px">

        <!--头像部分-->
        <i-col span="5">
          <div class="text-center">
            <img :src="userInfo.userIcon" alt="..." class="img-circle img-thumbnail" style="width: 135px;height: 135px;">
            <Upload v-if="isOneself && isEditing"
                    action="upload_url"
                    :before-upload="handleUpload">
              <Button style="margin-top: 10px" size="large">上传头像</Button>
            </Upload>
          </div>
        </i-col>

        <!--用户基本信息-->
        <i-col span="9" style="padding:0 5px">
          <div class="userBaseInfo">

            <!--用户昵称-->
            <div class="userBaseInfo-nickname">
              <input v-if="isOneself && isEditing" class="form-control" type="text" v-model="userInfo.nickname" style="width: 100%"></input>
              <span v-else>{{userInfo.nickname}}</span>
            </div>

            <!--用户活跃天数-->
            <!--<div class="userBaseInfo-activeDay">-->
              <!--<button class="btn btn-info" type="button">-->
                 <!--当前活跃度天数： <span class="badge">4</span>-->
              <!--</button>-->
            <!--</div>-->

            <!-- 个人label 标签-->
            <div class="userBaseInfo-tag">
              <span>
                <Icon type="ios-pricetags" />
                <Tag color="blue" v-for="(value,index) in userInfo.label" :key="index">{{value}}</Tag>
              </span>
            </div>

            <!--用户性别-->
            <div class="userBaseInfo-gender">
              <span>
                <Icon type="md-transgender" />&emsp;
                <i-select v-if="isOneself && isEditing" v-model="userInfo.gender" size="large" :value="userInfo.gender"  style="width: auto;">
                  <i-option value="男" label="男"></i-option>
                  <i-option value="女" label="女"></i-option>
                  <i-option value="保密" label="保密"></i-option>
               </i-select>
                <label v-else>{{userInfo.gender}}</label>
              </span>
            </div>
          </div>
        </i-col>

        <!--心愿墙部分-->
        <i-col span="10" style="padding: 0 5px;">
          <Card style="height: 220px;border: 1px solid darkgray">
            <span slot="title" style="font-size: 16px;font-weight: normal;">
              <Icon type="md-clipboard" />
              心愿墙
            </span>
            <a href="#" slot="extra" @click.prevent="changeLimit">
              编辑
            </a>
            <textarea v-if="isOneself && isEditing" class="wish_textarea"  wrap="hard" maxlength="100" v-model="userInfo.wishCard" :readonly="false"></textarea>
            <span v-else style="font-size: 16px">{{userInfo.wishCard}}</span>
          </Card>
        </i-col>

      </Row>

      <!--统计信息部分-->
      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin: 20px 0">

        <!--关注的人和该用户粉丝数-->
        <i-col span="5"  class="text-center" >
            <span><Tag color="rgb(2, 181, 218)" type="dot">关注数&emsp;{{userInfo.markedCount}}</Tag></span>
            <span><Tag color="#FFA2D3" type="dot">粉丝数&emsp;{{userInfo.fansCount}}</Tag></span>
        </i-col>

        <!--不同类型文章统计-->
        <i-col span="19">
          <div class="article_count">
            <div style="background-color: rgb(251, 114, 153)">原创 文章数：<span class="badge">{{userInfo.originArticleCount}}</span></div>
            <div style="background-color: rgb(0, 192, 145);">转载 文章数：<span class="badge">{{userInfo.reprintArticleCount}}</span></div>
            <div style="background-color: rgb(2, 181, 218)">翻译 文章数：<span class="badge">{{userInfo.translateArticleCount}}</span></div>
            <div style="background-color: rgb(255, 93, 71);">私有 日记数：<span class="badge">{{userInfo.privateDiaryCount}}</span></div>
            <div style="background-color: rgb(35, 201, 237);">公开 日记数：<span class="badge">{{userInfo.publicDiaryCount}}</span></div>
            <div style="background-color: rgb(243, 160, 52);">收藏 文章数：<span class="badge">{{userInfo.collectArticleCount}}</span></div>
          </div>
        </i-col>

      </Row>

      <Divider/>

      <!--个人描述部分-->
      <Row>
        <i-col span="24">
          <span class="badge" style="font-size: 20px; padding: 10px;margin: 10px 0">个人描述</span>
          <textarea v-if="isOneself && isEditing" class="form-control personal_textarea" maxlength="300" v-model="userInfo.myDescribe"/>
          <textarea v-else class="form-control personal_textarea" style="border: 2px solid darkgray;" maxlength="300" v-model="userInfo.myDescribe" readonly/>
          <br>
          <small>注：昵称，心愿墙，个人描述等，<small style="color: red">点击所在区域改</small>即可进行修改，点击保存后即可提交；用户头像裁剪后上传属于立即修改类型，无需点击保存按钮</small>
        </i-col>
      </Row>

      <!--保存信息按钮-->
      <Row type="flex" class="code-row-bg" justify="center" style="margin: 20px 0;">
        <i-col class="text-center">
          <Button v-if="isOneself && isEditing===false" type="success" size="large" long @click="startEditor"><span>编&emsp;辑</span></Button>
          <div v-if="isEditing">
            <button  type="button" class="btn btn-primary btn-lg" style="margin: 5px 0" @click="saveUserInfo" :disabled="saveButtonDisable"><span>保&emsp;存</span></button>&emsp;
            <button  type="button" class="btn btn-danger btn-lg" style="margin: 5px 0" @click="cancelEditor" :disabled="saveButtonDisable"><span>取&emsp;消</span></button>
          </div>

        </i-col>
      </Row>

      <!-- **************************************** 图片裁剪 start ***************************************************** -->
      <Modal title="请选择喜欢的区域作为你的个人头像" v-model="isShowModal" :mask-closable="false" width="75"
             :styles="ModalHeight"
             @on-ok="upLoadFiles"
             :loading="loadingStatus"
             ok-text="上传图片">
        <div class="cropper-content">
          <div class="cropper" :style="scrollHeight">
            <vueCropper class="vueCropper"
                        ref="cropper"
                        :img="option.img"
                        :outputSize="option.outputSize"
                        :outputType="option.outputType"
                        :info="option.info"
                        :canScale="option.canScale"
                        :autoCrop="option.autoCrop"
                        :autoCropHeight="option.autoCropHeight"
                        :auto-crop-width="option.autoCropWidth"
                        :center-box="option.centerBox"
                        :can-move="option.canMove">
            </vueCropper>
          </div>
        </div>
      </Modal>
      <!-- **************************************** 图片裁剪 end ***************************************************** -->

    </div>
</template>

<script>

  export default {
      name: "personal_info",
      data(){
          return {
            isOneself:false,    //查询目标用户是否是当前已登录用户
            isEditing:false,    //是否正在编辑
            file:null,
            loadingStatus: true,
            uploadBase64:null,
            //Vue-cropper 配置
            option:{
              img:'',                          // 裁剪图片的地址
              info: true,                      // 裁剪框的大小信息
              outputSize:1,                    // 裁剪生成图片的质量
              outputType:'png',                // 裁剪生成图片的格式
              canScale: false,                 // 图片是否允许滚轮缩放
              autoCrop: true,                  // 是否默认生成截图框
              autoCropWidth: 200,              // 默认生成截图框宽度
              autoCropHeight: 200,             // 默认生成截图框高度
              centerBox:true,                  // 截图框是否被限制在图片里面
              canMove:false,                   // 上传图片是否可以移动
            },
            isShowModal:false,  //是否显示对话框
            userInfo:{},          //用户信息
            isLoading:true,
            isNotFound:false,
            genderModel:[
              {value:'男',label:'男'},
              {value:'女',label:'女'},
              {value:'保密',label:'保密'}
            ],
            saveButtonDisable:false,    //保存按钮状态
          }
      },
      methods:{

        //这里的信息，全是本地原图的信息，并发是裁剪后的信息
        handleUpload(file){
          this.file = file;
          //创建一个FileReader 对象
          let reader = new FileReader();
          // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
          // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
          // 读取文件作为 URL 可访问地址
          reader.readAsDataURL(file);
          reader.onload =() =>{
            this.uploadBase64 = reader.result;
            if (this.uploadBase64 !== null){
              this.option.img = reader.result;
              this.isShowModal = true;
            }
          };
          return false;
        },


        /**
         * 用户选择图片，裁剪后进行上传头像的操作
         */
        async upLoadFiles() {
          //点击上传之后隐藏对话框
          this.isShowModal = false;
          //立即显示Spin，防止期间错误
          this.$Spin.show({
            render: (h) => {
              return h('div', [
                h('Icon', {
                  'class': 'spin-icon-load',
                  props: {
                    type: 'ios-loading',
                    size: 30
                  }
                }),
                h('div', '正在上传文件......')
              ])
            }
          });

          this.$refs.cropper.getCropData(async (data) => {
            //获取 base64 格式X-Auth-Token
            const file = this.base64ToFile(data, this.file.name);
            let param = new FormData();
            param.append("file", file);
            const result = await this.$apis.UserApi.updateUserIcon(param);
            if (result !== null) {
              //上传成功后，更新当前也你按用户头像
              this.userInfo.userIcon = this.$store.getters.serverPath + result[0];
              //同时更新本地保存的用户的头像
              this.$store.dispatch("saveAvatar",this.userInfo.userIcon);
              console.log("上传后，重新给userInfo的userIcon赋值", this.userInfo.userIcon);
            }
            this.$Spin.hide(); //不论最后是否时候上传成功，取消整页加载
          });

        },


        //获取用户信息
        async getUserInfo(openID){

          this.isOneself = (this.$route.params.open_id === this.$store.getters.openID);
          console.log(" 查询目标，是否是当前用户自己：",this.isOneself)

          const result = await this.$apis.UserApi.getUserInfo(openID);
          console.log("输出获取到的getMyUserInfo信息：",result);
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
          }
        },

        //确认启动编辑
        startEditor(){
          this.isEditing = true;
        },
        //确认取消编辑
        cancelEditor(){
          this.isEditing = false;
        },

        //保存用户信息
        async saveUserInfo(){
          //昵称长度应不小于位，且不能大于18位
          if (1<this.userInfo.nickname.length && this.userInfo.nickname.length<19){
            this.saveButtonDisable = true;
            const result = await this.$apis.UserApi.updateUserInfo(this.userInfo);
            if (result){
              this.$Notice.success({
                title:'保存成功：',
                desc:'您的个人信息已修改成功'
              });
              setTimeout(()=>{ //延时指定时间后，再解冻
                this.saveButtonDisable = false;
                this.isEditing = false;
              }, 2000);
            }else {
              console.log("出了点问题 信息如下：",result)
            }
          }else {
            this.$Notice.warning({
              title:"昵称不规范提示：",
              desc:"您输入的昵称不符合规范，长度范围应该在2——18位之间"
            })
          }


        },


        //将base64转换为file
        base64ToFile(dataurl,filename){
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new File([u8arr],filename,{type:mime});
        },

        //去掉html标签
        replaceHtml(value){
          var result = value.replace(/<\/?.+?>/g,"");
          result = result.replace(/ /g,"");
          return result;
        },

      },

    computed:{
      scrollHeight(){
        return "height:" + ((window.screen.height)*0.8) + "px;";
      },
      ModalHeight(){
        return {
          top:'0',
          marginTop:'25px'
        }
      },
    },

    mounted() {
        console.log("输出 传递过来的值：",this.$route.params.open_id);
        //获取当前登录用户细信息
        this.getUserInfo(this.$route.params.open_id);
    },

    beforeRouteUpdate(to,from,next){
        next();
        this.getUserInfo(this.$route.params.open_id);
    }

  }
</script>

<style scoped>

  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }


  .personal{
    /*padding: 35px 35px 10px 35px;*/
    padding: 0;
    margin: 0;
  }
  /*  心愿墙文本域部分 */
  .wish_textarea{
    min-height: 150px;
    width: 100%;
    resize: none;
    padding: 5px;
    border-radius: 3px;
    border: 2px solid lightskyblue;
    /*border: none;*/
  }
  /*  个人描述文本域部分  */
  .personal_textarea{
    resize: none;
    padding: 5px;
    min-height: 200px;
    font-size: 18px;
    background-color: white;
    border: 2px solid lightskyblue;
  }

  .personal{
    height: auto;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .personal::-webkit-scrollbar {
    display: none;
  }

  p{
    font-size: 25px;
    font-weight: bold;
  }
  span{
    font-size: 18px;
  }

  /*  文章统计部分  */
  .article_count div{
    font-size: 15px;
    display: block;
    float: left;
    border-radius: 5px;
    color: white;
    margin: 3px 5px 3px 5px;
    padding: 8px 10px;
    font-family: "Microsoft YaHei UI Light",serif ;
    font-weight: normal;
  }
  .article_count div span{
    font-size: 16px;
    font-weight: normal;
    background-color: white;
    color: #000;
  }

  /* 用户头像裁剪部分 */
  .cropper-content{
    width: 100%;
    height: 100%;
  }
  .cropper{
    width: 100%;
  }

  /*用户基本信息部分*/
  .userBaseInfo input{
    border: 2px solid lightskyblue;
  }
  .userBaseInfo div{
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    /*border: 1px solid red;*/
  }
  /*用户昵称输入框*/
  .userBaseInfo-nickname span, .userBaseInfo-nickname input{
    font-size: 25px;
    font-weight: bold;
  }

</style>
