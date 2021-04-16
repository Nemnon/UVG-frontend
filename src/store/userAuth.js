import axios from 'axios'

const apiToken = localStorage.getItem('token')
if (apiToken) {
  axios.defaults.headers.common.authorization = 'Bearer ' + apiToken
}

export default {

  state: {
    token: apiToken
  },

  mutations: {
    setToken (state, token) {
      if (token) {
        state.token = token
        axios.defaults.headers.common.authorization = 'Bearer ' + token
        localStorage.setItem('token', token)
      } else {
        delete axios.defaults.headers.common.authorization
      }
    }
  },

  actions: {

    async loginUser ({ commit, dispatch }, { username, password }) {
      const res = await dispatch('http', { url: '/login', data: { username, password } })
      if (res) {
        commit('setToken', res.token)
        return true
      }
      return false
    }

  },

  getters: {
    token: state => {
      return state.token
    }
  }

}
