<template>
  <section class="chart-container">
        <Row>
            <i-col :span="12">
                <div id="chartUptime" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chartProc" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chartLine" style="width:100%; height:400px;"></div>
            </i-col>
            <i-col :span="12">
                <div id="chartPie" style="width:100%; height:400px;"></div>
            </i-col>
            <!-- <i-col :span="24">
                <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
            </i-col> -->
        </Row>
</section>
</template>
<script>
  import echarts from 'echarts'

  export default {
    data () {
      return {
        chartUptime: null,
        chartProc: null,
        // chartLine: null,
        // chartPie: null,
        proc_data: null,
        uptime_data: null,
      }
    },
    mounted () {
      // var _this = this;
      //基于准备好的dom，初始化echarts实例
      this.$nextTick(function() {
          this.drawUptime();
          this.drawProcess();
      })
    },
    methods: {
      drawUptime: function () {
        this.chartUptime = echarts.init(document.getElementById('chartUptime'));
        // this.chartColumn.showLoading()
        this.axios.get('http://operapi.uco2.com/zabbixapi/uptime/', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.uptime_data = response.data;
          this.chartUptime.setOption({
            title: { text: '在线时间' },
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
              data: ['get_dev', 'gdr_test', 'gdr_rd_prod', 'gdr_sql_mt', 'gdr_sql_sl', 'gdr_web_prod', 'zabbix_server', ],
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
              data: this.uptime_data,
              z: 10
            }]
          });
        });
      },
      drawProcess: function () {
        this.chartProc = echarts.init(document.getElementById('chartProc'));
        this.axios.get('http://operapi.uco2.com/zabbixapi/runprocess/', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': JSON.parse(sessionStorage.getItem('token'))
          }
        }).then((response) => {
          this.proc_data = response.data
          this.chartProc.setOption({
            title: { text: '进程数' },
            color: ['#3398DB'],
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
            xAxis : [
              {
                type : 'category',
                data : ['get_dev', 'gdr_test', 'gdr_rd_prod', 'gdr_sql_mt', 'gdr_sql_sl', 'gdr_web_prod', 'zabbix_server', ],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'proc_num',
                type:'bar',
                barWidth: '60%',
                data: this.proc_data,
              }
            ]
          });
        });
      }
    }
  }
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>
