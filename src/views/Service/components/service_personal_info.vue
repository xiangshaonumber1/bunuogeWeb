<template>
    <div class="personal">

      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-bottom: 5px">

        <!--头像部分-->
        <i-col span="5">
          <div class="text-center">
            <img :src="userInfo.userIcon" alt="..." class="img-circle img-thumbnail" style="width: 175px;height: 175px;">
            <Upload action="upload_url"
                    :before-upload="handleUpload">
              <Button style="margin-top: 10px" size="large">上传头像</Button>
            </Upload>
          </div>
        </i-col>

        <!--用户基本信息-->
        <i-col span="9" style="padding: 5px">
          <div class="userInfo">

            <!--用户昵称-->
            <div class="userInfo-nickname">
              <input type="text" v-model="userInfo.nickname"></input>
            </div>

            <!--用户活跃天数-->
            <div class="userInfo-activeDay">
              <button class="btn btn-info" type="button">
                 当前活跃度天数： <span class="badge">4</span>
              </button>
            </div>

            <!-- 个人label 标签-->
            <div>
              <span>
                <Icon type="ios-pricetags" />
                <Tag color="blue" v-for="(value,index) in userInfo.label" :key="index">{{value}}</Tag>
              </span>
            </div>

            <!--用户性别-->
            <div>
              <span>
                <Icon type="md-transgender" />
               <i-select v-model="userInfo.gender" size="large" :value="userInfo.gender"  style="width: auto">
                 <i-option value="男" label="男"></i-option>
                 <i-option value="女" label="女"></i-option>
                 <i-option value="保密" label="保密"></i-option>
               </i-select>
              </span>
            </div>
          </div>
        </i-col>

        <!--心愿墙部分-->
        <i-col span="10" style="padding: 0 15px">
          <Card style="height: 220px;">
            <span slot="title" style="font-size: 16px;font-weight: normal;">
              <Icon type="md-clipboard" />
              心愿墙
            </span>
            <a href="#" slot="extra" @click.prevent="changeLimit">
              编辑
            </a>
            <textarea class="wish_textarea"  wrap="hard" maxlength="100" v-model="userInfo.wishCard"></textarea>
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

      <!--个人简介部分-->
      <Row>
        <i-col span="24">
          <span class="badge" style="font-size: 20px; padding: 10px;margin: 10px 0">个人简介</span>
          <textarea class="form-control personal_textarea" maxlength="300" v-model="userInfo.myDescribe" />
          <small>注：昵称，心愿墙，个人简介等，<small style="color: red">点击所在区域改</small>即可进行修改，点击保存后即可提交；用户头像裁剪后上传属于立即修改类型，无需点击保存按钮</small>
        </i-col>
      </Row>

      <!--保存信息按钮-->
      <Row type="flex" class="code-row-bg" justify="center" style="margin-top: 20px">
        <i-col span="5">
          <Button type="info" size="large" long @click="saveUserInfo" :disabled="saveButtonDisable"><span>保&emsp;存</span></Button>
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
                        :can-move="option.canMove"
            ></vueCropper>
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
            userInfo:{
              nickname:'',
              gender:'',
              userIcon:'',
              label:[],
              wishCard:'',
              myDescribe:''
            },          //用户信息
            isLoading:true,
            isNotFound:false,
            genderModel:[
              {value:'男',label:'男'},
              {value:'女',label:'女'},
              {value:'保密',label:'保密'}
            ],
            saveButtonDisable:false,
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

          setTimeout(()=>{
            console.log("5秒之后开始执行：");
            // 获取截图的base64 数据
            this.$refs.cropper.getCropData(async (data) => {
              //获取 base64 格式X-Auth-Token
              const file = this.base64ToFile(data, this.file.name);
              let param = new FormData();
              param.append("file", file);
              const result = await this.$apis.UserApi.updateUserIcon(param);
              if (result !== null) {
                this.userInfo.userIcon = this.$store.getters.serverPath + result[0];
                console.log("上传后，重新给userInfo的userIcon赋值", this.userInfo.userIcon);
                this.$Spin.hide(); //不论最后是否时候上传成功，取消整页加载
              } else {
                this.$Spin.hide(); //不论最后是否时候上传成功，取消整页加载
              }
            });

          },5000);




        },


        async getUserInfo(){ //获取用户信息
          const result = await this.$apis.UserApi.getMyUserInfo(this.$store.getters.openID);
          if (result === null){
            this.isLoading = false;
            this.isNotFound = true;
          }else {
            this.isLoading = false;
            this.isNotFound = false;
            this.userInfo = result;
            this.userInfo.label = JSON.parse(result.label);
            this.userInfo.userIcon = this.$store.getters.serverPath+JSON.parse(result.userIcon)[0];
            this.$store.dispatch("saveAvatar",this.userInfo.userIcon);
          }
        },

        async saveUserInfo(){//保存用户信息
          this.saveButtonDisable = true;
          const result = await this.$apis.UserApi.updateMyUserInfo(this.userInfo);
          if (result){
            this.$Notice.success({
              title:'保存成功：',
              desc:'您的个人信息已修改成功'
            });

            setTimeout(()=>{ //延时指定时间后，再解冻
              this.saveButtonDisable = false;
            }, 2000);

          }else {
            console.log("出了点问题 信息如下：",result)
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
      }
    },

    mounted() {
        this.getUserInfo();
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

  .wish_textarea{
    min-height: 150px;
    width: 100%;
    resize: none;
    padding: 5px;
    border: none;
  }

  .personal_textarea{
    resize: none;
    padding: 5px;
    min-height: 200px;
    font-size: 18px;
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

  .cropper-content{
    width: 100%;
    height: 100%;
  }

  .cropper{
    width: 100%;
  }



  .userInfo input{
    border: none;
    /*border: 1px solid red;*/
    background-color: white;
    margin: 1px 15px;
    width: auto;
  }

  .userInfo div{
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    /*border: 1px solid red;*/
  }

  .userInfo-nickname{
    line-height: 40px;
  }

  .userInfo-nickname input{
    margin: 1px 0;
    font-size: 20px;
    line-height: 40px;
    font-weight: bold;
  }


</style>
