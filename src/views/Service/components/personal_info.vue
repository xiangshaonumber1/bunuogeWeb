<template>
    <div>

      <Row>
        <i-col span="24">
          <img src="/static/picture/avatar_default.jpg" alt="..." class="img-circle img-thumbnail" style="width: 200px;height: 200px">
          <Upload action="upload_url"
                  :before-upload="handleUpload">
            <Button @click="select_file">上传头像</Button>
          </Upload>
        </i-col>
      </Row>

      <Row>
        <i-col span="24">
          <Modal title="请截取你所需的部分"
          v-model="isShowModal" v-if="isShowModal">
            <div class="cropper-content">
              <div class="cropper" :style="scrollHeight">
                <vueCropper
                  ref="cropper"
                  :img="option.img"
                  :outputSize="option.outputSize"
                  :outputType="option.outputType"
                  :info="option.info"
                  :canScale="option.canScale"
                  :autoCrop="option.autoCrop"
                  :autoCropHeight="option.autoCropHeight"
                  :auto-crop-width="option.autoCropWidth"
                  :fixed="option.fixed"
                  :fixed-number="option.fixedNumber"
                ></vueCropper>
              </div>
              <Button  @click="">确认上传</Button>
            </div>
          </Modal>

        </i-col>
      </Row>

    </div>
</template>

<script>

  export default {
      name: "personal_info",

      data(){
          return {
            file:null,
            modal:false,
            loadingStatus: false,
            option:{
              img:'',                          // 裁剪图片的地址
              info: true,                      // 裁剪框的大小信息
              outputSize:1,                    // 裁剪生成图片的质量
              outputType:'png',                // 裁剪生成图片的格式
              canScale: false,                 // 图片是否允许滚轮缩放
              autoCrop: true,                  // 是否默认生成截图框
              autoCropWidth: 150,              // 默认生成截图框宽度
              autoCropHeight: 150,             // 默认生成截图框高度
              fixed: false,                    // 是否开启截图框宽高固定比例
              fixedNumber: [4, 4]              // 截图框的宽高比例
            },
            isShowCropper: false,            //是否显示截图框
            isShowModal:false,  //是否显示对话框
          }
      },
      methods:{
        handleUpload(file){
          console.log("handleUpload",file);
          this.file = file;
          return false;
        },

        select_file(){
          if (this.file !==null){
            this.option.img = '/static/picture/avatar_default.jpg'
            this.isShowModal = true
          }else {
            console.log("输出为空")
          }

        },

        onCubeImg(){

        }
      },
    computed:{
      scrollHeight(){
        return "height:" + ((window.screen.height)) + "px";
      }
    },
  }
</script>

<style scoped>
  .cropper-content{
    position: fixed;
    z-index: 199;
    width: 100%;
    height: 100%;
  }
  .cropper{
    width: 100%;
  }
</style>
