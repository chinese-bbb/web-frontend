import Vue from 'vue';
import Router, { NavigationGuard, RouteConfig } from 'vue-router';
import Home from './views/Home.vue';
import { SignInType } from '@/constants';
import store from './store';

Vue.use(Router);

const commandAuthGuard: NavigationGuard = (to, from, next) => {
  if (to.name && (to.name.endsWith('SignUp') || to.name.endsWith('SignIn'))) {
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
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('./views/SearchResult.vue'),
    beforeEnter: commandAuthGuard,
    props: route => ({ queryKey: route.query.q }),
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
      },
      {
        path: 'file-complaint',
        name: 'fileComplaint',
        component: () => import('./views/customer/FileComplaint.vue'),
      },
      {
        path: 'current-complaints',
        name: 'currentComplaints',
        component: () => import('./views/customer/CurrentComplaints.vue'),
      },
      {
        path: 'complaints-history',
        name: 'complaintsHistory',
        component: () => import('./views/customer/ComplaintsHistory.vue'),
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
      },
      {
        path: 'signup',
        name: 'cSignUp',
        component: () => import('./views/SignUp.vue'),
        props: () => ({ from: SignInType.Customer }),
      },
      {
        path: 'signup-success',
        name: 'cSignUpSuccess',
        component: () => import('./views/SignUpSuccess.vue'),
        props: () => ({ from: SignInType.Customer }),
      },
      {
        path: 'realname-auth',
        name: 'realnameAuth',
        component: () => import('./views/customer/RealNameAuth.vue'),
      },
      { path: 'resetpwd', name: 'resetPwd', component: () => import('./views/resetPassword.vue') },
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
      },
      {
        path: 'complaint-details',
        name: 'complaintDetails',
        component: () => import('./views/merchant/ComplaintDetails.vue'),
      },
      {
        path: 'signin',
        name: 'mSignIn',
        component: () => import('./views/SignIn.vue'),
        props: () => ({ from: SignInType.Merchant }),
      },
      {
        path: 'signup-success',
        name: 'mSignUpSuccess',
        component: () => import('./views/SignUpSuccess.vue'),
        props: () => ({ from: SignInType.Merchant }),
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
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('./views/Feedback.vue'),
  },
  { path: '*', redirect: '/' }, // handle all uncovered routes
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
