import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueHtml2Canvas from 'vue-html2canvas';
import "regenerator-runtime/runtime.js";

Vue.use(VueHtml2Canvas);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
