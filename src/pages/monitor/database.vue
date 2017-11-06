<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="全量监测" name="全量监测"></el-tab-pane>
    <el-row :gutter="24" type="flex">
      <el-col :span="20">
        <div id="chartSQL" style="width:130%; height:400px; margin:10px 0px 30px 0px;"></div>
      </el-col>
    </el-row>
    <el-row :gutter="24" type="flex">
      <el-col :span="24">
      <el-table
        :data="sqlForm"
        style="width: 100%">
        <el-table-column
        prop="id"
        label="SQL ID"
        width="180">
        </el-table-column>
        <el-table-column
        prop="sentence"
        label="SQL 语句"
        width="180">
        </el-table-column>
        <el-table-column
        prop="database"
        label="数据库名">
        </el-table-column>
        <el-table-column
        prop="timepercent"
        label="耗时比例">
        </el-table-column>
        <el-table-column
        prop="avgtime"
        label="平均耗时">
        </el-table-column>
        <el-table-column
        prop="bit"
        label="执行次数">
        </el-table-column>
      </el-table>
      </el-col>
    </el-row>
    <el-tab-pane label="MySQL监测" name="MySQL监测"></el-tab-pane>
    <el-row :gutter="24" type="flex">
      <el-col :span="20">
        <div id="chartCom" style="width:130%; height:400px; margin:10px 0px 30px 0px;"></div>
      </el-col>
    </el-row>
    <el-tab-pane label="Mongo监测" name="Mongo监测"></el-tab-pane>
  </el-tabs>
</template>
<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        activeName: '全量监测',
        chartSQL: null,
        connections: [],
        sqlForm: {},
        option: {
           title: {},
           tooltip : {},
           legend: {},
           toolbox: {},
           grid: {},
           xAxis : [],
           dataZoom: [],
           yAxis : [],
           series:[]
         }
      };
    },
    mounted () {
      //基于准备好的dom，初始化echarts实例
      this.$nextTick(function() {
          this.drawSQLConns();
      })
    },
    methods: {
      drawSQLConns: function () {
        var self = this;
        var server_list = new Array('39.108.131.173', '39.108.177.246')

        self.chartSQL = echarts.init(document.getElementById('chartSQL'));
        self.$http.post('/Interface/getMysqlConns', {
          ip: server_list
        }).then((response) => {
          self.connections = response.data.retdata;
          self.chartSQL.setOption({
            title: {
                text: '数据库当前连接数',
                x: 'center',
            },
            tooltip: {
                trigger: 'axis',

                axisPointer: {
                    animation: false
                }
            },
            legend: {
                data: ['流量'],
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
                name: '连接数:',
                interval: 25,


            }, {
                gridIndex: 1
            }],
            series: [{
                name: '生产主库',
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
                data: self.connections.master
            },{
                name: '生产从库库',
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
                data: self.connections.slave
            }]
          });
        });
      },
      drawSQLCom: function() {
        var self = this;
      }
    },
  };
</script>
