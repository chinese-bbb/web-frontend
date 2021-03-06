<template>
  <div class="user-info-view container mt-3">
    <div class="row">
      <el-tabs class="col-12 col-md-8 order-md-first order-last" :value="activeTab" @tab-click="tabChanged" type="card">
        <el-tab-pane
          :class="{ loading: loadingComplaints }"
          label="最近投诉消息"
          name="recent"
          v-loading="loadingComplaints"
        >
          <ul class="complaints-list list-unstyled">
            <li :key="item.complaint_id" class="mb-3" v-for="item in recentComplaints">
              <router-link
                :to="{ name: 'complaintDetails', params: { complaintId: item.complaint_id } }"
                class="route-link-view"
              >
                <complaint-card :complaint="item" />
              </router-link>
            </li>
          </ul>

          <div v-if="!loadingComplaints">
            <div v-if="!recentComplaints.length"><p>没有数据哦</p></div>

            <!--<el-pagination
              :page-size="10"
              :total="recentComplaints.length"
              hide-on-single-page
              layout="prev, pager, next"
            >
            </el-pagination>-->
          </div>
        </el-tab-pane>

        <el-tab-pane label="历史投诉消息" name="history">
          即将推出，敬请期待!
        </el-tab-pane>
      </el-tabs>

      <div class="side-col col-12 col-md-4">
        <div class="search-wrapper">
          <el-input
            class="search-input"
            :suffix-icon="searchStr ? '' : 'el-icon-search'"
            type="search"
            @keyup.enter.native="search"
            v-model="searchStr"
            placeholder="快捷查询商户/产品/关键词"
          >
            <el-button @click="search" icon="el-icon-search" slot="append" type="primary" v-if="searchStr"
              >搜索</el-button
            >
          </el-input>
        </div>

        <el-card class="user-info-card my-4" shadow="hover" v-loading="loadingUserInfo">
          <div class="d-flex align-items-center justify-content-start">
            <div class="portrait-wrapper mr-3">
              <fa-icon class="portrait" icon="user-circle" size="6x"></fa-icon>
            </div>

            <h3 class="username">
              <span class="family-name">{{ user.last_name }}</span
              >&nbsp;<span class="gender">{{ user.sex | gender }}</span>
            </h3>
          </div>

          <el-divider></el-divider>

          <p>注册时间：{{ user.registered_date | date('yyyy 年 MM 月 dd 日') }}</p>
        </el-card>
      </div>
    </div>
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
  loadingUserInfo = true;
  loadingComplaints = true;

  search() {
    this.$router.push({ name: 'search', query: { q: this.searchStr } });
  }

  created() {
    this.activeTab = this.tab || this.activeTab;

    if (!this.$store.state.userInfo || Date.now() - this.$store.state.lastUserUpdateTime > 1000 * 60 * 5) {
      this.getUserInfo();
    } else {
      this.loadingUserInfo = false;
      this.user = this.$store.state.userInfo;
      this.getComplaints();
    }
  }

  getUserInfo() {
    this.loadingUserInfo = true;
    customerService
      .getCurrentUserInfo()
      .then(
        user => {
          this.user = user.data;
          this.$store.commit('updateUserInfo', user.data);

          this.getComplaints();
        },
        error => {
          this.$message.error('获取用户信息失败，请刷新');
        },
      )
      .finally(() => (this.loadingUserInfo = false));
  }

  getComplaints() {
    this.loadingComplaints = true;

    complaintService
      .getUserComplaints(this.user.username)
      .then(
        complaint => {
          this.recentComplaints = complaint.data;
        },
        error => {
          this.$message.error('获取投诉列表失败，请刷新');
        },
      )
      .finally(() => (this.loadingComplaints = false));
  }

  tabChanged(tab: ElTabPane) {
    if (this.activeTab !== tab.name) {
      // do something
    }

    this.activeTab = tab.name;
  }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/helper';

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
