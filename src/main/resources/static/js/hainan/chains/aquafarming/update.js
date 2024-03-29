function aquafarming_update() {
    aquafarming_update_chart1();
    aquafarming_update_chart2();
    aquafarming_update_chart3();
    aquafarming_update_chart4();
    aquafarming_update_chart5();
    aquafarming_update_chart6();
    aquafarming_update_chart7();
    aquafarming_update_heatmap();
}

function aquafarming_update_chart1() {
    // 更新title
    var title = document.getElementById('left_1');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年水产品养殖面积及构成情况';

    // 更新图表
    // 先摧毁之前的chart，再重新创建
    echarts.dispose(document.getElementById('chart_1'));
    var myChart = echarts.init(document.getElementById('chart_1'));

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            },
            formatter: function (params) {
                var result = params[0].name + '<br>';
                var total = 0;
                params.forEach(function (item) {
                    result += item.seriesName + ': ' + item.value + ' 万亩<br>';
                    total += item.value;
                });
                result += '水产品养殖: ' + total.toFixed(2) + ' 万亩<br>';
                return result;
            }
        },
        legend: {
            data: ['海水养殖', '淡水养殖'],
            top: '8%',
            textStyle: {
                color: 'white',
                fontSize: '14'
            }
        },
        grid: {
            left: '4%',
            right: '5%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['2018', '2019', '2020', '2021', '2022'],
                axisLabel: {
                    color: 'white',
                    fontSize: 14
                }
            }
        ],
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: 'white',
                fontSize: 14
            },
        },
        series: [
            {
                name: '海水养殖',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '淡水养殖',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: []
            }
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/aquaFarming/getAreaAndComposition',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // 迭代Map中的键值对
            Object.entries(data).forEach(([key, value], index) => {
                if (key === '海水养殖') {
                    option.series[0].data = value;
                } else if (key === '淡水养殖') {
                    option.series[1].data = value;
                }
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

function aquafarming_update_chart2() {
    var title = document.getElementById('left_2');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年水产品产量及构成情况';


    echarts.dispose(document.getElementById('chart_2'));
    var myChart = echarts.init(document.getElementById('chart_2'));

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
            data: ['总产量', '海水产品', '淡水产品'],
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
                axisLabel: {
                    formatter: '{value}',
                    color: 'white'
                }
            },
        ],
        series: [
            {
                name: '总产量',
                type: 'bar',
                yAxisIndex: 0,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 万吨';
                    }
                },
                data: [],
            },
            {
                name: '海水产品',
                type: 'bar',
                yAxisIndex: 0,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 万吨';
                    }
                },
                data: []
            },
            {
                name: '淡水产品',
                type: 'bar',
                yAxisIndex: 0,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 万吨';
                    }
                },
                data: []
            },
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/aquaFarming/getProductionAndComposition',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var r1 = data["总产量"];
            var r2 = data["海水产品"];
            var r3 = data["淡水产品"];

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

function aquafarming_update_chart5() {
    var title = document.getElementById('left_3');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年海水养殖各类面积占比情况';

    // 基于准备好的dom，初始化echarts实例
    echarts.dispose(document.getElementById('chart_5'));
    var myChart = echarts.init(document.getElementById('chart_5'));

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
                color: 'white',
                fontSize: 14
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
                        color: 'white',  // 将文字颜色设置为白色
                        fontSize: 14
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
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年养殖水产品产量及构成';

    echarts.dispose(document.getElementById('chart_3'));
    var myChart = echarts.init(document.getElementById('chart_3'));

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            },
            formatter: "{a} <br/> {c}万吨"
        },
        legend: {
            data: ['海水养殖', '淡水养殖'],
            top: '8%',
            textStyle: {
                color: 'white',
                fontSize: '14'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                color: 'white',
                fontSize: 14
            }
        },
        yAxis: {
            type: 'category',
            data: ['2018', '2019', '2020', '2021', '2022'],
            axisLabel: {
                color: 'white',
                fontSize: 14
            }
        },
        series: [
            {
                name: '海水养殖',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '淡水养殖',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            }
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/aquaFarming/getAquacultureProductsProduction',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            option.series[0].data = data['海水养殖'];
            option.series[1].data = data['淡水养殖'];

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
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">近年捕捞水产品产量及构成';
    var chart = document.getElementById('chart_6');
    chart.innerHTML = '<div id="chart_6_all" class="echart fl t_btn4" style="width:100%;height: 280px;cursor: pointer;"></div>'

    // 基于准备好的dom，初始化echarts实例
    echarts.dispose(document.getElementById('chart_6_all'));
    var myChart = echarts.init(document.getElementById('chart_6_all'));

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // Use axis to trigger tooltip
                type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            },
            formatter: "{a} <br/> {c}万吨"
        },
        legend: {
            data: ['海水捕捞', '淡水捕捞'],
            top: '8%',
            textStyle: {
                color: 'white',
                fontSize: '14'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisLabel: {
                color: 'white',
                fontSize: 14
            }
        },
        yAxis: {
            type: 'category',
            data: ['2018', '2019', '2020', '2021', '2022'],
            axisLabel: {
                color: 'white',
                fontSize: 14
            }
        },
        series: [
            {
                name: '海水捕捞',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            },
            {
                name: '淡水捕捞',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: []
            }
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/aquaFarming/getHarvestProductsProduction',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            option.series[0].data = data['海水捕捞'];
            option.series[1].data = data['淡水捕捞'];

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

function aquafarming_update_chart4() {
    var title = document.getElementById('right_3');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">2022年渔业分类产值情况';

    // 基于准备好的dom，初始化echarts实例
    echarts.dispose(document.getElementById('chart_4'));
    var myChart = echarts.init(document.getElementById('chart_4'));

    var option = {
        grid: {
            left: '15%',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: "{b} : {c}万元"
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                interval: 0,  // 设置刻度标签全部显示
                rotate: 45,   // 设置刻度标签旋转角度
                textStyle: {
                    color: 'white',  // 设置刻度标签文字颜色
                    fontSize: 14
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: 'white',
                fontSize: 14
            }
        },
        series: [
            {
                name: '产值',
                data: [],
                type: 'bar',
            }
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/aquaFarming/getFisheryClassificationOutput',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // 将Map转换为数组形式，方便后续操作
            var dataArray = Object.entries(data);

            // 按降序排序
            dataArray.sort(function (a, b) {
                return b[1] - a[1];
            });

            // 设置不同的颜色，可以根据需要修改颜色值
            var colors = ['#1694f1', '#e0cb6f', '#6490f0', '#a8d68e', '#dca0ac'];

            // 将排序后的数据设置到 option 中，并为每个数据项设置不同的颜色
            option.xAxis.data = dataArray.map(function (item) {
                return item[0];
            });
            option.series[0].data  = dataArray.map(function (item, index) {
                return {
                    value: item[1],
                    // 从颜色数组中取出对应的颜色
                    // itemStyle: { normal: { color: colors[index % colors.length] } }
                };
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

function aquafarming_update_chart7() {
    var title = document.getElementById('bottom_2');
    title.innerHTML = '<img src="../../static/img/t_4.png" alt="">2022年各品类产量情况';
    var divElement = document.getElementById('chart_7_date_button');
    divElement.style.display = 'none';

    // 基于准备好的dom，初始化echarts实例
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
            formatter: "{b} : {c}万吨"
        },
        xAxis: {
            type: 'category',
            data: [],
            axisLabel: {
                interval: 0,  // 设置刻度标签全部显示
                textStyle: {
                    color: 'white',  // 设置刻度标签文字颜色
                    fontSize: 14
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: 'white',
                fontSize: 14
            }
        },
        series: [
            {
                name: '产量',
                data: [],
                type: 'bar',
                barWidth: '40%'
            }
        ]
    };

    $.ajax({
        url: '/api/hainan-crops/aquaFarming/getProductionDistribution',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // 将Map转换为数组形式，方便后续操作
            var dataArray = Object.entries(data);

            // 按降序排序
            dataArray.sort(function (a, b) {
                return b[1] - a[1];
            });

            // 设置不同的颜色，可以根据需要修改颜色值
            var colors = ['#1694f1', '#e0cb6f', '#6490f0', '#a8d68e', '#dca0ac'];

            // 将排序后的数据设置到 option 中，并为每个数据项设置不同的颜色
            option.xAxis.data = dataArray.map(function (item) {
                return item[0];
            });
            option.series[0].data  = dataArray.map(function (item, index) {
                return {
                    value: item[1],
                    // 从颜色数组中取出对应的颜色
                    itemStyle: { normal: { color: colors[index % colors.length] } }
                };
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

function aquafarming_update_heatmap() {
    var title = document.getElementById('mapTitle');
    title.innerHTML = '<img src="../../static/img/t_3.png" alt="">2022年各市县水产养殖情况';
    var nav1 = document.getElementById('nav1');
    nav1.innerHTML = '<ul class="options">\n' +
        '                        <li><a data-type="海水养殖面积">海水养殖面积</a></li>\n' +
        '                        <li><a data-type="淡水养殖面积">淡水养殖面积</a></li>\n' +
        '                        <li><a data-type="海水养殖产量">海水养殖产量</a></li>\n' +
        '                        <li><a data-type="淡水养殖产量">淡水养殖产量</a></li>\n' +
        '                    </ul>'
    listen_aquaFarming_heatmap_button();


    // 基于准备好的dom，初始化echarts实例
    echarts.dispose(document.getElementById('chart_map'));
    var myChart = echarts.init(document.getElementById('chart_map'));

    // 发送请求获取后端数据
    $.ajax({
        url: '/api/hainan-crops/aquaFarming/getDistribution?index=1', // 默认显示海水养殖面积
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
                    fontSize: 14,
                },
                itemStyle: {
                    opacity: 1,
                    borderWidth: 0.5,
                },
            }],
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}万亩',
            },
        });
    }

    // 使用刚指定的配置项和数据显示图表。
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function listen_aquaFarming_heatmap_button() {
    // 获取所有导航栏按钮元素
    var navButtons = document.querySelectorAll("#nav1 .options li a");

    // 默认选中第一个按钮
    navButtons[0].classList.add("selected");

    // 为每个按钮添加点击事件处理程序
    navButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            // 移除所有按钮的选中样式
            navButtons.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            // 将当前点击的按钮设置为选中样式
            button.classList.add("selected");

            // 更新热力图
            var myChart = echarts.init(document.getElementById('chart_map'));

            var apiUrl = '/api/hainan-crops/aquaFarming/getDistribution?index=1';
            var suffix = "万亩";
            var dataType = document.querySelector("#nav1 .options li a.selected").getAttribute('data-type');
            if (dataType === '淡水养殖面积') {
                apiUrl = '/api/hainan-crops/aquaFarming/getDistribution?index=2';
            } else if (dataType === '海水养殖产量') {
                apiUrl = '/api/hainan-crops/aquaFarming/getDistribution?index=3';
                suffix = '万吨';
            } else if (dataType === '淡水养殖产量') {
                apiUrl = '/api/hainan-crops/aquaFarming/getDistribution?index=4';
                suffix = '万吨';
            }

            $.ajax({
                url: apiUrl,
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
                    showProvince(townData, maxArea, suffix);
                },
                error: function (error) {
                    console.log('Failed to fetch data:', error);
                }
            });

            function showProvince(townData, max, suffix) {
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
                            fontSize: 14,
                        },
                        itemStyle: {
                            opacity: 1,
                            borderWidth: 0.5,
                        },
                    }],
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}: {c}' + suffix,
                    },
                });
            }
        });
    });
}