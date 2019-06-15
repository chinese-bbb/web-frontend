<template>
  <div class="user-info-view container mt-3">
    <el-row :gutter="30">
      <el-col :span="16" class="main-col">
        <el-tabs :value="activeTab" @tab-click="tabChanged" type="card">
          <el-tab-pane :class="{ loading: loading }" label="最近投诉消息" name="recent" v-loading="loading">
            <ul class="complaints-list list-unstyled">
              <li :key="item.complaint_id" class="mb-3" v-for="item in recentComplaints">
                <router-link :to="{ name: 'complaintDetails', params: { complaintId: item.complaint_id } }"
                             class="route-link-view">
                  <complaint-card :complaint="item"/>
                </router-link>
              </li>
            </ul>

            <div v-if="!loading">
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

          <el-tab-pane label="历史投诉消息" name="history">
            即将推出，敬请期待!
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="8" class="side-col">
        <div class="search-wrapper">
          <el-input :value="searchStr" @input="search" placeholder="请输入投诉消息关键词" suffix-icon="el-icon-search">
          </el-input>
        </div>

        <el-card class="user-info-card mt-4" shadow="hover">
          <div class="d-flex align-items-center justify-content-start">
            <div class="portrait-wrapper mr-3">
              <fa-icon class="portrait" icon="user-circle" size="6x"></fa-icon>
            </div>

            <h3 class="username"><span class="family-name">{{ user.real_name }}</span>&nbsp;<span class="gender">{{ user.sex == 'female' ? '女士' : '先生' }}</span>
            </h3>
          </div>

          <el-divider></el-divider>

          <p>注册时间：{{ user.registered_date | date('yyyy 年 MM 月 dd 日') }}</p>
          <p class="d-flex justify-content-between">
            <span>是否实名：{{ user.if_verified ? '是' : '否' }}</span>
            <router-link :to="{ name: 'realnameAuth'}" class="primary-router-link">立即实名</router-link>
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ElTabPane } from 'element-ui/types/tab-pane';
import ComplaintCard from '@/components/ComplaintCard.vue';
import { complaintService, customerService } from '../../../services';
import { ServerComplaintModel, UserModel } from '@/models';

@Component({
  components: {
    ComplaintCard,
  },
  props: {
    tab: String,
  },
})
export default class Profile extends Vue {
  activeTab = 'recent';
  tab: string;
  timeoutId: number | undefined;
  searchStr = '';
  recentComplaints: ServerComplaintModel[] = [];
  user: UserModel = {} as any;
  loading = true;

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

    this.getUserInfo();
  }

  getUserInfo() {
    customerService
      .getCurrentUserInfo()
      .then(
        user => {
          this.user = user.data;

          this.getComplaints();
        },
        error => {
          this.$message.error(error.message);
        },
      );
  }

  getComplaints() {
    this.loading = true;

    complaintService
      .getUserComplaint(this.user.username)
      .then(
        complaint => {
          this.recentComplaints = complaint.data;
        },
        error => {
          this.$message.error(error.message);
        },
      )
      .finally(() => this.loading = false);
  }

  tabChanged(tab: ElTabPane) {
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
    .el-tab-pane.loading {
      height: 150px;
    }

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

  .username {
    font-size: 2em;
  }
</style>
