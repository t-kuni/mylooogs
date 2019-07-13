import Vue from 'vue'
import Vuex from 'vuex'
//@ts-ignore
import {defaultState} from './state';
//@ts-ignore
import mutations from './mutations';
//@ts-ignore
import actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  state: defaultState,
  mutations,
  actions,
})
