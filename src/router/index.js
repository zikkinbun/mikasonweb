import Router from "vue-router";

//	路由与对应的组件文件
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard"
import Login from '@/pages/Login';
import ServerList from '@/pages/Servers/ServerList'
import ContainerList from '@/pages/Servers/ContainerList'
import ImageList from '@/pages/Servers/ImageList'
import deploy from '@/pages/deploy/deploy'
import Projects from '@/pages/deploy/Projects'
import deployRecord from '@/pages/deploy/deployRecord'
import cpu from '@/pages/monitor/cpu'
import mem from '@/pages/monitor/mem'
import monitor from '@/pages/monitor/monitor'
import database from '@/pages/monitor/database'
import Module from '@/pages/module/Module'
import Bussiness from '@/pages/bussiness/Bussiness'
import Cluster from '@/pages/cluster/Cluster'

const router = new Router({
	mode: "history",
	routes: [{
		path: "/",
		name: "login",
		component: Login
	}, {
		path: "/dashboard",
		component: Dashboard,
		children: [{
			path: "",
			name: "dashboard",
			component: ServerList
		},{
			path: "ServerList",
			name: "ServerList",
			component: ServerList
		}, {
			path: "ContainerList",
			name: "ContainerList",
			component: ContainerList
		}, {
			path: "ImageList",
			name: "ImageList",
			component: ImageList
		}, {
			path: "deploy",
			name: "deploy",
			component: deploy
		}, {
			path: "Projects",
			name: "Projects",
			component: Projects
		}, {
			path: "deployRecord",
			name: "deployRecord",
			component: deployRecord
		}, {
			path: "cpu",
			name: "cpu",
			component: cpu
		}, {
			path: "mem",
			name: "mem",
			component: mem
		}, {
			path: "database",
			name: "database",
			component: database
		}, {
			path: "module",
			name: "module",
			component: Module
		}, {
			path: "bussiness",
			name: "bussiness",
			component: Bussiness
		}, {
			path: "cluster",
			name: "cluster",
			component: Cluster
		}]
	}]
});

export default router;
