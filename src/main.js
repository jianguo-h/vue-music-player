import Vue from "vue";
import App from "./App";
import axios from "axios";
import router from "./router";

import adapt from './js/adapt';

if(module.hot) {
	module.hot.accept();
}

adapt();
Vue.prototype.axios = axios;
Vue.config.productionTip = false;

new Vue({
	el: "#app",
	router,
	template: "<App/>",
	components: { App }
});