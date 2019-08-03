<template>
  <div id="app">
    <el-container direction="vertical">
      <app-header></app-header>

      <el-main>
        <fade-in-transition>
          <router-view />
        </fade-in-transition>
      </el-main>

      <footer class="app-footer d-flex flex-column justify-content-center">
        <h3 class="footer-title" @click="dialogVisible = true">联系我们</h3>

        <div class="row justify-content-around" style="line-height: 1.5">
          <div class="contact-item">微信公众号：互信公益</div>
          <div class="contact-item">
            微博：<a class="external-link" href="https://weibo.com/u/7103342303" target="_blank"
              >https://weibo.com/u/7103342303</a
            >
          </div>
          <div class="contact-item">
            邮箱：<a class="external-link" href="mailto:info@huxingongyi.com">info@huxingongyi.com</a>
          </div>
        </div>
      </footer>
    </el-container>

    <el-dialog :before-close="handleClose" :visible.sync="dialogVisible" title="应用信息">
      <p>当前应用版本: {{ appVersion }}</p>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AppHeader from '@/components/Header.vue';

@Component({
  components: { AppHeader },
})
export default class App extends Vue {
  dialogVisible = false;
  appVersion = process.env.VUE_APP_SERVER_ADDR;

  handleClose() {
    this.dialogVisible = false;
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/helper';

.el-main {
  min-height: calc(100vh - #{$mobileHeaderHeight});
}

@include media-breakpoint-up(sm) {
  .el-main {
    min-height: calc(100vh - #{$headerHeight});
  }
}

.app-footer {
  color: $--color-primary-inverse;
  background-color: $--color-primary;
  text-align: center;
  padding: 1em $grid-gutter-width / 2;
  flex-shrink: 0;
}

.footer-title {
  font-size: $--font-size-title;
}

.external-link:hover {
  color: inherit;
}

.contact-item {
  padding: 0 $grid-gutter-width / 2;
}
</style>
