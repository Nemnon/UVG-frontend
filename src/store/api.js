
export default {
  state: {
    usersEventsList: [],
    usersOnlineList: [],
    usersList: [],
    logList: [],
    loadUsersEventsTimer: null
  },

  mutations: {

    setUsersOnlineList (state, payload) {
      state.usersOnlineList = payload
    },

    setUsersEventsList (state, payload) {
      state.usersEventsList = payload
    },

    setUsersList (state, payload) {
      state.usersList = payload
    },

    setLogList (state, payload) {
      state.logList = payload
    }

  },

  actions: {
    async loadUsersOnline ({ commit, dispatch }) {
      const res = await dispatch('http', { url: '/api/users/online' })
      if (res) commit('setUsersOnlineList', res)
    },

    async loadUsersEvents ({ commit, dispatch }) {
      const res = await dispatch('http', { url: '/api/users/events' })
      if (res) commit('setUsersEventsList', res.reverse())
    },

    async loadLogList ({ commit, dispatch }) {
      const res = await dispatch('http', { url: '/api/logs' })
      if (res) commit('setLogList', res.reverse())
    },

    async loadUsersList ({ commit, dispatch }) {
      const res = await dispatch('http', { url: '/api/users' })
      if (res) commit('setUsersList', res)
    },

    async loadUser ({ dispatch }, id) {
      return await dispatch('http', { url: `/api/user/${id}` })
    },

    async postUser ({ dispatch }, user) {
      return await dispatch('http', { url: '/api/user', data: user })
    }

  },

  getters: {
    getUsersOnline: state => state.usersOnlineList,
    getUsersEvents: state => state.usersEventsList,
    getUsersList: state => state.usersList,
    getLogList: state => state.logList
  }

}
