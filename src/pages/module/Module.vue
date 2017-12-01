<template>
<section>
  <!--工具条-->
  <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filters.name" placeholder="模块名" size="medium"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" v-on:click="getModule">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleAdd">新增模块</el-button>
      </el-form-item>
    </el-form>
  </el-col>

  <el-table
  :data="module"
  stripe
  style="width: 100%">
  <el-table-column
    prop="id"
    label="ID"
    width="100px">
  </el-table-column>
  <el-table-column
    prop="name"
    label="模块名"
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
    prop="version"
    label="版本"
    width="180px">
  </el-table-column>
  <el-table-column
    prop="servers"
    label="关联主机">
    <template scope="scope">
        <el-button
          v-for="server in scope.row.servers"
          type="warning"
          size="mini"
          plain
          v-popover:detailTable
          @click="getModleDetail(scope.$index, scope.row, server.id)">{{ server.name }}</el-button>
    </template>
  </el-table-column>
  <el-table-column
    label="操作"
    width="300px">
    <template scope="scope">
      <el-button
      size="small"
      type="primary"
      plain
      @click="handleEdit(scope.$index, scope.row)">修改模块</el-button>
      <el-button
      size="small"
      type="success"
      plain
      @click="handleBind(scope.$index, scope.row)">绑定模块</el-button>
      <el-button
      size="small"
      type="danger"
      plain
      @click="handleDelete(scope.$index, scope.row)">删除模块</el-button>
    </template>
  </el-table-column>
  </el-table>

  <el-dialog title="新增模块" :visible.sync="addVisible" :close-on-click-modal="false">
    <el-form :model="addForm" ref="addForm" label-width="80px" :rules="addrules">
      <el-form-item label="模块名" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="addForm.type" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="addForm.version" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addModule" :loading="addLoading">创建</el-button>
        <el-button @click.native="addVisible = false">取消</el-button>
      </div>
  </el-dialog>

  <el-dialog title="修改模块" :visible.sync="editVisible" :close-on-click-modal="false">
    <el-form :model="editForm" ref="editForm" label-width="80px" :rules="editrules">
      <el-form-item label="模块名" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="addForm.type" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-input v-model="addForm.version" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editModule" :loading="editLoading">创建</el-button>
        <el-button @click.native="editVisible = false">取消</el-button>
      </div>
  </el-dialog>

  <el-popover
    ref="detailTable"
    placement="right"
    width="400"
    trigger="click"
    v-model="popoverVisible">
    <el-table :data="detail" style="width: 100%">
      <el-table-column width="150" property="port" label="端口">
        <template scope="scope">
            <el-tag
              v-for="p in scope.row.port"
              close-transition>{{ p }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="100" property="is_actived" label="是否激活">
        <template scope="scope">
          <el-tag
            :type="scope.row.is_actived === 1 ? 'success' : 'danger'"
            close-transition>{{ scope.row.is_actived === 1 ? '激活中' : '离线' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column width="300" property="configfile" label="配置文件"></el-table-column>
    </el-table>
  </el-popover>

  <el-dialog title="绑定模块" :visible.sync="bindVisible" :close-on-click-modal="false">
    <el-form :model="bindForm" ref="bindForm" label-width="80px">
      <el-form-item label="模块名" prop="name">
        <el-tag type="success" size="medium">{{ bindForm.name }}</el-tag>
      </el-form-item>
      <el-form-item label="服务器名">
        <el-select v-model="selected_server.id" placeholder="请选择">
          <el-option
            v-for="server in servers"
            :key="server.serverName"
            :label="server.serverName"
            :value="server.serverId">
             <span style="float: left">{{ server.serverName }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bindModuleServer">创建</el-button>
        <el-button @click.native="bindVisible = false">取消</el-button>
      </div>
  </el-dialog>

</section>
</template>

<script>
  export default {
    data () {
      return {
        module: [],
        detail: [],
        filters: [],
        servers: [],
        tags: [
          { name: 'WEB', value: 1, type: '' },
          { name: '数据库', value: 2, type: 'success' },
          { name: '缓存', value: 3, type: 'info' },
          { name: '开发组件', value: 4, type: 'warning' },
          { name: '系统组件', value: 5, type: 'danger' }
        ],
        addForm: {
          name: '',
          type: '',
          version: ''
        },
        addVisible: false,
        addLoading: false,
        addrules: {
          name: [
            { required: true, message: '请输入模块名', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请输入类型', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '请输入版本', trigger: 'blur' }
          ],
        },
        editForm: {
          name: '',
          type: '',
          version: ''
        },
        editVisible: false,
        editLoading: false,
        editrules: {
          name: [
            { required: true, message: '请输入模块名', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请输入类型', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '请输入版本', trigger: 'blur' }
          ],
        },
        popoverVisible: false,
        bindVisible: false,
        bindLoading: false,
        bindForm: {
          id: '',
          name: '',
        },
        selected_server: {
          id: '',
          name: ''
        }
      }
    },
    mounted () {
      this.getModule();
    },
    methods: {
      serverNameSelectionChange: function(val) {
          var self = this;
          self.selected_server.id = val;
      },
      handleAdd: function () {
        var self = this;
        self.addVisible = true;
      },
      handleEdit: function (index, row) {
        var self = this;
        self.editVisible = true;
        self.editForm = Object.assign({}, row);
      },
      handleBind: function (index, row) {
        var self = this;
        self.bindVisible = true;
        self.bindForm = Object.assign({}, row);
        self.getServerName();
      },
      handleDelete: function (index, row) {
        var self = this;
        self.$http.post('/Interface/GetModuleDetail', {
          moduleid: row.id
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
      getModule: function() {
          var self = this;
          self.$http.post('/Interface/getModuleList', {
          }).then((response) => {
            self.module = response.data.retdata;
          }).then(function(response) {
            console.log(response)
          });
      },
      getModleDetail: function(index, row, serverid) {
        var self = this;
        self.$http.post('/Interface/GetModuleDetail', {
          moduleid: row.id,
          serverid: serverid
        }).then((response) => {
          let data = response.data;
          self.detail = data.retdata;
          self.popoverVisible = true;
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
      addModule: function() {
        var self = this;
        self.$http.post('/Interface/getModuleList', {
          name: self.addForm.name,
          type: self.addForm.type,
          version: self.addForm.version
        }).then((response) => {
          self.addLoading = true;
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                'message': '添加成功',
                'type': 'success'
              });
              self.$refs['addForm'].resetFields();
              self.addLoading = false;
              break;
            default:
              self.$message({
                'message': '修改失败',
                'type': 'error'
              });
          }
          self.addVisible = false;
        })
      },
      editModule: function() {
        var self = this;
        self.$http.post('/Interface/getModuleList', {
          name: self.editForm.name,
          type: self.editForm.type,
          version: self.editForm.version
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
      bindModuleServer: function() {
        var self = this;
        self.$http.post('/Interface/SetModuleServer', {
          moduleid: self.bindForm.id,
          serverid: self.selected_server.id
        }).then((response) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                'message': '修改成功',
                'type': 'success'
              });
              self.$refs['bindForm'].resetFields();
              break;
            default:
              self.$message({
                'message': '修改失败',
                'type': 'error'
              });
          }
          self.bindVisible = false;
        })
      },
    }
  }
</script>
