import Vue from 'vue';
import axios, { AxiosError } from 'axios';
import Component from 'vue-class-component';

import App from './App.vue';
import router from './router';
import store from './store';

import './side-effects';
import './registerServiceWorker';

import './styles.scss';
import { ElMessage } from 'element-ui/types/message';

Vue.config.productionTip = false;

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);

Vue.config.productionTip = false;

store.dispatch('fetchUserInfo').finally(() => {
  const app = new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
      defineInterceptors(this.$message);
    },
  });
  app.$mount('#app');
});

function defineInterceptors($message: ElMessage) {
  axios.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    (error: AxiosError) => {
      // tslint:disable-next-line:no-console
      console.error(error);

      if (!error.response) {
        return Promise.reject(error);
      }

      const { status } = error.response;

      if (status === 400) {
        // $message.error('发送请求有误，请反馈给网站管理员');
      } else if (status === 401) {
        $message.error('用户未登录，无法访问');
        // store.dispatch('signout');
      } else if (status === 403) {
        $message.error('用户未授权');
      } else if (status === 404) {
        // $message.error('目标资源不存在');
      } else if (status === 500) {
        $message.error('服务器发生错误');
      }
      // Do something with response error
      return Promise.reject(error);
    },
  );
}
