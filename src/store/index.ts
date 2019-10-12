import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import state, { IStoreState } from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const storeOptions: StoreOptions<IStoreState> = {
  state,
  getters,
  actions,
  mutations
};

const store = new Vuex.Store(storeOptions);

export default store;
