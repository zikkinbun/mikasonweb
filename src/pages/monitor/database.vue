<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全量监测" name="first"></el-tab-pane>
    <el-tab-pane label="MySQL监测" name="second"></el-tab-pane>
    <el-tab-pane label="Mongo监测" name="third"></el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '全量监测'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
