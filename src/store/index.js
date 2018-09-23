import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import plugins from './plugins'

// XXX ver como implementarlo con strict true
// https://ypereirareis.github.io/blog/2017/04/25/vuejs-two-way-data-binding-state-management-vuex-strict-mode/
// https://vuexforms.com/
// const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins
// strict: debug
})

export default store
