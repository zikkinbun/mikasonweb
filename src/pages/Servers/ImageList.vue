<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.Name" placeholder="镜像"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getImages">查询</el-button>
				</el-form-item>
			</el-form>
    </el-col>
  <el-table
    :data="images"
    style="width: 100%"
    highlight-current-row>
    <el-table-column
      label="镜像ID"
      prop="imageId">
    </el-table-column>
    <el-table-column
      label="镜像名"
      prop="imageName">
    </el-table-column>
    <el-table-column
      label="创建时间"
      prop="createdate">
    </el-table-column>
    <el-table-column
      label="镜像大小"
      prop="size">
    </el-table-column>
  </el-table>
</section>
</template>

<script>
  export default {
    data () {
      return {
        images: [],
        selected: [],
        filters: {
					Name: ''
				},
      }
    },
    created () {
      this.getImages();
    },
    methods: {
      getImages: function () {
        var self = this;
        self.$http.post('/Interface/ImageList', {}).then((response) => {
          self.images = response.data.retdata;
        }).then(function(response) {
          console.log(response)
        });
      },
    }
  }
</script>

<style>

</style>
