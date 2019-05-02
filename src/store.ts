import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inHomePage: false,
  },
  mutations: {
    visitHomePage(state) {
      state.inHomePage = true;
    },
    leaveHomePage(state) {
      state.inHomePage = false;
    },
  },
  actions: {},
});
