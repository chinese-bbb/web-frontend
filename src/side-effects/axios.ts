import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_SERVER_ADDR;
axios.defaults.withCredentials = process.env.NODE_ENV !== 'production';
