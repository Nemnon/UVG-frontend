import Vue from 'vue'
import Vuex from 'vuex'
import userAuth from './userAuth'
import http from './http'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    api,
    http,
    userAuth
  }
})
