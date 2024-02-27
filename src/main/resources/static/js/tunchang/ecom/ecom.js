$(function () {
    echart_1();
    echart_2();

    echart_3();
    echart_4();

    echart_map();
    echart_5();

    echart_6();

    echart_7();

    //echart_1 屯昌三产收入
    function echart_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_1'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}万元"
            },
            legend: {
                x: 'center',
                y: '15%',
                data: [],
                icon: 'circle',
                textStyle: {
                    color: '#fff',
                }
            },
            calculable: true,
            series: [{
                name: '',
                type: 'pie',
                //起始角度，支持范围[0, 360]
                startAngle: 0,
                //饼图的半径，数组的第一项是内半径，第二项是外半径
                radius: [41, 100.75],
                //支持设置成百分比，设置成百分比时第一项是相对于容器宽度，第二项是相对于容器高度
                center: ['50%', '40%'],
                //是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                // 'radius' 面积展现数据的百分比，半径展现数据的大小。
                //  'area' 所有扇区面积相同，仅通过半径展现数据大小
                roseType: 'area',
                //是否启用防止标签重叠策略，默认开启，圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        formatter: '{d}%',
                        textStyle: {
                            color: 'white' // 文本颜色设置为白色
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length2: 1,
                    },
                    emphasis: {
                        show: true
                    }
                },
                data: []
            }]
        };

        $.ajax({
            url: '/api/ecom/getIndustryIncomeByYear?year=' + 2021,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var industryName = data.map(item => {
                    return Object.keys(item)[0];
                });

                var industryData = data.map(item => {
                    // 获取对象的键
                    var industry = Object.keys(item)[0];
                    // 获取对象的值
                    var income = item[industry];
                    // 根据不同的条件设置不同的颜色
                    var color;
                    if (industry === '第一产业') {
                        color = '#1694f1';
                    } else if (industry === '第二产业') {
                        color = '#a8d68e';
                    } else if (industry === '第三产业') {
                        color = '#e0cb6f';
                    }

                    return {
                        name: industry,
                        value: income,
                        itemStyle: {
                            normal: {
                                color: color
                            }
                        }
                    };
                });
                // 添加透明元素
                transparentItem = {
                      value: 0,
                      name: "",
                      itemStyle: {
                          normal: {
                              color: 'transparent'
                          }
                      },
                      label: {
                          show: false
                      },
                      labelLine: {
                          show: false
                      }
                  };
                industryData.push(transparentItem);
                industryData.push(transparentItem);
                industryData.push(transparentItem);

                option.legend.data = industryName;
                option.series[0].data = industryData;

                myChart.setOption(option);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    //echart_2 屯昌各产业总产值
    function echart_2() {
           // 基于准备好的dom，初始化echarts实例
           var myChart = echarts.init(document.getElementById('chart_2'));

           var option = {
               tooltip: {
                   trigger: 'item',
                   formatter: "{a} <br/>{b} : {c}万元"
               },
               legend: {
                   orient: 'vertical',
                   left: 'center',
                   top: '80%',
                   textStyle: {
                       color: 'white'
                   }
               },
               series: [
                   {
                       name: '总产值',
                       type: 'pie',
                       radius: '50%',
                       center: ['50%', '45%'],  // 饼图的位置
                       data: [],
                       label: {
                           show: true,
                           formatter: '{b}',
                           textStyle: {
                               color: 'white'  // 将文字颜色设置为白色
                           }
                       },
                       emphasis: {
                           itemStyle: {
                               shadowBlur: 10,
                               shadowOffsetX: 0,
                               shadowColor: 'rgba(248,242,242,0.5)'
                           }
                       }
                   }
               ]
           };

        $.ajax({
            url: '/api/ecom/getIndustryOutcomeByYear?year=' + 2021,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var outcomeData = data.map((item, index) => {
                    // 获取对象的键（城镇名称）
                    var industry = Object.keys(item)[0];
                    // 获取对象的值（耕地面积）
                    var outcome = item[industry];

                    // 设置不同的颜色，可以根据需要修改颜色值
                    var colors = ['#1694f1', '#a8d68e', '#e0cb6f', '#6490f0', '#dca0ac'];
                    var color = colors[index % colors.length];

                    return { name: industry, value: outcome, itemStyle: { normal: { color: color } } };
                });

                option.series[0].data = outcomeData;
                myChart.setOption(option);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

           // 使用刚指定的配置项和数据显示图表。
           window.addEventListener("resize", function () {
               myChart.resize();
           });
    }

    // echart_map屯昌地图
    function echart_map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_map'));

        // 发送请求获取后端数据
        var year = 2021; // 初始化默认为2021
        $.ajax({
            url: '/api/ecom/getLandAreaByYear?year=' + year,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var townData = data.map(item => {
                    // 获取对象的键（城镇名称）
                    var townName = Object.keys(item)[0];
                    // 获取对象的值（耕地面积）
                    var landArea = item[townName];

                    return { name: townName, value: landArea };
                });

                // 显示地图
                showProvince(townData);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        function showProvince(townData) {
            myChart.setOption(option = {
                visualMap: {
                    show: true,
                    min: 535,
                    max: 2776, // 根据实际数据范围设置
                    calculable: true,
                    inRange: {
                        color: ['rgb(240,240,203)', '#c4452d'] // 浅白色到深蓝色
                    },
                    textStyle: {
                        color: 'white',
                        fontSize: 12,
                    },
                    left: 180,
                    top: 350,
                },
                series: [{
                    type: 'map',
                    mapType: 'tunchang',
                    roam: false, // 禁用地图拖动
                    top: '7%',
                    data: townData,
                    label: {
                        show: true,
                        position: 'inside',
                        color: 'black',
                        fontSize: 12,
                    },
                    itemStyle: {
                        opacity: 1,
                        borderWidth: 0.5,
                    },
                }],
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}公顷',
                },
            });
        }

        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echart_3() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_3'));

        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: '{b}: {c}台',
          },
          legend: {
             left: 'center',
             top: '7%',
             textStyle: {
                 color: 'white'
             },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['耕作机械', '排灌机械', '收获机械机动收割机', '机动脱力机'],
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                interval: 0,  // 设置刻度标签全部显示
                color: 'white'  // 设置刻度标签文字颜色
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                color: 'white'  // 设置 y 轴刻度标签文字颜色
              }
            }
          ],
          series: [
            {
              type: 'bar',
              barWidth: '40%',
              data: [],
            }
          ]
        };

        $.ajax({
            url: '/api/ecom/getAgriculturalMachineryByYear?year=' + 2021,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var machineData = data.map((item, index) => {
                    // 获取对象的键
                    var machine = Object.keys(item)[0];
                    // 获取对象的值
                    var data = item[machine];

                    // 设置不同的颜色，可以根据需要修改颜色值
                    var colors = ['#1694f1', '#a8d68e', '#e0cb6f', '#6490f0', '#dca0ac'];
                    var color = colors[index % colors.length];

                    return { name: machine, value: data, itemStyle: { normal: { color: color } } };
                });

                // 按照 value 的值进行排序
                machineData.sort(function(a, b) {
                    return b.value - a.value; // 降序排序
                });

                option.series[0].data = machineData;
                option.xAxis[0].data = machineData.map(item => {
                    return item.name;
                });
                myChart.setOption(option);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echart_4() {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('chart_4'));

          var option = {
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                  var result = params[0].name + '<br>';
                  params.forEach(function (item) {
                      result += item.seriesName + ': ' + item.value + ' 公顷<br>'; // 在这里添加公顷后缀
                  });
                  return result;
              }
            },
            toolbox: {
              show: false, // 右上角的选项
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
              axisLabel: {
                  color: 'white'
              }
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              },
              axisLabel: {
                    color: 'white'
                }
            },
            series: [
              {
                name: '农田有效灌溉面积',
                type: 'line',
                data: [],
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' }
                  ]
                },
              },
            ]
          };

          $.ajax({
              url: '/api/ecom/getIrrigateArea',
              type: 'GET',
              dataType: 'json',
              success: function (data) {
                  option.series[0].data = data;

                  myChart.setOption(option);
              },
              error: function (error) {
                  console.log('Failed to fetch data:', error);
              }
          });

          // 使用刚指定的配置项和数据显示图表。
          window.addEventListener("resize", function () {
              myChart.resize();
          });

          // 使用刚指定的配置项和数据显示图表。
          window.addEventListener("resize", function () {
              myChart.resize();
          });
    }

    // 屯昌人均收入消费概览
    function echart_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_5'));

        var option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                },
                formatter: function (params) {
                    var result = params[0].name + '<br>';
                    params.forEach(function (item) {
                        var value = item.value;
                        // 在数值后面加上单位"元"
                        result += item.seriesName + ': ' + value + '元' + '<br>';
                    });
                    return result;
                }
              },
              legend: {
                data: ['人均纯收入', '人均消费支出', '人均结余'],
                textStyle: {
                    color: 'white' // 设置legend字体颜色为白色
                },
                top: '5%'
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              yAxis: [
                {
                  type: 'value',
                  axisLabel: {
                      color: 'white'
                  }
                }
              ],
              xAxis: [
                {
                  type: 'category',
                  axisTick: {
                    show: false
                  },
                  data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'],
                  axisLabel: {
                      color: 'white',
                      interval: 0
                  }
                }
              ],
              series: [
                {
                  name: '人均纯收入',
                  type: 'bar',
                  stack: 'Total',
                  emphasis: {
                    focus: 'series'
                  },
                  data: []
                },
                {
                  name: '人均消费支出',
                  type: 'bar',
                  stack: 'Total',
                  emphasis: {
                    focus: 'series'
                  },
                  data: []
                },
                {
                    name: '人均结余',
                    type: 'line',
                    yAxisIndex: 0,
                    emphasis: {
                        focus: 'series'
                    },
                    data: []
                }
              ]
            };

        $.ajax({
            url: '/api/ecom/getIncomeAndConsumption',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                option.series[0].data = data[0];
                option.series[1].data = data[1].map(function (value) {
                    return -value;
                });
                option.series[2].data = data[0].map(function (value, index) {
                    return value - data[1][index];
                });

                myChart.setOption(option);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        myChart.setOption(option);

        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echart_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_6'));

        var option = {
            polar: {
                radius: [30, '70%']
            },
            angleAxis: {
                max: 11000,
                startAngle: 75,
                axisLabel: {
                    color: 'white' // 角度轴标签字体颜色
                }
            },
            radiusAxis: {
                type: 'category',
                data: ['氮肥', '磷肥', '钾肥', '复合肥'],
                axisLabel: {
                    show: false, // 不显示半径轴标签
                    color: 'white' // 半径轴标签字体颜色
                }
            },
            tooltip: {
                formatter: '{b}: {c}吨',
            },
            series: {
                type: 'bar',
                data: [
                    { value: 2196, itemStyle: { color: '#1694f1' } },
                    { value: 5937, itemStyle: { color: '#a8d68e' } },
                    { value: 8536, itemStyle: { color: '#e0cb6f' } },
                    { value: 9159, itemStyle: { color: '#6490f0' } }
                ],
                coordinateSystem: 'polar',
                label: {
                    show: true,
                    position: 'middle',
                    formatter: '{b}',
                    color: 'white', // 标签字体颜色
//                    fontWeight: 'bold', // 标签字体加粗
                    fontSize: 13,
                }
            },
        };

        $.ajax({
            url: '/api/ecom/getFertilizersByYear?year=2021',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 处理数据
                var fertilizersData = data.map(function (item) {
                    // 获取对象的键和值
                    var name = Object.keys(item)[0];
                    var value = item[name];
                    // 返回包含 name 和 value 的对象
                    return { name: name, value: value };
                });

                // 根据 values 升序排序
                fertilizersData.sort(function (a, b) {
                    return a.value - b.value;
                });

                // 分离 names 和 values
                var names = fertilizersData.map(function (item) {
                    return item.name;
                });

                var values = fertilizersData.map(function (item, index) {
                    var colors = ['#1694f1', '#734db9', '#28a828', '#6490f0'];
                    var color = colors[index % colors.length];

                    return { value: item.value, itemStyle: { color: color } };
                });

                console.log(values);

                // 设置 option
                option.radiusAxis.data = names;
                option.series.data = values;

                myChart.setOption(option);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

    function echart_7() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_7'));

        var option = {
            grid: {
                top: '30%',
                bottom: '19%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: "{b} : {c}吨"
            },
            xAxis: {
                type: 'category',
                data: [],
                axisLabel: {
                    interval: 0,  // 设置刻度标签全部显示
                    rotate: 45,   // 设置刻度标签旋转角度
                    textStyle: {
                        color: 'white'  // 设置刻度标签文字颜色
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: 'white'
                }
            },
            series: [
                {
                    name: '农药施用量',
                    data: [],
                    type: 'bar',
                }
            ]
        };

        $.ajax({
            url: '/api/ecom/getAgrochemicalByYear?year=2021',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 解析数据
                var parsedData = data.map(function (item) {
                    return {
                        name: Object.keys(item)[0],
                        value: item[Object.keys(item)[0]]
                    };
                });

                // 按降序排序
                parsedData.sort(function (a, b) {
                    return b.value - a.value;
                });

                // 将排序后的数据设置到 option 中
                option.xAxis.data = parsedData.map(function (item) {
                    return item.name;
                });

                option.series[0].data = parsedData.map(function (item) {
                    return item.value;
                });

                myChart.setOption(option);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        // 使用刚指定的配置项和数据显示图表。
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

});
