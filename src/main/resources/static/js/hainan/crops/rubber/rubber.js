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
                    max: 600000,
                    interval: 120000,
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
                    max: 10000,
                    interval: 2000,
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
                }
            },
            series: [
                {
                    name: '天然橡胶产量',
                    type: 'line',
                    data: [],
                    areaStyle: {},
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
            url: '/api/hainan-crops/rubber/getYield',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 计算最大值和最小值
                var maxValue = Math.ceil(Math.max.apply(null, data));
                var minValue = Math.ceil(Math.min.apply(null, data));
                // 计算间隔
                var interval = Math.ceil((maxValue - minValue) / 5);

                option.yAxis.max = maxValue;
                option.yAxis.min = minValue;
                option.yAxis.interval = interval;
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

    // echart_map
    function echart_map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_map'));

        // 发送请求获取后端数据
        $.ajax({
            url: '/api/hainan-crops/rubber/get2022EndYearAreaOrProduction?index=1', // 默认显示年末面积
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var maxArea = 0;
                var townData = [];

                for (var townName in data) {
                    var landArea = data[townName];
                    if (landArea > maxArea) {
                        maxArea = landArea;
                    }
                    townData.push({ name: townName, value: landArea });
                }

                // 显示地图，并传入最大面积值
                showProvince(townData, maxArea);
            },
            error: function (error) {
                console.log('Failed to fetch data:', error);
            }
        });

        function showProvince(townData, max) {
            myChart.setOption(option = {
                visualMap: {
                    show: true,
                    min: 0,
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
                    mapType: 'hainan',
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
                }
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
                // 计算最大值和最小值
                var maxValue = Math.ceil(Math.max.apply(null, data));
                var minValue = Math.floor(Math.min.apply(null, data));
                // 计算间隔
                var interval = Math.ceil((maxValue - minValue) / 5);

                option.yAxis.max = maxValue;
                option.yAxis.min = minValue;
                option.yAxis.interval = interval;
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

    // 屯昌人均收入消费概览
    function echart_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_5'));

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
                }
            },
            series: [
                {
                    name: '天然橡胶年末总产值',
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
                // 计算最大值和最小值
                var maxValue = Math.ceil(Math.max.apply(null, data));
                var minValue = Math.ceil(Math.min.apply(null, data));
                // 计算间隔
                var interval = Math.ceil((maxValue - minValue) / 5);

                option.yAxis.max = maxValue;
                option.yAxis.min = minValue;
                option.yAxis.interval = interval;
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

    function echart_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_6'));

        var option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var result = params[0].name + '<br>';
                    params.forEach(function (item) {
                        result += item.seriesName + ': ' + item.value + ' 人<br>'; // 在这里添加公顷后缀
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
                }
            },
            series: [
                {
                    name: '割胶工人数',
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
            url: '/api/hainan-crops/rubber/getTappersCount',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 计算最大值和最小值
                var maxValue = Math.ceil(Math.max.apply(null, data));
                var minValue = Math.ceil(Math.min.apply(null, data));
                // 计算间隔
                var interval = Math.ceil((maxValue - minValue) / 5);

                option.yAxis.max = maxValue;
                option.yAxis.min = minValue;
                option.yAxis.interval = interval;
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
            url: '/api/hainan-crops/rubber/getAllRegionAvgPriceByMonth?month=10',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 解析数据
                var parsedData = [];
                for (var key in data) {
                    parsedData.push({
                        name: key,
                        value: data[key]
                    });
                }

                // 分别提取“全省”和其他数据
                var provinceData = parsedData.find(function (item) {
                    return item.name === '全 省';
                });

                var otherData = parsedData.filter(function (item) {
                    return item.name !== '全 省';
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
