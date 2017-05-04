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
        this.axios.get('http://operapi.uco2.com/api/getproject/').then((response) => {
          this.projects = response.data;
        }).then(function(response) {
          console.log(response)
        });
      },
      getTags: function(id) {
        this.axios.post('http://operapi.uco2.com/api/gettags/', {
          project_id: id},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
          this.tags = response.data;
          // console.log(response);
          // return tags
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      getBranches: function(id) {
        this.axios.post('http://operapi.uco2.com/api/getbranches/', {
          project_id: id},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
           this.branches = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      pushTest: function() {
        let project = this.selectedproject;
        let branch = this.selectedbranch;
        let tag = this.selectedtag;
        this.loading1 = true;
        this.axios.post('http://112.74.164.242:8010/api/pushTest/', {
          project: project,
          branch: branch,
          tag: tag,
          },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
          // return response.data
           this.msg = response.data;
           this.$alert(this.msg.retdata, '发布情况', {
             confirmButtonText: '确定',
           });
           this.loading1 = false;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      pushProd: function() {
        let project = this.selectedproject;
        let branch = this.selectedbranch;
        let tag = this.selectedtag;
        this.loading2 = true;
        this.axios.post('http://112.74.164.242:8010/api/pushProd/', {
          project: project,
          branch: branch,
          tag: tag,
          },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
          // return response.data
           this.msg = response.data;
           this.$alert(this.msg.retdata, '发布情况', {
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
