import Vue from 'vue';
import App from './App';
import {
  Toast,
  Indicator,
  MessageBox,
  Switch
} from 'mint-ui';
import store from './store';
import router from './router';
import api from './api';
import adapt from './js/adapt';

if(module.hot) {
  module.hot.accept();
}

adapt();
Vue.prototype.api = api;
Vue.component(Switch.name, Switch);
Vue.prototype.$Toast = Toast;
Vue.prototype.$Indicator = Indicator;
Vue.prototype.$MessageBox = MessageBox;
Vue.config.productionTip = false;

const vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
});
window.vm = vm;