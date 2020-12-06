import Vue from 'vue';
import Antd from 'ant-design-vue';
import axios from 'axios'
// 引入新的框架需要引用在APP.vue之前
import App from './App.vue';
import router from './router';
import store from './store';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;

Vue.use(Antd);

Vue.prototype.$axios = axios;
Vue.prototype.$baseURL = 'http://127.0.0.1:8888'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
