<template>
  <el-row class="top-bar">
    <div class="top-wrapper">
      <div class="user-area pull-right">
        <div class="user-avatar">
          <span class="avatar-img" :style="{ backgroundImage: 'url(' + avatar_url + ')' }"></span>
          <i class="el-icon-arrow-down"></i>
          <div class="drop-menu">
            <ul>
              <li><i class="iconfont">&#xe603;</i>{{ user }}</li>
              <li @click="signOut"><i class="iconfont">&#xe602;</i>退出</li>
            </ul>
          </div>
        </div>
      </div>
      <el-col :span="8" class="search-area pull-right">
        <el-form>
          <el-form-item>
            <i class="el-icon-search"></i>
            <el-input placeholder="搜索"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </div>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        avatar_url: '',
        user: JSON.parse(sessionStorage.getItem('user'))
      }
    },
    // computed: {
    //   user () {
    //     return this.$store.state.user
    //   }
    // },
    methods: {
      signOut () {
        var _this = this;
				this.$confirm('确认退出吗?', '提示', {
				}).then(() => {
					sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
					_this.$router.push('/login');
				}).catch(() => {
				});
      }
    }
  }
</script>
