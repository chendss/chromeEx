import Vue from 'vue'
import router from './router'
import App from './App'

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  template: '<App/>',
})
