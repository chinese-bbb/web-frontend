import Vue from 'vue';
import Router, { NavigationGuard, RouteConfig } from 'vue-router';
import Home from './views/Home.vue';
import { SignInType } from '@/constants';
import store from './store';
import * as NProgress from 'nprogress';

Vue.use(Router);

const forbidAuthedUserGuard: NavigationGuard = (to, from, next) => {
  if (store.state.authenticated) {
    Vue.prototype.$message.warning('用户已登录');
    return next({ name: 'home' });
  } else {
    return next();
  }
};

const commonAuthGuard: NavigationGuard = (to, from, next) => {
  if (!store.state.authenticated) {
    Vue.prototype.$message.error('非法访问');
    next(new Error('Access Denied'));
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
    path: '/auth',
    name: 'authPortal',
    beforeEnter: forbidAuthedUserGuard,
    component: () => import('./views/EmptyPortal.vue'),
    children: [
      {
        path: 'customer',
        component: () => import('./views/FadeInPortal.vue'),
        children: [
          {
            path: 'signin',
            name: 'cSignIn',
            component: () => import('./views/SignIn.vue'),
            props: () => ({ from: SignInType.Customer }),
            meta: {
              title: '消费者登录',
            },
          },
          {
            path: 'signup',
            name: 'cSignUp',
            component: () => import('./views/SignUp.vue'),
            props: () => ({ from: SignInType.Customer }),
            meta: {
              title: '消费者注册',
            },
          },
          {
            path: 'signup-success',
            name: 'cSignUpSuccess',
            component: () => import('./views/SignUpSuccess.vue'),
            props: () => ({ from: SignInType.Customer }),
            meta: {
              title: '注册完成',
            },
          },
          {
            path: 'resetpwd',
            name: 'resetPwd',
            component: () => import('./views/resetPassword.vue'),
            meta: {
              title: '重置密码',
            },
          },
        ],
      },
      {
        path: 'merchant',
        component: () => import('./views/FadeInPortal.vue'),
        children: [
          {
            path: 'signin',
            name: 'mSignIn',
            component: () => import('./views/SignIn.vue'),
            props: () => ({ from: SignInType.Merchant }),
            meta: {
              title: '商家登录',
            },
          },
          {
            path: 'signup',
            name: 'mSignUp',
            component: () => import('./views/SignUp.vue'),
            props: () => ({ from: SignInType.Merchant }),
            meta: {
              title: '商家注册',
            },
          },
          {
            path: 'signup-success',
            name: 'mSignUpSuccess',
            component: () => import('./views/SignUpSuccess.vue'),
            props: () => ({ from: SignInType.Merchant }),
            meta: {
              title: '注册完成',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./views/SearchResult.vue'),
    beforeEnter: commonAuthGuard,
    props: route => ({ queryKey: route.query.q }),
    meta: {
      title: '商家搜索',
    },
  },
  {
    path: '/user',
    name: 'userPortal',
    component: () => import('./views/EmptyPortal.vue'),
    beforeEnter: commonAuthGuard,
    children: [
      {
        path: 'customer',
        component: () => import('./views/FadeInPortal.vue'),
        children: [
          {
            path: 'profile',
            name: 'profile',
            component: () => import('./views/user/customer/Profile.vue'),
            meta: {
              title: '个人主页',
            },
          },
          {
            path: 'current-complaints',
            name: 'currentComplaints',
            component: () => import('./views/user/customer/CurrentComplaints.vue'),
            meta: {
              title: '当前投诉',
            },
          },
          {
            path: 'complaints-history',
            name: 'complaintsHistory',
            component: () => import('./views/user/customer/ComplaintsHistory.vue'),
            meta: {
              title: '历史投诉',
            },
          },
          {
            path: 'settings',
            name: 'settings',
            component: () => import('./views/user/customer/UserSettings.vue'),
            meta: {
              title: '用户设置',
            },
          },
          {
            path: 'realname-auth',
            name: 'realnameAuth',
            component: () => import('./views/user/customer/RealNameAuth.vue'),
            meta: {
              title: '实名认证',
            },
          },
        ],
      },
      {
        path: 'merchant',
        component: () => import('./views/FadeInPortal.vue'),
        children: [
          {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('./views/user/merchant/Dashboard.vue'),
            meta: {
              title: '商家主页',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/merchant/:merchantId',
    beforeEnter: commonAuthGuard,
    component: () => import('./views/FadeInPortal.vue'),
    children: [
      {
        path: '',
        name: 'merchantInfo',
        component: () => import('./views/merchant/MerchantInfo.vue'),
        props: route => ({ id: route.params.merchantId }),
        meta: {
          title: '商家详情',
        },
      },
      {
        path: 'complaint/:complaintId',
        name: 'complaintDetails',
        component: () => import('./views/merchant/ComplaintDetails.vue'),
        props: route => ({ id: route.params.complaintId }),
        meta: {
          title: '投诉详情',
        },
      },
    ],
  },
  {
    path: '/file-complaint',
    name: 'fileComplaint',
    component: () => import('./views/FileComplaint.vue'),
    beforeEnter: commonAuthGuard,
    props: route => ({ merchantId: route.query.id }),
    meta: {
      title: '发起投诉',
    },
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

router.onError(() => {
  NProgress.done();
});

export default router;
