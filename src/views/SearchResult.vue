<template>
  <div class="search-result container">
    <header class="mb-4">
      <el-input
        @input="search"
        class="search-input"
        placeholder="请输入您想查询的商户/产品/关键词"
        suffix-icon="el-icon-search"
        v-model="searchStr">
      </el-input>
    </header>

    <div class="search-output row">
      <main class="results-wrapper col-8">
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

      <aside class="hot-related col-4">
        <el-card shadow="hover">
          <h3>热度榜</h3>

          <ul class="list-unstyled">
            <li class="mb-1" v-for="(item, index) in viewResults.slice(0, 10)" :key="index">{{index+1}}: xxx</li>
          </ul>
        </el-card>
      </aside>
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
</style>
