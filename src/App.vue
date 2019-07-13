<template>
  <div id="app">
    <el-container>
      <app-header></app-header>

      <el-main>
        <fade-in-transition>
          <router-view />
        </fade-in-transition>
      </el-main>

      <el-footer class="d-flex flex-column justify-content-center" height="80px">
        <h3 class="footer-title">联系我们</h3>

        <div class="row justify-content-around" style="line-height: 1.5">
          <div>微信公众号：互信公益</div>
          <div>
            微博：<a class="external-link" href="https://weibo.com/u/7103342303" target="_blank"
              >https://weibo.com/u/7103342303</a
            >
          </div>
          <div>邮箱：<a class="external-link" href="mailto:info@huxingongyi.com">info@huxingongyi.com</a></div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/Header.vue';

@Component({
  components: { AppHeader },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
@import 'styles/helper';

.el-main {
  min-height: calc(100vh - #{$headerHeight + $footerHeight});
}

.el-footer {
  color: white;
}

.footer-title {
  font-size: $--font-size-title;
}

.external-link:hover {
  color: inherit;
}
</style>
