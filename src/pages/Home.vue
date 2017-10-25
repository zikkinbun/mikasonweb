<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
	<el-row type="flex" class="row-bg">
			<el-col :span="spanLeft" class="layout-menu-left">
				<el-menu :active-name="routerName" width="auto" theme="dark" @on-select="select" :router="true" :unique-opened="true">
					<div class="layout-logo-left">
						<img src="../assets/logo.png?v=1.0.0" height="100%">
					</div>
					<el-submenu index="1">
			      <template slot="title"><i class="el-icon-setting"></i>资源管理</template>
			      <el-menu-item index="/dashboard/ServerList"><i class="el-icon-view"></i>云服务器(ECS)列表</el-menu-item>
			      <el-menu-item index="/dashboard/ContainerList"><i class="el-icon-document"></i>Docker容器列表</el-menu-item>
			      <el-menu-item index="/dashboard/ImageList"><i class="el-icon-menu"></i>Docker镜像列表</el-menu-item>
			    </el-submenu>
			    <el-submenu index="2">
			      <template slot="title"><i class="el-icon-upload"></i>发布管理</template>
						<el-menu-item index="/dashboard/Projects"><i class="el-icon-edit"></i>项目一览</el-menu-item>
			      <el-menu-item index="/dashboard/deploy"><i class="el-icon-edit"></i>定时发布</el-menu-item>
						<el-menu-item index="/dashboard/deployRecord"><i class="el-icon-edit"></i>发布记录</el-menu-item>
			    </el-submenu>
			    <el-submenu index="3">
			      <template slot="title"><i class="el-icon-information"></i>在线监控</template>
			      <el-menu-item index="/dashboard/cpu"><i class="el-icon-date "></i>CPU监控</el-menu-item>
			      <el-menu-item index="/dashboard/mem"><i class="el-icon-date "></i>内存监控</el-menu-item>
			      <el-menu-item index="/dashboard/database"><i class="el-icon-date "></i>数据库监控</el-menu-item>
			    </el-submenu>
			    <el-submenu index="4">
			      <template slot="title"><i class="el-icon-time"></i>任务管理</template>
			      <el-menu-item index="4-1"><i class="el-icon-date "></i>脚本执行</el-menu-item>
			      <el-menu-item index="4-3"><i class="el-icon-date "></i>批量执行</el-menu-item>
			      <el-menu-item index="４-5"><i class="el-icon-date "></i>定时任务</el-menu-item>
			      <el-menu-item index="４-6"><i class="el-icon-date "></i>灰度计划</el-menu-item>
			    </el-submenu>
			    <el-submenu index="5">
			      <template slot="title"><i class="el-icon-plus"></i>配置管理</template>
			      <el-menu-item index="5-1"><i class="el-icon-date "></i>帐号管理</el-menu-item>
			      <el-menu-item index="5-2"><i class="el-icon-date "></i>文件管理</el-menu-item>
			      <el-menu-item index="5-3"><i class="el-icon-date "></i>脚本管理</el-menu-item>
			      <el-menu-item index="5-5"><i class="el-icon-date "></i>软件管理</el-menu-item>
			      <el-menu-item index="5-6"><i class="el-icon-date "></i>服务管理</el-menu-item>
			    </el-submenu>
				</el-menu>
				<div class="layout-copy">&copy; Mikason 2017</div>
			</el-col>
			<el-col :span="spanRight" class="layout-main">
				<div class="layout-header">
					<div class="welcome">
						<span v-if="userName">{{userName}}，</span>
						<span>欢迎使用 Mikason 运维平台！</span>
						<span style="padding-left: 10px;">
							<el-button type="text" size="small" @click="logout"><i class="el-icon-warning el-icon--right"></i>退出登录</el-button>
						</span>
					</div>
				</div>
				<div class="layout-content">
					<div class="layout-content-main">
						<router-view></router-view>
					</div>
				</div>
			</el-col>
	</el-row>
</div>
</template>

<script>
import router from "../router";
export default {
	data() {
		return {
			isCollapse: true,
			spanLeft: 4,
			spanRight: 20,
			userName: '',
			routerName: router.app.$route.name || 'dashboard'
		}
	},
	computed: {
		iconSize() {
			return this.spanLeft === 4 ? 14 : 24;
		}
	},
	mounted: function() {
	},
	methods: {
		toggleClick() {
			if (this.spanLeft === 4) {
				this.spanLeft = 2;
				this.spanRight = 22;
			} else {
				this.spanLeft = 4;
				this.spanRight = 20;
			}
		},
		select(name) {
			router.push({
				name: name
			});
		},
		//退出登录
		logout: function () {
			var _this = this;
			this.$confirm('确认退出吗?', '提示', {
				//type: 'warning'
			}).then(() => {
				sessionStorage.removeItem('user');
				_this.$router.push('/');
			}).catch(() => {
			});
		},
	}
}
</script>

<style>
.layout {
	background: #f5f7f9;
	position: absolute;
	width: 100%;
	height: 100%;
}

.layout-breadcrumb {
	padding: 10px 15px 0;
}

.layout-copy {
	position: absolute;
	bottom: 10px;
	left: 10px;
	right: 10px;
	text-align: center;
	padding: 10px 0 20px;
	color: #9ea7b4;
}

.layout-menu-left {
	background: #324157;
}

.layout-main {
	overflow: auto;
}

.layout-hide-text .layout-menu-left {
	text-align: center;
}

.layout-header {
	position: fixed;
	width: 100%;
	z-index: 10;
	height: 60px;
	background: #fff;
	box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.welcome {
	position: fixed;
	right: 20px;
	top: 18px;
}

.layout-logo-left {
	width: 90%;
	height: 30px;
	border-radius: 3px;
	margin: 15px auto;
	text-align: center;
}

.layout-content {
	min-height: 200px;
	margin: 75px 15px 15px;
	background: #fff;
	border-radius: 4px;
}

.layout-content-main {
	padding: 20px;
}

.layout-ceiling-main a {
	color: #9ba7b5;
}

.layout-hide-text .layout-text {
	display: none;
}

.el-col {
	position: relative;
	transition: width .2s ease-in-out;
}

.el-row-flex {
	height: 100%;
}

.row-bg {
	height: 100%;
}

.el-menu-item,
.el-submenu .el-submenu__title {
  height: 44px;
  line-height: 44px;
  color: #dbdbdb;
}
.el-menu-item:hover,
.el-submenu .el-submenu__title:hover {
  background-color: #2b3035;
}

</style>
