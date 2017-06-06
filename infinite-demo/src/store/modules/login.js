// import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  authenticated:false
}

// getters
const getters = {
  checkAuthenticated: state => state.authenticated
}

// actions
const actions = {
  changeLoginStateSuccess({ commit, state }) {
    commit(types.CHECKOUT_SUCCESS)
  },
  changeLoginStateFailure({ commit, state }){
    commit(types.CHECKOUT_FAILURE)
  }
}

// mutations
const mutations = {

  [types.CHECKOUT_SUCCESS](state) {
    state.authenticated = true
  },

  [types.CHECKOUT_FAILURE](state) {
    state.authenticated = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
