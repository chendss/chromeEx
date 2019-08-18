import Vue from 'vue'
import Home from './Home'
import Router from 'vue-router'

Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./Home'),
    meta: {
      title: '首页',
    },
  },
]

export default new Router({
  routes,
})
