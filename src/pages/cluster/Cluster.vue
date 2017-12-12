<template>
<section>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filters.name" placeholder="集群名" size="medium"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" v-on:click="getCluster">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleAdd">新增集群</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <el-table
  :data="clusters"
  stripe
  style="width: 100%">
  <el-table-column
    prop="id"
    label="ID"
    width="100px">
  </el-table-column>
  <el-table-column
    prop="name"
    label="集群名"
    width="100px">
  </el-table-column>
  <el-table-column
    prop="type"
    label="类型"
    width="100px">
    <template scope="scope">
        <el-tag
          v-for="tag in tags"
          v-if="tag.value==scope.row.type"
          :type="tag.type"
          close-transition>{{ tag.name }}</el-tag>
    </template>
  </el-table-column>
  <el-table-column
    prop="region"
    label="地区"
    width="100px">
  </el-table-column>
  <el-table-column
    prop="server"
    label="已绑定主机"
    width="200px">
    <template scope="scope">
        <el-tag
          v-for="server in scope.row.server"
          type="info">{{ server }}</el-tag>
    </template>
  </el-table-column>
  <el-table-column
    label="操作">
    <template scope="scope">
      <el-button
      size="small"
      type="primary"
      plain
      @click="handleEdit(scope.$index, scope.row)">修改集群</el-button>
      <el-button
      size="small"
      type="success"
      plain
      @click="handleBind(scope.$index, scope.row)">加入主机</el-button>
      <el-button
      size="small"
      type="danger"
      plain
      @click="handleDelete(scope.$index, scope.row)">删除集群</el-button>
    </template>
  </el-table-column>
  </el-table>

  <el-dialog title="新增集群" :visible.sync="addVisible" :close-on-click-modal="false">
    <el-form :model="addForm" ref="addForm" label-width="80px" :rules="addrules">
      <el-form-item label="模块名" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="tag" placeholder="请选择">
          <el-option
            v-for="tag in tags"
            :key="tag.name"
            :label="tag.name"
            :value="tag.value">
             <span style="float: left">{{ tag.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区" prop="region">
        <el-input v-model="addForm.region" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCluster" :loading="addLoading">创建</el-button>
        <el-button @click.native="addVisible = false">取消</el-button>
      </div>
  </el-dialog>

  <el-dialog title="修改业务" :visible.sync="editVisible" :close-on-click-modal="false">
    <el-form :model="editForm" ref="editForm" label-width="80px" :rules="editrules">
      <el-form-item label="模块名" prop="name">
        <el-input v-model="editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="tag" placeholder="请选择">
          <el-option
            v-for="tag in tags"
            :key="tag.name"
            :label="tag.name"
            :value="tag.value">
             <span style="float: left">{{ tag.name }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区" prop="region">
        <el-input v-model="editForm.region" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editCluster" :loading="editLoading">提交</el-button>
        <el-button @click.native="editVisible = false">取消</el-button>
      </div>
  </el-dialog>

  <el-dialog title="加入主机" :visible.sync="bindVisible" :close-on-click-modal="false">
    <el-form :model="bindForm" ref="bindForm" label-width="80px">
      <el-form-item label="集群名" prop="name">
        <el-tag type="success" size="medium">{{ bindForm.name }}</el-tag>
      </el-form-item>
      <el-form-item label="服务器名">
        <el-select v-model="selected_server" multiple placeholder="请选择">
            <el-option
              v-for="server in servers"
              :key="server.serverName"
              :label="server.serverName"
              :value="server.serverId">
            </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="bindServer">创建</el-button>
      <el-button @click.native="bindVisible = false">取消</el-button>
    </div>
  </el-dialog>

</section>
</template>

<script>
  export default {
    data () {
      return {
        clusters: [],
        servers: [],
        filters: [],
        tag: '',
        tags: [
          { name: '生产池', value: 'prod', type: '' },
          { name: '测试池', value: 'test', type: 'success' },
          { name: '开发池', value: 'dev', type: 'info' },
          { name: '运维池', value: 'oper', type: 'warning' }
        ],
        addForm: {
          name: '',
          type: '',
          region: ''
        },
        addVisible: false,
        addLoading: false,
        addrules: {
          name: [
            { required: true, message: '请输入集群名', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择集群类型', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择地区', trigger: 'blur' }
          ],
        },
        editForm: {
          id: '',
          name: '',
          type: '',
          region: ''
        },
        editVisible: false,
        editLoading: false,
        editrules: {
          name: [
            { required: true, message: '请输入集群名', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择集群类型', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择地区', trigger: 'blur' }
          ],
        },
        bindVisible: false,
        bindLoading: false,
        bindForm: {
          id: '',
        },
        selected_server: [],
      }
    },
    mounted () {
      this.getCluster();
    },
    methods: {
      handleAdd: function () {
        var self = this;
        self.addVisible = true;
      },
      handleEdit: function (index, row) {
        var self = this;
        self.editVisible = true;
        self.editForm = Object.assign({}, row);
      },
      handleEditDetail: function () {
        var self = this;
        self.editDetialVisible = true;
      },
      handleBind: function (index, row) {
        var self = this;
        self.bindVisible = true;
        self.bindForm = Object.assign({}, row);
        self.getServerName();
      },
      handleDelete: function (index, row) {
        var self = this;
        self.$http.post('/Interface/delCluster', {
          clusterid: row.id
        }).then((response) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                'message': '删除成功',
                'type': 'success'
              });
              break;
            default:
              self.$message({
                'message': '删除失败',
                'type': 'error'
              });
          }
        })
      },
    getCluster: function() {
        var self = this;
        self.$http.post('/Interface/getClusterList', {
        }).then((response) => {
          self.clusters = response.data.retdata;
        })
    },
    getServerName: function() {
      var self = this;
      self.$http.post('/Interface/ListServerName', {
      }).then((response) => {
        let data = response.data;
        self.servers = data.retdata;
      })
    },
    addCluster: function() {
      var self = this;
      self.$http.post('/Interface/addCluster', {
        name: self.addForm.name,
        type: self.tag,
        region: self.addForm.region
      }).then((response) => {
        self.addLoading = true;
        var data = response.data;
        switch (data.retcode) {
          case 0:
            self.$message({
              'message': '新增成功',
              'type': 'success'
            });
            self.$refs['addForm'].resetFields();
            self.addLoading = false;
            break;
          default:
            self.$message({
              'message': '新增失败',
              'type': 'error'
            });
        }
        self.addVisible = false;
      })
    },
    editCluster: function() {
      var self = this;
      self.$http.post('/Interface/setCluster', {
        clusterid: self.editForm.id,
        name: self.editForm.name,
        type: self.tag,
        region: self.editForm.region
      }).then((response) => {
        self.editLoading = true;
        var data = response.data;
        switch (data.retcode) {
          case 0:
            self.$message({
              'message': '修改成功',
              'type': 'success'
            });
            self.$refs['editForm'].resetFields();
            self.editLoading = false;
            break;
          default:
            self.$message({
              'message': '修改失败',
              'type': 'error'
            });
        }
        self.editVisible = false;
      })
    },
    bindServer: function() {
      var self = this;
      // console.log(self.selected_server);
      self.$http.post('/Interface/bindServer', {
        clusterid: self.bindForm.id,
        serverids: self.selected_server
      }).then((response) => {
        self.bindLoading = true;
        var data = response.data;
        switch (data.retcode) {
          case 0:
            self.$message({
              'message': '绑定成功',
              'type': 'success'
            });
            self.$refs['bindForm'].resetFields();
            self.bindLoading = false;
            break;
          default:
            self.$message({
              'message': '绑定失败',
              'type': 'error'
            });
        }
        self.bindVisible = false;
      })
    },
  }
}
</script>
