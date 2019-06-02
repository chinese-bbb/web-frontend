<template>
  <div class="search-result container">
    <header class="mb-4 text-center">
      <el-input
        :suffix-icon="searchStr ? '' : 'el-icon-search'"
        @keyup.enter.native="search(searchStr)"
        class="search-input"
        placeholder="请输入您想查询的商户/产品/关键词"
        v-model="searchStr"
        type="search"
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

        <ul class="results list-unstyled mt-4">
          <li :key="item.No" class="mb-3" v-for="item in viewResults">
            <router-link :to="{ name: 'merchantInfo', params: { id: item.KeyNo } }" class="text-decoration-none">
              <merchant-info-card :data="item"></merchant-info-card>
            </router-link>
          </li>
        </ul>

        <div>
          <div v-if="!viewResults.length && !loading"><p>找不到相关数据哦</p></div>

          <el-pagination :page-size="10" :total="viewResults.length" hide-on-single-page layout="prev, pager, next">
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

@Component({
  components: {
    MerchantInfoCard,
  },
  props: {
    tab: String,
  },
})
export default class MerchantDashboard extends Vue {
  @Prop(String) queryKey: string;
  activeTab = 'recent';
  searchStr = '';
  loading = false;
  viewResults: SearchItem[] = [];

  search(keyword: string) {
    this.loading = true;

    searchService
      .search(keyword)
      .then(resp => {
        this.viewResults = resp.data.return;
      })
      .finally(() => (this.loading = false));
  }

  mounted() {
    this.searchStr = this.queryKey || '';
    this.search(this.queryKey || '');
  }
}
</script>

<style lang="scss" scoped>
.filters {
  background-color: #eaeaea;
  height: 100px;
}

.search-input {
  width: 75%;
}

.results {
  min-height: 50vh;
}
</style>
