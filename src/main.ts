import Vue from 'vue';
import axios, { AxiosError } from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';

import './side-effects';
import './registerServiceWorker';

import './styles.scss';
import { ElMessage } from 'element-ui/types/message';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    defineInterceptors(this.$message);
  },
}).$mount('#app');

function defineInterceptors($message: ElMessage) {
  axios.interceptors.response.use(response => {
    // Do something with response data
    return response;
  }, (error: AxiosError) => {
    // tslint:disable-next-line:no-console
    console.error(error);

    const { status } = error.response!;

    if (status === 400) {
      $message.error('发送请求有误，请反馈给网站管理员');
    } else if (status === 401) {
      $message.error('用户未认证或认证失效，请重新登录');
      // store.dispatch('signout');
    } else if (status === 403) {
      $message.error('用户未授权');
    } else if (status === 404) {
      $message.error('目标资源不存在');
    } else if (status === 500) {
      $message.error('服务器发生错误');
    }
    // Do something with response error
    return Promise.reject(error);
  });
}
