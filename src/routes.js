import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Login from './pages/Login.vue'
import table from './pages/table/table.vue'
import deploy from './pages/deploy/deploy.vue'
import monitor from './pages/monitor/monitor.vue'


export default [
  {
    path: '/login',
    component: Login,
    name: '',
    hidden: true
  },
  {
    path: '/',
        component: Home,
        name: '服务器管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: table, name: '服务器列表' },
          ]
  },
  {
    path: '/',
        component: Home,
        name: '发布管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/deploy', component: deploy, name: '发布' },
          ]
  },
  {
    path: '/',
        component: Home,
        name: '监控列表',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/monitor', component: monitor, name: '监控实例' },
          ]
  },
  // {
  //   path: '/table',
  //   component: resolve => require(['./pages/table'], resolve)
  // },
  // {
  //   path: '/deploy',
  //   component: resolve => require(['./pages/deploy'], resolve)
  // },
  {
    path: '*',
    component: resolve => require(['./pages/Login.vue'], resolve)
  },
  // {
  //   path: '/question',
  //   component: resolve => require(['./pages/question/question'], resolve)
  // },
]
