<template>
  <div class="merchant-info-view container">
    <el-card class="info-card" shadow="never">
      <div class="row">
        <div class="company-info col-4">

          <el-image class="merchant-logo mb-3"></el-image>

          <h3 class="company-name">商户名</h3>

          <p class="establishment-time">成立时间 ：2001.5</p>
          <p class="years-in-business">营业年数 ：2001.5</p>
          <p class="corporative-name">法人姓名 ：赵三例</p>
          <p class="ibn">工商号码 ：18758390283665</p>
          <p class="address">地址 ：18758390283665</p>
          <p class="registered-capital">注册资本 ：18758390283665</p>
          <p class="former-names">曾用名 ：18758390283665</p>
          <p class="business-scope">经营范围 ：汽车及汽车相关服务</p>
          <p class="corporation-status">经营状态 ：18758390283665</p>

        </div>

        <div class="analysis d-flex col-8">
          <div class="chart-wrapper flex-grow-1">
            chart
          </div>

          <router-link :to="{name: 'fileComplaint'}" class="btn-file-complaint el-button el-button--primary">我要投诉
          </router-link>
        </div>
      </div>

    </el-card>

    <div class="complaints-history mt-5">
      <h3>历史投诉信息</h3>

      <el-divider></el-divider>

      <div class="filters mb-4">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            投诉类型<i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            投诉阶段<i class="el-icon-arrow-down el-icon--right"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            时间<i class="el-icon-arrow-down"></i>
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <ul class="complaint-list list-unstyled">
        <li :key="item" class="complaint-info-item mb-3" v-for="item in viewResults">
          <router-link class="route-link-view d-flex flex-column" to="/merchant/complaint-details">
            <div class="header row mb-2">
              <span class="complaint-type col-6">投诉类型：xxx</span>
              <span class="complaint-status col-3">状态：xxx</span>
              <span class="complaint-owner col-3">投诉人：xxx</span>
            </div>

            <div class="content">
              <p class="brief-summary">
                300字雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。</p>

              <div class="text-right">
                <el-button class="">查看具体<i class="el-icon-arrow-right"></i></el-button>
              </div>
            </div>
          </router-link>
        </li>
      </ul>

      <div>
        <div v-if="!viewResults.length"><p>没有数据哦</p></div>

        <el-button class="btn-block align-self-end" v-if="viewResults.length">点击显示更多<i class="el-icon-arrow-down"></i>
        </el-button>
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

  .company-info {
    p {
      margin-bottom: 0.25rem;
    }
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

    .header {
      font-size: $--font-size-primary;
    }
  }

  .complaint-img {
    height: 150px;
    width: 150px;
    background-color: #E4e4e4;
  }

  .filters .el-dropdown {
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
</style>
