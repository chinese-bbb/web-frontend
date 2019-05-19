<template>
  <div class="complaint-details container">
    <div class="row">
      <div class="col-8">
        <el-card class="complaint-main-info" shadow="hover">
          <div class="header row mb-2">
            <span class="complaint-type col-6">投诉类型：xxx</span>
            <span class="complaint-status col-3">状态：xxx</span>
            <span class="complaint-owner col-3">投诉人：xxx</span>
          </div>

          <div class="content">
            <p class="brief-summary">
              300字雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。
            </p>
          </div>
        </el-card>

        <el-card class="complaint-comments mt-3" shadow="hover">
          <ol class="comments list-unstyled mb-0">
            <li class="comment media d-flex">
              <div class="thumb mr-2">
                <i class="el-icon-s-custom"></i>
              </div>

              <div class="media-content flex-grow-1">
                <div class="comment-meta d-flex justify-content-between">
                  <span class="comment-owner-name">奔驰中国 广东4S店：</span>
                  <span class="comment-time">2018 04-18 05:18</span>
                </div>

                <p class="comment-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx11</p>
              </div>
            </li>

            <li class="comment media d-flex">
              <div class="thumb mr-2">
                <i class="el-icon-s-custom"></i>
              </div>

              <div class="media-content flex-grow-1">
                <div class="comment-meta d-flex justify-content-between">
                  <span class="comment-owner-name">奔驰中国 广东4S店：</span>
                  <span class="comment-time">2018 04-18 05:18</span>
                </div>

                <p class="comment-content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx11</p>
              </div>
            </li>
          </ol>
        </el-card>

        <div class="mt-5">
          <h3>回复</h3>

          <el-input type="textarea" :autosize="{ minRows: 4 }" placeholder="请输入内容"> </el-input>

          <div class="text-right mt-2">
            <el-button class="btn-submit" type="primary" @click="reply()">提交</el-button>
          </div>
        </div>
      </div>

      <el-card class="invoice-info col-4" shadow="hover">
        <h3>发票信息</h3>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ComplaintDetails extends Vue {
  reply() {
    // do something
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/helper';

.complaint-main-info {
  //height: 450px;
}

.thumb {
  font-size: 64px;
  line-height: 1;
}

.invoice-info {
  height: 250px;
}
.btn-submit {
  width: 10em;
}

.comment:not(:last-child) {
  margin-bottom: 1rem;
  border-bottom: 1px solid $--border-color-light;
}
</style>
