<template>
  <div class="user-info-view container mt-3">
    <el-row :gutter="30">
      <el-col :span="16" class="main-col">
        <el-tabs :value="activeTab" @tab-click="tabChanged" type="card">
          <el-tab-pane label="最近投诉消息" name="recent">
            <ul class="complaints-list list-unstyled">
              <li :key="item" class="mb-3" v-for="item in recentComplaints">
                <router-link class="route-link-view" to="/merchant/complaint-details">
                  <complaint-card> </complaint-card>
                </router-link>
              </li>
            </ul>

            <div class="block">
              <div v-if="!recentComplaints.length"><p>没有数据哦</p></div>

              <el-pagination
                :page-size="10"
                :total="recentComplaints.length"
                hide-on-single-page
                layout="prev, pager, next"
              >
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="8" class="side-col">
        <div class="search-wrapper">
          <el-input :value="searchStr" @input="search" placeholder="请输入投诉消息关键词" suffix-icon="el-icon-search">
          </el-input>
        </div>

        <el-card class="user-info-card mt-4" shadow="hover">
          <div class="d-flex justify-content-start">
            <div class="portrait-wrapper mr-3">
              <fa-icon class="portrait" icon="user-circle" size="6x"></fa-icon>
            </div>

            <div class="merchant-info">
              <h3 class="merchant-name">xxx</h3>

              <p class="merchant-keywords">关键词 / 关键词 / 关键词</p>
            </div>
          </div>

          <el-divider></el-divider>

          <p>综合评分：<span class="total-score">7.9</span></p>
          <p>投诉数量（3年）：xxx</p>
          <p>投诉数量（12月）：xxx</p>
          <p>解决率（12月）：xxx%</p>
          <p>回复速度（12月）：xxx%</p>

          <!--          <el-divider></el-divider>-->

          <!--          <p>商户个体信息</p>-->
          <!--          <p>联系我们</p>-->
          <!--          <p>设置</p>-->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ElTabPane } from 'element-ui/types/tab-pane';
import ComplaintCard from '@/components/ComplaintCard.vue';

@Component({
  components: {
    ComplaintCard,
  },
  props: {
    tab: String,
  },
})
export default class MerchantDashboard extends Vue {
  activeTab = 'recent';
  tab: string;
  timeoutId: number | undefined;
  searchStr = '';
  recentComplaints: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  search(value: string) {
    this.searchStr = value;

    if (this.timeoutId) {
      clearInterval(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this._search();
    }, 500);
  }

  created() {
    this.activeTab = this.tab || this.activeTab;
  }

  tabChanged(tab: ElTabPane, event: MouseEvent) {
    if (this.activeTab !== tab.name) {
      // do something
    }

    this.activeTab = tab.name;
  }

  private _search() {
    // do something
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/helper';

.main-col {
  //background-color: #666666;
}

.side-col {
  //background-color: #CCCCCC;
}

.el-tabs /deep/ {
  .el-tabs__nav-wrap {
    margin-bottom: 0;
  }

  .el-tabs__header {
    border-bottom-width: 2px;
  }

  .el-tabs__nav {
    border-radius: 0;
  }

  .el-tabs__nav,
  .el-tabs__item {
    border: 0 !important;
  }

  .el-tabs__item.is-active {
    background-color: $--color-primary;
    color: $--color-primary-inverse;
  }
}

.complaints-list {
}

.merchant-name {
  font-size: 2em;
}
</style>
