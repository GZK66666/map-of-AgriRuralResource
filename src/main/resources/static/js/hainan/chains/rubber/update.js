function rubber_update() {
    rubber_update_chart1();
    rubber_update_chart2();
    rubber_update_chart3();
    rubber_update_chart4();
    rubber_update_chart5();
    rubber_update_chart6();
}

function rubber_update_chart1() {
    var title = document.getElementById('left_1');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年天然橡胶面积情况';

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_1'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_1'));

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        legend: {
            data: ['年末面积', '收获面积', '新种面积'],
            top: '8%',
            textStyle: {
                color: 'white',
                fontSize: '14'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '30%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['2018', '2019', '2020', '2021', '2022'],
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {
                    color: 'white' // 设置 x 轴字体颜色为白色
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '年末面积/收获面积',
                min: 0,
                max: 800,
                interval: 160,
                axisLabel: {
                    formatter: '{value}',
                    color: 'white'
                },
                nameTextStyle: {
                    color: 'white',
                    fontSize: 14
                }
            },
            {
                type: 'value',
                name: '新种面积',
                min: 0,
                max: 15,
                interval: 3,
                axisLabel: {
                    formatter: '{value}',
                    color: 'white'
                },
                nameTextStyle: {
                    color: 'white', // 设置 y 轴名称的字体颜色为白色
                    fontSize: 14
                }
            }
        ],
        series: [
            {
                name: '年末面积',
                type: 'bar',
                yAxisIndex: 0,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 万亩';
                    }
                },
                data: [],
            },
            {
                name: '收获面积',
                type: 'bar',
                yAxisIndex: 0,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 万亩';
                    }
                },
                data: []
            },
            {
                name: '新种面积',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 万亩';
                    }
                },
                data: []
            }
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/rubber/getArea',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var r1 = data["年末面积"];
            var r2 = data["收获面积"];
            var r3 = data["新种面积"];

            option.series[0].data = Object.values(r1);
            option.series[1].data = Object.values(r2);
            option.series[2].data = Object.values(r3);

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

function rubber_update_chart2() {
    var title = document.getElementById('left_2');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年天然橡胶产量情况';

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_2'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_2'));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 吨<br>'; // 在这里添加公顷后缀
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
        grid: {
            left: '10%',
            right: '8%',
            top: '10%',
            bottom: '12%'
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: 'white'
            },
            boundaryGap: [0, 0.01],
            min: 290000,
            max: 360000,
            interval: 10000
        },
        yAxis: {
            type: 'category',
            data: ['2018', '2019', '2020', '2021', '2022'],
            axisLabel: {
                color: 'white'
            }
        },
        series: [
            {
                name: '产量',
                type: 'bar',
                barWidth: '50%',
                data: [],
                label: {
                    show: true
                },
            },
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/rubber/getYield',
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
}

function rubber_update_chart5() {
    var title = document.getElementById('left_3');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年天然橡胶产值情况';

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_5'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_5'));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 万元<br>';
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
        grid: {
            left: '12%',
            right: '5%',
            top: '10%',
            bottom: '10%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2018', '2019', '2020', '2021', '2022'],
            axisLabel: {
                color: 'white'
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: 'white'
            },
            min: 300000,
            max: 450000,
            interval: 30000
        },
        series: [
            {
                name: '总产值',
                type: 'line',
                data: [],
                areaStyle: {}, // 面积
                smooth: true, // 平滑
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
        url: '/api/hainan-crops/rubber/getProduction',
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
}

function rubber_update_chart3() {
    var title = document.getElementById('right_1');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年平均胶价情况';

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_3'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_3'));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 元/吨<br>';
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
        grid: {
            left: '12%',
            right: '5%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2018', '2019', '2020', '2021', '2022'],
            axisLabel: {
                color: 'white'
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: 'white'
            },
            min: 9000,
            max: 12500,
            interval: 500
        },
        series: [
            {
                name: '平均胶价',
                type: 'line',
                data: [],
                smooth: true,
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
        url: '/api/hainan-crops/rubber/getAvgPrice',
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
}

function rubber_update_chart6() {
    var title = document.getElementById('right_2');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年割胶工人数情况';
    var chart = document.getElementById('chart_6');
    chart.innerHTML = '<div id="chart_6_1" class="echart fl t_btn4" style="width:20%;height: 280px;cursor: pointer;"></div>\n' +
        '                    <div id="chart_6_2" class="echart fl t_btn4" style="width:20%;height: 280px;cursor: pointer;"></div>\n' +
        '                    <div id="chart_6_3" class="echart fl t_btn4" style="width:20%;height: 280px;cursor: pointer;"></div>\n' +
        '                    <div id="chart_6_4" class="echart fl t_btn4" style="width:20%;height: 280px;cursor: pointer;"></div>\n' +
        '                    <div id="chart_6_5" class="echart fl t_btn4" style="width:20%;height: 280px;cursor: pointer;"></div>'


    var chart_6_1 = echarts.init(document.getElementById('chart_6_1'));
    var chart_6_2 = echarts.init(document.getElementById('chart_6_2'));
    var chart_6_3 = echarts.init(document.getElementById('chart_6_3'));
    var chart_6_4 = echarts.init(document.getElementById('chart_6_4'));
    var chart_6_5 = echarts.init(document.getElementById('chart_6_5'));

    var total = 2019529;
    var y2018 = 401300;
    var y2019 = 401300;
    var y2020 = 402955;
    var y2021 = 403055;
    var y2022 = 410919;

    var color = ['#1694f1', '#a8d68e', '#e0cb6f', '#6490f0', '#dca0ac'];

    function newOption(count, name, color) {
        return {
            title: {
                text: name,
                left: 'center',
                top: '65%',
                textStyle: {
                    fontSize: 18, // 标题字体大小
                    color: '#fff', // 标题字体颜色
                }
            },
            series: [{
                type: 'pie',
                hoverAnimation: false, // 关闭悬停交互
                radius: ['70%', '80%'],
                color: color,
                label: {
                    normal: {
                        position: 'center',
                        formatter: count + '人',
                        fontSize: 14,
                        color: '#cccaca',
                    }
                },
                data: [{
                    value: count,
                    name: name,
                }, {
                    value: total,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,.2)'
                        },
                    },
                }]
            }]
        };
    }

    chart_6_1.setOption(newOption(y2018, '2018', color[0]));
    chart_6_2.setOption(newOption(y2019, '2019', color[1]));
    chart_6_3.setOption(newOption(y2020, '2020', color[2]));
    chart_6_4.setOption(newOption(y2021, '2021', color[3]));
    chart_6_5.setOption(newOption(y2022, '2022', color[4]));
}

function rubber_update_chart4() {
    var title = document.getElementById('right_3');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">各市县天然橡胶合作社情况';

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_4'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_4'));

    var option = {
        grid: {
            top: '20%',
            bottom: '19%'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: "{b} : {c}家"
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
                name: '天然橡胶合作社数量',
                data: [],
                type: 'bar',
            }
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/rubber/getCoopsCntByRegion',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // 将Map转换为数组形式，方便后续操作
            var dataArray = Object.entries(data);

            // 按降序排序
            dataArray.sort(function (a, b) {
                return b[1] - a[1];
            });

            // 将排序后的数据设置到 option 中
            option.xAxis.data = dataArray.map(function (item) {
                return item[0];
            });

            option.series[0].data = dataArray.map(function (item) {
                return item[1];
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