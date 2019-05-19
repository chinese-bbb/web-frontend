<template>
  <div class="search-result container">
    <header class="mb-4 text-center">
      <el-input
        :suffix-icon="searchStr ? '' : 'el-icon-search'"
        @keyup.enter.native="search"
        class="search-input"
        placeholder="请输入您想查询的商户/产品/关键词"
        v-model="searchStr">

        <el-button
          @click="search"
          icon="el-icon-search"
          slot="append"
          type="primary"
          v-if="searchStr">搜索
        </el-button>
      </el-input>
    </header>

    <div class="search-output row">
      <main class="results-wrapper col-12">
        <div class="filters">
          筛选器
        </div>

        <ul class="results list-unstyled mt-4">
          <li class="mb-3" v-for="item in viewResults" :key="item">
            <router-link class="route-link-view" to="/merchant-info">
              <merchant-info-card></merchant-info-card>
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
      </main>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import MerchantInfoCard from '@/components/MerchantInfoCard.vue';

  @Component({
    components: {
      MerchantInfoCard,
    },
    props: {
      tab: String,
    },
  })
  export default class MerchantDashboard extends Vue {
    activeTab = 'recent';
    searchStr = '';
    viewResults: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    search() {
      // do something
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
</style>
