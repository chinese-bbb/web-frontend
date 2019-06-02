<template>
  <div id="app">
    <el-container>
      <app-header></app-header>

      <el-main>
        <fade-in-transition>
          <router-view/>
        </fade-in-transition>
      </el-main>

      <el-footer class="d-flex flex-column justify-content-center" height="80px">
        <h3 class="footer-title">联系我们</h3>

        <div class="row justify-content-around" style="line-height: 1.5">
          <div>微信公众号</div>
          <div>微博</div>
          <div>邮箱</div>
        </div>
      </el-footer>
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
    created() {
      document.addEventListener('swUpdated', this.showRefreshUI as any, { once: true });
    }

    refreshApp() {
      document.dispatchEvent(new CustomEvent('refreshApp'));
    }

    showRefreshUI() {
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

  .el-footer {
    color: white;
  }

  .footer-title {
    font-size: $--font-size-title;
  }
</style>
