<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left"
              label-width="0px"
              class="card-box login-form">
      <h3 class="title">Mikason运维平台</h3>
      <el-form-item prop="account">
        <span class="svg-container"><wscn-icon-svg icon-class="jiedianyoujian"/></span>
        <el-input name="account" type="text" v-model="ruleForm2.account" autoComplete="on"
                  placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <span class="svg-container"><wscn-icon-svg icon-class="mima"/></span>
          <el-input name="checkPass" type="password" @keyup.enter.native="getToken" v-model="ruleForm2.checkPass"
                         autoComplete="on" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="getToken">
                登录
          </el-button>
        </el-form-item>
    </el-form>
  </div>
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

<style rel="stylesheet/scss" lang="scss">
    @import "src/styles/mixin.scss";
    .tips{
      font-size: 14px;
      color: #fff;
      margin-bottom: 5px;
    }
    .login-container {
        @include relative;
        height: 100vh;
        background-color: #2d3a4b;
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }
        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        .forget-pwd {
            color: #fff;
        }
    }
</style>
