// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import 'element-ui/lib/theme-default/index.css'
import Element from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './routes'
import { store } from './store/store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

// import Home from './components/common/Home.vue'

Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  // el: '#app',
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
}).$mount('#app')
