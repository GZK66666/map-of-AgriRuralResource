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
            grid: {
                top: '30%',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: [],
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    textStyle: {
                        color: 'white'
                    }
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: '总量',
                    min: 0,
                    max: 1200,
                    interval: 200,
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
                    name: '新增数量',
                    min: 0,
                    max: 300,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value}',
                        color: 'white'
                    },
                    nameTextStyle: {
                        color: 'white'
                    }
                }
            ],
            legend: {
                top: '8%',
                data: [{
                    name: '农民专业合作社总量',
                    textStyle: {
                        color: '#ffffff'
                    }
                }, {
                    name: '农民专业合作社新增数量',
                    textStyle: {
                        color: '#ffffff'
                    }
                }]
            },
            series: [
                {
                    name: '农民专业合作社总量',
                    data: [],
                    type: 'bar',
                    yAxisIndex: 0,
                },
                {
                    name: '农民专业合作社新增数量',
                    data: [],  // 折线图的数据
                    type: 'line',
                    symbol: 'circle',  // 折线上的标记点类型
                    symbolSize: 8,  // 标记点的大小
                    itemStyle: {
                        color: '#fccb00'  // 折线的颜色
                    },
                    yAxisIndex: 1,
                }
            ]
        };

        $.ajax({
            url: '/api/enterprise/getFarmersProfessionalCooperativeByYear',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 解析数据
                var totalData = data[0].map(function (item) {
                    return {
                        name: Object.keys(item)[0],
                        value: item[Object.keys(item)[0]]
                    };
                });

                var incrData = data[1].map(function (item) {
                    return {
                        name: Object.keys(item)[0],
                        value: item[Object.keys(item)[0]]
                    };
                });

                // 将排序后的数据设置到 option 中
                option.xAxis.data = totalData.map(function (item) {
                    return item.name;
                });

                option.series[0].data = totalData.map(function (item) {
                    return item.value;
                });

                option.series[1].data = incrData.map(function (item) {
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

    //echart_2
    function echart_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_2'));

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}家"
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
            url: '/api/enterprise/getFarmersProfessionalCooperativeByIndustry',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var countData = data.map((item, index) => {
                    // 获取对象的键
                    var industry = Object.keys(item)[0];
                    // 获取对象的值
                    var count = item[industry];

                    // 设置不同的颜色，可以根据需要修改颜色值
                    var colors = ['#1694f1', '#e0cb6f', '#a8d68e', '#6490f0', '#dca0ac'];
                    var color = colors[index % colors.length];

                    return { name: industry, value: count, itemStyle: { normal: { color: color } } };
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

    // echart_map屯昌地图
    function echart_map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_map'));

        // 发送请求获取后端数据
        $.ajax({
            url: '/api/enterprise/getFarmersProfessionalCooperativeByTown',
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
            grid: {
                top: '20%',
                bottom: '19%'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
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
            legend: {
                top: '8%',
                data: [{
                    name: '农业企业总量',
                    textStyle: {
                        color: '#ffffff'
                    }
                }, {
                    name: '农业企业新增数量',
                    textStyle: {
                        color: '#ffffff'
                    }
                }]
            },
            series: [
                {
                    name: '农业企业总量',
                    data: [],
                    type: 'bar',
                },
                {
                    name: '农业企业新增数量',
                    data: [],  // 折线图的数据
                    type: 'line',
                    symbol: 'circle',  // 折线上的标记点类型
                    symbolSize: 8,  // 标记点的大小
                    itemStyle: {
                        color: '#fccb00'  // 折线的颜色
                    }
                }
            ]
        };

        $.ajax({
            url: '/api/enterprise/getFarmEnterpriseByYear',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 解析数据
                var totalData = data[0].map(function (item) {
                    return {
                        name: Object.keys(item)[0],
                        value: item[Object.keys(item)[0]]
                    };
                });

                var incrData = data[1].map(function (item) {
                    return {
                        name: Object.keys(item)[0],
                        value: item[Object.keys(item)[0]]
                    };
                });

                // 将排序后的数据设置到 option 中
                option.xAxis.data = totalData.map(function (item) {
                    return item.name;
                });

                option.series[0].data = totalData.map(function (item) {
                    return item.value;
                });

                option.series[1].data = incrData.map(function (item) {
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

    function echart_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_4'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}家"
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
            url: '/api/enterprise/getFamilyFarmByIndustry',
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
                    if (industry === '养殖业') {
                        color = '#1694f1';
                    } else if (industry === '种养结合') {
                        color = '#a8d68e';
                    } else if (industry === '种植业') {
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

    // 屯昌人均收入消费概览
    function echart_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_5'));

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
            legend: {
                top: '6%',
                data: [{
                    name: '家庭农场总量',
                    textStyle: {
                        color: '#ffffff'
                    }
                }, {
                    name: '家庭农场新增数量',
                    textStyle: {
                        color: '#ffffff'
                    }
                }]
            },
            series: [
                {
                    name: '家庭农场总量',
                    data: [],
                    type: 'bar',
                },
                {
                    name: '家庭农场新增数量',
                    data: [],  // 折线图的数据
                    type: 'line',
                    symbol: 'circle',  // 折线上的标记点类型
                    symbolSize: 8,  // 标记点的大小
                    itemStyle: {
                        color: '#fccb00'  // 折线的颜色
                    }
                }
            ]
        };

        $.ajax({
            url: '/api/enterprise/getFamilyFarmByYear',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // 解析数据
                var totalData = data[0].map(function (item) {
                    return {
                        name: Object.keys(item)[0],
                        value: item[Object.keys(item)[0]]
                    };
                });

                var incrData = data[1].map(function (item) {
                    return {
                        name: Object.keys(item)[0],
                        value: item[Object.keys(item)[0]]
                    };
                });

                // 将排序后的数据设置到 option 中
                option.xAxis.data = totalData.map(function (item) {
                    return item.name;
                });

                option.series[0].data = totalData.map(function (item) {
                    return item.value;
                });

                option.series[1].data = incrData.map(function (item) {
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

    function echart_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_6'));

        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}家"
            },
            legend: {
                orient: 'horizontal',
                left: 'center',
                top: '80%',
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
            url: '/api/enterprise/getFarmEnterpriseByIndustry',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var countData = data.map((item, index) => {
                    // 获取对象的键
                    var industry = Object.keys(item)[0];
                    // 获取对象的值
                    var count = item[industry];

                    // 设置不同的颜色，可以根据需要修改颜色值
                    var colors = ['#1694f1', '#e0cb6f', '#6490f0', '#a8d68e', '#dca0ac'];
                    var color = colors[index % colors.length];

                    return { name: industry, value: count, itemStyle: { normal: { color: color } } };
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

    function echart_7() {
        var chart_7_1 = echarts.init(document.getElementById('chart_7_1'));
        var chart_7_2 = echarts.init(document.getElementById('chart_7_2'));
        var chart_7_3 = echarts.init(document.getElementById('chart_7_3'));
        var chart_7_4 = echarts.init(document.getElementById('chart_7_4'));


        var farmersProfessionalCooperative = 1100;
        var enterprise = 348;
        var collectiveEconomicOrganization = 48;
        var familyFarm = 40;
        var total = 1536;

        var color = ['#1694f1', '#a8d68e', '#e0cb6f', '#6490f0', '#dca0ac'];

        function newOption(count, name, color) {
            option = {
                title: {
                    text: name,
                    left: 'center',
                    top: 'bottom',
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
                            formatter: function (params) {
                                return [
                                    '{a|' + count + '家}',
                                    '{b|占比' + Math.round(count / total * 100) + '%}'
                                ].join('\n');
                            },
                            rich: {
                                a: {
                                    fontSize: 20,
                                    color: '#fff',
                                },
                                b: {
                                    color: '#aaa',
                                    fontSize: 12,
                                    lineHeight: 30
                                },
                            }
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

            return option;
        }

        chart_7_1.setOption(newOption(farmersProfessionalCooperative, '农民专业合作社', color[0]));
        chart_7_2.setOption(newOption(enterprise, '农业企业', color[1]));
        chart_7_3.setOption(newOption(collectiveEconomicOrganization, '农业集体经济组织', color[2]));
        chart_7_4.setOption(newOption(familyFarm, '家庭农场', color[3]));
    }


});
