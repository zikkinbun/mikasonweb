<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="项目"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="loadData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table
      :data="projects"
      style="width: 100%"
      highlight-current-row>
      <el-table-column
        label="项目Id"
        prop="pid">
      </el-table-column>
      <el-table-column
      label="项目名称"
      prop="name">
      </el-table-column>
      <el-table-column
        label="项目类型"
        prop="type">
        <template scope="scope">
          <el-button :plain="true" type="success" size="small" @click="setConfigDialogShow(scope.$index, scope.row)">
            {{ scope.row.type ? scope.row.type : '未设置' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="SSH地址"
        prop="ssh_url">
      </el-table-column>
      <el-table-column
        label="HTTP地址"
        prop="http_url">
      </el-table-column>
      <el-table-column
        label="分支"
        prop="branches">
        <template scope="scope">
          <el-select v-model="scope.row.branches[-1]" placeholder="请选择" @change="branchSelectionChange">
            <el-option
              v-for="item in scope.row.branches"
              :value="item">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="标签"
        prop="tags">
        <template scope="scope">
          <el-select v-model="scope.row.tags[-1]" placeholder="请选择" @change="tagSelectionChange">
            <el-option
              v-for="item in scope.row.tags"
              :value="item">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        prop="configfile"
        label="配置文件">
      </el-table-column>
      <el-table-column
        prop="owner"
        label="项目主人">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
          size="small"
          type="warning"
          @click="pushTest(scope.$index, scope.row)">测 试</el-button>
          <el-button
          size="small"
          type="success"
          @click="pushProd(scope.$index, scope.row)">生 产</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="设置" v-model="inputVisible" :close-on-click-modal="false" width="40">
      <el-form :model="inputItem" :rules="inputValidate" ref="inputItem">
        <el-form-item label="项目类型" prop="type">
          <el-input type="type" v-model="inputItem.type" auto-complete="off" :placeholder="inputItem.type"></el-input>
        </el-form-item>
        <el-form-item label="配置文件" prop="config">
          <el-input type="config" v-model="inputItem.config" auto-complete="off" :placeholder="inputItem.config"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inputVisible=false">取 消</el-button>
        <el-button type="primary" @click="saveConfig">保 存</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        projects: [],
        branch: '',
        tag: '',
        msg: '',
        filters: {
          name: ''
        },
        loadTest: false,
        loadProd: false,
        inputVisible: false,
        inputItem: {
          name: '',
          type: '',
          config: ''
        },
        inputValidate: {
          type: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          }],
          config: [{
            required: true,
            message: '必填项',
            trigger: 'blur'
          }]
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData: function() {
        var self = this;
        self.$http.post('/Interface/GetProjectInfo', {}).then((response) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.projects = data.retdata;
              break;
            default:
              self.$message({
                'message': data.retmsg,
                'type': 'error'
              });
          }
        });
      },
      branchSelectionChange: function(val) {
          // console.log(val);
          this.branch = val;
      },
      tagSelectionChange: function(val) {
          // console.log(val);
          this.tag = val;
      },
      cancel(target) {
  			this.$refs[target].resetFields();
  		},
      setConfigDialogShow: function(index, row) {
        var self = this;
        self.inputVisible = true;
        self.inputItem.name = row.name;
        self.inputItem.type = row.type;
        self.inputItem.config = row.configfile;
      },
      saveConfig: function() {
        var self = this;
        self.$http.post('/Interface/SetProjectInfo', {
          name: self.inputItem.name,
          type: self.inputItem.type,
          config: self.inputItem.config
        }).then(function(res) {
          var data = res.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                'message': data.retmsg,
                'type': 'success'
              });
              self.inputVisible = false;
              self.loadData();
              break;
            default:
              self.$message({
                'message': data.retmsg,
                'type': 'error'
              });
              self.inputVisible = false;
          }
        });
      },
      pushTest: function(index, row) {
        var self = this;
        self.loadTest = true;
        self.$http.post('/Interface/ProjectDeploy', {
          project: row.name,
          branch: self.branch,
          tag: self.tag,
          env: 'test',
          project_type: row.type,
          configfile: row.configfile
          }).then((response) => {
           self.msg = response.data;
           self.$alert(self.msg.retmsg, '发布情况', {
             confirmButtonText: '确定',
           });
           self.loadTest = false;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      pushProd: function(index, row) {
        var self = this;
        self.loadProd = true;
        self.$http.post('/Interface/ProjectDeploy', {
          project: row.name,
          branch: self.branch,
          tag: self.tag,
          env: 'prod',
          project_type: row.type,
          configfile: row.configfile
          }).then((response) => {
           self.msg = response.data;
           self.$alert(self.msg.retmsg, '发布情况', {
             confirmButtonText: '确定',
           });
           self.loadProd = false;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.row-btn {
  padding: 5px 0;
  background-color: #f9fafc;
}
</style>
