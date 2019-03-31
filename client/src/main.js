import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './registerServiceWorker'
import { createProvider } from './vue-apollo'

import '@/assets/styles/normalize.css'
import '@/assets/styles/reset.scss'

Vue.config.productionTip = false

// Uppercase filter
Vue.filter('uppercase', (value) => {
  return value
    ? String(value).toUpperCase()
    : ''
})

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
