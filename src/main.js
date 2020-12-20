import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import VueCompositionAPI from '@vue/composition-api'
import VueMask from 'v-mask'
import { createProvider } from './vue-apollo'

import filters from '@/filters'
Object.entries(filters).forEach(([key, value]) => {
  Vue.filter(key, value)
})

Vue.use(VueMask)
Vue.use(VueCompositionAPI)
Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
