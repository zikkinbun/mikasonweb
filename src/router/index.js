import Router from "vue-router";

//	路由与对应的组件文件
import Home from "@/pages/Home";
import Login from '@/pages/Login';
import ServerList from '@/pages/Servers/ServerList'
import ContainerList from '@/pages/Servers/ContainerList'
import ImageList from '@/pages/Servers/ImageList'
import Deploy from '@/pages/deploy/Deploy'
import Projects from '@/pages/deploy/Projects'
import deployRecord from '@/pages/deploy/deployRecord'
import cpu from '@/pages/monitor/cpu'
import mem from '@/pages/monitor/mem'
import monitor from '@/pages/monitor/monitor'

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
			component: monitor
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
			path: "Deploy",
			name: "Deploy",
			component: Deploy
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
		}]
	}]
});

export default router;