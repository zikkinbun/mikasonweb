<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="快速执行" name="first">
        <!-- <div class="form"> -->
        <el-row>
          <el-col :span="24">
          <el-form　ref="form" :model="form" :label-width="80">
            <el-form-item label="脚本名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入脚本名称">
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        </el-row>
        <!-- </div> -->
      </el-tab-pane>
      <el-tab-pane label="数据同步" name="second">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        activeName: 'first',
        form: {
          'name': '',
          'user': '',
          'target': '',
          'data': '',
          'params': ''
        },
      }
    }
  }
</script>
