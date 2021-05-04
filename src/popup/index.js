import './index.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
import './theme-chalk/index.css'

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
})