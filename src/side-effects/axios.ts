import axios, { AxiosError } from 'axios';
import { Message } from 'element-ui';
import store from '@/store';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_ADDR;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(response => {
  // Do something with response data
  return response;
}, (error: AxiosError) => {
  // tslint:disable-next-line:no-console
  console.error(error);

  const {status } = error.response!;

  if (status === 400) {
    Message.error('发送请求有误，请反馈给网站管理员');
  } else if (status === 401) {
    Message.error('用户未认证或认证失效');
    store.dispatch('signout');
  } else if (status === 403) {
    Message.error('用户未授权');
  } else if (status === 404) {
    Message.error('目标资源不存在');
  } else if (status === 500) {
    Message.error('服务器发生错误');
  }
  // Do something with response error
  return Promise.reject(error);
});
