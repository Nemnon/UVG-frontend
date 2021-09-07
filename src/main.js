import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// import axios from 'axios'
import 'element-theme-dark'

// axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: function (h) { return h(App) }
})

store.$app = app
app.$mount('#app')
