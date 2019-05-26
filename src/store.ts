import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { SignInType } from '@/constants';

import router from './router';
import authService from './services/authentication.service';

Vue.use(Vuex);

export interface RootState {
  inHomePage: boolean;
  authenticated: boolean;
  userRole: UserRole | null;
  userPhone: string | null;
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
  },
  mutations: {
    visitHomePage(state) {
      state.inHomePage = true;
    },
    leaveHomePage(state) {
      state.inHomePage = false;
    },
    authenticate(state, { phone, type }: { phone: string, type: SignInType }) {
      state.authenticated = true;
      state.userPhone = phone;
      state.userRole = SignInType.Customer === type ? UserRole.Customer : UserRole.Merchant;
    },
    deAuthenticate(state) {
      state.authenticated = false;
      state.userPhone = null;
      state.userRole = null;
    },
  },
  actions: {
    signout({ commit }) {
      authService.signout().then(() => {
        commit('deAuthenticate');

        router.push({ name: 'home' });
      });
    },
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
