import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
  inHomePage: boolean;
  authenticated: boolean;
}

export default new Vuex.Store<RootState>({
  state: {
    inHomePage: false,
    authenticated: false,
  },
  mutations: {
    visitHomePage(state) {
      state.inHomePage = true;
    },
    leaveHomePage(state) {
      state.inHomePage = false;
    },
    authenticate(state) {
      state.authenticated = true;
    },
    deAuthenticate(state) {
      state.authenticated = false;
    },
  },
  actions: {},
});
