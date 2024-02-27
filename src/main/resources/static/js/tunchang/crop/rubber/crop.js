$(function () {
    echart_1();
    echart_2();

    echart_3();
    echart_4();

    echart_map();
    echart_5();

    echart_6();

    echart_7();

    //echart_1
    function echart_1() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_1'));

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
                    color: 'white'
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
                    data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
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
                    max: 40000,
                    interval: 8000,
                    axisLabel: {
                        formatter: '{value}',
                        color: 'white'
                    },
                    nameTextStyle: {
                        color: 'white'
                    }
                },
                {
                    type: 'value',
                    name: '新种面积',
                    min: 0,
                    max: 1000,
                    interval: 200,
                    axisLabel: {
                        formatter: '{value}',
                        color: 'white'
                    },
                    nameTextStyle: {
                        color: 'white' // 设置 y 轴名称的字体颜色为白色
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
                            return value + ' 公顷';
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
                            return value + ' 公顷';
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
                            return value + ' 公顷';
                        }
                    },
                    data: []
                }
            ]
        };

        $.ajax({
            url: '/api/crop/rubber/getRubberArea',
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

    //echart_2
    function echart_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_2'));

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
                    name: '天然橡胶产量',
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
            url: '/api/crop/rubber/getRubberProduction',
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

    // echart_map屯昌地图
    function echart_map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_map'));

        // 发送请求获取后端数据
        $.ajax({
            url: '/api/crop/rubber/getRubberCollectionPoint',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var minValue = 100000;
                var maxValue = 0;

                // 将 map 转换为数组
                var townData = Object.keys(data).map(function (townName) {
                    var value = data[townName];

                    // 更新最大值
                    if (value > maxValue) {
                        maxValue = value;
                    }

                    // 更新最小值
                    if (value < minValue) {
                        minValue = value;
                    }

                    return { name: townName, value: data[townName] };
                });

                // 显示地图
                showProvince(townData, minValue, maxValue);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        function showProvince(townData, min, max) {
            myChart.setOption(option = {
                visualMap: {
                    show: true,
                    min: min,
                    max: max, // 根据实际数据范围设置
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
                    formatter: '{b}: {c}家',
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
                formatter: function (params) {
                    var result = params[0].name + '<br>';
                    params.forEach(function (item) {
                        result += item.value + ' 元/公斤<br>';
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
                left: '7%',
                right: '7%',
                bottom: '20%',
                top: '17%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLabel: {
                    textStyle: {
                        color: 'white'  // 设置刻度标签文字颜色
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                },
                axisLabel: {
                    color: 'white'
                }
            },
            series: [
                {
                    name: '天然橡胶收购价格',
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
            url: '/api/crop/rubber/getRubberPriceByYearAndMonth' + '?year=2023&month=all',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 解析数据
                var parsedData = Object.entries(data).map(([date, price]) => ({
                    date: date,
                    price: price
                }));

                parsedData.sort((a, b) => a.date.localeCompare(b.date));
                var dates = parsedData.map(item => item.date);
                var prices = parsedData.map(item => item.price);
                var minPrice = Math.floor(Math.min(...prices));
                var maxPrice = Math.ceil(Math.max(...prices));

                option.xAxis.data = dates;
                option.series[0].data = prices;
                option.yAxis.min = minPrice;
                option.yAxis.max = maxPrice;

                // 使用更新后的配置项显示图表
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
                    name: '天然橡胶企业数量',
                    data: [],
                    type: 'bar',
                }
            ]
        };

        $.ajax({
            url: '/api/crop/rubber/getRubberEnterprise',
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

    // 屯昌人均收入消费概览
    function echart_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_5'));

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}家"
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: '90%',
                textStyle: {
                    color: 'white'
                }
            },
            series: [
                {
                    name: '',
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
            url: '/api/crop/rubber/getRubberCollectionPoint',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var countData = Object.entries(data).map(([town, count], index) => {
                    // 设置不同的颜色，可以根据需要修改颜色值
                    var colors = ['#1694f1', '#e0cb6f', '#6490f0', '#a8d68e', '#dca0ac'];
                    var color = colors[index % colors.length];

                    return { name: town, value: count, itemStyle: { normal: { color: color } } };
                });

                option.series[0].data = countData;
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

    function echart_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_6'));

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
            url: '/api/crop/rubber/getRubberCooperative',
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

    function echart_7() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_7'));

        var option = {
            legend: {
                data: ['各市县收购均价', '全省均价'],
                top: '8%',
                textStyle: {
                    color: 'white'
                }
            },
            grid: {
                top: '30%',
                bottom: '19%',
                left: '5%',
                right: '5%',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: "{b} : {c}元/公斤"
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
                    name: '各市县收购均价',
                    data: [],
                    type: 'bar'
                },
                {
                    name: '全省均价',
                    type: 'line',
                    markLine: {
                        data: [
                            {
                                name: '全省均价',
                                yAxis: 11,
                                lineStyle: { color: 'yellow' },
                            }
                        ],
                        lineStyle: {
                            width: 2,  // 设置线条宽度
                        },
                        label: {
                            color: 'white'  // 设置字体颜色为白色
                        }
                    }
                }
            ]
        };

        $.ajax({
            url: '/api/crop/rubber/getRubberAveragePriceByMonth?month=10',
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

                // 分别提取“全省”和其他数据
                var provinceData = parsedData.find(function (item) {
                    return item.name === '全省';
                });

                var otherData = parsedData.filter(function (item) {
                    return item.name !== '全省';
                });

                otherData.sort(function (a, b) {
                    return b.value - a.value;
                });

                // 将排序后的数据设置到 option 中
                option.xAxis.data = otherData.map(function (item) {
                    return item.name;
                });

                option.series[0].data = otherData.map(function (item) {
                    return item.value;
                });

                // 填充 markLine 数据
                option.series[1].markLine.data = [
                    {
                        name: '全省均价',
                        yAxis: provinceData ? provinceData.value : 0,
                        lineStyle: { color: '#abf0b9' },
                    }
                ];

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
