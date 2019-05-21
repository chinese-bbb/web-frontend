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
import { ComponentOptions } from 'vue';

@Component({
  components: { AppHeader },
})
export default class App extends Vue {
  refreshing = false;
  registration: ServiceWorkerRegistration | null = null;

  created() {
    document.addEventListener(
      'swUpdated', this.showRefreshUI as any, { once: true },
    );
    navigator.serviceWorker.addEventListener(
      'controllerchange', () => {
        if (this.refreshing) {
          return;
        }
        this.refreshing = true;
        window.location.reload();
      },
    );
  }

  refreshApp() {
    if (!this.registration || !this.registration.waiting) {
      return;
    }

    this.registration.waiting.postMessage('skipWaiting');
  }

  showRefreshUI(e: CustomEvent<ServiceWorkerRegistration>) {
    this.registration = e.detail;
    const that = this;

    const vnode = createDynamicVnode({
      template: `<p>发现网站有新版本！<el-button type="primary" size="small" @click="refresh">立即更新</el-button></p>`,
      methods: {
        refresh() {
          that.$message.info('正在更新网站..., 请稍等');
          that.refreshApp();
          note.close();
        },
      },
    });

    const note = this.$notify({
      title: '版本更新',
      message: vnode,
      duration: 0,
      customClass: 'new-version-update-notification',
    });
  }
}

function createDynamicVnode(options: ComponentOptions<Vue>) {
  const Comp = Vue.extend(options);

  const instance = new Comp().$mount();

  return (instance as any)._vnode;
}
</script>

<style lang="scss" scoped>
  @import 'styles/helper';

  .el-main {
    min-height: calc(100vh - #{$headerHeight + $footerHeight});
  }
</style>
