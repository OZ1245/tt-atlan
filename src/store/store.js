import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    doc: {},
    docChanges: {
      nested: [],
      table: []
    },
    alert: {
      show: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      message: ''
    },
    documentStatus: {
      id: 0,
      name: 'Done'
    }
  },
  mutations: {
    setDoc (state, data) {
      state.doc = data
    },
    setDocumentStatus (state, data) {
      state.documentStatus = data
    },
    deleteNested (state, data) {
      state.doc.nested = state.doc.nested.filter((item) => item.id !== data.id)
      state.docChanges.nested.push(data)
    },
    addNested (state, data) {
      state.doc.nested.push(data)
      state.docChanges.nested.push(data)
    },
    updateTableItem (state, data) {
      let itemIndex = null
      const item = state.docChanges.table.find((item, i) => {
        itemIndex = i
        return item.id === data.id
      })
      if (typeof item === 'undefined') {
        state.docChanges.table.push(data)
      } else {
        state.docChanges.table[itemIndex] = Object.assign(item, data)
      }
    },
    updateAlertData (state, message) {
      if (message) {
        state.alert.show = 5
        state.alert.message = message
      } else {
        state.alert.show = false
        state.alert.message = ''
      }
    }
  },
  actions: {
    async fetchDoc ({ commit }) {
      const response = await fetch('./data/doc.json')
      const json = await response.json()
      commit('setDoc', json)
    },
    saveDocChanges ({ commit, state }) {
      axios.patch(`/doc/${this.id}`, state.docChanges)
        .then((response) => {
          console.warn(response)
          commit('setDocumentStatus', { id: 1, name: 'Sending' })
        })
        .catch((error) => {
          console.error(error.toJSON())
        })
      commit('setDocumentStatus', {id: 0, name: 'Done'})
    },
    deleteNested ({ commit, state }, key) {
      const id = state.doc.nested[key].id
      const data = {id: id, deleted: true}
      commit('deleteNested', data)
    },
    addNested ({ commit }) {
      const data = {title: null, price: null}
      commit('addNested', data)
    },
    updateTableItem({ commit }, { id, check }) {
      const data = { id: id, check: check }
      commit('updateTableItem', data)
    },
    showAlert ({ commit }, data) {
      commit('updateAlertData', data)
    },
    hideAlert({ commit }) {
      commit('updateAlertData')
    }
  },
  getters: {
    getDoc: state => state.doc,
    getAlert: state => state.alert,
    getDocumentStatus: state => state.documentStatus
  }
})

export default store
