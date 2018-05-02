import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentUser: null,
  messages: []
}

const mutations = {
  loadMessages (state, messages) {
    state.messages = messages
  },
  login (state, currentUser) {
    state.currentUser = currentUser
  },
  logout (state) {
    state.currentUser = null
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  login ({commit}, currentUser) {
    commit('login', currentUser)
  },
  logout ({commit}) {
    commit('logout')
  },
  loadMessages ({ commit }) {
    let messages = []

    if (typeof localStorage.getItem('shipupMessages') !== 'undefined') {
      messages = JSON.parse(localStorage.getItem('shipupMessages'))
    }

    if (JSON.stringify(state.messages) !== JSON.stringify(messages)) {
      commit('loadMessages', messages)
    }
  },
  writeMessage ({ commit }, message) {
    let messages = []
    const messageId = JSON.parse(localStorage.getItem('shipupMessages')) ? JSON.parse(localStorage.getItem('shipupMessages')).length - 1 : 0
    const newMessage = {
      id: messageId,
      user: message.user,
      content: message.content
    }

    if (JSON.parse(localStorage.getItem('shipupMessages'))) {
      messages = JSON.parse(localStorage.getItem('shipupMessages'))
    }

    messages.push(newMessage)

    localStorage.setItem('shipupMessages', JSON.stringify(messages))

    commit('loadMessages', messages)
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
