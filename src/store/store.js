import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    doc: {},
    newDoc: {
      nested: [],
      table: []
    },
    alert: {
      show: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      message: ''
    }
  },
  mutations: {
    setDoc (state, data) {
      state.doc = data
    },
    updateNasted (state, data) {
      state.doc.nested = state.doc.nested.filter((item) => item.id !== data.id)
      state.newDoc.nested.push(data)
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
    deleteNested ({ commit }, id) {
      const data = {id: id, deleted: true}
      commit('updateNasted', data)
    },
    showAlert ({ commit }, data) {
      commit('updateAlertData', data)
    },
    hideAlert({ commit }) {
      commit('updateAlertData')
    }
  },
  getters: {
    getDoc: state => {
      return state.doc
    },
    getAlert: state => {
      return state.alert
    }
  }
})

export default store
