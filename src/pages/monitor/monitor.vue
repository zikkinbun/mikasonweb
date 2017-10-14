<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div id="chartUptime" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="chartProc" style="width:100%; height:400px;"></div>
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
        proc_data: null,
        uptime_data: null,
      }
    },
    mounted () {
      //基于准备好的dom，初始化echarts实例
      this.$nextTick(function() {
          this.drawUptime();
          this.drawProcess();
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
                data : ['gdr_dev', 'gdr_test', 'gdr_rd_prod', 'gdr_sql_mt', 'gdr_sql_sl', 'gdr_web_prod', 'zabbix_server', ],
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
                data: self.proc_data,
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
