// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
// import 'iview/dist/styles/iview.css'
// import iView from 'iview'
import Vue from 'vue'
import VueI18n from "vue-i18n";
import Router from 'vue-router'
import App from './App'
// import routes from './routes'
// import store from './store/store'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import router from "./router";
import VueResource from "vue-resource";

// import Home from './components/common/Home.vue'

Vue.use( Element );
// Vue.use(iView)
// Vue.use(VueRouter)
// Vue.use(VueAxios, axios)
Vue.use( Vuex );
Vue.use( VueResource );
Vue.use( Router );
Vue.use( VueI18n );
// const router = new VueRouter({
//   routes
// })

// axios.interceptors.request.use(function (config) {    // 这里的config包含每次请求的内容
//     if (store.getters.getToken) {
//         config.headers.Authorization = `${store.getters.getToken}`;
//     }
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });

// router.beforeEach((to, from, next) => {
//   //NProgress.start();
//   if (to.path == '/login') {
//     sessionStorage.removeItem('user');
//   }
//   let user = JSON.parse(sessionStorage.getItem('user'));
//   if (!user && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
// new Vue({
//   store,
//   router,
//   render: h => h(App)
// }).$mount('#app')
new Vue({
	el			:	"#app",
	router,
	template	:	"<App/>",
	components	:	{
		App
	}
});
