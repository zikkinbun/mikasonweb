<template>
  <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="chart_gdrDev" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart_gdrTest" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart_gdrOper" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart_gdrSqlMt" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart_gdrSqlSl" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart_gdrWebProd" style="width:100%; height:400px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="chart_gdrRdProd" style="width:100%; height:400px;"></div>
            </el-col>
        </el-row>
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
        cpu_load_data: null,
      }
    },
    mounted () {
      // var _this = this;
      //基于准备好的dom，初始化echarts实例
      this.$nextTick(function() {
          this.drawGdrDevCpuLoadData();
          this.drawGdrTestCpuLoadData();
          this.drawGdrOperCpuLoadData();
          this.drawGdrSQLMtCpuLoadData();
          this.drawGdrSQLSlCpuLoadData();
          this.drawGdrWebPdCpuLoadData();
          this.drawGdrRDPdCpuLoadData()
      })
    },
    methods: {
      drawGdrDevCpuLoadData: function () {
        var avg1 = []
        var avg5 = []
        var avg15 = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.3')
        this.chart_gdrDev = echarts.init(document.getElementById('chart_gdrDev'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/cpuload/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.cpu_load_data = response.data;
          for (let data of this.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
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
              data:['avg1','avg5','avg15'],
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
                name:'avg1',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg1
              },
              {
                name:'avg5',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg5
              },
              {
                name:'avg15',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg15
              },
            ]
          })
        })
      },
      drawGdrTestCpuLoadData: function () {
        var avg1 = []
        var avg5 = []
        var avg15 = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.1')
        this.chart_gdrTest = echarts.init(document.getElementById('chart_gdrTest'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/cpuload/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.cpu_load_data = response.data;
          for (let data of this.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
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
              data:['avg1','avg5','avg15'],
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
                name:'avg1',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg1
              },
              {
                name:'avg5',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg5
              },
              {
                name:'avg15',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg15
              },
            ]
          })
        })
      },
      drawGdrOperCpuLoadData: function () {
        var avg1 = []
        var avg5 = []
        var avg15 = []
        var formData = new URLSearchParams();
        formData.append('hostip', '127.0.0.1')
        this.chart_gdrOper = echarts.init(document.getElementById('chart_gdrOper'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/cpuload/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.cpu_load_data = response.data;
          for (let data of this.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
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
              data:['avg1','avg5','avg15'],
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
                name:'avg1',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg1
              },
              {
                name:'avg5',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg5
              },
              {
                name:'avg15',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg15
              },
            ]
          })
        })
      },
      drawGdrSQLMtCpuLoadData: function () {
        var avg1 = []
        var avg5 = []
        var avg15 = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.9')
        this.chart_gdrSqlMt = echarts.init(document.getElementById('chart_gdrSqlMt'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/cpuload/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.cpu_load_data = response.data;
          for (let data of this.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
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
              data:['avg1','avg5','avg15'],
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
                name:'avg1',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg1
              },
              {
                name:'avg5',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg5
              },
              {
                name:'avg15',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg15
              },
            ]
          })
        })
      },
      drawGdrSQLSlCpuLoadData: function () {
        var avg1 = []
        var avg5 = []
        var avg15 = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.8')
        this.chart_gdrSqlSl = echarts.init(document.getElementById('chart_gdrSqlSl'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/cpuload/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.cpu_load_data = response.data;
          for (let data of this.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
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
              data:['avg1','avg5','avg15'],
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
                name:'avg1',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg1
              },
              {
                name:'avg5',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg5
              },
              {
                name:'avg15',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg15
              },
            ]
          })
        })
      },
      drawGdrWebPdCpuLoadData: function () {
        var avg1 = []
        var avg5 = []
        var avg15 = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.6')
        this.chart_gdrWebProd = echarts.init(document.getElementById('chart_gdrWebProd'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/cpuload/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.cpu_load_data = response.data;
          for (let data of this.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
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
              data:['avg1','avg5','avg15'],
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
                name:'avg1',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg1
              },
              {
                name:'avg5',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg5
              },
              {
                name:'avg15',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg15
              },
            ]
          })
        })
      },
      drawGdrRDPdCpuLoadData: function () {
        var avg1 = []
        var avg5 = []
        var avg15 = []
        var formData = new URLSearchParams();
        formData.append('hostip', '192.168.1.7')
        this.chart_gdrRdProd = echarts.init(document.getElementById('chart_gdrRdProd'));
        this.axios.post('http://operapi.uco2.com/zabbixapi/cpuload/', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.cpu_load_data = response.data;
          for (let data of this.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
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
              data:['avg1','avg5','avg15'],
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
                name:'avg1',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg1
              },
              {
                name:'avg5',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg5
              },
              {
                name:'avg15',
                type:'line',
                stack: '总量',
                areaStyle: {normal: {}},
                data: avg15
              },
            ]
          })
        })
      },
    },
  }
</script>
