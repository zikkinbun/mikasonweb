import Router from "vue-router";

//	路由与对应的组件文件
import Home from "@/pages/Home";
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

const router = new Router({
	mode: "history",
	routes: [{
		path: "/",
		name: "login",
		component: Login
	}, {
		path: "/dashboard",
		component: Home,
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
		}]
	}]
});

export default router;
