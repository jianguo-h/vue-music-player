import Vue from 'vue';
import App from './App';
import axios from 'axios';
import store from './store';
import router from './router';
import { Message, Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import api from './api';
import adapt from './js/adapt';

if(module.hot) {
    module.hot.accept();
}

adapt();
Vue.prototype.$Message = Message;
Vue.prototype.$Loading = Loading.service;
Vue.prototype.api = api;
Vue.config.productionTip = false;

const vm = new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
});