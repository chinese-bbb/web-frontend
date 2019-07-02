<template>
  <div class="home">
    <section class="top-sec d-flex align-items-center justify-content-center">
      <el-input
        :suffix-icon="searchStr ? '' : 'el-icon-search'"
        @keyup.enter.native="search"
        class="search-input"
        placeholder="请输入您想查询的商户/产品/关键词"
        type="search"
        v-model="searchStr"
      >
        <el-button @click="search" icon="el-icon-search" slot="append" type="primary" v-if="searchStr">搜索</el-button>
      </el-input>

      <el-dialog class="precheck-dialog" :show-close="false" :visible.sync="authDialogVisible" center title top="0">
        <p class="auth-hint text-center">
          请先
          <router-link :to="{ name: 'cSignUp' }">注册</router-link>或
          <router-link :to="{ name: 'cSignIn' }">登陆</router-link>后再进行搜索
        </p>
      </el-dialog>
    </section>

    <!-- <section class="news container mt-5">
      <div class="information my-4">
        <h3>information</h3>
      </div>

      <div class="information my-4">
        <h3>information</h3>
      </div>
    </section>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Home extends Vue {
  searchStr: string = '';
  authDialogVisible = false;

  search() {
    if (this.$store.state.authenticated) {
      this.$router.push({ name: 'search', query: { q: this.searchStr } });
    } else {
      this.authDialogVisible = true;
    }
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
  background-image: url('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg');
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
