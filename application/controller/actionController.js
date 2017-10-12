const BaseController = require("../baseController.js"),
	config = require("../../global/config"),
	http = require("../../global/http"),
	mkdirp = require("mkdirp"),
	fs = require("fs"),
	path = require("path"),
	moment = require("moment"),
	ctrl = {};

// 登录
ctrl.login = function(req) {
	this.validEmpty([
		"username", "password"
	]);
	return this.request(req, "/user/login/", {
		username: req.body.username,
		password: req.body.password
	}).then(result => {
		req.session.user = result;
		console.log(req.session.user);
		return {
			data: result,
			str: "登陆"
		};
	});
};

// 登出
ctrl.logout = function(req) {
	req.session.user = null;
	return {
		data: null,
		str: "登出"
	};
};

// 获取API TOKEN
ctrl.getToken = function(req) {
	this.validEmpty([
		"username", "password"
	]);
	return this.request(req, "/user/api-token-auth/", {
		username: req.body.username,
		password: req.body.password
	}).then(result => {
		return {
			data: result,
			str: "获取API TOKEN"
		};
	});
};

// 获取服务器列表
ctrl.ServerList = function(req) {
  return this.request(req, "/asset/List", {}).then(
    result => {
      return {
        data: result,
        str: "获取服务器列表"
      };
  });
};

// 获取服务器详情
ctrl.ServerDetail = function(req) {
  return this.request(req, "/asset/Detail", {}).then(
    result => {
      return {
        data: result,
        str: "获取服务器详情"
      };
  });
};

// 新建服务器详情
ctrl.CreateServer = function(req) {
  return this.request(req, "/asset/CreateServer", {
    Name: req.body.Name,
    System: req.body.System,
    GlobalIpAddr: req.body.GlobalIpAddr,
    PrivateIpAddr: req.body.PrivateIpAddr,
    CpuStat: req.body.CpuStat,
    MemoryStat: req.body.MemoryStat,
    HDDStorage: req.body.HDDStorage,
    NetCard: req.body.NetCard,
    Status: req.body.Status
  }).then(
    result => {
      return {
        data: result,
        str: "新建服务器详情"
      };
  });
};

// 编辑服务器详情
ctrl.EditServer = function(req) {
  return this.request(req, "/asset/EditServer", {
    id: req.body.id,
    Name: req.body.Name,
    System: req.body.System,
    GlobalIpAddr: req.body.GlobalIpAddr,
    PrivateIpAddr: req.body.PrivateIpAddr,
    CpuStat: req.body.CpuStat,
    MemoryStat: req.body.MemoryStat,
    HDDStorage: req.body.HDDStorage,
    NetCard: req.body.NetCard,
    Status: req.body.Status
  }).then(
    result => {
      return {
        data: result,
        str: "编辑服务器详情"
      };
  });
};

// 删除服务器
ctrl.ServerDelete = function(req) {
  return this.request(req, "/asset/DeleteServer", {
    id: req.body.id
  }).then(
    result => {
      return {
        data: result,
        str: "删除服务器"
      };
  });
};

// 获取容器列表
ctrl.ContainerList = function(req) {
  return this.request(req, "/asset/ListSwarmContainers", {}).then(
    result => {
      return {
        data: result,
        str: "获取容器列表"
      };
  });
};

// 获取镜像列表
ctrl.ImageList = function(req) {
  return this.request(req, "/asset/ListImages", {}).then(
    result => {
      return {
        data: result,
        str: "获取镜像列表"
      };
  });
};

// 停止容器
ctrl.stopContainer = function(req) {
  return this.request(req, "/asset/StopContainer", {
    container_id: req.body.container_id
  }).then(
    result => {
      return {
        data: result,
        str: "停止容器"
      };
  });
};

// 开启容器
ctrl.startContainer = function(req) {
  return this.request(req, "/asset/StartContainer", {
    container_id: req.body.container_id
  }).then(
    result => {
      return {
        data: result,
        str: "开启容器"
      };
  });
};

// 删除容器
ctrl.deleteContainer = function(req) {
  return this.request(req, "/asset/DeleteContainer", {
    container_id: req.body.container_id
  }).then(
    result => {
      return {
        data: result,
        str: "删除容器"
      };
  });
};

// 容器内部详情
ctrl.ContainerDetail = function(req) {
  return this.request(req, "/asset/ContainerDetail", {
    container_id: req.body.container_id
  }).then(
    result => {
      return {
        data: result,
        str: "容器内部详情"
      };
  });
};

// 一键提测
ctrl.OneKeyDeployTest = function(req) {
  return this.request(req, "/deploy/pushTest", {
    project: req.body.project,
		branch: req.body.branch,
		tag: req.body.tag
  }).then(
    result => {
      return {
        data: result,
        str: "一键提测"
      };
  });
};

// 一键提交生产
ctrl.OneKeyDeployProd = function(req) {
  return this.request(req, "/deploy/pushProd", {
    project: req.body.project,
		branch: req.body.branch,
		tag: req.body.tag
  }).then(
    result => {
      return {
        data: result,
        str: "一键提交生产"
      };
  });
};

// 获取gitlab上的项目
ctrl.GetProjects = function(req) {
  return this.request(req, "/deploy/GetProjects", {
  }).then(
    result => {
      return {
        data: result,
        str: "获取gitlab上的项目"
      };
  });
};

// 获取gitlab上的项目分支
ctrl.GetBranchs = function(req) {
  return this.request(req, "/deploy/GetBranchs", {
    project_id: req.body.project_id
  }).then(
    result => {
      return {
        data: result,
        str: "获取gitlab上的项目分支"
      };
  });
};

// 获取gitlab上的项目标签
ctrl.GetTags = function(req) {
  return this.request(req, "/deploy/GetTags", {
    project_id: req.body.project_id
  }).then(
    result => {
      return {
        data: result,
        str: "获取gitlab上的项目标签"
      };
  });
};

// 获取所有的项目
ctrl.GetProjectInfo = function(req) {
  return this.request(req, "/deploy/GetProjectInfo", {
  }).then(
    result => {
      return {
        data: result,
        str: "获取所有的项目"
      };
  });
};

// 设置项目的类型与配置文件
ctrl.SetProjectInfo = function(req) {
  return this.request(req, "/deploy/SetProjectInfo", {
		name: req.body.name,
		type: req.body.type,
		config: req.body.config
  }).then(
    result => {
      return {
        data: result,
        str: "设置项目的类型与配置文件"
      };
  });
};

module.exports = new BaseController(ctrl);
