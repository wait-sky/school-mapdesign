<template>
  <div>
    <!-- 中国地图 -->
    <div id='map' ref='map' class='map'></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import chinaJson from '@/mock/china.json'
import { mapNum } from '@/api'

export default {
  data() {
    return {
      toolTipData: []
    }
  },
  mounted() {
    this.chinaEcharts()
    mapNum().then((res) => {
      console.log(res)
      if (res.code == '200') {
        this.toolTipData = res.data
      }
    })
  },
  methods: {
    chinaEcharts() {
      echarts.registerMap('china', chinaJson)
      let myChart = echarts.init(this.$refs.map)
      this.$nextTick(async () => {
        const mapName = 'china'
        // 区块附带相关颜色
        const data = [
          { name: '北京', value: 177 },
          { name: '天津', value: 42 },
          { name: '河北', value: 102 },
          { name: '山西', value: 81 },
          { name: '内蒙古', value: 47 },
          { name: '辽宁', value: 67 },
          { name: '吉林', value: 82 },
          { name: '黑龙江', value: 66 },
          { name: '上海', value: 24 },
          { name: '江苏', value: 92 },
          { name: '浙江', value: 114 },
          { name: '安徽', value: 109 },
          { name: '福建', value: 116 },
          { name: '江西', value: 91 },
          { name: '山东', value: 119 },
          { name: '河南', value: 137 },
          { name: '湖北', value: 116 },
          { name: '湖南', value: 114 },
          { name: '重庆', value: 91 },
          { name: '四川', value: 125 },
          { name: '贵州', value: 62 },
          { name: '云南', value: 83 },
          { name: '西藏', value: 9 },
          { name: '陕西', value: 80 },
          { name: '甘肃', value: 56 },
          { name: '青海', value: 10 },
          { name: '宁夏', value: 18 },
          { name: '新疆', value: 67 },
          { name: '广东', value: 123 },
          { name: '广西', value: 59 },
          { name: '海南', value: 14 }
        ]
        const geoCoordMap = {}
        // 悬浮产生数据 必须添加 await 来控制获取时机
        let pinData = []
        await mapNum().then((res) => {
          if (res.code == '200') {
            this.toolTipData = res.data
            pinData = res.data.map(item => item.name)
          }
        })
        // 悬浮产生数据
        const toolTipData = this.toolTipData
        /*let temp = [
          {
            name: '北京',
            value: [
              { name: '文科1', value: 95 },
              { name: '理科', value: 82 }
            ]
          },
        ]*/
        
        /*获取地图数据*/
        let myChart = echarts.init(document.getElementById('map'))
        // myChart.showLoading();
        const mapFeatures = echarts.getMap(mapName).geoJson.features
        // myChart.hideLoading();
        mapFeatures.forEach(function(v) {
          // 地区名称
          const name = v.properties.name
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp
        })
        // console.log(data);
        // console.log(toolTipData);
        const max = 480,
          min = 9 // todo
        const maxSize4Pin = 100,
          minSize4Pin = 30
        
        const convertData = function(data) {
          const res = []
          for (let i = 0; i < data.length; i++) {
            const geoCoord = geoCoordMap[data[i].name]
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              })
            }
          }
          return res
        }
        const option = {
          tooltip: {
            trigger: 'item',
            // triggerOn: 'click',
            formatter: function(params) {
              if (Array.isArray(params.value)) {
                // 有浮点
                let toolTiphtml = ''
                for (let i = 0; i < toolTipData.length; i++) {
                  if (params.name == toolTipData[i].name) {
                    toolTiphtml += toolTipData[i].name + ':<br>'
                    for (let j = 0; j < toolTipData[i].value.length; j++) {
                      toolTiphtml +=
                        toolTipData[i].value[j].name +
                        ':' +
                        toolTipData[i].value[j].value +
                        '<br>'
                    }
                  }
                }
                return toolTiphtml
              } else {
                return ''
              }
            }
          },
          //这个属性控制地图的多彩板块
          visualMap: {
            show: false, // 是否显示
            min: 0,
            max: 200,
            left: 400,
            bottom: 200,
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            seriesIndex: [1],
            inRange: {
              // color: ['#3B5077', '#031525'] // 蓝黑
              // color: ['#ffc0cb', '#800080'] // 红紫
              // color: ['#3C3B3F', '#605C3C'] // 黑绿
              // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
              // color: ['#23074d', '#cc5333'] // 紫红
              color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#1488CC', '#2B32B2'] // 浅蓝
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
              // color: ['#00467F', '#A5CC82'] // 蓝绿
            }
          },
          geo: {
            show: true,
            map: mapName,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            }
          },
          series: [
            //1）全省的散点
            {
              name: '散点',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              symbolSize: function(val) {
                return val[2] / 10
              },
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: '#05C3F9'
                }
              }
            },
            // 2）为了与visualMap配对，必须要加上
            {
              type: 'map',
              map: mapName,
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#fff'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#3B5077'
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: data
            },
            //3）气泡
            {
              name: '点',
              type: 'scatter',
              coordinateSystem: 'geo',
              symbol: 'pin', //气泡
              symbolSize: function(val) {
                const a = (maxSize4Pin - minSize4Pin) / (max - min)
                let b = minSize4Pin - a * min
                b = maxSize4Pin - a * max
                return a * val[2] + b
              },
              label: {
                normal: {
                  show: false, // 是否显示经纬度数据
                  textStyle: {
                    color: '#fff',
                    fontSize: 9
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#F62157' //标志颜色
                }
              },
              zlevel: 6,
              data: convertData(data)
            },
            //4.前五个有效果的光圈
            {
              name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              // TODO 这个参数 注释掉 就不会显示光圈
              data: convertData(
                data
                  .sort(function(a, b) {
                    return b.value - a.value
                  })
                  .slice(0, 5)
              ),
              symbolSize: function(val) {
                return val[2] / 10
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: 'yellow',
                  shadowBlur: 10,
                  shadowColor: 'yellow'
                }
              },
              zlevel: 1
            }
          ]
        }
        myChart.setOption(option)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.map {
  width: 99vw;
  height: 99vh;
}
</style>
