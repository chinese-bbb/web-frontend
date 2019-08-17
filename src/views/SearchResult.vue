<template>
  <div class="search-result container">
    <header class="mb-4 text-center">
      <el-input
        :suffix-icon="searchStr ? '' : 'el-icon-search'"
        @keyup.enter.native="search(searchStr)"
        class="search-input"
        placeholder="请输入您想查询或投诉的商户/产品/关键词"
        type="search"
        v-model="searchStr"
      >
        <el-button
          :loading="loading"
          @click="search(searchStr)"
          icon="el-icon-search"
          slot="append"
          type="primary"
          v-if="searchStr"
          >搜索
        </el-button>
      </el-input>
    </header>

    <div class="search-output row">
      <main class="results-wrapper col-12" v-loading="loading">
        <!--        <div class="filters">-->
        <!--          筛选器-->
        <!--        </div>-->

        <ul class="results list-unstyled mt-4" v-if="loading || viewResults.length">
          <li :key="item.No" class="mb-3" v-for="item in viewResults">
            <router-link class="route-link-view" :to="{ name: 'merchantInfo', params: { merchantId: item.KeyNo } }">
              <merchant-info-card :data="item"></merchant-info-card>
            </router-link>
          </li>
        </ul>

        <div>
          <div class="text-center" v-if="!viewResults.length && !loading"><p>找不到相关数据哦</p></div>

          <el-pagination
            :page-size="pageSize"
            :total="pageCount"
            @current-change="handlePageChange"
            hide-on-single-page
            layout="prev, pager, next"
          >
          </el-pagination>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MerchantInfoCard from '@/components/MerchantInfoCard.vue';

import { searchService } from '../services';
import { SearchItem } from '@/models';
import { Route } from 'vue-router';

@Component({
  components: {
    MerchantInfoCard,
  },
  props: {
    tab: String,
  },
})
export default class SearchResult extends Vue {
  @Prop(String) queryKey: string;
  activeTab = 'recent';
  searchStr = '';
  loading = false;
  viewResults: SearchItem[] = [];
  pageCount = 0;
  pageSize = 10;

  beforeRouteUpdate(to: Route, from: Route, next: any) {
    if (to.query.q !== this.searchStr) {
      setTimeout(() => {
        this.freshSearch();
      });
    }
    next();
  }

  search(keyword: string, index: number) {
    if (this.loading) {
      return;
    }

    if (!keyword) {
      this.$message.error('无效关键词，请重新输入');

      this.loading = false;
      return;
    }

    this.loading = true;

    searchService
      .search(keyword, index)
      .then(resp => {
        this.$router.push({ name: 'search', query: { q: this.searchStr } }).catch(() => void 0);
        this.viewResults = resp.data.result;
        this.pageCount = Math.ceil(resp.data.totalPage / this.pageSize) || 0;
      })
      .finally(() => (this.loading = false));
  }

  mounted() {
    this.freshSearch();
  }

  freshSearch() {
    this.searchStr = this.queryKey || '';
    this.search(this.searchStr, 0);
  }

  handlePageChange(pageNum: number) {
    this.search(this.searchStr, pageNum);
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/helper';

.filters {
  background-color: #eaeaea;
  height: 100px;
}

.search-input {
  width: 100%;
}

.results {
  min-height: 50vh;
}

@include media-breakpoint-up(md) {
  .search-input {
    width: 75%;
  }
}
</style>
