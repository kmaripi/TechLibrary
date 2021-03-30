import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';

import { BootstrapVue, BootstrapVueIcons, PaginationPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(PaginationPlugin);

Vue.config.productionTip = false;

import router from './routes.js'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
 