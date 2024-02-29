function aquafarming_update() {
    aquafarming_update_chart1();
    aquafarming_update_chart2();
}

function aquafarming_update_chart1() {
    // 更新title
    var title = document.getElementById('left_1');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年海南海水养殖面积情况';

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
            min: 0,
            max: 40,
            interval: 8
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
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年海南淡水养殖面积情况';


    var myChart = echarts.init(document.getElementById('chart_2'));
    myChart.dispose();
    myChart = echarts.init(document.getElementById('chart_2'));
    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 万亩<br>'; // 在这里添加公顷后缀
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
            min: 38,
            max: 48,
            interval: 2
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
                name: '面积',
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
        url: '/api/hainan-crops/aquaFarming/getAquacultureArea',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            option.series[0].data = data;
            console.log(data);

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