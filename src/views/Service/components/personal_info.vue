<template>
    <div class="personal">

      <Row type="flex" justify="center" align="middle" class="code-row-bg">
        <i-col span="4" style="border: 1px solid red;" class="text-center">
          <div class="text-center">
            <img src="/static/picture/avatar_default.jpg" alt="..." class="img-circle img-thumbnail" style="width: 150px;height: 150px;">
            <Upload action="upload_url"
                    :before-upload="handleUpload">
              <Button style="margin-top: 10px">上传头像</Button>
            </Upload>
          </div>
        </i-col>

        <i-col span="10" style="border: 1px solid black;padding: 15px">
          <div class="userInfo">

            <div>
              <p><input type="text" v-model="userInfo.nickname" disabled></input></p>
            </div>

            <div>
              <button class="btn btn-info" type="button">
                 当前活跃度天数： <span class="badge">4</span>
              </button>
            </div>

            <div>
              <span><Icon type="md-pin" /><input type="text" v-model="userInfo.location" disabled></input></span>
            </div>

            <div>
              <span><Icon type="ios-pricetags" /> <Tag color="blue"  v-if="userInfo.tags !== null" v-for="user in userInfo.tags">{{user.tag}}</Tag></span>
            </div>

            <div>
              <span><Icon type="md-at" /><input type="text" v-model="userInfo.email" disabled></input></span>
            </div>

            <div>
              <span><Icon type="md-transgender" /><input type="text" v-model="userInfo.gender" disabled></span>
            </div>

          </div>
        </i-col>

        <i-col span="10" style="border: 1px solid orange;" align="top">
          <Card shadow style="min-height: 250px;max-height: 250px">
            <p slot="title" style="font-size: 16px;font-weight: normal">
              <Icon type="ios-film-outline"></Icon>
              心愿墙
            </p>
            <a href="#" slot="extra" @click.prevent="changeLimit">
              <Icon type="ios-loop-strong"></Icon>
              编辑
            </a>

          </Card>
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
            userInfo:{
              nickname:'丿丶祥灬少',
              location:'成都',
              tags:[
                {tag:'java'},
                {tag:'SpringBoot'},
                {tag:'vue'},
                {tag:'Android'}
              ],
              email:'821940979@qq.com',
              gender:'男'
            }
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

  }
</script>

<style scoped>

  p{
    font-size: 25px;
    font-weight: bold;
  }
  span{
    font-size: 18px;
  }

  .cropper-content{
    width: 100%;
    height: 100%;
  }

  .cropper{
    width: 100%;
  }

  .userInfo input{
    border: 0;
    /*border: 1px solid red;*/
    background-color: white;
    margin: 1px 15px;
  }

  .userInfo div{
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
  }

</style>
