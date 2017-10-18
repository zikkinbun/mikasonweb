<template>
  <section>
    <el-row :gutter="24" type="flex">
      <el-col :span="6">
          <div id="chartUptime" style="width:380px; height:300px;"></div>
      </el-col>
      <el-col :span="6">
          <div id="chartProc" style="width:380px; height:300px;"></div>
      </el-col>
      <el-col :span="6">
          <div id="chartRequest" style="width:380px; height:300px;"></div>
      </el-col>
      <el-col :span="6">
          <div id="chartIPRegion" style="width:380px; height:300px;"></div>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="18">
        <div id="chartDiff" style="width:80%; height:400px; float:left; margin:30px 0px 30px 0px;"></div>
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>
    <el-row :gutter="32" type="flex">
      <el-col :span="18">
        <div id="chartRequestTCPIP" style="width:80%; height:400px; float:left; margin:30px 0px 30px 0px;"></div>
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>
</section>
</template>
<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        chartUptime: null,
        chartProc: null,
        chartRequest: null,
        chartRequestTCPIP: null,
        chartNetLoad: null,
        proc_data: null,
        uptime_data: null,
      }
    },
    mounted () {
      //基于准备好的dom，初始化echarts实例
      this.$nextTick(function() {
          this.drawUptime();
          this.drawProcess();
          this.drawRequestNum();
          this.drawIPRegion();
          this.drawRequestTCPIP();
          this.drawDiff();
      })
    },
    methods: {
      drawUptime: function () {
        var self = this;
        self.chartUptime = echarts.init(document.getElementById('chartUptime'));
        self.$http.post('/Interface/queryUpTime', {
        }).then((response) => {
          self.uptime_data = response.data.retdata;
          self.chartUptime.setOption({
            
            title: {
              x: 'center',
              text: '在线时间',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
            },
           },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'none'
              },
              formatter: function (params) {
                return params[0].name + ': ' + params[0].value;
              }
            },
            xAxis: {
              data: ['uco2_dev', 'uco2_test', 'uco2_rd_prod', 'uco2_sql_mt', 'uco2_sql_sl', 'uco2_web_prod', 'uco2_oper', ],
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel: {
                textStyle: {
                  color: '#e54035'
                }
              }
            },
            yAxis: {
              splitLine: {show: false},
              axisTick: {show: false},
              axisLine: {show: false},
              axisLabel: {show: false}
            },
            color: ['#e54035'],
            series: [{
              name: 'hill',
              type: 'pictorialBar',
              barCategoryGap: '-130%',
              symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
              itemStyle: {
                normal: {
                  opacity: 0.5
                },
                emphasis: {
                  opacity: 1
                }
              },
              data: self.uptime_data,
              z: 10
            }]
          });
        });
      },
      drawProcess: function () {
        var self = this;
        self.chartProc = echarts.init(document.getElementById('chartProc'));
        self.$http.post('/Interface/queryRunProcess', {
        }).then((response) => {
          self.proc_data = response.data.retdata;
          self.chartProc.setOption({
            
            title: {
              x: 'center',
              text: '运行进程数',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
              },
            },
            tooltip: {
              trigger: 'item'
            },
            calculable: true,
            grid: {
              borderWidth: 0,
              y: 70,
              y2: 60
            },
            xAxis: [
              {
                type: 'category',
                show: false,
                data: ['uco2_dev', 'uco2_test', 'uco2_rd_prod', 'uco2_sql_mt', 'uco2_sql_sl', 'uco2_web_prod', 'uco2_oper'],//['Line', 'Bar', 'Scatter', 'K', 'Pie', 'Radar', 'Chord', 'Force', 'Map', 'Gauge', 'Funnel']
              }
            ],
            yAxis: [
              {
                type: 'value',
                show: false
              }
            ],
            series: [
              {
                name: '运行进程数',
                type: 'bar',
                itemStyle: {
                  normal: {
                    color: function(params) {
                    // build a color map as your need.
                      var colorList = [
                        '#C1232B','#FCCE10','#E87C25','#60C0DD','#27727B',
                        '#FE8463','#9BCA63','#FAD860','#F3A43B', '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
                      ];
                      return colorList[params.dataIndex]
                    },
                  }
                },
                data: self.proc_data,
              }
            ]
          });
        });
      },
      drawRequestNum: function() {
        var self = this;
        var colors = ['#d73435', '#f5317f', '#d75000','#ffbf00','#0e77ca','#6252cd','#00924c'];
        self.chartRequest = echarts.init(document.getElementById('chartRequest'));
        self.$http.post('/Interface/queryRunProcess', {
        }).then((response) => {
          self.proc_data = response.data.retdata;
          self.chartRequest.setOption({
            
            color: colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right: '20%'
            },
            legend: {
                data:['Mbps','count','count']
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: ['01:00','02:00','03:00','04:00','05:00','06:00'
                    ,'07:00','08:00','09:00','10:00','11:00','12:00']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Mbps',
                    min: 0,
                    max: 230,
                    position: 'left',
                    nameLocation:"middle",
                    axisLine: {
                        lineStyle: {
                            color: "#6252cd"
                        }
                    },
                    axisLabel: {
                        formatter: '{value} Mbps'
                    }
                },
                {
                    type: 'value',
                    name: 'count',
                    min: 0,
                    max: 150,
                    position: 'left',
                    offset: 80,
                    nameGap:-30,
                    nameLocation:"middle",
                    axisLine: {
                        lineStyle: {
                            color:"#f5317f"
                        }
                    },
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'ms',
                    min: 0,
                    max: 1000,
                    position: 'right',
                    nameLocation:"middle",
                    axisLine: {
                        lineStyle: {
                            color: "#00924c"
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ms'
                    }
                }
            ],
            series: [
                {
                    name:'5G WLAN Bandwidth',
                    type:'line',
                    yAxisIndex: 0,
                    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                },
                {
                    name:'5G WLAN Traffic Used',
                    type:'line',
                    yAxisIndex: 0,
                    data:[5.6, 1.9, 8.0, 20.4, 18.7, 50.7, 185.6, 200.2, 50.7, 10.8, 16.0, 5.3]
                },
                {
                    name:'2.4G WLAN Bandwidth',
                    type:'line',
                    yAxisIndex: 0,
                    data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name:'2.4G WLAN Traffic Used',
                    type:'line',
                    yAxisIndex: 0,
                    data:[4.6, 10.9, 19.0, 30.4, 38.7, 100.7, 195.6, 212.2, 88.7, 28.8, 26.0, 20.3]
                },
                {
                    name:'Roams',
                    type:'line',
                    yAxisIndex: 1,
                    data:[30,43,45,63,75,86,89,90,92,93,95,100]
                },
                {
                    name:'Band Steers',
                    type:'line',
                    yAxisIndex: 1,
                    data:[19,30,48,50,60,70,75,80,83,88,98,135]
                },
                {
                    name:'',
                    type:'line',
                    yAxisIndex: 2,
                    data:[500,689,846,573,492,674,500,467,674,973,285,985]
                }
            ]
          })
        });
      },
      drawIPRegion: function() {
        var self = this;
        self.chartIPRegion = echarts.init(document.getElementById('chartIPRegion'));
        self.$http.post('/Interface/queryRunProcess', {
        }).then((response) => {
          self.proc_data = response.data.retdata;
          self.chartIPRegion.setOption({
            
            title: {
              x: 'center',
              text: '请求IP分布情况',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
              },
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:  {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series: [
                {
                    name: '云上贵州',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: '政法平台',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '互联网舆情',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '部门交换',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [150, 212, 201, 154, 190, 330, 410]
                },
                {
                    name: '网格化管理',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    data: [820, 832, 901, 934, 1290, 1330, 1320]
                }
            ]
          });
        });
      },
      drawRequestTCPIP: function() {
        var self = this;
        self.chartRequestTCPIP = echarts.init(document.getElementById('chartRequestTCPIP'));
        self.$http.post('/Interface/queryRunProcess', {
        }).then((response) => {
          self.proc_data = response.data.retdata;
          self.chartRequestTCPIP.setOption({
            
            title: {
              text: '请求数',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
              },
              left: '6%'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              }
            },
            legend: {
              icon: 'rect',
              itemWidth: 14,
              itemHeight: 5,
              itemGap: 13,
              data: ['移动', '电信', '联通'],
              right: '4%',
              textStyle: {
                fontSize: 12,
                color: '#F1F1F3'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
            }],
            yAxis: [{
              type: 'value',
              name: '单位（%）',
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#57617B'
                }
              }
            }],
            series: [
              {
                name: '移动',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                },
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.3)'
                      }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                      }], false),
                      shadowColor: 'rgba(0, 0, 0, 0.1)',
                      shadowBlur: 10
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: 'rgb(137,189,27)',
                      borderColor: 'rgba(137,189,2,0.27)',
                      borderWidth: 12
                    }
                  },
                  data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
                },
              {
                name: '电信',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                  normal: {
                    width: 1
                  }
                },
                areaStyle: {
                  normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(0,136,212)',
                  borderColor: 'rgba(0,136,212,0.2)',
                  borderWidth: 12
                }
              },
              data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
            },
            {
              name: '联通',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: 'rgba(219, 50, 51, 0.3)'
                    }, {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgb(219,50,51)',
                    borderColor: 'rgba(219,50,51,0.2)',
                    borderWidth: 12
                  }
                },
                data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
              },
            ]
          })
        });
      },
      drawDiff: function() {
        var self = this;
        self.chartDiff = echarts.init(document.getElementById('chartDiff'));
        self.$http.post('/Interface/queryRunProcess', {
        }).then((response) => {
          self.proc_data = response.data.retdata;
          self.chartDiff.setOption({
            
            title: {
              x: 'center',
              text: '今日&昨日',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                color: '#F1F1F3'
              },
            },
            tooltip: {
              trigger: 'asix',
              axisPointer: {
                lineStyle: {
                  color: '#ddd'
                }
              },
              backgroundColor: 'rgba(255,255,255,1)',
              padding: [5, 10],
              textStyle: {
                color: '#7588E4',
              },
              extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
            },
            legend: {
              right: 20,
              orient: 'vertical',
              data: ['今日','昨日'],
              textStyle: {
                color: '#F1F1F3'
              },
            },
            xAxis: {
              type: 'category',
              data: ['00:00','2:00','4:00','6:00','8:00','10:00','12:00','14:00','16:00','18:00','20:00',"22:00"],
              boundaryGap: false,
              splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                  color: ['#D4DFF5']
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#609ee9'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              }
            },
            yAxis: {
              type: 'value',
              splitLine: {
                lineStyle: {
                  color: ['#D4DFF5']
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#609ee9'
                }
              },
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              }
            },
            series: [{
              name: '今日',
              type: 'line',
              smooth: true,
              showSymbol: false,
              symbol: 'circle',
              symbolSize: 6,
              data: ['1200', '1400', '1008', '1411', '1026', '1288', '1300', '800', '1100', '1000', '1118', '1322'],
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(199, 237, 250,0.5)'
                  }, {
                    offset: 1,
                    color: 'rgba(199, 237, 250,0.2)'
                  }], false)
                }
              },
              itemStyle: {
                normal: {
                  color: '#f7b851'
                }
              },
              lineStyle: {
                normal: {
                  width: 3
                }
              }
            }, {
              name: '昨日',
              type: 'line',
              smooth: true,
              showSymbol: false,
              symbol: 'circle',
              symbolSize: 6,
              data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(216, 244, 247,1)'
                  }, {
                    offset: 1,
                    color: 'rgba(216, 244, 247,1)'
                  }], false)
                }
              },
              itemStyle: {
                normal: {
                  color: '#58c8da'
                }
              },
              lineStyle: {
                normal: {
                  width: 3
                }
              }
            }]
          })
        })
      },
    }
  }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.el-col {
        border-radius: 4px;
    }*/
    /*.row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }*/
    .box-card {
      width: 320px;
      height:220px;
    }
</style>
