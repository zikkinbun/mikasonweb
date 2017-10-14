<template>
  <div>
    <el-row :gutter="20" type="flex" class="row-bg">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="deployForm" ref="deployForm">
          <el-form-item label="项目名称" prop="projects">
            <el-select v-model="deployForm.projects[-1]" placeholder="项目" @change="projectSelectionChange">
              <el-option v-for="project in deployForm.projects" :value="project.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所选分支" prop="branches">
            <el-select v-model="deployForm.branches[-1]" placeholder="项目" @change="branchSelectionChange">
              <el-option v-for="branch in deployForm.branches" :value="branch.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所选标签" prop="projects">
            <el-select v-model="deployForm.tags[-1]" placeholder="项目" @change="tagSelectionChange">
              <el-option v-for="tag in deployForm.tags" :value="tag.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="pushTest" v-loading="loading1">提交测试</el-button>
            <el-button type="primary" v-on:click="pushProd" v-loading="loading2">提交生产</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex">
      <el-col :span="10">
        <el-steps :space="100" :active="active" finish-status="success">
          <el-step title="目录克隆"></el-step>
          <el-step title="移动目录"></el-step>
          <el-step title="打包目录"></el-step>
          <el-step title="上传目录"></el-step>
          <el-step title="配置文件初始化"></el-step>
          <el-step title="运行目录配置"></el-step>
          <el-step title="初始化并启动项目"></el-step>
        </el-steps>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        deployForm: {
          projects: [],
          branches: [],
          tags: []
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
