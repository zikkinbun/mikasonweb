import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
const state = {
  user: JSON.parse(sessionStorage.getItem('user')),
  token: JSON.parse(sessionStorage.getItem('token')),
}

const mutations = {
  LOGIN_SUCCESS: () => {
    console.log('login success')
  },
  LOGOUT_USER: (state) => {
    state.user = '';
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
}

const actions = {
  getToken: ({commit, state}) => {
    commit('SET_TOKEN', state.token)
  }
}

// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations
})
