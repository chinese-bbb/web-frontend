<template>
  <div class="home mb-5">
    <section class="top-sec d-flex align-items-center justify-content-center">
      <el-input
        class="search-input"
        v-model="searchStr"
        @input="search"
        placeholder="请输入您想查询的商户/产品/关键词"
        suffix-icon="el-icon-search">
      </el-input>
    </section>

    <section class="file-complaints-entrance text-center py-5">
      <h2>我要投诉</h2>

      <p class="mb-5">我们将会协助您完成整个投诉过程</p>

      <router-link :to="{name: 'fileComplaint'}" class="btn-file-complaint el-button el-button--primary">立即投诉
      </router-link>
    </section>

    <section class="news container mt-5">
      <h2 class="mb-4">热点</h2>

      <el-row :gutter="20" class="top-news">
        <el-col :span="8">
          <el-card class="news-card" shadow="hover">
            <el-image class="news-img"></el-image>

            <h3>title</h3>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="news-card" shadow="hover">
            <el-image class="news-img"></el-image>

            <h3>title</h3>
          </el-card>
        </el-col>
        <el-col :span="8">

          <el-card class="news-card" shadow="hover">
            <el-image class="news-img"></el-image>

            <h3>title</h3>
          </el-card>
        </el-col>

      </el-row>

      <div class="information my-4"></div>
    </section>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class Home extends Vue {
    searchStr: string = '';

    mounted() {
      this.$store.commit('visitHomePage');
    }

    beforeDestroy() {
      this.$store.commit('leaveHomePage');
    }

    search() {
      // do something
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/helper";

  .home {
    margin: -$--main-padding;
  }

  .top-sec {
    height: 560px;
    background-image: url("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg");
    background-size: cover;
  }

  .search-input {
    width: 40vw;
    margin-top: -5em;
  }

  .btn-file-complaint {
    width: 20rem;
    font-size: 1.5em;
    text-decoration: none;
    color: $--color-primary-inverse;
  }

  .news-img {
    height: 150px;
  }

  .information {
    height: 300px;
    background-color: #eaeaea;
  }
</style>
