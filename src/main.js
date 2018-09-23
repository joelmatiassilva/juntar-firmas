import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import { sync } from 'vuex-router-sync'
import store from './store'

sync(store, router)

Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
