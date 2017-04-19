<template lang="html">
  <el-menu default-active="1" id="nav-menu" theme="dark">
    <div class="logo">
      <router-link to="/main">
        <!--<img src="../../assets/images/vector_space_illust.svg" />-->
        <p>Mikason运维平台</p>
      </router-link>
    </div>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-menu"></i>服务器管理</template>
      <el-menu-item index="1-1"><router-link to="/table" class="nav-link"><i class="el-icon-edit "></i>服务器列表</router-link></el-menu-item>
      <!-- <el-menu-item index="1-2"><router-link to="/user" class="nav-link"><i class="el-icon-document"></i>Vuex(User)</router-link></el-menu-item> -->
    </el-submenu>
    <el-menu-item index="2"><router-link to="/deploy" class="nav-link"><i class="el-icon-document"></i>发布管理</router-link></el-menu-item>
    <el-menu-item index="3"><router-link to="/monitor" class="nav-link"><i class="el-icon-date"></i>在线监控</router-link></el-menu-item>
  </el-menu>
</template>
