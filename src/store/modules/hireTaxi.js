export default {
  namespaced: true,
  state: {
    airports: []
  },
  mutations: {
    SET_AIRPORTS(state, payload) {
      state.airports = payload
    }
  },
  actions: {},
  getters: {
    getAirports(state) {
      return state.airports
    }
  }
}
