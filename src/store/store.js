import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    id: 0,
    status: 'Pending',
    nested: [],
    table: []
  },
  mutations: {
    setId (state, data) {
      state.id = data
    },
    setStatus (state, data) {
      state.status = data
    },
    setNested (state, data) {
      state.nested = data
    },
    setTable (state, data) {
      state.table = data
    }
  },
  actions: {
    async fetchId ({ commit }) {
      // await fetch('./data/doc.json')
      //   .then(response => {
      //     if (!response.ok) {
      //       throw new Error("HTTP error " + response.status);
      //     }
      //     return response.json();
      //   })
      //  .then(json => {
      //     const data = json;
      //     console.log(data)
      //     commit('setId', data.id)
      //  })
      // const response = await fetch('./data/doc.json')
      const data = await getData()
      commit('setId', data.id)
    },
    async fetchStatus ({ commit }) {
      const data = await getData()
      commit('setStatus', data.status)
    },
    async fetchNested ({ commit }) {
      const data = await getData()
      commit('setNested', data.nested)
    },
    async fetchTable ({ commit }) {
      const data = await getData()
      commit('setTable', data.table)
    }
  },
  getters: {
    getId: state => {
      return state.id
    },
    getStatus: state => {
      return state.status
    },
    getNested: state => {
      return state.nested
    },
    getTable: state => {
      return state.table
    }
  }
})

async function getData() {
  const response = await fetch('./data/doc.json')
  return await response.json()
}

export default store
