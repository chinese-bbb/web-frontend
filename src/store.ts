import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { SignInType } from '@/constants';

import router from './router';
import authService from './services/authentication.service';
import { UserModel, MerchantDetail } from './models';
import { customerService } from './services';
import { cookieUtil } from './utils';

Vue.use(Vuex);

export interface RootState {
  inHomePage: boolean;
  authenticated: boolean;
  userRole: UserRole | null;
  userPhone: string | null;
  userInfo: null | UserModel;
  currentMerchant: MerchantDetail | null;
}

export enum UserRole {
  Customer = 'customer',
  Merchant = 'merchant',
}

export default new Vuex.Store<RootState>({
  state: {
    inHomePage: false,
    authenticated: false,
    userRole: null,
    userPhone: null,
    userInfo: null,
    currentMerchant: null,
  },
  mutations: {
    visitHomePage(state) {
      state.inHomePage = true;
    },
    leaveHomePage(state) {
      state.inHomePage = false;
    },
    authenticate(state, { phone, type }: { phone: string; type: SignInType }) {
      state.authenticated = true;
      state.userPhone = phone;
      state.userRole = SignInType.Customer === type ? UserRole.Customer : UserRole.Merchant;
    },
    deAuthenticate(state) {
      state.authenticated = false;
      state.userPhone = null;
      state.userRole = null;
    },
    updateUserInfo(state, payload) {
      state.userInfo = { ...payload };
      state.userPhone = state.userInfo!.username;
    },
    cacheCurrentMerchant(state, payload) {
      state.currentMerchant = { ...payload };
    },
  },
  actions: {
    signIn({ commit }, payload) {
      commit('authenticate', { phone: payload.username, type: payload.type });
      // fet => front end track
      document.cookie = '__fet=true;path=/';
      document.cookie = `__feun=${payload.username};path=/`;
      document.cookie = `__feut=${payload.type};path=/`;
    },
    signout({ commit }) {
      authService.signout().finally(() => {
        commit('deAuthenticate');

        cookieUtil.removeItem('__fet', '/');
        cookieUtil.removeItem('__feun', '/');
        cookieUtil.removeItem('__feut', '/');

        router.push({ name: 'home' });
      });
    },
    fetchUserInfo({ commit }) {
      customerService.getCurrentUserInfo().then(res => {
        commit('updateUserInfo', res.data);
      });
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
