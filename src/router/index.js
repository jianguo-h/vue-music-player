import Vue from "vue";
import Router from "vue-router";
import List from "../components/list";

Vue.use(Router);

export default new Router({
	linkActiveClass: "active",
	routes: [
		{
			path: "/",
			redirect: "/new"
		},
		{
			path: "/*",
			component: List
		}
		/*{
			path: "/new",
			component: List
		},
		{
			path: "/recommend",
			component: List
		},
		{
			path: "/local",
			component: List
		},
		{
			path: "/collect",
			component: List
		},
		{
			path: "/search",
			component: List
		}*/
	]
});