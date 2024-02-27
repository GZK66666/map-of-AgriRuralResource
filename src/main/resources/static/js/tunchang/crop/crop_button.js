let crops = ['天然橡胶', '槟榔'];
let curCropButtonIndex = 1;
document.getElementById("crop1").classList.add("selected"); // 默认第一个按钮被选中

document.getElementById("nextBtn").addEventListener("click", () => {
    if (curCropButtonIndex === 2) { // todo：目前只有两个crop，第二个后就不再更新，后续有更多的做滑动更新
        return;
    } else {
        curCropButtonIndex++;
        document.querySelector('.btn.custom-btn.selected').classList.remove('selected');
        document.getElementById("crop" + curCropButtonIndex).classList.add('selected');
    }

    updateCharts(crops[curCropButtonIndex-1]);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (curCropButtonIndex === 1) { // todo：目前只有两个crop，第一个之前就不再更新，后续有更多的做滑动更新
        return;
    } else {
        curCropButtonIndex--;
        document.querySelector('.btn.custom-btn.selected').classList.remove('selected');
        document.getElementById("crop" + curCropButtonIndex).classList.add('selected');
    }

    updateCharts(crops[curCropButtonIndex-1]);
});

document.querySelectorAll('.btn.custom-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        // 排除已经选中的按钮
        if (!button.classList.contains('selected') && !button.id.includes('prevBtn') && !button.id.includes('nextBtn')) {
            // 移除其他按钮的选中状态
            document.querySelectorAll('.btn.custom-btn').forEach(function (otherButton) {
                otherButton.classList.remove('selected');
            });

            // 将点击的按钮设为选中状态
            button.classList.add('selected');

            // 更新被选中的按钮下标
            curCropButtonIndex = parseInt(button.id.substring("crop".length), 10);

            var cropName = button.textContent.trim();
            updateCharts(cropName);
        }
    });
});

function updateCharts(cropName) {
    updateChart_1(cropName);
    updateChart_2(cropName);
    updateChart_3(cropName);
    updateChart_4(cropName);
    updateChart_5(cropName);
    updateChart_6(cropName);
    updateChart_7(cropName);
    update_heatmap(cropName);
}

function updateChart_1(cropName) {
    // 更新标题
    title = document.getElementById('left_1');
    title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + '屯昌历年' + cropName + '面积';

    // 更新图表
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

    url = '';
    max1 = 0;
    max2 = 0;
    interval1 = 0;
    interval2 = 0;
    if (cropName === '天然橡胶') {
        url = '/api/crop/rubber/getRubberArea';
        max1 = 40000;
        max2 = 1000;
        interval1 = 8000;
        interval2 = 200;
    } else if (cropName === '槟榔') {
        url = '/api/crop/betelNut/getBetelNutArea';
        max1 = 20000;
        max2 = 3000;
        interval1 = 5000;
        interval2 = 750;
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var r1 = data["年末面积"];
            var r2 = data["收获面积"];
            var r3 = data["新种面积"];

            option.series[0].data = Object.values(r1);
            option.series[1].data = Object.values(r2);
            option.series[2].data = Object.values(r3);

            option.yAxis[0].max = max1;
            option.yAxis[1].max = max2;
            option.yAxis[0].interval = interval1;
            option.yAxis[1].interval = interval2;

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

function updateChart_2(cropName) {
    // update title
    title = document.getElementById('left_2');
    title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + '屯昌县历年' + cropName + '产量';

    // update chart
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

    url = '';
    seriesName = '';
    if (cropName === '天然橡胶') {
        url = '/api/crop/rubber/getRubberProduction';
        seriesName = '天然橡胶产量';
    } else if (cropName === '槟榔') {
        url = '/api/crop/betelNut/getBetelNutProduction';
        seriesName = '槟榔产量';
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            option.series[0].data = data;
            option.series[0].name = seriesName;

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

function updateChart_3(cropName) {
    // update title
    title = document.getElementById('right_1');
    title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + '屯昌县' + cropName + '收购价格';

    // update chart
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

    url = '';
    if (cropName === '天然橡胶') {
        url = '/api/crop/rubber/getRubberPriceByYearAndMonth?';
        option.series[0].name = '天然橡胶收购价格';
    } else if (cropName === '槟榔') {
        url = '/api/crop/betelNut/getBetelNutPriceByYearAndMonth?';
        option.series[0].name = '槟榔收购价格';
    }
    // get date
    var date = document.getElementById('dLabel').textContent.trim();
    if (date === '2023') {
        url += 'year=2023&month=all'; // todo: replace hardcode when more year
    } else {
        var parts = date.split('-');
        var year = parts[0];
        var month = parts[1];
        url += 'year=' + year + '&month=' + month;
    }

    $.ajax({
        url: url,
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

function updateChart_4(cropName) {
    // update title
    title = document.getElementById('right_3');
    var name = '';
    if (cropName === '天然橡胶') {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + '屯昌县各镇天然橡胶企业情况';
    } else if (cropName === '槟榔') {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + '屯昌县各镇槟榔加工点情况';
    }

    // update chart
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

    url = '';
    if (cropName === '天然橡胶') {
        url = '/api/crop/rubber/getRubberEnterprise';
        option.series[0].name = '天然橡胶企业数量';
    } else if (cropName === '槟榔') {
        url = '/api/crop/betelNut/getBetelNutProcessingPoint';
        option.series[0].name = '槟榔加工点数量'
    }

    $.ajax({
        url: url,
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

function updateChart_5(cropName) {
    // update title
    title = document.getElementById('bottom_1');
    title.innerHTML = '<img src="../static/img/t_1.png" alt="">' + '屯昌县各镇' + cropName + '收购点情况';

    // update chart
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

    url = '';
    if (cropName === '天然橡胶') {
        url = '/api/crop/rubber/getRubberCollectionPoint';
    } else if (cropName === '槟榔') {
        url = '/api/crop/betelNut/getBetelNutCollectionPoint';
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var countData = Object.entries(data).map(([town, count], index) => {
                // 设置不同的颜色，可以根据需要修改颜色值
                var colors = ['#1694f1', '#e0cb6f', '#6490f0', '#a8d68e', '#dca0ac', '#61e5d9'];
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

function updateChart_6(cropName) {
    // update title
    title = document.getElementById('right_2');
    title.innerHTML = '<img src="../static/img/t_1.png" alt="">' + '屯昌县各镇' + cropName + '合作社情况';

    // update chart
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

    url = '';
    if (cropName === '天然橡胶') {
        url = '/api/crop/rubber/getRubberCooperative';
        option.series[0].name = '天然橡胶合作社数量';
    } else if (cropName === '槟榔') {
        url = '/api/crop/betelNut/getBetelNutCooperative';
        option.series[0].name = '槟榔合作社数量'
    }

    $.ajax({
        url: url,
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

function updateChart_7(cropName) {
    // update title
    var title = document.getElementById('bottom_2');
    var divElement = document.getElementById('chart_7_date_button');
    if (cropName === '天然橡胶') {
        title.innerHTML = '<img src="../static/img/t_1.png" alt="">' + '全省各市县天然橡胶月均价';
        divElement.style.display = 'block';
    } else if (cropName === '槟榔') {
        title.innerHTML = '<img src="../static/img/t_1.png" alt="">' + '全省槟榔收购均价';
        divElement.style.display = 'none'; // 隐藏日期按钮
    }

    // update chart
    if (cropName === '天然橡胶') {
        show_rubber();
    } else if (cropName === '槟榔') {
        show_betelNut();
    }
}

function show_rubber() {
    // 销毁之前的图表实例
    echarts.dispose(document.getElementById('chart_7'));

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

    var date = document.getElementById('dLabel1').textContent.trim();
    var parts = date.split('-');
    var month = parts[1];
    url = '/api/crop/rubber/getRubberAveragePriceByMonth?month=' + month;

    $.ajax({
        url: url,
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

// 槟榔的是折线图，单独处理
function show_betelNut() {
    // 销毁之前的图表实例
    echarts.dispose(document.getElementById('chart_7'));

    var myChart = echarts.init(document.getElementById('chart_7'));

    var option = {
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
            formatter: function (params) {
                var result = params[0].name + '<br>';
                params.forEach(function (item) {
                    result += item.value + ' 元/公斤<br>';
                });
                return result;
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLabel: {
                // interval: 5,  // 设置刻度标签全部显示
                // rotate: 0,   // 设置刻度标签旋转角度
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
                name: '槟榔均价',
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
        url: '/api/crop/betelNut/getBetelNutAvgPrice',
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

function update_heatmap(cropName) {
    // update heatmap button
    var aElements = document.querySelectorAll("#nav1 .options li a");
    if (cropName === '天然橡胶') {
        aElements[0].textContent = '天然橡胶收购点';
        aElements[0].setAttribute('data-type', '天然橡胶收购点');
        aElements[1].textContent = '天然橡胶合作社';
        aElements[1].setAttribute('data-type', '天然橡胶合作社');
        aElements[2].textContent = '天然橡胶企业';
        aElements[2].setAttribute('data-type', '天然橡胶企业');
    } else if (cropName === '槟榔') {
        aElements[0].textContent = '槟榔收购点';
        aElements[0].setAttribute('data-type', '槟榔收购点');
        aElements[1].textContent = '槟榔合作社';
        aElements[1].setAttribute('data-type', '槟榔合作社');
        aElements[2].textContent = '槟榔加工点';
        aElements[2].setAttribute('data-type', '槟榔加工点');
    }


    // update title
    var title = document.querySelector('.main_title .title-text');
    var dataType = document.querySelector("#nav1 .options li a.selected").getAttribute('data-type');
    title.innerHTML = '<img src="../static/img/t_3.png" alt="">' + '屯昌县' + dataType + '分布';

    // update chart
    var myChart = echarts.init(document.getElementById('chart_map'));

    var apiUrl = '/api/crop/rubber/getRubberCollectionPoint';
    if (dataType === '天然橡胶收购点') {
        apiUrl = '/api/crop/rubber/getRubberCollectionPoint';
    } else if (dataType === '天然橡胶合作社') {
        apiUrl = '/api/crop/rubber/getRubberCooperative';
    } else if (dataType === '天然橡胶企业') {
        apiUrl = '/api/crop/rubber/getRubberEnterprise';
    } else if (dataType === '槟榔收购点') {
        apiUrl = '/api/crop/betelNut/getBetelNutCollectionPoint';
    } else if (dataType === '槟榔合作社') {
        apiUrl = '/api/crop/betelNut/getBetelNutCooperative';
    } else if (dataType === '槟榔加工点') {
        apiUrl = '/api/crop/betelNut/getBetelNutProcessingPoint';
    }

    var option = {
        visualMap: {
            show: true,
            min: 0,
            max: 3000, // 根据实际数据范围设置
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
            data: [],
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
    }

    $.getJSON(apiUrl, function (data) {
        var minValue = 100000;
        var maxValue = 0;
        var townData = [];

        // 判断数据类型
        if (Array.isArray(data)) {
            // 如果数据是 List<Map<String, Double>>
            data.forEach(function (dataMap) {
                Object.keys(dataMap).forEach(function (townName) {
                    var value = dataMap[townName];

                    if (value > maxValue) {
                        maxValue = value;
                    }

                    if (value < minValue) {
                        minValue = value;
                    }

                    townData.push({ name: townName, value: value });
                });
            });
        } else if (typeof data === 'object') {
            // 如果数据是单个 Map<String, Double>
            townData = Object.keys(data).map(function (townName) {
                var value = data[townName];

                if (value > maxValue) {
                    maxValue = value;
                }

                if (value < minValue) {
                    minValue = value;
                }

                return { name: townName, value: value };
            });
        }

        option.series[0].data = townData;
        option.visualMap.min = minValue;
        option.visualMap.max = maxValue;

        myChart.setOption(option);
    });
}