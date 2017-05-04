<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="login-container">
    <h2 class="title">Mikason运维系统登录</h2>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click="getToken" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  // import { requestLogin } from '../api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        token: '',
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
						this.axios.post('http://operapi.uco2.com/user/login/', loginParams, {
							headers: {
								'Content-Type': 'application/x-www-form-urlencoded'}
						}).then((response, callback) => {
							let data = { code: response.data.retcode, user: response.data.retdata, msg: response.data.retmsg };
							if (data.code !== 0) {
								this.$message({
                  message: data.msg,
                  type: 'error'
                });
							} else {
								sessionStorage.setItem('user', JSON.stringify(data.user));
								this.$router.push({ path: '/table' });
							}
						});
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
      getToken(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            // var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
            var loginParams = new URLSearchParams();
            loginParams.append('username', this.ruleForm2.account)
            loginParams.append('password', this.ruleForm2.checkPass)
            this.axios.post('http://operapi.uco2.com/user/api-token-auth/', loginParams, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'}
              }).then((response, callback) => {
                if (response.status !== 200) {
                  this.$message({
                    message: response.data,
                    type: 'error'
                  });
                } else {
                  this.token = 'Token ' + response.data.token;
                  sessionStorage.setItem('token', JSON.stringify(this.token));
                  sessionStorage.setItem('user', JSON.stringify(this.ruleForm2.account));
                  this.$router.push({ path: '/table' });
                }
              });
            }
          });
        }
      }
    }
</script>
