import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
import axios from "axios";
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://liangwei.tech:3000';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
