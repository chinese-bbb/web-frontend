import Vue from 'vue';
import Vuex from 'vuex';
import { SignInType } from '@/constants';

Vue.use(Vuex);

export interface RootState {
  inHomePage: boolean;
  authenticated: boolean;
  userRole: UserRole | null;
}

export enum UserRole {
  Customer = 'customer',
  Merchant = 'merchant',
}

export default new Vuex.Store<RootState>({
  state: {
    inHomePage: false,
    authenticated: true,
    userRole: null,
  },
  mutations: {
    visitHomePage(state) {
      state.inHomePage = true;
    },
    leaveHomePage(state) {
      state.inHomePage = false;
    },
    authenticate(state, type: SignInType) {
      state.authenticated = true;
      state.userRole = SignInType.Customer === type ? UserRole.Customer : UserRole.Merchant;
    },
    deAuthenticate(state) {
      state.authenticated = false;
    },
  },
  actions: {},
});
