<template>
  <div class="realname-verification">
    <el-upload
      :action="uploadUrl"
      :auto-upload="false"
      :data="uploadExtraData"
      :limit="1"
      :on-change="handleOnChange"
      :on-error="handleUploadError"
      :on-exceed="handleExceedError"
      :on-success="handleUploadSuccess"
      class="upload-box"
      drag
      list-type="picture"
      name="pic_file"
      ref="uploader"
      v-loading="verifying"
      with-credentials
    >
      <div class="text-center">
        请点此上传您的身份证照片正面
        <br />
        或
        <br />
        将身份证照片正面拖至此框
      </div>
    </el-upload>

    <el-button :loading="uploading" @click="submitUpload" type="primary" v-if="fileSelected">上传文件</el-button>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import { ElUpload } from 'element-ui/types/upload';
import { authService } from '@/services';

@Component
export default class RealNameAuth extends Vue {
  fileSelected = false;
  uploading = false;
  verifying = false;
  uploadUrl = axios.defaults.baseURL + 'upload_file';

  uploadExtraData = {
    upload_type: 'id',
  };

  handleExceedError() {
    this.$message.error({ duration: 0, message: '只需上传一个文件。可通过预览卡片去除已选择文件' });
  }

  handleOnChange(file: File, filelist: FileList) {
    this.fileSelected = !!filelist.length;
  }

  submitUpload() {
    this.uploading = true;
    (this.$refs.uploader as ElUpload).submit();
  }

  handleUploadSuccess(response: any) {
    this.uploading = false;
    this.verifying = true;

    authService
      .identifyUser(response.path)
      .then(
        resp => {
          if (resp.data.error) {
            if (resp.data.error.includes('Please upload clear ID')) {
              this.$message.error('请提供清晰的身份证照片（人脸那一面）');
            } else {
              this.$message.error('请提供有效的身份证照片（人脸那一面）');
            }
            return;
          }

          this.$msgbox
            .alert('实名认证完成', {
              showConfirmButton: true,
              showClose: false,
              center: true,
            })
            .then(() => {
              this.$router.push({ name: 'profile' });
            });
        },
        () => {
          this.$message.error('实名认证失败，请重试');
        },
      )
      .finally(() => (this.verifying = false));
  }

  handleUploadError() {
    this.uploading = false;
    this.$message.error('文件上传出错');
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

  &,
  & /deep/ .el-upload,
  & /deep/ .el-upload-dragger {
    max-width: 100%;
  }
}
</style>
