<template>
  <div class="realname-verification">
    <el-upload
      :auto-upload="false"
      :limit="1"
      :on-change="onChange"
      :on-exceed="handleError"
      action="https://jsonplaceholder.typicode.com/posts/"
      class="upload-box"
      drag
      list-type="picture"
      ref="uploader">

      <div class="text-center">
        请点此上传您的身份证照片正面
        <br>
        或
        <br>
        将身份证照片正面拖至此框
      </div>

    </el-upload>

    <el-button @click="submitUpload" type="primary" v-if="fileSelected">上传文件</el-button>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ElUpload } from 'element-ui/types/upload';

@Component
export default class RealNameAuth extends Vue {
  fileSelected = false;

  handleError() {
    this.$message.error('只需上传一个文件。可通过预览卡片去除已选择文件');
  }

  onChange(file: File, filelist: FileList) {
    this.fileSelected = !!filelist.length;
  }

  submitUpload() {
    (this.$refs.uploader as ElUpload).submit();
  }
}
</script>

<style lang="scss" scoped>
  .realname-verification {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .upload-box {
    line-height: 40px;
    margin-top: 10vh;
    margin-bottom: 1rem;

    /deep/ {
      .el-upload-dragger {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .el-upload-list__item-thumbnail {
        object-fit: contain;
      }
    }
  }
</style>
