import Vue from 'vue'
import App from './App.vue'
import Store from './store/store'
import VueMeta from 'vue-meta'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const VueMoment = require('vue-moment')

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueMoment)
Vue.use(VueMeta)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: Store
}).$mount('#app')
