<template>
  <div>
    <el-row>
    <el-col :span="12">
    <el-form :inline="true" :model="deployForm" ref="deployForm" :rules="deployRules" label-width="80px">
      <el-form-item label="任务名称" prop="name">
        <el-col :span="24">
        <el-input v-model="deployForm.name" placeholder="请输入任务名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选择项目" prop="projects">
        <el-select v-model="deployForm.projects[-1]" placeholder="项目名称" @change="projectSelectionChange">
          <el-option v-for="project in deployForm.projects" :value="project.name"></el-option>
        </el-select>
        <el-select v-model="deployForm.branches[-1]" placeholder="项目分支" @change="branchSelectionChange">
          <el-option v-for="branch in deployForm.branches" :value="branch.name"></el-option>
        </el-select>
        <el-select v-model="deployForm.tags[-1]" placeholder="项目标签" @change="tagSelectionChange">
          <el-option v-for="tag in deployForm.tags" :value="tag.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="deployForm.date" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">---</el-col>
        <el-col :span="11">
          <el-form-item prop="time">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="deployForm.time" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="项目类型" prop="type">
        <el-col :span="24">
        <el-input v-model="deployForm.type" placeholder="请输入项目类型"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="配置文件" prop="configfile">
        <el-col :span="24">
        <el-input v-model="deployForm.configfile" placeholder="请输入配置文件"></el-input>
        </el-col>
      </el-form-item>
    <el-row>
      <el-col :span="11">
      <el-form-item label="选择环境" prop="env">
        <el-radio-group v-model="deployForm.env">
        <el-radio-button label="测试环境"></el-radio-button>
        <el-radio-button label="生产环境"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="PeriodDeploy">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  </el-col>
</el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deployForm: {
          name: '',
          projects: [],
          branches: [],
          tags: [],
          type: '',
          configfile: '',
          date: '',
          time: '',
          env: ''
        },
        deployRules: {
          name: [
            { required: true, message: '请输入任务', trigger: 'blur' }
          ],
          projects: [
            { required: true, message: '请选择项目', trigger: 'blur' }
          ],
          branches: [
            { required: true, message: '请选择分支', trigger: 'blur' }
          ],
          tags: [
            { required: true, message: '请选择标签', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请输入项目类型', trigger: 'blur' }
          ],
          configfile: [
            { required: true, message: '请输入配置文件路径', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          time: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          env: [
            { required: true, message: '请选择环境', trigger: 'blur' }
          ]
        },
        selectedproject: '',
        selectedbranch: '',
        selectedtag: '',
        msg: '',
      }
    },
    mounted() {
      this.getProject();
    },
    methods: {
      projectSelectionChange: function(val) {
          // console.log(val);
          this.selectedproject = val;
          this.getBranches(val);
          this.getTags(val);
      },
      branchSelectionChange: function(val) {
          // console.log(val);
          this.selectedbranch = val;
      },
      tagSelectionChange: function(val) {
          // console.log(val);
          this.selectedtag = val;
      },
      getProject: function() {
        var self = this;
        self.$http.post('/Interface/GetProjects').then((response) => {
          self.deployForm.projects = response.data.retdata;
        }).then(function(response) {
          console.log(response)
        });
      },
      getTags: function(project) {
        var self = this;
        self.$http.post('/Interface/GetTags', {
          project: project
        }).then((response) => {
          self.deployForm.tags = response.data.retdata;
          // console.log(response);
          // return tags
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      getBranches: function(project) {
        var self = this;
        self.$http.post('/Interface/GetBranchs', {
          project: project
        }).then((response) => {
           self.deployForm.branches = response.data.retdata;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      PeriodDeploy: function() {
        var self = this;
        var date = Date.parse(self.deployForm.date);
        var time = Date.parse(self.deployForm.time);
        var config = new Array();
        config_list = config.join(self.deployForm.configfile)
        self.$http.post('/Interface/PeriodDeploy', {
          name: self.deployForm.name,
          project: self.selectedproject,
      		branch: self.selectedbranch,
      		tag: self.selectedtag,
      		env: self.deployForm.env,
      		config: config_list,
          type: self.deployForm.type,
      		date: date,
          time: time
        }).then((response) => {
          var data = response.data;
          switch (data.retcode) {
            case 0:
              self.$message({
                'message': data.retmsg,
                'type': 'success'
              });
              break;
            default:
              self.$message({
                'message': data.retmsg,
                'type': 'error'
              });
          }
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
