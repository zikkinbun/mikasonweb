<template>
  <section class="chart-container">
        <Row>
            <i-col :span="12">
                <div id="chart_gdrDev" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chart_gdrTest" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chart_gdrOper" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chart_gdrSqlMt" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chart_gdrSqlSl" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chart_gdrWebProd" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chart_gdrRdProd" style="width:100%; height:400px;"></div>
            </i-col>
        </Row>
 </section>
</template>
<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        chart_gdrDev: null,
        chart_gdrTest: null,
        chart_gdrOper: null,
        chart_gdrSqlMt: null,
        chart_gdrSqlSl: null,
        chart_gdrWebProd: null,
        chart_gdrRdProd: null,
        mem_load_data: null,
      }
    },
    mounted () {
      // var _this = this;
      //基于准备好的dom，初始化echarts实例
      this.$nextTick(function() {
          this.drawGdrDevMemStatData();
          this.drawGdrTestMemStatData();
          this.drawGdrOperMemStatData();
          this.drawGdrSQLMtMemStatData();
          this.drawGdrSQLSlMemStatData();
          this.drawGdrWebPdMemStatData();
          this.drawGdrRDPdMemStatData();
      })
    },
    methods: {
      drawGdrDevMemStatData: function () {
        var available = []
        var total = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.3')
        this.chart_gdrDev = echarts.init(document.getElementById('chart_gdrDev'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/memstat/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.mem_load_data = response.data;
          for (let data of this.mem_load_data) {
            available.push(data.available);
            total.push(data.total);
          };
          this.chart_gdrDev.setOption({
            title: {
              text: 'gdr_dev',
              textStyle: {
                fontWeight: 'lighter',
                fontSize: 14,
              },
              left: '10%',
              bottom: '90%'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['available','total'],
              bottom: '90%'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['0','1','2','3','4','5','6','7','8','9']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'available',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: available
              },
              {
                name:'total',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: total
              },
            ]
          })
        })
      },
      drawGdrTestMemStatData: function () {
        var available = []
        var total = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.1')
        this.chart_gdrTest = echarts.init(document.getElementById('chart_gdrTest'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/memstat/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.mem_load_data = response.data;
          for (let data of this.mem_load_data) {
            available.push(data.available);
            total.push(data.total);
          };
          this.chart_gdrTest.setOption({
            title: {
              text: 'gdr_test',
              textStyle: {
                fontWeight: 'lighter',
                fontSize: 14,
              },
              left: '10%',
              bottom: '90%'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['available','total'],
              bottom: '90%'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['0','1','2','3','4','5','6','7','8','9']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'available',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: available
              },
              {
                name:'total',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: total
              },
            ]
          })
        })
      },
      drawGdrOperMemStatData: function () {
        var available = []
        var total = []
        var formData = new URLSearchParams();
        formData.append('hostip', '127.0.0.1')
        this.chart_gdrOper = echarts.init(document.getElementById('chart_gdrOper'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/memstat/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.mem_load_data = response.data;
          for (let data of this.mem_load_data) {
            available.push(data.available);
            total.push(data.total);
          };
          this.chart_gdrOper.setOption({
            title: {
              text: 'gdr_oper',
              textStyle: {
                fontWeight: 'lighter',
                fontSize: 14,
              },
              left: '10%',
              bottom: '90%'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['available','total'],
              bottom: '90%'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['0','1','2','3','4','5','6','7','8','9']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'available',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: available
              },
              {
                name:'total',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: total
              },
            ]
          })
        })
      },
      drawGdrSQLMtMemStatData: function () {
        var available = []
        var total = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.9')
        this.chart_gdrSqlMt = echarts.init(document.getElementById('chart_gdrSqlMt'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/memstat/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.mem_load_data = response.data;
          for (let data of this.mem_load_data) {
            available.push(data.available);
            total.push(data.total);
          };
          this.chart_gdrSqlMt.setOption({
            title: {
              text: 'gdr_sql_mt',
              textStyle: {
                fontWeight: 'lighter',
                fontSize: 14,
              },
              left: '10%',
              bottom: '90%'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['available','total'],
              bottom: '90%'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['0','1','2','3','4','5','6','7','8','9']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'available',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: available
              },
              {
                name:'total',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: total
              },
            ]
          })
        })
      },
      drawGdrSQLSlMemStatData: function () {
        var available = []
        var total = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.8')
        this.chart_gdrSqlSl = echarts.init(document.getElementById('chart_gdrSqlSl'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/memstat/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.mem_load_data = response.data;
          for (let data of this.mem_load_data) {
            available.push(data.available);
            total.push(data.total);
          };
          this.chart_gdrSqlSl.setOption({
            title: {
              text: 'gdr_sql_sl',
              textStyle: {
                fontWeight: 'lighter',
                fontSize: 14,
              },
              left: '10%',
              bottom: '90%'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['available','total'],
              bottom: '90%'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['0','1','2','3','4','5','6','7','8','9']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'available',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: available
              },
              {
                name:'total',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: total
              },
            ]
          })
        })
      },
      drawGdrWebPdMemStatData: function () {
        var available = []
        var total = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.6')
        this.chart_gdrWebProd = echarts.init(document.getElementById('chart_gdrWebProd'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/memstat/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.mem_load_data = response.data;
          for (let data of this.mem_load_data) {
            available.push(data.available);
            total.push(data.total);
          };
          this.chart_gdrWebProd.setOption({
            title: {
              text: 'gdr_web_prod_1001',
              textStyle: {
                fontWeight: 'lighter',
                fontSize: 14,
              },
              left: '10%',
              bottom: '90%'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['available','total'],
              bottom: '90%'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['0','1','2','3','4','5','6','7','8','9']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'available',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: available
              },
              {
                name:'total',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: total
              },
            ]
          })
        })
      },
      drawGdrRDPdMemStatData: function () {
        var available = []
        var total = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.7')
        this.chart_gdrRdProd = echarts.init(document.getElementById('chart_gdrRdProd'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/memstat/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.mem_load_data = response.data;
          for (let data of this.mem_load_data) {
            available.push(data.available);
            total.push(data.total);
          };
          this.chart_gdrRdProd.setOption({
            title: {
              text: 'gdr_rd_prod',
              textStyle: {
                fontWeight: 'lighter',
                fontSize: 14,
              },
              left: '10%',
              bottom: '90%'
            },
            tooltip : {
              trigger: 'axis'
            },
            legend: {
              data:['available','total'],
              bottom: '90%'
            },
            calculable : true,
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                data : ['0','1','2','3','4','5','6','7','8','9']
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'available',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: available
              },
              {
                name:'total',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: total
              },
            ]
          })
        })
      },
    },
  }
</script>
