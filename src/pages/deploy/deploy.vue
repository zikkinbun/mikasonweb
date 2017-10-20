<template>
  <div>
    <el-form :inline="true" :model="deployForm" ref="deployForm" :rules="deployRules">
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
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="deployForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="deployForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" v-on:click="pushTest" v-loading="loading1">提交测试</el-button>
        <el-button type="danger" v-on:click="pushProd" v-loading="loading2">提交生产</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deployForm: {
          projects: [],
          branches: [],
          tags: [],
          configfile: '',
          date1: '',
          date2: ''
        },
        deployRules: {
          projects: [
            { required: true, message: '请选择项目', trigger: 'blur' }
          ],
          branches: [
            { required: true, message: '请选择分支', trigger: 'blur' }
          ],
          tags: [
            { required: true, message: '请选择标签', trigger: 'blur' }
          ],
          configfile: [
            { required: true, message: '请输入配置文件路径', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
        },
        selectedproject: '',
        selectedbranch: '',
        selectedtag: '',
        msg: '',
        loading1: false,
        loading2: false,
        active: 0
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
      pushTest: function() {
        var self = this;
        let project = this.selectedproject;
        let branch = this.selectedbranch;
        let tag = this.selectedtag;
        self.loading1 = true;
        self.$http.post('/Interface/OneKeyDeployTest', {
          project: project,
          branch: branch,
          tag: tag,
          }).then((response) => {
          // return response.data
           self.msg = response.data;
           self.$alert(self.msg.retmsg, '发布情况', {
             confirmButtonText: '确定',
           });
           self.loading1 = false;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      pushProd: function() {
        var self = this;
        let project = this.selectedproject;
        let branch = this.selectedbranch;
        let tag = this.selectedtag;
        self.loading2 = true;
        self.$http.post('/Interface/OneKeyDeployProd', {
          project: project,
          branch: branch,
          tag: tag,
          }).then((response) => {
          // return response.data
           self.msg = response.data;
           self.$alert(self.msg.retdata, '发布情况', {
             confirmButtonText: '确定',
           });
           self.loading2 = false;
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
