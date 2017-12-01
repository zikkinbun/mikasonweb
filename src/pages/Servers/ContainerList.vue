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
    border
    highlight-current-row
    @selection-change="tableSelectionChange">
    <el-table-column
      label="容器Id"
      prop="container_id"
      width="140px">
      <template scope="scope">
        <el-button
        size="small"
        type="primary"
        @click="getContainersDetail(scope.$index, scope.row)">{{ scope.row.container_id }}</el-button>
      </template>
    </el-table-column>
<!--    <el-table-column
    label="托管主机"
    prop="host_name"
    width="120px"> -->
  </el-table-column>
    <el-table-column
      label="容器名"
      prop="container_name"
      width="180px">
    </el-table-column>
    <el-table-column
      label="镜像名"
      prop="image_name"
      width="100px">
    </el-table-column>
    <el-table-column
      label="启动命令"
      prop="command">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="createdate"
      width="180px">
    </el-table-column>
    <el-table-column
      label="运行时间"
      prop="status"
      width="120px">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态"
      width="100"
      :filters="[{ text: 'running', value: '运行中' }, { text: 'exited', value: '离线' }, { text: 'created', value: '已创建' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template scope="scope">
        <el-tag
          :type="scope.row.state === 'running' ? 'success' : 'danger'"
          close-transition>{{scope.row.state}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
        size="small"
        type="success"
        @click="startContainer(scope.$index, scope.row)">开启容器</el-button>
        <el-button
        size="small"
        type="warning"
        @click="stopContainer(scope.$index, scope.row)">关闭容器</el-button>
        <el-button
        size="small"
        type="danger"
        @click="deleteContainer(scope.$index, scope.row)">删除容器</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="容器详情" :visible.sync="detailVisible" :close-on-click-modal="false">
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
        detailVisible: false,
      }
    },
    created () {
      this.getContainers();
    },
    methods: {
      getContainers: function () {
        var self = this;
        self.$http.post('/Interface/ContainerList', {}).then((response) => {
          self.containers = response.data.retdata;
        }).then(function(response) {
          console.log(response)
        });
      },
      filterTag(value, row) {
        return row.status === value;
      },
      tableSelectionChange: function(val) {
          console.log(val);
          this.selected = val;
      },
      getContainersDetail: function (index, row) {
        var self = this;
        self.$http.post('/Interface/ContainerDetail', {
          container_id: row.container_id
        })
        .then((response, callback) => {
          this.detailVisible = true;
          this.detail = response.data.retdata;
        })
        .then(function(response) {
          console.log(response)
        });
      },
      stopContainer: function (index, row) {
        var self = this;
        self.$http.post('/Interface/stopContainer', {
          container_id: row.container_id
        }).then((response, callback) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                message: data.retmsg,
                type: 'success',
              });
              break;
            default:
              self.$message({
                message: '停止失败',
                type: 'error'
              })
          }
        });
      },
      startContainer: function (index, row) {
        var self = this;
        self.$http.post('/Interface/startContainer', {
          container_id: row.container_id
        }).then((response, callback) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                message: data.retmsg,
                type: 'success',
              });
              break;
            default:
              self.$message({
                message: '开启失败',
                type: 'error'
              })
          }
        });
      },
      deleteContainer: function (index, row) {
        var self = this;
        self.$http.post('/Interface/deleteContainer', {
          container_id: row.container_id
        }).then((response, callback) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                message: data.retmsg,
                type: 'success',
              });
              break;
            default:
              self.$message({
                message: '删除失败',
                type: 'error'
              })
          }
        });
      },
    }
  }
</script>

<style>
.button {
  margin-left:auto;
  margin-right:auto;
  width:70%;
  padding:0;
  position:absolute;
}
</style>
