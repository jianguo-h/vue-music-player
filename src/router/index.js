import Vue from "vue";
import Router from "vue-router";
import List from "../components/list";

Vue.use(Router);

export default new Router({
    linkActiveClass: "active",
    routes: [
        {
            path: '/',
            redirect: '/new'
        },
        {
            path: '/*',
            component: List
        }
    ]
});