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
        var self = this;
        var avg1 = []
        var avg5 = []
        var avg15 = []
        self.chart_gdrDev = echarts.init(document.getElementById('chart_gdrDev'));
        self.$http.post('/Interface/queryCpuLoadByIp', {
          hostip: '192.168.1.211'
        }).then((response) => {
          self.cpu_load_data = response.data.retdata;
          for (let data of self.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
          };
          self.chart_gdrDev.setOption({
            title: {
                text: 'uco2_dev',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['avg1', 'avg5', 'avg15'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },

            grid: [{
                left: 40,
                right: 40,
            }, {
                left: 40,
                right: 40,
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: true
                },
                data:  (function (){
                  var now = new Date();
                  var res = [];
                  var len = 10;
                  while (len--) {
                      res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                      now = new Date(now - 2000);
                    }
                    return res;
                })()
            }, {
                gridIndex: 1
            }],

            yAxis: [{

                type: 'value',
                name: '使用量:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg1
            },{
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg5
            },{
                name: '',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg15
            }]
          })
        })
      },
      drawGdrTestCpuLoadData: function () {
        var self = this;
        var avg1 = []
        var avg5 = []
        var avg15 = []
        self.chart_gdrTest = echarts.init(document.getElementById('chart_gdrTest'));
        self.$http.post('/Interface/queryCpuLoadByIp', {
          hostip: '192.168.1.209'
        }).then((response) => {
          self.cpu_load_data = response.data.retdata;
          for (let data of self.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
          };
          self.chart_gdrTest.setOption({
            title: {
                text: 'uco2_test',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['avg1', 'avg5', 'avg15'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },

            grid: [{
                left: 40,
                right: 40,
            }, {
                left: 40,
                right: 40,
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: true
                },
                data:  (function (){
                  var now = new Date();
                  var res = [];
                  var len = 10;
                  while (len--) {
                      res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                      now = new Date(now - 2000);
                    }
                    return res;
                })()
            }, {
                gridIndex: 1
            }],

            yAxis: [{

                type: 'value',
                name: '使用量:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: 'avg1',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg1
            },{
                name: 'avg5',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg5
            },{
                name: 'avg15',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg15
            }]
          })
        })
      },
      drawGdrOperCpuLoadData: function () {
        var self = this;
        var avg1 = []
        var avg5 = []
        var avg15 = []
        self.chart_gdrOper = echarts.init(document.getElementById('chart_gdrOper'));
        self.$http.post('/Interface/queryCpuLoadByIp', {
          hostip: '127.0.0.1'
        }).then((response) => {
          self.cpu_load_data = response.data.retdata;
          for (let data of self.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
          };
          self.chart_gdrOper.setOption({
            title: {
                text: 'uco2_oper',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['avg1', 'avg5', 'avg15'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },

            grid: [{
                left: 40,
                right: 40,
            }, {
                left: 40,
                right: 40,
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: true
                },
                data:  (function (){
                  var now = new Date();
                  var res = [];
                  var len = 10;
                  while (len--) {
                      res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                      now = new Date(now - 2000);
                    }
                    return res;
                })()
            }, {
                gridIndex: 1
            }],

            yAxis: [{

                type: 'value',
                name: '使用量:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: 'avg1',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg1
            },{
                name: 'avg5',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg5
            },{
                name: 'avg15',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg15
            }]
          })
        })
      },
      drawGdrSQLMtCpuLoadData: function () {
        var self = this;
        var avg1 = []
        var avg5 = []
        var avg15 = []
        self.chart_gdrSqlMt = echarts.init(document.getElementById('chart_gdrSqlMt'));
        self.$http.post('/Interface/queryCpuLoadByIp', {
          hostip: '192.168.1.214'
        }).then((response) => {
          self.cpu_load_data = response.data.retdata;
          for (let data of self.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
          };
          self.chart_gdrSqlMt.setOption({
            title: {
                text: 'uco2_sql_mt',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['avg1', 'avg5', 'avg15'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },

            grid: [{
                left: 40,
                right: 40,
            }, {
                left: 40,
                right: 40,
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: true
                },
                data:  (function (){
                  var now = new Date();
                  var res = [];
                  var len = 10;
                  while (len--) {
                      res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                      now = new Date(now - 2000);
                    }
                    return res;
                })()
            }, {
                gridIndex: 1
            }],

            yAxis: [{

                type: 'value',
                name: '使用量:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: 'avg1',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg1
            },{
                name: 'avg5',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg5
            },{
                name: 'avg15',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg15
            }]
          })
        })
      },
      drawGdrSQLSlCpuLoadData: function () {
        var self = this;
        var avg1 = []
        var avg5 = []
        var avg15 = []
        self.chart_gdrSqlSl = echarts.init(document.getElementById('chart_gdrSqlSl'));
        self.$http.post('/Interface/queryCpuLoadByIp', {
          hostip: '192.168.1.215'
        }).then((response) => {
          self.cpu_load_data = response.data.retdata;
          for (let data of self.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
          };
          self.chart_gdrSqlSl.setOption({
            title: {
                text: 'uco2_sql_sl',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['avg1', 'avg5', 'avg15'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },

            grid: [{
                left: 40,
                right: 40,
            }, {
                left: 40,
                right: 40,
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: true
                },
                data:  (function (){
                  var now = new Date();
                  var res = [];
                  var len = 10;
                  while (len--) {
                      res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                      now = new Date(now - 2000);
                    }
                    return res;
                })()
            }, {
                gridIndex: 1
            }],

            yAxis: [{

                type: 'value',
                name: '使用量:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: 'avg1',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg1
            },{
                name: 'avg5',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg5
            },{
                name: 'avg15',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg15
            }]
          })
        })
      },
      drawGdrWebPdCpuLoadData: function () {
        var self = this;
        var avg1 = []
        var avg5 = []
        var avg15 = []
        self.chart_gdrWebProd = echarts.init(document.getElementById('chart_gdrWebProd'));
        self.$http.post('/Interface/queryCpuLoadByIp', {
          hostip: '192.168.1.212'
        }).then((response) => {
          self.cpu_load_data = response.data.retdata;
          for (let data of self.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
          };
          self.chart_gdrWebProd.setOption({
            title: {
                text: 'uco2_web_prod',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['avg1', 'avg5', 'avg15'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },

            grid: [{
                left: 40,
                right: 40,
            }, {
                left: 40,
                right: 40,
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: true
                },
                data:  (function (){
                  var now = new Date();
                  var res = [];
                  var len = 10;
                  while (len--) {
                      res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                      now = new Date(now - 2000);
                    }
                    return res;
                })()
            }, {
                gridIndex: 1
            }],

            yAxis: [{

                type: 'value',
                name: '使用量:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: 'avg1',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg1
            },{
                name: 'avg5',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg5
            },{
                name: 'avg15',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg15
            }]
          })
        })
      },
      drawGdrRDPdCpuLoadData: function () {
        var self = this;
        var avg1 = []
        var avg5 = []
        var avg15 = []
        self.chart_gdrRdProd = echarts.init(document.getElementById('chart_gdrRdProd'));
        self.$http.post('/Interface/queryCpuLoadByIp', {
          hostip: '192.168.1.213'
        }).then((response) => {
          self.cpu_load_data = response.data.retdata;
          for (let data of self.cpu_load_data) {
            avg1.push(data.avg1);
            avg5.push(data.avg5);
            avg15.push(data.avg15);
          };
          self.chart_gdrRdProd.setOption({
            title: {
                text: 'uco2_rd_prod',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['avg1', 'avg5', 'avg15'],
                x: 'left'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            axisPointer: {
                link: {
                    xAxisIndex: 'all'
                }
            },

            grid: [{
                left: 40,
                right: 40,
            }, {
                left: 40,
                right: 40,
            }],
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    onZero: true
                },
                data:  (function (){
                  var now = new Date();
                  var res = [];
                  var len = 10;
                  while (len--) {
                      res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                      now = new Date(now - 2000);
                    }
                    return res;
                })()
            }, {
                gridIndex: 1
            }],

            yAxis: [{

                type: 'value',
                name: '使用量:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: 'avg1',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg1
            },{
                name: 'avg5',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg5
            },{
                name: 'avg15',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 9,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: avg15
            }]
          })
        })
      },
    },
  }
</script>
