<template>
  <div class="merchant-info-view container">
    <el-card class="info-card" shadow="never" v-loading="loading">
      <div class="row">
        <div class="company-info col-4">
          <el-image :src="merchantInfo.ImageUrl" class="merchant-logo mb-3"></el-image>

          <h3 class="company-name">{{ merchantInfo.Name }}</h3>

          <p class="establishment-time">成立时间 ：{{ merchantInfo.StartDate | date }}</p>
          <p class="years-in-business">营业年数 ：{{ new Date() | yearDuration(merchantInfo.StartDate) }}</p>
          <p class="corporative-name">法人姓名 ：{{ merchantInfo.OperName }}</p>
          <p class="ibn">工商号码 ：{{ merchantInfo.CreditCode }}</p>
          <p class="address">地址 ：{{ merchantInfo.Address }}</p>
          <p class="registered-capital">注册资本 ：{{ merchantInfo.RegistCapi }}</p>
          <p class="former-names">曾用名 ：{{ merchantInfo.OriginalName | serializeArray }}</p>
          <v-clamp :max-lines="3" autoresize tag="p" :title="merchantInfo.Scope">经营范围 ：{{ merchantInfo.Scope }}</v-clamp>
          <p class="corporation-status">经营状态 ：{{ merchantInfo.Status }}</p>
        </div>

        <div class="analysis d-flex col-8">
          <div class="chart-wrapper flex-grow-1">
            chart
          </div>

          <router-link
            :to="{ name: 'fileComplaint', query: { id: merchantInfo.No } }"
            class="btn-file-complaint el-button el-button--primary"
          >我要投诉
          </router-link>
        </div>
      </div>
    </el-card>

    <div class="complaints-history my-5">
      <h3>历史投诉信息</h3>

      <el-divider></el-divider>

      <div :class="{'complaints-history--loading': joinedLoading}" class="result-wrapper" v-loading="joinedLoading">

        <div class="filters mb-4" v-if="viewResults.length">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link"> 投诉类型<i class="el-icon-arrow-down el-icon--right"></i> </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link"> 投诉阶段<i class="el-icon-arrow-down el-icon--right"></i> </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown trigger="click">
            <span class="el-dropdown-link"> 时间<i class="el-icon-arrow-down"></i> </span>

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
          <li :key="item" class="complaint-info__item mb-3" v-for="item in viewResults">
            <router-link class="route-link-view d-flex flex-column" :to="{name: 'complaintDetails'}">
              <div class="header row mb-2">
                <span class="complaint-type col-6">投诉类型：xxx</span>
                <span class="complaint-status col-3">状态：xxx</span>
                <span class="complaint-owner col-3">投诉人：xxx</span>
              </div>

              <div class="content">
                <p class="brief-summary">
                  300字雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。雷克雅未克大教堂位于市中心，全名叫哈尔格林姆斯教堂（Hallgrimskirkja），以冰岛著名文学家哈尔格林姆斯的名字而命名，纪念他对冰岛文学的巨大贡献。该教堂于1940年开始奠基，于六十年代末基本完工。由于经费靠教会筹集和信徒捐助。
                </p>

                <div class="text-right">
                  <el-button class="">查看具体<i class="el-icon-arrow-right"></i></el-button>
                </div>
              </div>
            </router-link>
          </li>
        </ul>

        <div v-if="!joinedLoading">
          <div v-if="!viewResults.length"><p class="text-center">没有数据哦</p></div>

          <el-button class="btn-block align-self-end" v-if="viewResults.length"
          >点击显示更多<i class="el-icon-arrow-down"></i>
          </el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VClamp from 'vue-clamp';

import { complaintService, searchService } from '../../services';
import { MerchantDetail } from '@/models';
import { yearDuration } from '@/filters';

@Component({
  components: {
    VClamp,
  },
  filters: {
    yearDuration,
    serializeArray(value: string[]) {
      if (value && value.length) {
        return value.join('，');
      }

      return '无';
    },
  },
})
export default class MerchantInfoView extends Vue {
  @Prop(String) id: string;

  loading = false;
  loadingList = false;

  get joinedLoading() {
    return this.loading || this.loadingList;
  }

  merchantInfo: MerchantDetail = {} as any;

  viewResults: any[] = [];

  mounted() {
    this.loading = true;
    searchService
      .queryMerchant(this.id)
      .then(resp => {
        this.merchantInfo = resp.data.return;

        this.getComplaints();
      })
      .finally(() => (this.loading = false));
  }

  getComplaints() {
    this.loadingList = true;

    this.viewResults = [];

    complaintService.getComplaintByMerchant(this.id)
      .then(resp => {
        this.viewResults = resp.data.return;
      })
      .finally(() => {
        this.loadingList = false;
      });
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/helper';

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

  .complaint-info__item {
    background-color: #fafafa;
    padding: 15px;

    .header {
      font-size: $--font-size-primary;
    }
  }

  .complaints-history--loading {
    height: 15rem;
  }

  .complaint-img {
    height: 150px;
    width: 150px;
    background-color: #e4e4e4;
  }

  .filters .el-dropdown {
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
</style>
