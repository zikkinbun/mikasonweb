<template>
  <div class="release">
    <el-select size="small" class="selectedProject" v-model="selectedproject">
      <el-option v-for="project in projects" :value="project.name">{{ project.name }}</el-option>
    </el-select>
    <el-select size="small" class="selectedBrance" v-model="selectedbranch">
      <el-option v-for="branch in branches" :value="branch.name">{{ branch.name }}</el-option>
    </el-select>
    <el-select size="small" class="selectedTag" v-model="selectedtag">
      <el-option v-for="tag in tags" :value="tag.name">{{ tag.name }}</el-option>
    </el-select>
    <br><br>
    <div class="pushbottun">
      <el-button type="primary" v-on:click="pushTest">提交测试</el-button>
      <el-button type="primary" v-on:click="pushProd">提交生产</el-button>
    </div>
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
        this.axios.get('http://127.0.0.1:8000/api/getproject/').then((response) => {
          this.projects = response.data;
        }).then(function(response) {
          console.log(response)
        });
      },
      getTags: function(id) {
        this.axios.post('http://127.0.0.1:8000/api/gettags/', {
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
        this.axios.post('http://127.0.0.1:8000/api/getbranches/', {
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
        this.axios.post('http://127.0.0.1:8000/api/pushTest/', {
          project: project,
          branch: branch,
          tag: tag,
          },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
           return response.data
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      pushProd: function() {
        let project = this.selectedproject;
        let branch = this.selectedbranch;
        let tag = this.selectedtag;
        this.axios.post('http://127.0.0.1:8000/api/pushProd/', {
          project: project,
          branch: branch,
          tag: tag,
          },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .then((response) => {
           return response.data
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>
<style scoped>
.release {
  position: absolute;
}
.pushbottun {
  margin:0 auto;
  width:40%;
  height:90%;
  display:block;
}
</style>
