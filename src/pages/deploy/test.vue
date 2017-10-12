<template>
<div>
  <el-button type="primary" v-on:click="login">接口测试</el-button>
</div>
</template>
<script>
export default {
  data() {
    return {
      data: ''
    }
  },
  methods: {
    login: function () {
      const url = 'http://127.0.0.1:8000/v1'

      this.axios.post(url + '/app/setting', {
        // tag: 'IrichSystem',
        app_id: 'JlI30Kjxc5pYbiGV',
        // chn_id: 'DbcMXzmk',
        // callback_url: 'http://127.0.0.1:8001/click?click_id={click_id}&revenue={revenue}',
        deduction: '0.2',
        divide: '1.0',
        // app_name: 'Vuetest',
        // pkg_name: 'com.vue.com',
        // category: 'other',
        // platform: 'ios',
        // url: '[]',
        // description: 'vue test',
        // passwd: 'admin'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'X-XSRFToken': '2|0949e95b|4d12312c8cfc8fb9351ee716f65940ed|1506075890',
          'tag': 'IrichSystem',
        }
      })
      .then((response) => {
        console.log(response);
      })
    },
  }
}
</script>
