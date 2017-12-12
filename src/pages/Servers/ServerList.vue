<template>
  <section>
    <!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.Name" placeholder="服务器"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getServer">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
    </el-col>

    <el-table
      :data="servers"
      style="width: 100%"
      highlight-current-row
      border
      @selection-change="tableSelectionChange">
      <el-table-column
        label="服务器"
        prop="name"
        width="180px">
        <template scope="scope">
          <el-button
          size="small"
          type="primary"
          plain
          @click="getServerDetail(scope.$index, scope.row)">{{ scope.row.name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="别名"
        prop="alias"
        width="180px">
      </el-table-column>
      <el-table-column
        label="所属环境"
        prop="tag"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100"
        :filters="[{ text: '在线', value: '在线' }, { text: '离线', value: '离线' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            close-transition>{{ scope.row.status === 1 ? '在线' : '离线' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_monitor"
        label="监控"
        width="100"
        :filters="[{ text: '监控中', value: '监控中' }, { text: '离线', value: '离线' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template scope="scope">
          <el-tag
            :type="scope.row.is_monitor === 1 ? 'success' : 'danger'"
            close-transition>{{ scope.row.is_monitor === 1 ? '监控中' : '离线' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
          size="small"
          type="primary"
          plain
          @click="handleEdit(scope.$index, scope.row)">查看状态</el-button>
          <el-button
          size="small"
          type="warning"
          plain
          @click="handleEdit(scope.$index, scope.row)">修改配置</el-button>
          <el-button
          size="small"
          type="success"
          plain
          @click="handleMonitor(scope.$index, scope.row)">监控操作</el-button>
          <el-button
          size="small"
          type="danger"
          plain
          @click="handleDelete(scope.$index, scope.row)">删除服务器</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
	  <el-dialog title="新增服务器" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm" :rules="addRules">
        <el-form-item label="服务器名" prop="name" placeholder="请输入">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				</el-form-item>
				<el-form-item label="别名" prop="alias">
					<el-input v-model="addForm.alias" placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="环境标签" prop="tag">
          <el-input v-model="addForm.tag" placeholder="请输入"></el-input>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addServer" :loading="addLoading">提交</el-button>
			</div>
    </el-dialog>

  <!--编辑界面-->
		<el-dialog title="编辑服务器详情" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm" :rules="editRules">
        <el-form-item label="服务器名" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="alias">
          <el-input v-model="editForm.alias" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="环境标签" prop="tag">
          <el-input v-model="editForm.tag" placeholder="请输入"></el-input>
        </el-form-item>
				<el-form-item label="系统" prop="system">
					<el-select v-model="editForm.system">
            <el-option label="Centos 7" value="CentOS 7.0"></el-option>
            <el-option label="Centos 6" value="CentOS 6.0"></el-option>
            <el-option label="Centos 5" value="CentOS 5.0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公网地址" prop="global_ip">
					<el-input v-model="editForm.global_ip" placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="私网地址" prop="private_ip">
          <el-input v-model="editForm.private_ip" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="CPU" prop="cpu">
          <el-select size="small" v-model="editForm.cpu" placeholder="请选择">
            <el-option label="16核" value="16"></el-option>
            <el-option label="8核" value="8"></el-option>
            <el-option label="4核" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存" prop="mem">
          <el-select size="small" v-model="editForm.mem" placeholder="请选择">
            <el-option label="16G" value="16"></el-option>
            <el-option label="8G" value="8"></el-option>
            <el-option label="4G" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬盘" prop="hdd">
          <el-select size="small" v-model="editForm.hdd" placeholder="请选择">
            <el-option label="200G" value="200"></el-option>
            <el-option label="100G" value="100"></el-option>
            <el-option label="50G" value="50"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带宽" prop="netflow">
          <el-select size="small" v-model="editForm.netflow" placeholder="请选择">
            <el-option label="100M" value="100"></el-option>
            <el-option label="50M" value="50"></el-option>
            <el-option label="20M" value="20"></el-option>
            <el-option label="10M" value="10"></el-option>
            <el-option label="5M" value="5"></el-option>
          </el-select>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editServerDetail" :loading="editLoading">提交</el-button>
			</div>
    </el-dialog>

    <el-dialog title="服务器详情" :visible.sync="detailVisible" :close-on-click-modal="false">
      <el-table :data="detail" border>
        <el-table-column property="cpu" label="CPU"></el-table-column>
        <el-table-column property="mem" label="内存"></el-table-column>
        <el-table-column property="netflow" label="网卡流量"></el-table-column>
        <el-table-column property="hdd" label="硬盘"></el-table-column>
        <el-table-column property="system" label="系统"></el-table-column>
        <el-table-column property="global_ip" label="公网地址"></el-table-column>
        <el-table-column property="private_ip" label="私网地址"></el-table-column>
        <el-table-column property="core" label="内核"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="监控操作" :visible.sync="monitorVisible" width="30%" :close-on-click-modal="false">
      <span>请确认监控操作:  </span>
      <el-radio v-model="monitorForm.is_monitor" label="1">添 加</el-radio>
      <el-radio v-model="monitorForm.is_monitor" label="0">取 消</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="monitorVisible = false">取 消</el-button>
        <el-button type="primary" @click="setMonitor">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        servers: [],
        selected: [],
        detail: [],
        detailVisible: false,
        filters: {
					Name: ''
				},
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editForm: {
          id: '',
          name: '',
          alias: '',
          tag: '',
					system: '',
					global_ip: '',
					private_ip: '',
					cpu: '',
					mem: '',
          hdd: '',
          netflow: '',
				},
        editRules : {
          name: [
            { required: true, message: '请输入服务器名', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '请输入别名', trigger: 'blur' }
          ],
          tag: [
            { required: true, message: '请输入环境标签', trigger: 'blur' }
          ],
          cpu: [
            { required: true, message: '请选择核数', trigger: 'blur' }
          ],
          mem: [
            { required: true, message: '请选择内存大小', trigger: 'blur' }
          ],
          system: [
            { required: true, message: '请选择系统', trigger: 'blur' }
          ],
          global_ip: [
            { required: true, message: '请输入IP地址', trigger: 'blur' }
          ],
          private_ip: [
            { required: true, message: '请输入IP地址', trigger: 'blur' }
          ],
          hdd: [
            { required: true, message: '请选择硬盘大小', trigger: 'blur' }
          ],
          netflow: [
            { required: true, message: '请选择流量大小', trigger: 'blur' }
          ],
        },
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addForm: {
					name: '',
					alias: '',
					tag: ''
        },
        addRules : {
          name: [
            { required: true, message: '请输入服务器名', trigger: 'blur' }
          ],
          alias: [
            { required: true, message: '请输入别名', trigger: 'blur' }
          ],
          tag: [
            { required: true, message: '请输入环境标签', trigger: 'blur' }
          ],
        },
        monitorVisible: false,
        monitorForm: {
          'id': '',
          'is_monitor': ''
        },
        monitorLoading: false
      }
    },
    created() {
      this.getServer();
    },
    methods: {
      getServer: function () {
        var self = this;
        self.$http.post('/Interface/ListServer', {}).then(function(res) {
          var data = res.data;
          self.servers = data.retdata;
          // console.log(data);
        });
      },
      tableSelectionChange: function(val) {
          console.log(val);
          this.selected = val;
      },
      filterTag(value, row) {
        return row.status === value;
      },
      //显示新增界面
      handleAdd: function () {
        var self = this;
        self.addFormVisible = true;
        self.addForm = {
          name: '',
					alias: '',
					tag: ''
        };
      },
      handleEdit: function (index, row) {
        var self = this;
        self.editFormVisible = true;
        self.editForm = Object.assign({}, row);
      },
      handleMonitor: function (index, row) {
        var self = this;
        self.monitorVisible = true;
        self.monitorForm = Object.assign({}, row);
      },
      handleDelete: function (index, row) {
        var self = this;
        self.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          self.listLoading = true;
          self.$http.post('/Interface/ServerDelete', {
            id: row.id
          }
            ).then((response, callback) => {
            self.listLoading = false;
            self.$message({
              message: '删除成功',
              type: 'success',
            });
            this.getServer()
          });
        }).catch(function (error) {
          console.log(error);
        });
      },
      getServerDetail: function (index, row) {
        var self = this;
        self.$http.post('/Interface/GetServerDetail', {
          serverId: row.id
        })
        .then((response, callback) => {
          self.detailVisible = true;
          self.detail = response.data.retdata;
        })
        .then(function(response) {
          console.log(response)
        });
      },
      setServerService: function (index, row) {
        var self = this;
        self.$http.post();
      },
      editServerDetail: function () {
        var self = this;
        self.$refs.editForm.validate((valid) => {
          if(valid) {
            self.$confirm('确认提交吗？', '提示', {}).then(() => {
              self.editLoading = true;
              // let para = Object.assign({}, this.editForm);
              self.$http.post('/Interface/EditServerDetail', {
                serverId: self.editForm.id,
                name: self.editForm.name,
                alias: self.editForm.alias,
                tag: self.editForm.tag,
                system: self.editForm.system,
                global_ip: self.editForm.global_ip,
                private_ip: self.editForm.private_ip,
                cpu: self.editForm.cpu,
                mem: self.editForm.mem,
                hdd: self.editForm.hdd,
                netflow: self.editForm.netflow,
              })
              .then((response) => {
                self.editLoading = false;
                var data = response.data;
                switch (data.retcode) {
                  case 0:
                    self.$message({
                      'message': '修改成功',
                      'type': 'success'
                    });
                    self.$refs['editForm'].resetFields();
                    self.getServer();
                    break;
                  default:
                    self.$message({
                      'message': '修改失败',
                      'type': 'error'
                    });
                }
                self.editFormVisible = false;
              });
            });
          }
        })
      },
      addServer: function() {
        var self = this;
        self.$http.post('/Interface/CreateServer', {
          name: self.addForm.name,
          alias: self.addForm.alias,
          tag: self.addForm.tag,
        })
        .then((response) => {
          // return response.data;
          self.addLoading = false;
          self.$refs['addForm'].resetFields();
          self.addFormVisible = false;
          self.getServer();
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      setMonitor: function() {
        var self = this;
        self.monitorLoading = true;
        // let para = Object.assign({}, this.editForm);
        self.$http.post('/Interface/EditServerMonitor', {
          serverId: self.monitorForm.id,
          is_monitor: self.monitorForm.is_monitor
        })
        .then((response) => {
          self.monitorLoading = false;
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                'message': '修改成功',
                'type': 'success'
              });
              break;
            default:
              self.$message({
                'message': '修改失败',
                'type': 'error'
              });
          }
          self.monitorVisible = false;
        });
      }
    }
  }
</script>
