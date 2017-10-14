<template>
  <el-table
    :data="records"
    style="width: 100%"
    highlight-current-row>
    <el-table-column
      label="项目名"
      prop="project_name">
    </el-table-column>
    <el-table-column
      label="项目负责人"
      prop="project_owner">
    </el-table-column>
    <el-table-column
      label="项目类型"
      prop="project_type">
    </el-table-column>
    <el-table-column
      label="发布环境"
      prop="project_env">
    </el-table-column>
    <el-table-column
      label="分支"
      prop="deploy_branch">
    </el-table-column>
    <el-table-column
      label="标签"
      prop="deploy_tag">
    </el-table-column>
    <el-table-column
      label="状态"
      prop="deploy_status">
      <template scope="scope">
        <el-tag
          :type="scope.row.deploy_status === '成功' ? 'success' : 'danger'"
          close-transition>{{scope.row.deploy_status}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="备注"
      prop="comment">
    </el-table-column>
    <el-table-column
      label="发布时间"
      prop="deploy_time">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      records: [],
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData: function() {
      var self = this;
      self.$http.post('/Interface/GetRecords', {}).then((response) => {
        var data = response.data;
        switch (data.retcode) {
          case 0:
            self.records = data.retdata;
            break;
          default:
            self.$message({
              'message': data.retmsg,
              'type': 'error'
            });
        }
      });
    },
  }
}
</script>
<style scoped>
</style>
