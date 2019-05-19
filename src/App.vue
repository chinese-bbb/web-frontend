<template>
  <div id="app">
    <el-container>
      <app-header></app-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer height="80px">Footer</el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import AppHeader from '@/components/Header.vue';

  @Component({
    components: { AppHeader },
  })
  export default class App extends Vue {
  }
</script>

<style lang="scss" scoped>
  @import 'styles/helper';

  .el-main {
    min-height: calc(100vh - #{$headerHeight + $footerHeight});
  }
</style>
