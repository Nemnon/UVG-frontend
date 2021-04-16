import axios from 'axios'
import router from '@/router'

export default {
  state: {},
  mutations: {},

  actions: {
    async http ({ commit }, { url, data }) {
      try {
        let res
        if (data) {
          res = await axios.post(url, data)
        } else {
          res = await axios.get(url)
        }
        return res.data
      } catch (err) {
        if (err.response.status && err.response.status === 401) {
          commit('setToken', null)
          router.push('/login')
        }
        if (err.response.data.error) {
          this.$app.$notify.error(err.message + ',  ' + err.response.data.error)
        } else {
          this.$app.$notify.error(err.message)
        }
      }
      return false
    }
  },

  getters: {}

}
