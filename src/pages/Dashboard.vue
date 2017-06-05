<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
    <Row type="flex">
        <i-col :span="spanLeft" class="layout-menu-left">
            <Menu :active-name="routerName" theme="dark" width="auto" @on-select="select">
                <div class="layout-logo-left">
                    <img src="../assets/logo.png?v=1.0.0" height="100%">
                </div>
                <Menu-item name="profile">
                    <Icon type="ios-settings-strong" :size="iconSize"></Icon>
                    <span class="layout-text">运营信息</span>
                </Menu-item>
                <Menu-item name="order">
                    <Icon type="ios-paper" :size="iconSize"></Icon>
                    <span class="layout-text">服务订单管理</span>
                </Menu-item>
                <Menu-item name="product">
                    <Icon type="ios-analytics" :size="iconSize"></Icon>
                    <span class="layout-text">产品管理</span>
                </Menu-item>
            </Menu>
            <div class="layout-copy">
                2016-2017 &copy; UCO2.COM
            </div>
        </i-col>
        <i-col :span="spanRight" class="layout-main">
            <div class="layout-header">
                <div class="welcome">
                    <span v-if="userName">{{userName}}，</span>
                    <span>欢迎使用优碳网服务商中心！</span>
                    <span style="padding-left: 10px;">
                      <Button type="ghost" icon="key" size="small" style="margin-right: 5px;" @click="changePsw">修改密码</Button>
                      <Button type="ghost" icon="log-out" size="small" @click="logout">退出登录</Button>
                    </span>
                </div>
                <i-button type="text" @click="toggleClick" style="margin-top: 10px">
                    <Icon type="arrow-swap" size="24"></Icon>
                </i-button>
            </div>
            <div class="layout-content">
                <div class="layout-content-main">
                    <router-view></router-view>
                </div>
            </div>
        </i-col>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: JSON.parse(sessionStorage.getItem('user')),
        spanLeft: 4,
        spanRight: 20,
        // routerName: router.app.$route.name || 'main'
      }
    },
    computed: {
      iconSize() {
          return this.spanLeft === 4 ? 14 : 24;
        }
      },
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
        },
        toggleClick() {
          if (this.spanLeft === 4) {
            this.spanLeft = 2;
            this.spanRight = 22;
          } else {
            this.spanLeft = 4;
            this.spanRight = 20;
          }
        },
        select(name) {
          router.push({
            name: name
          });
        },
      }
    }
</script>

<style>
.layout {
    background: #f5f7f9;
    position: absolute;
    width: 100%;
    height: 100%;
}

.layout-breadcrumb {
    padding: 10px 15px 0;
}

.layout-copy {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}

.layout-menu-left {
    background: #464c5b;
}

.layout-main {
    overflow: auto;
}

.layout-hide-text .layout-menu-left {
    text-align: center;
}

.layout-header {
    position: fixed;
    width: 100%;
    z-index: 10;
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.welcome {
    position: fixed;
    right: 20px;
    top: 18px;
}

.layout-logo-left {
    width: 90%;
    height: 30px;
    border-radius: 3px;
    margin: 15px auto;
    text-align: center;
}

.layout-content {
    min-height: 200px;
    margin: 75px 15px 15px;
    background: #fff;
    border-radius: 4px;
}

.layout-content-main {
    padding: 20px;
}

.layout-ceiling-main a {
    color: #9ba7b5;
}

.layout-hide-text .layout-text {
    display: none;
}

.ivu-col {
    position: relative;
    transition: width .2s ease-in-out;
}

.ivu-row-flex {
    height: 100%;
}

.itemClassTitle {
    margin: 20px 0;
    position: relative;
    font-weight: 500;
    color: #39f;
}

.itemClassTitle:before {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #eee;
    position: absolute;
    top: 10px;
    left: 0;
}

.itemClassTitle span {
    display: inline-block;
    background: #fff;
    padding: 0 20px;
    position: relative;
    margin-left: 100px;
    font-size: 14px;
}
</style>
