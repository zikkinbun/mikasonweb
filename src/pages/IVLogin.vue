<template>
<div class="login">
    <div class="wrapper">
        <h1>Mikason运维平台</h1>
        <h2>Mikason Operation Management System</h2>
        <div class="login-inputBox">
            <Form ref="ruleForm2" :model="ruleForm2" :rules="rule" :label-width="0">
                <Form-item prop="account">
                    <Input type="text" size="large" v-model="ruleForm2.account" placeholder="账号">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item prop="checkPass">
                    <Input type="password" size="large" v-model="ruleForm2.checkPass" placeholder="密码">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                    </Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="getToken" long>登录</Button>
                </Form-item>
            </Form>
        </div>
    </div>
    <p class="copyright">
        <span class="version">系统版本：v1.0.0</span>
        <span>Copyright © Mikason.cn Mikason 版权所有</span>
    </p>
</div>
</template>

<script>
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

<style scoped>
h1,
h2 {
    font-weight: normal;
    color: #fff;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    background-color: #141a48;
    /*background-image: url("../assets/bg.png?v=1.0.0");*/
}

.wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 640px;
    height: 392px;
    margin: -220px 0 0 -320px;
}

.copyright {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: #fff;
    text-align: center;
}

.version {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #fff;
}

.logo {
    margin: 20px 0;
}

.login-inputBox {
    margin: 20px 20%;
    padding: 20px 20px 0;
    border-radius: 6px;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
    background-color: #fff;
    overflow: hidden;
}

.login-inputBox input {
    margin: 10px 0;
}
</style>
