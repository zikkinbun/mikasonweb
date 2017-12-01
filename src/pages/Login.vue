<template>
  <div class="login-container">
    <el-form autoComplete="on" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left"
              label-width="0px"
              class="card-box login-form">
      <h3 class="title">Mikason运维管理平台</h3>
      <el-form-item prop="account">
        <span class="svg-container"></span>
        <el-input name="account" type="text" v-model="ruleForm2.account" autoComplete="on"
                  placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <span class="svg-container"></span>
          <el-input name="checkPass" type="password" @keyup.enter.native="handleSubmit2" v-model="ruleForm2.checkPass"
                         autoComplete="on" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleSubmit2">
                登录
          </el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import router from "../router";

  export default {
    name: "login",
    data() {
      return {
        token: '',
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        loading: false,
        rules2: {
          account: [
            { required: true,
              message: '请输入账号',
              trigger: 'blur'
            }],
          checkPass: [
            { required: true,
              message: '请输入密码',
              trigger: 'blur'
            }]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2() {
        var self = this;
        self.$refs.ruleForm2.validate(function(valid) {
          if (valid) {
            var loginParams = { username: self.ruleForm2.account, password: self.ruleForm2.checkPass };
            self.$http.post('/Interface/getToken', loginParams).then(function(response) {
              switch (response.status) {
                case 200:
                  self.token = 'Token ' + response.data.token;
                  sessionStorage.setItem('token', JSON.stringify(self.token));
                  self.$http.post('/Interface/login', loginParams).then(function(response) {
                    var data = response.data;
                    switch (data.retcode) {
                      case 0:
                        router.replace({
                          name: 'dashboard'
                        });
                        break;
                      case 1:
                        self.$message.error(data.retmsg);
                      default:
                        self.$message.error(data.retmsg);
                    }
                  });
              }
            })
					} else {
						self.$message.error("表单验证失败！");
					}
				});
			},
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
        background-color: #545c64;;
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
