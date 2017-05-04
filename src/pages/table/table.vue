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
      @selection-change="tableSelectionChange">
      <el-table-column
        label="服务器"
        prop="Name">
      </el-table-column>
      <el-table-column
        label="系统"
        prop="System">
      </el-table-column>
      <el-table-column
        label="公网地址"
        prop="GlobalIpAddr">
      </el-table-column>
      <el-table-column
        label="私网地址"
        prop="PrivateIpAddr">
      </el-table-column>
      <el-table-column
        label="CPU"
        prop="CpuStat">
      </el-table-column>
      <el-table-column
        label="内存"
        prop="MemoryStat">
      </el-table-column>
      <el-table-column
        label="硬盘"
        prop="HDDStorage">
      </el-table-column>
      <el-table-column
        label="网卡带宽"
        prop="NetCard">
      </el-table-column>
      <el-table-column
        label="状态" prop="Status">
        <!-- <el-tag type="success" v-if="(Status == '在线')">标签四</el-tag>
        <el-tag type="danger" v-else="(Status == '不在线')">标签四</el-tag> -->
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
          size="small"
          type="warning"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
	  <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
        <el-form-item label="服务器" prop="Name" placeholder="请输入">
					<el-input v-model="addForm.Name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="系统">
					<el-select v-model="addForm.System">
            <el-option label="Centos 7" value="Centos7"></el-option>
            <el-option label="Centos 6" value="Centos6"></el-option>
            <el-option label="Centos 5" value="Centos5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公网地址">
					<el-input v-model="addForm.GlobalIpAddr" placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="私网地址">
          <el-input v-model="addForm.PrivateIpAddr" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="CPU">
          <el-select size="small" v-model="addForm.CpuStat" placeholder="请选择">
            <el-option label="16核" value="16"></el-option>
            <el-option label="8核" value="8"></el-option>
            <el-option label="4核" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select size="small" v-model="addForm.MemoryStat" placeholder="请选择">
            <el-option label="16G" value="16"></el-option>
            <el-option label="8G" value="8"></el-option>
            <el-option label="4G" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬盘">
          <el-select size="small" v-model="addForm.HDDStorage" placeholder="请选择">
            <el-option label="200G" value="200"></el-option>
            <el-option label="100G" value="100"></el-option>
            <el-option label="50G" value="50"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带宽">
          <el-select size="small" v-model="addForm.NetCard" placeholder="请选择">
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
				<el-form-item label="服务器" prop="Name" placeholder="请输入">
					<el-input v-model="editForm.Name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="系统">
					<el-select v-model="editForm.System">
            <el-option label="Centos 7" value="Centos7"></el-option>
            <el-option label="Centos 6" value="Centos6"></el-option>
            <el-option label="Centos 5" value="Centos5"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="公网地址">
					<el-input v-model="editForm.GlobalIpAddr" placeholder="请输入"></el-input>
				</el-form-item>
        <el-form-item label="私网地址">
          <el-input v-model="editForm.PrivateIpAddr" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="CPU">
          <el-select size="small" v-model="editForm.CpuStat" placeholder="请选择">
            <el-option label="16核" value="16"></el-option>
            <el-option label="8核" value="8"></el-option>
            <el-option label="4核" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select size="small" v-model="editForm.MemoryStat" placeholder="请选择">
            <el-option label="16G" value="16"></el-option>
            <el-option label="8G" value="8"></el-option>
            <el-option label="4G" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="硬盘">
          <el-select size="small" v-model="editForm.HDDStorage" placeholder="请选择">
            <el-option label="200G" value="200"></el-option>
            <el-option label="100G" value="100"></el-option>
            <el-option label="50G" value="50"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="带宽">
          <el-select size="small" v-model="editForm.NetCard" placeholder="请选择">
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
					Name: '',
					System: '',
					GlobalIpAddr: '',
					PrivateIpAddr: '',
					CpuStat: '',
					MemoryStat: '',
          HDDStorage: '',
          NetCard: '',
          Status:''
				},
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addForm: {
          id:'',
          Name: '',
          System: '',
          GlobalIpAddr: '',
          PrivateIpAddr: '',
          CpuStat: '',
          MemoryStat: '',
          HDDStorage: '',
          NetCard: '',
          Status: '',
          comment: '',
          CreateTime: '',
        },
      }
    },
    created() {
      this.getServer();
    },
    methods: {
      getServer: function () {
        this.axios.get('http://operapi.uco2.com/asset/list/', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.servers = response.data;
        }).then(function(response) {
          console.log(response)
        });
      },
      tableSelectionChange: function(val) {
          console.log(val);
          this.selected = val;
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          Name: '',
          System: '',
          GlobalIpAddr: '',
          PrivateIpAddr: '',
          CpuStat: '',
          MemoryStat: '',
          HDDStorage: '',
          NetCard: '',
          Status: '',
          comment: '',
        };
      },
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      handleDelete: function (index, row) {
        let url = 'http://operapi.uco2.com/asset/delserver/' + row.id + '/'
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          this.axios.post(url, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': JSON.parse(sessionStorage.getItem('token'))
            }
          }).then((response, callback) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            this.getServer()
          });
        }).catch(() => {

        });
      },
      editSubmit: function () {
        var formData = new URLSearchParams();
        formData.append('Name', this.editForm.Name)
        formData.append('System', this.editForm.System)
        formData.append('GlobalIpAddr', this.editForm.GlobalIpAddr)
        formData.append('PrivateIpAddr', this.editForm.PrivateIpAddr)
        formData.append('CpuStat', this.editForm.CpuStat)
        formData.append('MemoryStat', this.editForm.MemoryStat)
        formData.append('HDDStorage', this.editForm.HDDStorage)
        formData.append('NetCard', this.editForm.NetCard)
        formData.append('Status', this.editForm.Status)
        let url = 'http://operapi.uco2.com/asset/detail/' + this.editForm.id + '/'
        this.$refs.editForm.validate((valid) => {
          if(valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              // let para = Object.assign({}, this.editForm);
              this.axios.post(url, formData,
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  'Authorization': JSON.parse(sessionStorage.getItem('token'))
                }
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
        var formData = new URLSearchParams();
        formData.append('Name', this.addForm.Name)
        formData.append('System', this.addForm.System)
        formData.append('GlobalIpAddr', this.addForm.GlobalIpAddr)
        formData.append('PrivateIpAddr', this.addForm.PrivateIpAddr)
        formData.append('CpuStat', this.addForm.CpuStat)
        formData.append('MemoryStat', this.addForm.MemoryStat)
        formData.append('HDDStorage', this.addForm.HDDStorage)
        formData.append('NetCard', this.addForm.NetCard)
        formData.append('Status', this.addForm.Status)
        this.axios.post('http://operapi.uco2.com/asset/list/', formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
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
