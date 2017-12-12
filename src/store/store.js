import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 应用初始状态
const state = {
  isLogged: !!localStorage.getItem('token')
}

const mutations = {
  LOGIN_USER (state) {
      state.isLogged = true
  },

  LOGOUT_USER (state) {
      state.isLogged = false
  }
}

// const actions = {
//   getToken: ({commit, state}) => {
//     commit('SET_TOKEN', state.token)
//   }
// }

// 创建 store 实例
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state,
    mutations
})
