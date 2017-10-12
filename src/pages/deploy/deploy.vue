<template>
  <div>
    <el-row :gutter="20" type="flex" class="row-bg">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-select size="small" class="selectedProject" v-model="selectedproject">
            <el-option v-for="project in projects" :value="project.name">{{ project.name }}</el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-select size="small" class="selectedBrance" v-model="selectedbranch">
            <el-option v-for="branch in branches" :value="branch.name">{{ branch.name }}</el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-select size="small" class="selectedTag" v-model="selectedtag">
            <el-option v-for="tag in tags" :value="tag.name">{{ tag.name }}</el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" class="row-btn">
      <el-col :span="2" :push="5">
        <el-button type="primary" v-on:click="pushTest" v-loading="loading1">提交测试</el-button>
      </el-col>
      <el-col :span="2" :push="6">
        <el-button type="primary" v-on:click="pushProd" v-loading="loading2">提交生产</el-button>
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
        projects: [],
        branches: [],
        tags: [],
        selectedproject: '',
        selectedbranch: '',
        selectedtag: '',
        msg: '',
        loading1: false,
        loading2: false,
        active: 0
      }
    },
    created() {
      this.getProject();
    },
    watch: {
      'selectedproject': function (val) {
        for (var i=0;i<this.projects.length;i++) {
          if (this.projects[i].name === val) {
            this.getTags(this.projects[i].id);
            this.getBranches(this.projects[i].id);
          }
        }
      },
    },
    methods: {
      getProject: function() {
        var self = this;
        self.$http.post('/Interface/GetProjects').then((response) => {
          self.projects = response.data.retdata;
        }).then(function(response) {
          console.log(response)
        });
      },
      getTags: function(id) {
        var self = this;
        self.$http.post('/Interface/GetTags', {
          project_id: id
        }).then((response) => {
          self.tags = response.data.retdata;
          // console.log(response);
          // return tags
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      getBranches: function(id) {
        var self = this;
        self.$http.post('/Interface/GetBranchs', {
          project_id: id
        }).then((response) => {
           self.branches = response.data.retdata;
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
           this.loading2 = false;
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
