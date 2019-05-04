<template>
  <div class="merchant-info-view container">
    <el-card class="info-card" shadow="never">
      <div slot="header">
        <el-row>
          <el-col :span="4">
            <el-image class="merchant-logo"></el-image>
          </el-col>

          <el-col :span="4">
            <h3 class="title">商户名</h3>

            <div class="merchant-keywords">关键词 / 关键词 / 关键词</div>
          </el-col>

          <el-col :span="4">
            <p class="title">行业： xxxxxxxxx</p>

            <p class="keywords">地址：xxxxxxx</p>
          </el-col>

          <el-col :span="4">
            <p class="title">网址：xxxxxxx</p>

            <p class="keywords">电话：xxxxxx</p>
          </el-col>

          <el-col :span="4">

            <div class="keywords">更多工商信息</div>
          </el-col>
        </el-row>
      </div>

      <div class="analysis d-flex">
        <div class="flex-grow-1">
          综合评分
        </div>

        <router-link :to="{name: 'fileComplaint'}" class="btn-file-complaint el-button el-button--primary">我要投诉
        </router-link>
      </div>
    </el-card>

    <div class="complaints-history mt-5">
      <h3>历史投诉信息</h3>

      <el-divider></el-divider>

      <div class="mb-4">filter</div>

      <ul class="complaint-list list-unstyled">
        <li class="complaint-info-item mb-3" v-for="item in viewResults">
          <router-link class="route-link-view d-flex" to="/merchant/complaint-details">
            <div class="complaint-img mr-3"></div>

            <div class="complaint-content d-flex flex-column flex-grow-1">
              <div class="header d-flex justify-content-between">
                <h4 class="title">原因：xxxxxxx</h4>

                <div class="time-info">时间：xxxx</div>
              </div>

              <p>简介：xxxxx</p>
            </div>
          </router-link>
        </li>
      </ul>

      <div>
        <div v-if="!viewResults.length"><p>没有数据哦</p></div>

        <el-pagination
          layout="prev, pager, next"
          :page-size="10"
          hide-on-single-page
          :total="viewResults.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    props: {
      tab: String,
    },
  })
  export default class MerchantInfo extends Vue {
    viewResults: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }
</script>

<style lang="scss" scoped>
  @import "../styles/helper";

  .info-card {
    background-color: #eaeaea;
  }

  .merchant-logo {
    width: 150px;
    height: 150px;
  }

  .analysis {
    height: 480px;
    display: flex;
    flex-direction: column;
  }

  .btn-file-complaint {
    align-self: flex-end;
    text-decoration: none;
    width: 12em;
  }

  .complaint-info-item {
    background-color: #fafafa;
    padding: 15px;
  }

  .complaint-img {
    height: 150px;
    width: 150px;
    background-color: #E4e4e4;
  }
</style>
