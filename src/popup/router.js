import { merge } from 'lodash'
import Vue from 'vue'
import Home from './Home'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页',
    },
  },
]

export default new Router({
  routes,
})
