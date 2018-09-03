import Vue from "vue";
import Router from "vue-router";
const List = () => import('../components/list');

Vue.use(Router);

export default new Router({
  mode: 'history',
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