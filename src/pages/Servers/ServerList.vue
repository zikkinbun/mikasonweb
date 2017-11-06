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
        width="130px">
      </el-table-column>
      <el-table-column
        label="系统"
        prop="system"
        width="100px">
      </el-table-column>
      <el-table-column
        label="公网地址"
        prop="glabal_ip"
        width="150px">
      </el-table-column>
      <el-table-column
        label="私网地址"
        prop="private_ip"
        width="150px">
      </el-table-column>
      <el-table-column
        label="CPU"
        prop="cpu_status"
        width="80px">
      </el-table-column>
      <el-table-column
        label="内存"
        prop="mem_status"
        width="80px">
      </el-table-column>
      <el-table-column
        label="硬盘"
        prop="hdd_storage"
        width="80px">
      </el-table-column>
      <el-table-column
        label="网卡带宽"
        prop="net_flow"
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
            :type="scope.row.status === '在线' ? 'success' : 'danger'"
            close-transition>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
          size="small"
          type="warning"
          @click="handleEdit(scope.$index, scope.row)">修改配置</el-button>
          <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除服务器</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
	  <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
        <el-form-item label="服务器" prop="name" placeholder="请输入">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="系统">
					<el-select v-model="addForm.system">
            <el-option label="Centos 7" value="Centos7"></el-option>
            <el-option label="Centos 6" value="Centos6"></el-option>
            <el-option label="Centos 5" value="Centos5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公网地址">
					<el-input v-model="addForm.glabal_ip" placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="私网地址">
          <el-input v-model="addForm.private_ip" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="CPU">
          <el-select size="small" v-model="addForm.cpu_status" placeholder="请选择">
            <el-option label="16核" value="16"></el-option>
            <el-option label="8核" value="8"></el-option>
            <el-option label="4核" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select size="small" v-model="addForm.mem_status" placeholder="请选择">
            <el-option label="16G" value="16"></el-option>
            <el-option label="8G" value="8"></el-option>
            <el-option label="4G" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬盘">
          <el-select size="small" v-model="addForm.hdd_storage" placeholder="请选择">
            <el-option label="200G" value="200"></el-option>
            <el-option label="100G" value="100"></el-option>
            <el-option label="50G" value="50"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带宽">
          <el-select size="small" v-model="addForm.net_flow" placeholder="请选择">
            <el-option label="100M" value="100"></el-option>
            <el-option label="50M" value="50"></el-option>
            <el-option label="20M" value="20"></el-option>
            <el-option label="10M" value="10"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否激活">
          <el-radio-group v-model="addForm.Status">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
    </el-dialog>

  <!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="服务器" prop="name" placeholder="请输入">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="系统">
					<el-select v-model="editForm.system">
            <el-option label="Centos 7" value="Centos7"></el-option>
            <el-option label="Centos 6" value="Centos6"></el-option>
            <el-option label="Centos 5" value="Centos5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公网地址">
					<el-input v-model="editForm.glabal_ip" placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="私网地址">
          <el-input v-model="editForm.private_ip" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="CPU">
          <el-select size="small" v-model="editForm.cpu_status" placeholder="请选择">
            <el-option label="16核" value="16"></el-option>
            <el-option label="8核" value="8"></el-option>
            <el-option label="4核" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select size="small" v-model="editForm.mem_status" placeholder="请选择">
            <el-option label="16G" value="16"></el-option>
            <el-option label="8G" value="8"></el-option>
            <el-option label="4G" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬盘">
          <el-select size="small" v-model="editForm.hdd_storage" placeholder="请选择">
            <el-option label="200G" value="200"></el-option>
            <el-option label="100G" value="100"></el-option>
            <el-option label="50G" value="50"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带宽">
          <el-select size="small" v-model="editForm.net_flow" placeholder="请选择">
            <el-option label="100M" value="100"></el-option>
            <el-option label="50M" value="50"></el-option>
            <el-option label="20M" value="20"></el-option>
            <el-option label="10M" value="10"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="是否激活">
          <el-radio-group v-model="editForm.Status">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item> -->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        servers: [],
        selected: [],
        filters: {
					Name: ''
				},
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editForm: {
          id:'',
					name: '',
					system: '',
					glabal_ip: '',
					private_ip: '',
					cpu_status: '',
					mem_status: '',
          hdd_storage: '',
          net_flow: '',
          status:''
				},
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addForm: {
          id:'',
					name: '',
					system: '',
					glabal_ip: '',
					private_ip: '',
					cpu_status: '',
					mem_status: '',
          hdd_storage: '',
          net_flow: '',
          status:'',
          comment: '',
          create_time: '',
        },
      }
    },
    created() {
      this.getServer();
    },
    methods: {
      getServer: function () {
        var self = this;
        self.$http.post('/Interface/ServerList', {}).then(function(res) {
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
        this.addFormVisible = true;
        this.addForm = {
          name: '',
					system: '',
					glabal_ip: '',
					private_ip: '',
					cpu_status: '',
					mem_status: '',
          hdd_storage: '',
          net_flow: '',
          status:'',
          comment: '',
        };
      },
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
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
        }).catch(() => {

        });
      },
      editSubmit: function () {
        var self = this;
        self.$refs.editForm.validate((valid) => {
          if(valid) {
            self.$confirm('确认提交吗？', '提示', {}).then(() => {
              self.editLoading = true;
              // let para = Object.assign({}, this.editForm);
              self.$http.post('/Interface/EditServer', {
                id: this.editForm.id,
                name: self.editForm.name,
                system: self.editForm.system,
                glabal_ip: self.editForm.glabal_ip,
                private_ip: self.editForm.private_ip,
                cpu_status: self.editForm.cpu_status,
                mem_status: self.editForm.mem_status,
                hdd_storage: self.editForm.hdd_storage,
                net_flow: self.editForm.net_flow,
                status: self.editForm.status
              })
              .then((response) => {
                this.editLoading = false;
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getServer();
              });
            });
          }
        })
      },
      addSubmit: function() {
        var self = this;
        self.$http.post('/Interface/CreateServer', {
          name: self.addForm.name,
          system: self.addForm.system,
          glabal_ip: self.addForm.glabal_ip,
          private_ip: self.addForm.private_ip,
          cpu_status: self.addForm.cpu_status,
          mem_status: self.addForm.mem_status,
          hdd_storage: self.addForm.hdd_storage,
          net_flow: self.addForm.net_flow,
          status: self.addForm.status
        })
        .then((response) => {
          // return response.data;
          this.addLoading = false;
          this.$refs['addForm'].resetFields();
          this.addFormVisible = false;
          this.getServer();
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>
