import Router from "vue-router";

//	路由与对应的组件文件
import Home from "@/pages/Home";
import Login from '@/pages/Login';
import ServerList from '@/pages/Servers/ServerList'
import ContainerList from '@/pages/Servers/ContainerList'
import ImageList from '@/pages/Servers/ImageList'
import Deploy from '@/pages/deploy/Deploy'
import Projects from '@/pages/deploy/Projects'

const router = new Router({
	mode: "history",
	routes: [{
		path: "/",
		name: "login",
		component: Login
	}, {
		path: "/dashboard",
		name: "dashboard",
		component: Home,
		children: [{
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
		}]
	}]
});

export default router;
