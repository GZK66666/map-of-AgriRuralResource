function aquafarming_update() {
    aquafarming_update_chart1();
    aquafarming_update_chart2();
    aquafarming_update_chart3();
    aquafarming_update_chart5();
    aquafarming_update_chart6();
}

function aquafarming_update_chart1() {
    // 更新title
    var title = document.getElementById('left_1');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年海水养殖面积情况';

    // 更新图表
    // 先摧毁之前的chart，再重新创建
    var myChart = echarts.init(document.getElementById('chart_1'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_1'));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 万亩<br>';
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
            left: '9%',
            right: '5%',
            top: '15%',
            bottom: '13%'
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
            min: 20,
            max: 35,
            interval: 3
        },
        series: [
            {
                name: '面积',
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
        url: '/api/hainan-crops/aquaFarming/getMaricultureArea',
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

function aquafarming_update_chart2() {
    var title = document.getElementById('left_2');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年淡水养殖面积情况';


    var myChart = echarts.init(document.getElementById('chart_2'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_2'));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 万亩<br>';
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
            left: '9%',
            right: '5%',
            top: '15%',
            bottom: '13%'
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
            min: 35,
            max: 50,
            interval: 3
        },
        series: [
            {
                name: '面积',
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
        url: '/api/hainan-crops/aquaFarming/getAquacultureArea',
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

function aquafarming_update_chart5() {
    var title = document.getElementById('left_3');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年海水养殖各类面积占比情况';

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_5'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_5'));

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万亩"
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
        url: '/api/hainan-crops/aquaFarming/getMaricultureAreaDistribution',
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

function aquafarming_update_chart3() {
    var title = document.getElementById('right_1');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年水产品总产量情况';

    var myChart = echarts.init(document.getElementById('chart_3'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_3'));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 万吨<br>'; // 在这里添加公顷后缀
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
            min: 160,
            max: 178,
            interval: 3
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
        url: '/api/hainan-crops/aquaFarming/getProduction',
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

function aquafarming_update_chart6() {
    var title = document.getElementById('right_2');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年海水产品总产量情况';
    var chart = document.getElementById('chart_6');
    chart.innerHTML = '<div id="chart_6_all" class="echart fl t_btn4" style="width:100%;height: 280px;cursor: pointer;"></div>'

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart_6_all'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_6_all'));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 万吨<br>'; // 在这里添加公顷后缀
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
            min: 125,
            max: 140,
            interval: 3
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
        url: '/api/hainan-crops/aquaFarming/getMaricultureProduction',
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