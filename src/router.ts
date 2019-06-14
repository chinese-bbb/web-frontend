import Vue from 'vue';
import Router, { NavigationGuard, RouteConfig } from 'vue-router';
import Home from './views/Home.vue';
import { SignInType } from '@/constants';
import store from './store';
import * as NProgress from 'nprogress';

Vue.use(Router);

const commandAuthGuard: NavigationGuard = (to, from, next) => {
  if (to.meta.skipAuthCheck) {
    if (store.state.authenticated) {
      Vue.prototype.$message.warning('用户已登录');
      return next({ name: 'home' });
    } else {
      return next();
    }
  }

  if (!store.state.authenticated) {
    Vue.prototype.$message.error('非法访问');
    next({ name: 'home' });
  } else {
    next();
  }
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter(to, from, next) {
      store.commit('visitHomePage');
      next();
    },
    meta: {
      title: '主页',
    },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./views/SearchResult.vue'),
    beforeEnter: commandAuthGuard,
    props: route => ({ queryKey: route.query.q }),
    meta: {
      title: '商家搜索',
    },
  },
  {
    path: '/merchant-info/:id',
    name: 'merchantInfo',
    component: () => import('./views/MerchantInfo.vue'),
    beforeEnter: commandAuthGuard,
    props: route => ({ id: route.params.id }),
  },
  {
    path: '/customer',
    component: () => import('./views/customer/CustomerPortal.vue'),
    beforeEnter: commandAuthGuard,
    children: [
      {
        path: '',
        name: 'customer',
        redirect: '/',
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('./views/customer/Profile.vue'),
        meta: {
          title: '个人主页',
        },
      },
      {
        path: 'file-complaint',
        name: 'fileComplaint',
        component: () => import('./views/customer/FileComplaint.vue'),
        props: route => ({ merchantId: route.query.id }),
        meta: {
          title: '商家搜索',
        },
      },
      {
        path: 'current-complaints',
        name: 'currentComplaints',
        component: () => import('./views/customer/CurrentComplaints.vue'),
        meta: {
          title: '当前投诉',
        },
      },
      {
        path: 'complaints-history',
        name: 'complaintsHistory',
        component: () => import('./views/customer/ComplaintsHistory.vue'),
        meta: {
          title: '历史投诉',
        },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('./views/customer/UserSettings.vue'),
      },
      {
        path: 'signin',
        name: 'cSignIn',
        component: () => import('./views/SignIn.vue'),
        props: () => ({ from: SignInType.Customer }),
        meta: {
          title: '消费者登录',
          skipAuthCheck: true,
        },
      },
      {
        path: 'signup',
        name: 'cSignUp',
        component: () => import('./views/SignUp.vue'),
        props: () => ({ from: SignInType.Customer }),
        meta: {
          title: '消费者注册',
          skipAuthCheck: true,
        },
      },
      {
        path: 'signup-success',
        name: 'cSignUpSuccess',
        component: () => import('./views/SignUpSuccess.vue'),
        props: () => ({ from: SignInType.Customer }),
        meta: {
          title: '注册成功',
          skipAuthCheck: true,
        },
      },
      {
        path: 'realname-auth',
        name: 'realnameAuth',
        component: () => import('./views/customer/RealNameAuth.vue'),
        meta: {
          title: '实名认证',
        },
      },
      {
        path: 'resetpwd',
        name: 'resetPwd',
        component: () => import('./views/resetPassword.vue'),
        meta: {
          title: '重置密码',
          skipAuthCheck: true,
        },
      },
    ],
  },
  {
    path: '/merchant',
    beforeEnter: commandAuthGuard,
    component: () => import('./views/merchant/MerchantPortal.vue'),
    children: [
      {
        path: '',
        name: 'merchant',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('./views/merchant/Dashboard.vue'),
        meta: {
          title: '商家主页',
        },
      },
      {
        path: 'complaint-details',
        name: 'complaintDetails',
        component: () => import('./views/merchant/ComplaintDetails.vue'),
        meta: {
          title: '投诉详情',
        },
      },
      {
        path: 'signin',
        name: 'mSignIn',
        component: () => import('./views/SignIn.vue'),
        props: () => ({ from: SignInType.Merchant }),
        meta: {
          title: '投诉详情',
          skipAuthCheck: true,
        },
      },
      {
        path: 'signup',
        name: 'mSignUp',
        component: () => import('./views/SignUp.vue'),
        props: () => ({ from: SignInType.Merchant }),
        meta: {
          title: '商家注册',
          skipAuthCheck: true,
        },
      },
      {
        path: 'signup-success',
        name: 'mSignUpSuccess',
        component: () => import('./views/SignUpSuccess.vue'),
        props: () => ({ from: SignInType.Merchant }),
        meta: {
          title: '投诉详情',
          skipAuthCheck: true,
        },
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('./views/About.vue'),
    meta: {
      title: '关于',
    },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('./views/Feedback.vue'),
    meta: {
      title: '反馈',
    },
  },
  { path: '*', redirect: '/' }, // handle all uncovered routes
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = '互信公益 - ' + to.meta.title;
  }

  if (to.name !== 'home') {
    store.commit('leaveHomePage');
  }

  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
