<template>
  <div ref="char" class="char"></div>
</template>

<script>
import * as echarts from 'echarts'
import china from '@/mock/china.json'
echarts.registerMap('china', china)
export default {
  name: 'china',
  data() {
    return {
      titledata: [],
      citydata: [
        {
          name: '北京',
          value: 974
        },
        {
          name: '天津',
          value: 532
        },
        {
          name: '上海',
          value: 834
        },
        {
          name: '重庆',
          value: 683
        },
        {
          name: '河北',
          value: 283
        },
        {
          name: '河南',
          value: 345
        },
        {
          name: '云南',
          value: 72
        },
        {
          name: '辽宁',
          value: 194
        },
        {
          name: '黑龙江',
          value: 342
        },
        {
          name: '湖南',
          value: 389
        },
        {
          name: '安徽',
          value: 267
        },
        {
          name: '山东',
          value: 675
        },
        {
          name: '新疆',
          value: 14
        },
        {
          name: '江苏',
          value: 974
        },
        {
          name: '浙江',
          value: 978
        },
        {
          name: '江西',
          value: 528
        },
        {
          name: '湖北',
          value: 144
        },
        {
          name: '广西',
          value: 448
        },
        {
          name: '甘肃',
          value: 197
        },
        {
          name: '山西',
          value: 203
        },
        {
          name: '内蒙古',
          value: 73
        },
        {
          name: '陕西',
          value: 563
        },
        {
          name: '吉林',
          value: 147
        },
        {
          name: '福建',
          value: 112
        },
        {
          name: '贵州',
          value: 373
        },
        {
          name: '广东',
          value: 2747
        },
        {
          name: '青海',
          value: 38
        },
        {
          name: '西藏',
          value: 12
        },
        {
          name: '四川',
          value: 215
        },
        {
          name: '宁夏',
          value: 172
        },
        {
          name: '海南',
          value: 77
        },
        {
          name: '台湾',
          value: 123
        },
        {
          name: '香港',
          value: 32
        },
        {
          name: '澳门',
          value: 43
        },
        {
          name: '南海诸岛',
          value: 53
        }
      ],
      resultdata0: [],
      bartop6: [],
      yMax: 1000,
      dataShadow: [],
      option: {
        title: [
          {
            show: false,
            text: '地域分布'
          },
          {
            show: false,
            text: '省份/直辖市TOP6',
            right: '20',
            textStyle: {
              color: '#666666',
              fontSize: 12
            }
          }
        ],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        grid: {
          // 仅仅控制条形图的位置
          show: false,
          containLabel: false,
          top: 'center',
          right: 0,
          width: '20%',
          height: '40%'
        },
        visualMap: {
          type: 'continuous',
          min: 0,
          max: 1000,
          text: ['多', '少'],
          seriesIndex: [0, 2],
          dimension: 0,
          realtime: false,
          left: 0,
          orient: 'horizontal',
          itemWidth: 11,
          itemHeight: 143,
          calculable: false,
          inRange: {
            color: ['#0C318B', '#3AB9FE'],
            symbolSize: [100, 100]
          },
          outOfRange: {
            color: ['#eeeeee'],
            symbolSize: [100, 100]
          },
          textStyle: {}
        },
        toolbox: {
          show: false
        },

        xAxis: [
          {
            type: 'value',
            position: 'top',
            inside: false,
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            margin: 10
          }
        ],
        yAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              show: false
            },
            axisLabel: {
              align: 'right',
              color: '#000',
              margin: 10,
              showMaxLabel: true
            },

            axisTick: {
              show: false
            },
            data: this.titledata
          }
        ],

        series: [
          {
            name: '占比',
            type: 'map',
            mapType: 'china',
            left: '10',
            width: '60%',
            roam: 'move',
            mapValueCalculation: 'sum',
            zoom: 1,
            selectedMode: false,
            showLegendSymbol: false,
            label: {
              normal: {
                textStyle: {
                  color: '#DBF8FF',
                  fontSize: 10
                },
                show: true
              },
              emphasis: {
                textStyle: {
                  color: '#234EA5'
                }
              }
            },
            itemStyle: {
              normal: {
                areaColor: '#EEEEEE',
                borderColor: '#FFFFFF'
              },
              emphasis: {
                areaColor: '#E5F39B'
              }
            },
            data: this.citydata
          },
          {
            name: '背景',
            type: 'bar',
            roam: false,
            visualMap: false,
            itemStyle: {
              color: '#eeeeee',
              opacity: 0.5
            },
            label: {
              show: false
            },
            emphasis: {
              itemStyle: {
                color: '#eeeeee',
                opacity: 0.5
              },
              label: {
                show: false
              }
            },
            silent: true,
            barWidth: 18,
            barGap: '-100%',
            data: this.dataShadow,
            animation: false
          },
          {
            name: '占比',
            type: 'bar',
            roam: false,
            visualMap: false,
            // itemStyle: {
            //   color: "#60ACFC"
            // },
            barWidth: 18,
            label: {
              normal: {
                show: true,
                color: '#fff',
                fontSize: 12,
                position: 'insideLeft'
              },
              emphasis: {
                show: true
              }
            },
            data: this.bartop6
          }
        ]
      }
    }
  },
  methods: {
    init() {
      this.myChart = echarts.init(this.$refs.char)
      this.myChart.setOption(this.option)
    },
    init2() {
      this.citydata.sort((a, b) => {
        return b.value - a.value
      })
      for (var i = 0; i < 6; i++) {
        var top10 = {
          name: this.citydata[i].name,
          value: this.citydata[i].value
        }
        this.bartop6.push(top10)
        this.dataShadow.push(this.yMax)
      }
      this.bartop6.sort((a, b) => {
        return a.value - b.value
      })
      for (var i = 0; i < this.bartop6.length; i++) {
        this.titledata.push(this.bartop6[i].name)
      }
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.init2()
  },
  watch: {
    titledata(value) {
      this.option.yAxis[0].data = value
      this.myChart.setOption(this.option)
    },
    citydata(value) {
      this.option.series[0].data = value
      this.myChart.setOption(this.option)
    },
    dataShadow(value) {
      this.option.series[1].data = value
      this.myChart.setOption(this.option)
    },
    bartop6(value) {
      this.option.series[2].data = value
      this.myChart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.char {
  width: 100%;
  height: 100%;
}
</style>
