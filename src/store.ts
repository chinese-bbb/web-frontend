import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { SignInType } from '@/constants';

import router from './router';
import authService from './services/authentication.service';
import { MerchantDetail, UserModel } from './models';
import { customerService } from './services';

Vue.use(Vuex);

export interface RootState {
  inHomePage: boolean;
  authenticated: boolean;
  userRole: UserRole | null;
  userPhone: string | null;
  lastUserUpdateTime: number | null;
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
    lastUserUpdateTime: null,
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
      state.userInfo = null;
    },
    updateUserInfo(state, payload) {
      state.userInfo = { ...payload };
      state.userPhone = state.userInfo!.username;
      state.lastUserUpdateTime = Date.now();
    },
    cacheCurrentMerchant(state, payload) {
      state.currentMerchant = { ...payload };
    },
  },
  actions: {
    signIn({ commit }, payload) {
      commit('authenticate', { phone: payload.username, type: payload.type });
    },
    signout({ commit }) {
      authService.signout().finally(() => {
        commit('deAuthenticate');

        router.push({ name: 'home' });
      });
    },
    fetchUserInfo({ commit }) {
      return customerService.getCurrentUserInfo().then(
        res => {
          commit('authenticate', { phone: res.data.username, type: SignInType.Customer });
          commit('updateUserInfo', res.data);
        },
        err => {
          if (!err.response || err.response.status === 401) {
            commit('deAuthenticate');
          }
          throw err;
        },
      );
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
