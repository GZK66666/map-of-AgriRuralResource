function rubber_update() {
    rubber_update_chart1();
}

function rubber_update_chart1() {
    var title = document.getElementById('left_1');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年海南天然橡胶面积情况';

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