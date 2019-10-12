import Vue from 'vue';
import Router, { RouterOptions } from 'vue-router';
const List = () => import('../components/list.vue');

Vue.use(Router);

const routerOptions: RouterOptions = {
  mode: 'history',
  linkActiveClass: 'active',
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
};

const router = new Router(routerOptions);

export default router;
