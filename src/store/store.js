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
    documentIsLocked: true,
    deleteModalIsOpen: false
  },
  mutations: {
    setDoc (state, data) {
      state.doc = data
    },
    blockDocument(state, data) {
      state.documentStatus = data
    },
    deleteNested (state, data) {
      // console.log('deleteNested mutation: data =')
      // console.log(data)

      state.doc.nested = state.doc.nested.filter((item) => {
        if (typeof data.id !== 'undefined') {
          return item.id !== data.id
        } else {
          return item.key !== data.key
        }
      })

      if (typeof data.id !== 'undefined') {
        let index
        const item = state.docChanges.nested.find((item, i) => {
          index = i
          return item.id === data.id
        })

        if (typeof item === 'undefined') {
          state.docChanges.nested.push(data)
        } else {
          state.docChanges.nested[index] = Object.assign(item, data)
        }
      }

      if (typeof data.key !== 'undefined') {
        state.docChanges.nested = state.docChanges.nested.filter((item) => item.key !== data.key)
      }
    },
    addNested (state, data) {
      // console.log('addNested mutation: data = ')
      // console.log(data)

      state.doc.nested.push(data)
      state.docChanges.nested.push(data)
    },
    updateNested (state, data) {
      // console.log(`updateNested mutation: data = `)
      // console.log(data)

      let index
      const item = state.docChanges.nested.find((item, i) => {
        index = i
        if (typeof data.id !== 'undefined') {
          return item.id === data.id
        }
        if (typeof data.key !== 'undefined') {
          return item.key === data.key
        }

      })

      if (typeof item === 'undefined') {
        state.docChanges.nested.push(data)
      } else {
        state.docChanges.nested[index] = Object.assign(item, data)
      }
    },
    updateTableItem (state, data) {
      let itemIndex

      const item = state.docChanges.table.find((item, i) => {
        itemIndex = i
        return item.id === data.id
      })

      if (typeof item === 'undefined') {
        state.docChanges.table.push(data)
      } else {
        state.docChanges.table[itemIndex] = Object.assign(item[0], data)
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
    },
    lockDocument (state) {
      state.documentIsLocked = true
    },
    unlockDocument (state) {
      state.documentIsLocked = false
    },
    openModal (state) {
      state.deleteModalIsOpen = true
    },
    closeModal (state) {
      state.deleteModalIsOpen = false
    }
  },
  actions: {
    async fetchDoc ({ commit }) {
      const response = await fetch('./data/doc.json')
      const json = await response.json()
      commit('setDoc', json)
    },
    saveDocChanges ({ commit, state }) {
      commit('lockDocument')
      axios.patch(`/doc/${state.doc.id}`, state.docChanges)
        .then((response) => {
          console.warn(response)
        })
        .catch((error) => {
          console.error(error.toJSON())
        })

      // Эмуляция задержки
      setTimeout(() => {
        commit('unlockDocument')
      }, 1000)
    },
    deleteNested ({ commit }, data) {
      commit('deleteNested', data)
    },
    addNested ({ commit }, key) {
      const data = { key: key, title: null, price: 0 }
      commit('addNested', data)
      commit('lockDocument')
    },
    updateNested ({ commit }, data) {
      commit('updateNested', data)
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
    },
    lockDocument({ commit }) {
      commit('lockDocument')
    },
    unlockDocument({ commit }) {
      commit('unlockDocument')
    },
    openModal({ commit }) {
      commit('openModal')
    },
    closeModal({ commit }) {
      commit('closeModal')
    },
    deleteDocument({ commit, state }) {
      commit('lockDocument')
      axios.delete(`/doc/${state.doc.id}`)
        .then((response) => {
          console.warn(response)
        })
        .catch((error) => {
          console.error(error.toJSON())
        })

      // Эмуляция задержки
      setTimeout(() => {
        commit('unlockDocument')
        commit('closeModal')
      }, 3000)
    }
  },
  getters: {
    getDoc: state => state.doc,
    getAlert: state => state.alert,
    documentIsLocked: state => state.documentIsLocked,
    deleteModalIsOpen: state => state.deleteModalIsOpen
  }
})

export default store
