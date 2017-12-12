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
	return this.request(req, "/user/login", {
		username: req.body.username,
		password: req.body.password
	}).then(result => {
		req.session.user = result;
		// console.log(req.session.user);
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
	return this.request(req, "/user/getToken/", {
		username: req.body.username,
		password: req.body.password
	}).then(result => {
		// req.session.token = 'JWT ' + result;
		return {
			data: result,
			str: "获取API TOKEN"
		};
	});
};

// 获取用户列表
ctrl.ListUser = function(req) {
  return this.request(req, "/user/getUser", {

	}).then(
    result => {
      return {
        data: result,
        str: "获取用户列表"
      };
  });
};

// 获取用户列表
ctrl.GetUser = function(req) {
  return this.request(req, "/user/getUser", {
		userid: req.body.userid
	}).then(
    result => {
      return {
        data: result,
        str: "获取用户列表"
      };
  });
};

// 获取服务器列表
ctrl.ListServer = function(req) {
  return this.request(req, "/server/ListServer", {}).then(
    result => {
      return {
        data: result,
        str: "获取服务器列表"
      };
  });
};

// 获取服务器名
ctrl.ListServerName = function(req) {
  return this.request(req, "/server/ListServerName", {}).then(
    result => {
      return {
        data: result,
        str: "获取服务器名"
      };
  });
};

// 获取服务器详情
ctrl.ListDetail = function(req) {
  return this.request(req, "/server/ListDetail", {}).then(
    result => {
      return {
        data: result,
        str: "获取服务器详情"
      };
  });
};

// 新建服务器
ctrl.CreateServer = function(req) {
  return this.request(req, "/server/CreateServer", {
		name: req.body.name,
		alias: req.body.alias,
		tag: req.body.tag,
		is_monitor: req.body.is_monitor,
		status: req.body.status
  }).then(
    result => {
      return {
        data: result,
        str: "新建服务器"
      };
  });
};

// 更改服务器信息
ctrl.EditServer = function(req) {
  return this.request(req, "/server/EditServer", {
		serverId: req.bodu.serverId,
		name: req.body.name,
		alias: req.body.alias,
		tag: req.body.tag,
		is_monitor: req.body.is_monitor,
		status: req.body.status
  }).then(
    result => {
      return {
        data: result,
        str: "更改服务器信息"
      };
  });
};

// 更改服务器监控状态
ctrl.EditServerMonitor = function(req) {
  return this.request(req, "/server/EditServerMonitor", {
		serverId: req.body.serverId,
		is_monitor: req.body.is_monitor,
  }).then(
    result => {
      return {
        data: result,
        str: "更改服务器监控状态"
      };
  });
};

// 删除服务器
ctrl.ServerDelete = function(req) {
  return this.request(req, "/server/DeleteServer", {
    id: req.body.id
  }).then(
    result => {
      return {
        data: result,
        str: "删除服务器"
      };
  });
};

// 创建服务器详情
ctrl.CreateServerDetail = function(req) {
  return this.request(req, "/server/CreateDetail", {
    serverId: req.body.serverId,
		system: req.body.system,
		glabal_ip: req.body.glabal_ip,
		private_ip: req.body.private_ip,
		cpu: req.body.cpu,
		mem: req.body.mem,
		hdd: req.body.hdd,
		netflow: req.body.netflow,
		core: req.body.core
  }).then(
    result => {
      return {
        data: result,
        str: "编辑服务器详情"
      };
  });
};

// 编辑服务器详情
ctrl.EditServerDetail = function(req) {
  return this.request(req, "/server/EditServerDetail", {
    serverId: req.body.serverId,
		name: req.body.name,
		alias: req.body.alias,
		tag: req.body.tag,
		system: req.body.system,
		global_ip: req.body.global_ip,
		private_ip: req.body.private_ip,
		cpu: req.body.cpu,
		mem: req.body.mem,
		hdd: req.body.hdd,
		netflow: req.body.netflow,
		core: req.body.core
  }).then(
    result => {
      return {
        data: result,
        str: "编辑服务器详情"
      };
  });
};

// 获取服务器详情
ctrl.GetServerDetail = function(req) {
  return this.request(req, "/server/GetDetail", {
    serverId: req.body.serverId,
  }).then(
    result => {
      return {
        data: result,
        str: "获取服务器详情"
      };
  });
};

// 创建服务器内有服务
ctrl.CreateServerService = function(req) {
  return this.request(req, "/server/CreateService", {
    serverId: req.body.serverId,
		projectId: req.body.projectId,
		name: req.body.name,
		port: req.body.port,
		version: req.body.version
  }).then(
    result => {
      return {
        data: result,
        str: "创建服务器内有服务"
      };
  });
};

// 获取服务器内有服务
ctrl.GetServerService = function(req) {
  return this.request(req, "/server/GetService", {
    serverId: req.body.serverId,
  }).then(
    result => {
      return {
        data: result,
        str: "获取服务器内有服务"
      };
  });
};

// 编辑服务器内有服务
ctrl.EditServerSevice = function(req) {
  return this.request(req, "/server/EditService", {
    serverId: req.body.serverId,
		projectId: req.body.projectId,
		name: req.body.name,
		port: req.body.port,
		version: req.body.version,
		is_actived: req.body.actived
  }).then(
    result => {
      return {
        data: result,
        str: "编辑服务器内有服务"
      };
  });
};

// 删除服务器内有服务
ctrl.DeleteServerSevice = function(req) {
  return this.request(req, "/server/DeleteService", {
    serverId: req.body.serverId,
  }).then(
    result => {
      return {
        data: result,
        str: "删除服务器内有服务"
      };
  });
};

// 获取容器列表
ctrl.ContainerList = function(req) {
  return this.request(req, "/server/ListSwarmContainers", {}).then(
    result => {
      return {
        data: result,
        str: "获取容器列表"
      };
  });
};

// 获取镜像列表
ctrl.ImageList = function(req) {
  return this.request(req, "/server/ListImages", {}).then(
    result => {
      return {
        data: result,
        str: "获取镜像列表"
      };
  });
};

// 停止容器
ctrl.stopContainer = function(req) {
  return this.request(req, "/server/StopContainer", {
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
  return this.request(req, "/server/StartContainer", {
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
  return this.request(req, "/server/DeleteContainer", {
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
  return this.request(req, "/server/ContainerDetail", {
    container_id: req.body.container_id
  }).then(
    result => {
      return {
        data: result,
        str: "容器内部详情"
      };
  });
};

// 定时提测
ctrl.PeriodDeploy = function(req) {
  return this.request(req, "/deploy/PeriodDeploy", {
		name: req.body.name,
    project: req.body.project,
		branch: req.body.branch,
		tag: req.body.tag,
		env: req.body.env,
		config: req.body.config,
		type: req.body.type,
		date: req.body.date,
		time: req.body.time,
		target: req.body.target
  }).then(
    result => {
      return {
        data: result,
        str: "定时提测"
      };
  });
};


// 项目上线
ctrl.ProjectDeploy = function(req) {
  return this.request(req, "/deploy/PtDeploy", {
    project: req.body.project,
		branch: req.body.branch,
		tag: req.body.tag,
		env: req.body.env,
		configfile: req.body.configfile,
		project_type: req.body.project_type,
  }).then(
    result => {
      return {
        data: result,
        str: "项目上线"
      };
  });
};

// 项目回滚
ctrl.ProjectRollback = function(req) {
  return this.request(req, "/deploy/Rollback", {
    project: req.body.project,
		branch: req.body.branch,
		tag: req.body.tag,
		env: req.body.env,
		configfile: req.body.configfile,
		project_type: req.body.project_type,
  }).then(
    result => {
      return {
        data: result,
        str: "项目回滚"
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
    project: req.body.project
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
    project: req.body.project
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

// 获取所有发布记录
ctrl.GetRecords = function(req) {
  return this.request(req, "/deploy/GetRecords", {
  }).then(
    result => {
      return {
        data: result,
        str: "获取所有发布记录"
      };
  });
};

// 获取CPU负载
ctrl.queryCpuLoad = function(req) {
  return this.request(req, "/monitor/CpuLoad", {
  }).then(
    result => {
      return {
        data: result,
        str: "获取CPU负载"
      };
  });
};

// 获取单台CPU负载
ctrl.queryCpuLoadByIp = function(req) {
  return this.request(req, "/monitor/CpuLoadByIp", {
		hostip: req.body.hostip
  }).then(
    result => {
      return {
        data: result,
        str: "获取单台CPU负载"
      };
  });
};

// 获取CPU状态
ctrl.queryCpuStat = function(req) {
  return this.request(req, "/monitor/CpuStat", {
  }).then(
    result => {
      return {
        data: result,
        str: "获取CPU状态"
      };
  });
};

// 获取内存状态
ctrl.queryMemStat = function(req) {
  return this.request(req, "/monitor/MemStat", {
  }).then(
    result => {
      return {
        data: result,
        str: "获取内存状态"
      };
  });
};

// 获取单台内存状态
ctrl.queryMemStatByIp = function(req) {
  return this.request(req, "/monitor/MemStatByIp", {
		hostip: req.body.hostip
  }).then(
    result => {
      return {
        data: result,
        str: "获取单台内存状态"
      };
  });
};

// 获取进程状态
ctrl.queryRunProcess = function(req) {
  return this.request(req, "/monitor/RunProcess", {
  }).then(
    result => {
      return {
        data: result,
        str: "获取进程状态"
      };
	});
};
// 获取在线状态
ctrl.queryUpTime = function(req) {
	 return this.request(req, "/monitor/UpTime", {
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "获取在线状态"
	    };
	});
};
// 获取在线总时长
ctrl.queryBootTime = function(req) {
	 return this.request(req, "/monitor/BootTime", {
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "获取在线总时长"
	    };
	});
};

// 获取生产数据库连接数
ctrl.getMysqlConns = function(req) {
	 return this.request(req, "/monitor/MysqlConns", {
		 ip: req.body.ip
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "获取生产数据库连接数"
	    };
	});
};

// 获取模块列表
ctrl.getModuleList = function(req) {
	 return this.request(req, "/module/GetModule", {
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "获取模块列表"
	    };
	});
};

// 新增模块
ctrl.createModule = function(req) {
	 return this.request(req, "/module/CreateModule", {
		 name: req.body.name,
		 type: req.body.type,
		 version: req.body.version
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "新增模块"
	    };
	});
};

// 修改模块
ctrl.setModule = function(req) {
	 return this.request(req, "/module/SetModule", {
		 moduleid: req.body.moduleid,
		 name: req.body.name,
		 type: req.body.type,
		 version: req.body.version
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "修改模块"
	    };
	});
};

// 获取模块详情
ctrl.getModuleDetail = function(req) {
		return this.request(req, "/module/GetModuleDetail", {
			moduleid: req.body.moduleid,
			serverid: req.body.serverid,
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "获取模块详情"
		   };
	});
};

// 修改模块详情
ctrl.editModuleDetail = function(req) {
		return this.request(req, "/module/SetModuleDetail", {
			moduleid: req.body.moduleid,
			serverid: req.body.serverid,
			port: req.body.port,
			configfile: req.body.configfile
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "修改模块详情"
		   };
	});
};

// 绑定模块及服务器
ctrl.setModuleServer = function(req) {
		return this.request(req, "/module/SetModuleServer", {
			moduleid: req.body.moduleid,
			serverid: req.body.serverid,
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "绑定模块及服务器"
		   };
	});
};

// 删除模块
ctrl.delModule = function(req) {
		return this.request(req, "/module/DelModule", {
			moduleid: req.body.moduleid,
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "删除模块"
		   };
	});
};


// 激活模块
ctrl.activeDetail = function(req) {
		return this.request(req, "/module/ActiveDetail", {
			moduleid: req.body.moduleid,
			serverid: req.body.serverid,
			is_actived: req.body.is_actived,
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "激活模块"
		   };
	});
};

// 获取业务列表
ctrl.getBusList = function(req) {
	 return this.request(req, "/bussiness/GetBussiness", {
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "获取业务列表"
	    };
	});
};

// 新增业务详情
ctrl.addBussiness = function(req) {
		return this.request(req, "/bussiness/CreateBussiness", {
			name: req.body.name,
			type: req.body.type,
			operatorid: req.body.operatorid,
			productorid: req.body.productorid,
			hostnum: req.body.hostnum,
			creator: req.body.creator
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "新增业务详情"
		   };
	});
};

// 编辑业务详情
ctrl.setBussiness = function(req) {
		return this.request(req, "/bussiness/SetBussiness", {
			bussinessid: req.body.bussinessid,
			name: req.body.name,
			operatorid: req.body.operatorid,
			productorid: req.body.productorid,
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "编辑业务详情"
		   };
	});
};

// 删除业务
ctrl.delBussiness = function(req) {
		return this.request(req, "/bussiness/DelBussiness", {
			bussinessid: req.body.bussinessid,
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "删除业务"
		   };
	});
};

// 获取集群列表
ctrl.getClusterList = function(req) {
	 return this.request(req, "/server/GetCluster", {
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "获取集群列表"
	    };
	});
};

// 获取集群详情
ctrl.getClusterDetail = function(req) {
	 return this.request(req, "/server/GetCluster", {
		 clusterid: req.body.clusterid
	 }).then(
	   result => {
	     return {
	       data: result,
	       str: "获取集群详情"
	    };
	});
};

// 新增集群详情
ctrl.addCluster = function(req) {
		return this.request(req, "/server/CreateCluster", {
			name: req.body.name,
			type: req.body.type,
			region: req.body.region
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "新增集群详情"
		   };
	});
};

// 编辑集群详情
ctrl.setCluster = function(req) {
		return this.request(req, "/server/SetCluster", {
			clusterid: req.body.clusterid,
			name: req.body.name,
			type: req.body.type,
			region: req.body.region
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "编辑集群详情"
		   };
	});
};

// 删除集群
ctrl.delCluster = function(req) {
		return this.request(req, "/server/DelCluster", {
			clusterid: req.body.clusterid
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "删除集群"
		   };
	});
};

// 绑定集群主机
ctrl.bindServer = function(req) {
		return this.request(req, "/server/BindServer", {
			clusterid: req.body.clusterid,
			serverids: req.body.serverids
	 }).then(
		  result => {
		    return {
		      data: result,
		      str: "绑定集群主机"
		   };
	});
};

module.exports = new BaseController(ctrl);
