<template>
  <section>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="filters">
      <el-form-item>
        <el-input v-model="filters.Name" placeholder="容器"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="getContainers">查询</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <el-table
    :data="containers"
    style="width: 100%"
    highlight-current-row
    @selection-change="tableSelectionChange">
    <el-table-column
      label="容器Id"
      prop="containerId">
    </el-table-column>
    <el-table-column
    label="托管主机"
    prop="hostName">
  </el-table-column>
    <el-table-column
      label="容器名"
      prop="containerName">
    </el-table-column>
    <el-table-column
      label="镜像名"
      prop="imageName">
    </el-table-column>
    <el-table-column
      label="启动命令"
      prop="command">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="created">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status">
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
        size="small"
        type="info"
        @click="getContainersDetail(scope.$index, scope.row)">查看详情</el-button>
        <el-button
        size="small"
        type="success"
        @click="startContainer(scope.$index, scope.row)">开启容器</el-button>
        <el-button
        size="small"
        type="warning"
        @click="stopContainer(scope.$index, scope.row)">停止容器</el-button>
        <el-button
        size="small"
        type="danger"
        @click="getContainersDetail(scope.$index, scope.row)">删除容器</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="容器详情" v-model="detailVisible" :close-on-click-modal="false">
    <el-table :data="detail">
      <el-table-column property="COMMAND" label="执行命令"></el-table-column>
      <el-table-column property="CPU" label="CPU"></el-table-column>
      <el-table-column property="MEM" label="内存"></el-table-column>
    </el-table>
  </el-dialog>
</section>
</template>

<script>
  export default {
    data () {
      return {
        containers: [],
        selected: [],
        filters: {
          Name: ''
        },
        detail: [],
        detailVisible: false
      }
    },
    created () {
      this.getContainers();
    },
    methods: {
      checkcontainers: function () {
        this.axios.get('http://operapi.uco2.com/asset/ckcontain/', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          console.log(response)
        })
      },
      getContainers: function () {
        this.axios.get('http://operapi.uco2.com/asset/containlist/', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.containers = response.data;
        }).then(function(response) {
          console.log(response)
        });
      },
      tableSelectionChange: function(val) {
          console.log(val);
          this.selected = val;
      },
      getContainersDetail: function (index, row) {
        var formData = new URLSearchParams();
        formData.append('containerId', row.containerId)
        this.axios.post('http://operapi.uco2.com/asset/container/detail/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        })
        .then((response) => {
          this.detailVisible = true;
          this.detail = response.data;
        })
        .then(function(response) {
          console.log(response)
        });
      },
      stopContainer: function (index, row) {
        var formData = new URLSearchParams();
        formData.append('containerId', row.containerId)
        this.axios.post('http://operapi.uco2.com/asset/container/stop/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        })
        .then((response) => {
          console.log(response)
        });
        this.$nextTick(this.checkcontainers());
      },
      startContainer: function (index, row) {
        var formData = new URLSearchParams();
        formData.append('containerId', row.containerId)
        this.axios.post('http://operapi.uco2.com/asset/container/start/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        })
        .then((response) => {
          console.log(response)
        });
        this.$nextTick(this.checkcontainers());
      },
      deleteContainer: function (index, row) {
        var formData = new URLSearchParams();
        formData.append('containerId', row.containerId)
        this.axios.post('http://operapi.uco2.com/asset/container/delete/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        })
        .then((response) => {
          console.log(response)
        });
      },
    }
  }
</script>
