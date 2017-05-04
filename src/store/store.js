import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex)

// 应用初始状态
const state = {
  user: JSON.parse(sessionStorage.getItem('user')),
  token: JSON.parse(sessionStorage.getItem('token')),
}

const mutations = {
  [types.LOGIN]: (state, data) => {
      sessionStorage.token = data;
      state.token = data;
  },
  [types.LOGOUT]: (state) => {
      sessionStorage.removeItem('token');
      state.token = null
  },
}

const actions = {
  [actions.LOGIN]: ({commit}, token) => {
    commit(mutations.LOGIN, token)
  }
}

// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations
})
