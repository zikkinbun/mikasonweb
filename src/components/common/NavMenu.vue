<template lang="html">
  <el-menu default-active="1" id="nav-menu" theme="dark">
    <div class="logo">
      <router-link to="/main">
        <!--<img src="../../assets/images/vector_space_illust.svg" />-->
        <p>Mikason运维平台</p>
      </router-link>
    </div>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-setting"></i>资源管理</template>
      <el-menu-item index="1-1"><router-link to="/table" class="nav-link"><i class="el-icon-view"></i>云服务器(ECS)列表</router-link></el-menu-item>
      <el-menu-item index="1-1"><router-link to="/image" class="nav-link"><i class="el-icon-document"></i>Docker镜像列表</router-link></el-menu-item>
      <el-menu-item index="1-1"><router-link to="/container" class="nav-link"><i class="el-icon-menu"></i>Docker容器列表</router-link></el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-upload"></i>发布管理</template>
      <el-menu-item index="2-1"><router-link to="/deploy" class="nav-link"><i class="el-icon-edit "></i>一键发布</router-link></el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-information"></i>在线监控</template>
      <el-menu-item index="3-1"><router-link to="/monitor" class="nav-link"><i class="el-icon-picture "></i>基线监控</router-link></el-menu-item>
      <el-menu-item index="3-2"><router-link to="/docker" class="nav-link"><i class="el-icon-date "></i>Docker实例监控</router-link></el-menu-item>
      <el-menu-item index="3-2"><router-link to="/cpu" class="nav-link"><i class="el-icon-date "></i>CPU监控</router-link></el-menu-item>
      <el-menu-item index="3-3"><router-link to="/mem" class="nav-link"><i class="el-icon-date "></i>内存监控</router-link></el-menu-item>
      <el-menu-item index="3-4"><router-link to="/loadbalance" class="nav-link"><i class="el-icon-date "></i>流量监控</router-link></el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title"><i class="el-icon-time"></i>任务管理</template>
      <el-menu-item index="4-1"><router-link to="/quickwork" class="nav-link"><i class="el-icon-date "></i>脚本执行</router-link></el-menu-item>
      <el-menu-item index="4-2"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>文件分发</router-link></el-menu-item>
      <el-menu-item index="4-3"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>批量执行</router-link></el-menu-item>
      <el-menu-item index="4-4"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>定制任务</router-link></el-menu-item>
      <el-menu-item index="４-5"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>定时任务</router-link></el-menu-item>
      <el-menu-item index="４-6"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>灰度计划</router-link></el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title"><i class="el-icon-plus"></i>配置管理</template>
      <el-menu-item index="5-1"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>帐号管理</router-link></el-menu-item>
      <el-menu-item index="5-2"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>文件管理</router-link></el-menu-item>
      <el-menu-item index="5-3"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>脚本管理</router-link></el-menu-item>
      <el-menu-item index="5-4"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>变量管理</router-link></el-menu-item>
      <el-menu-item index="5-5"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>软件管理</router-link></el-menu-item>
      <el-menu-item index="5-6"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>服务管理</router-link></el-menu-item>
      <el-menu-item index="5-7"><router-link to="/manage" class="nav-link"><i class="el-icon-date "></i>模板管理</router-link></el-menu-item>
    </el-submenu>
  </el-menu>
</template>
