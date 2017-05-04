import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Login from './pages/Login.vue'
import table from './pages/table/table.vue'
import container from './pages/table/container.vue'
import image from './pages/table/image.vue'
import deploy from './pages/deploy/deploy.vue'
import monitor from './pages/monitor/monitor.vue'
import cpu from './pages/monitor/cpu.vue'
import mem from './pages/monitor/mem.vue'
import quick_work from './pages/work/quick_work.vue'


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
            { path: '/container', component: container, name: 'docker容器列表' },
            { path: '/image', component: image, name: 'docker镜像列表' },
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
            { path: '/cpu', component: cpu, name: 'CPU监控' },
            { path: '/mem', component: mem, name: 'MEM监控' },
          ]
  },
  {
    path: '/',
        component: Home,
        name: '任务管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/quickwork', component: quick_work, name: '脚本执行' },
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
