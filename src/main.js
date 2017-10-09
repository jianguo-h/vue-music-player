import Vue from "vue";
import App from "./App";
import axios from "axios";
import store from "./store";
import router from "./router";
import { adapt } from "./assets/js/adapt";

adapt();
Vue.prototype.http = axios;
Vue.config.productionTip = false;

new Vue({
	el: "#app",
	store,
	router,
	template: "<App/>",
	components: { App }
});