<template>
  <div class="home">
    <section class="top-sec d-flex align-items-center justify-content-center">
      <el-input
        :suffix-icon="searchStr ? '' : 'el-icon-search'"
        @keyup.enter.native="search"
        class="search-input"
        placeholder="请输入您想查询或投诉的商户/产品/关键词"
        type="search"
        v-model="searchStr"
      >
        <el-button @click="search" icon="el-icon-search" slot="append" type="primary" v-if="searchStr">搜索</el-button>
      </el-input>

      <el-dialog :show-close="false" :visible.sync="authDialogVisible" center class="precheck-dialog" title top="0">
        <p class="auth-hint text-center">
          请先
          <router-link :to="{ name: 'cSignUp' }">注册</router-link>
          或
          <router-link :to="{ name: 'cSignIn' }">登陆</router-link>
          后再进行搜索
        </p>
      </el-dialog>
    </section>

    <section class="news container my-5">
      <h3>最新投诉</h3>

      <ul class="list-unstyled">
        <li :key="index" class="complaint-item pb-2" v-for="(item, index) in complaintList">
          {{ item.complain_timestamp | date }}：<span class="font-italic">{{ item.user | userName }}</span> 由于
          <span class="font-weight-bold">{{ item.complain_type | complaintType }}</span> 发起了对
          <span class="company-name">{{ item.targetCompany }}</span> 的投诉

          <router-link
            :to="{
              name: 'complaintDetails',
              params: { merchantId: item.targetCompanyId, complaintId: item.complaint_id },
            }"
            >查看详情</router-link
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { complaintService, merchantService } from '../services';
import { ServerComplaintModel } from '@/models';

interface ComplaintModel extends ServerComplaintModel {
  targetCompany: string;
  targetCompanyId: string;
}

@Component({
  components: {},
})
export default class Home extends Vue {
  searchStr: string = '';
  authDialogVisible = false;
  complaintList: any[] = [];

  search() {
    if (this.$store.state.authenticated) {
      this.$router.push({ name: 'search', query: { q: this.searchStr } });
    } else {
      this.authDialogVisible = true;
    }
  }

  getLatestComplaints() {
    complaintService.getLatestComplaints().then(
      data => {
        Promise.all(
          data.data.map(item =>
            merchantService.queryMerchant(item.merchant_id).then(({ data: merchantInfo }) => {
              const newItem: ComplaintModel = item as any;
              newItem.targetCompany = merchantInfo.storage.Name;
              newItem.targetCompanyId = merchantInfo.storage.KeyNo;

              return newItem;
            }),
          ),
        ).then(output => {
          this.complaintList = output;
        });
      },
      error => {
        if (error && error.response) {
          this.$message.error(error.toString());
        }
      },
    );
  }

  created() {
    this.getLatestComplaints();
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/helper';

.home {
  margin: -$--main-padding;
}

.top-sec {
  height: calc(100vh - #{$headerHeight});
  background-image: url('https://images.huxingongyi.com/gratisography-mountain-peaks.jpg');
  background-size: cover;
}

@include media-breakpoint-down(sm) {
  .top-sec {
    height: calc(100vh - #{$mobileHeaderHeight});
  }
}

.search-input {
  width: 80vw;
  transition: width 0.3s ease-in;
  margin-top: -5em;
}

.btn-file-complaint {
  width: 20rem;
  font-size: 1.5em;
  text-decoration: none;
}

.news-img {
  height: 150px;
}

.information {
  height: 300px;
  background-color: #eaeaea;
}

.complaint-item {
  border-bottom: 1px solid #d5d4d4;
}

.company-name {
  text-decoration: underline;
}

.auth-hint {
  font-size: $--font-size-large;

  a {
    color: $--link-color;
  }
}

.el-dialog__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@include media-breakpoint-up(lg) {
  .search-input {
    width: 40vw;
  }
}

@include media-breakpoint-up(md) {
  .search-input {
    width: 60vw;
  }
}
</style>
