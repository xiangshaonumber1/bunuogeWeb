<template>
    <div class="personal">

      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin-bottom: 5px">

        <!--头像部分-->
        <i-col span="5">
          <div class="text-center">
            <img src="/static/picture/avatar_default.jpg" alt="..." class="img-circle img-thumbnail" style="width: 175px;height: 175px;">
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
              <input type="text" v-model="userInfo.nickname" disabled></input>
            </div>

            <!--用户活跃天数-->
            <div class="userInfo-activeDay">
              <button class="btn btn-info" type="button">
                 当前活跃度天数： <span class="badge">4</span>
              </button>
            </div>

            <!-- 个人label 标签-->
            <div>
              <span><Icon type="ios-pricetags" />
                <Tag color="blue" v-for="(value,index) in labelArray" :key="index">{{value}}</Tag>
              </span>
            </div>

            <!--用户性别-->
            <div>
              <span><Icon type="md-transgender" /><input type="text" v-model="userInfo.gender" disabled></span>
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
            <textarea class="wish_textarea"  wrap="hard" maxlength="100">{{userInfo.wishCard}}</textarea>
          </Card>
        </i-col>

      </Row>

      <!--统计信息部分-->
      <Row type="flex" justify="center" align="middle" class="code-row-bg" style="margin: 20px 0">

        <!--关注的人和该用户粉丝数-->
        <i-col span="5"  class="text-center" >
            <span><Tag color="rgb(2, 181, 218)" type="dot">关注数 9999</Tag></span>
            <span><Tag color="#FFA2D3" type="dot">粉丝数 20.5W</Tag></span>
        </i-col>

        <!--不同类型文章统计-->
        <i-col span="19">
          <div class="article_count">
            <div style="background-color: rgb(251, 114, 153)">原创文章数：<span class="badge">{{userInfo.originArticleCount}}</span></div>
            <div style="background-color: rgb(0, 192, 145);">转载文章数：<span class="badge">{{userInfo.reprintArticleCount}}</span></div>
            <div style="background-color: rgb(2, 181, 218)">翻译文章数：<span class="badge">{{userInfo.translateArticleCount}}</span></div>
            <div style="background-color: rgb(255, 93, 71);">日记文章数：<span class="badge">{{userInfo.publicDiaryCount}}</span></div>
            <div style="background-color: rgb(243, 160, 52);">收藏文章数：<span class="badge">{{userInfo.privateDiaryCount}}</span></div>
            <div style="background-color: rgb(243, 160, 52);">收藏文章数：<span class="badge">{{userInfo.collectArticleCount}}</span></div>
          </div>
        </i-col>

      </Row>

      <Divider/>

      <!--个人简介部分-->
      <Row>
        <i-col span="24">
          <span class="badge" style="font-size: 20px; padding: 10px;margin: 10px 0">个人简介</span>
          <textarea class="form-control personal_textarea" maxlength="300">{{userInfo.describe}}</textarea>
        </i-col>
      </Row>

      <!--保存信息按钮-->
      <Row type="flex" class="code-row-bg" justify="center" style="margin-top: 20px">
        <i-col span="5">
          <Button type="info" size="large" long><span>保&emsp;存</span></Button>
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
            labelArray:[],
          }
      },
      methods:{

        handleUpload(file){
          console.log("handleUpload",file);
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
              // console.log("this.uploadBase64 : ",this.uploadBase64);
              this.option.img = reader.result;
              this.isShowModal = true;
            }
          };
          return false;
        },

        upLoadFiles(){
          alert(6666);
          this.isShowModal = false;
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
            this.labelArray = JSON.parse(result.label);
          }
        }

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
    font-weight: bold;
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
