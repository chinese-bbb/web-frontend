import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/SearchResult.vue'),
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('./views/customer/CustomerPortal.vue'),
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: () => import('./views/customer/UserInfo.vue'),
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
      ],
    },
    {
      path: '/merchant',
      name: 'merchant',
      component: () => import('./views/merchant/MerchantPortal.vue'),
      children: [
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
  ],
});
