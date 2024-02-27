// 年份滚动按钮
let years = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013];
let currentYearIndex = 0;
let currentYearButtonIndex = 1;
document.getElementById("year1").classList.add("selected"); // 默认第一个按钮被选中

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentYearButtonIndex === 6) { // 已经是最右边的按钮，更新中间的年份按钮
        if (currentYearIndex === 3) { // 最后一个年份就不再更新
            return;
        }

        currentYearIndex++;
        updateYearButtons();
    } else { // 否则更新选中选中状态
        currentYearButtonIndex++;
        document.querySelector('.btn.custom-btn.selected').classList.remove('selected');
        document.getElementById("year" + currentYearButtonIndex).classList.add('selected');
    }

    var dataType = document.querySelector("#nav1 .options li a.selected").getAttribute('data-type');
    var dataType2 = document.querySelector("#nav2 .options li a.selected").getAttribute('data-type');
    updateMapAndTitle(dataType, dataType2, years[currentYearIndex + currentYearButtonIndex - 1]);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentYearButtonIndex === 1) {
        if (currentYearIndex === 0) {
            return;
        }

        currentYearIndex--;
        updateYearButtons();
    } else {
        currentYearButtonIndex--;
        document.querySelector('.btn.custom-btn.selected').classList.remove('selected');
        document.getElementById("year" + currentYearButtonIndex).classList.add('selected');
    }

    var dataType = document.querySelector("#nav1 .options li a.selected").getAttribute('data-type');
    var dataType2 = document.querySelector("#nav2 .options li a.selected").getAttribute('data-type');
    updateMapAndTitle(dataType, dataType2, years[currentYearIndex + currentYearButtonIndex - 1]);
});

// 点击年份按钮时触发的操作
document.querySelectorAll('.btn.custom-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        // 排除已经选中的按钮
        if (!button.classList.contains('selected') && !button.id.includes('prevBtn') && !button.id.includes('nextBtn')) {
            // 获取点击的年份
            var selectedYear = parseInt(button.textContent.trim(), 10);

            // 移除其他按钮的选中状态
            document.querySelectorAll('.btn.custom-btn').forEach(function (otherButton) {
                otherButton.classList.remove('selected');
            });

            // 将点击的按钮设为选中状态
            button.classList.add('selected');

            // 更新被选中的按钮下标
            currentYearButtonIndex = parseInt(button.id.substring("year".length), 10);

            // 更新图表和标题
            var dataType = document.querySelector("#nav1 .options li a.selected").getAttribute('data-type');
            var dataType2 = document.querySelector("#nav2 .options li a.selected").getAttribute('data-type');
            updateMapAndTitle(dataType, dataType2, selectedYear);
        }
    });
});

function updateYearButtons() {
    document.getElementById("year1").innerHTML = '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + years[currentYearIndex];
    document.getElementById("year2").innerHTML = '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + years[currentYearIndex + 1];
    document.getElementById("year3").innerHTML = '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + years[currentYearIndex + 2];
    document.getElementById("year4").innerHTML = '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + years[currentYearIndex + 3];
    document.getElementById("year5").innerHTML = '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + years[currentYearIndex + 4];
    document.getElementById("year6").innerHTML = '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + years[currentYearIndex + 5];
}

function updateMapAndTitle(dataType, dataType2, year) {
    updateHeatMap(dataType, year);
    updateIndustryMap(year);
    updateIndustryOutcomeMap(year);
    updateMachineMap(year);
    updateFertilizersMap(year);
    updateHainanAllTownMap(year, dataType2);
    updateTitles(year, dataType, dataType2);
}

function updateHeatMap(dataType, year) {
    var myChart = echarts.init(document.getElementById('chart_map'));

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
            formatter: '{b}: {c}公顷',
        },
    }

    var text = '公顷';
    var apiUrl = '/api/ecom/getLandAreaByYear?year=' + year;
    if (dataType == 'population') {
        text = '人'
        apiUrl = '/api/ecom/getPopulationByYear?year=' + year;
    }
    $.getJSON(apiUrl, function (data) {
        option.series[0].data = data.map(item => {
            // 获取对象的键（城镇名称）
            var townName = Object.keys(item)[0];
            // 获取对象的值（耕地面积或人口）
            var value = item[townName];

            return { name: townName, value: value };
        });

        var values = data.map(item => Object.values(item)[0]);
        var max = Math.max(...values);
        var min = Math.min(...values);

        option.visualMap.max = max;
        option.visualMap.min = min;
        option.tooltip.formatter = '{b}: {c}' + text;

        myChart.setOption(option);
    });
}

function updateIndustryMap(year) {
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
        url: '/api/ecom/getIndustryIncomeByYear?year=' + year,
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
}

function updateIndustryOutcomeMap(year) {
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
        url: '/api/ecom/getIndustryOutcomeByYear?year=' + year,
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
}

function updateMachineMap(year) {
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
        url: '/api/ecom/getAgriculturalMachineryByYear?year=' + year,
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
}

function updateFertilizersMap(year) {
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
//                fontWeight: 'bold', // 标签字体加粗
                fontSize: 13
            }
        },
    };

    $.ajax({
        url: '/api/ecom/getFertilizersByYear?year=' + year,
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
}

function updateHainanAllTownMap(year, dataType) {
    var myChart = echarts.init(document.getElementById('chart_7'));

    var option = {
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
                type: 'bar'
            }
        ]
    };

    var apiUrl = '';
    var text = '';
    if (dataType == "agrochemical") {
        apiUrl = '/api/ecom/getAgrochemicalByYear?year=' + year;
        option.tooltip.formatter = "{b} : {c}吨";
    } else if (dataType == "fertilizers") {
        apiUrl = '/api/ecom/getAllFertilizersByYear?year=' + year;
        option.tooltip.formatter = "{b} : {c}吨";
    } else if (dataType == "irrigatedArea") {
        apiUrl = '/api/ecom/getAllIrrigatedAreaByYear?year=' + year;
        option.tooltip.formatter = "{b} : {c}公顷";
    }

    $.ajax({
        url: apiUrl,
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
}

function updateTitles(year, dataType, dataType2) {
    // 热力图
    title = document.querySelector('.main_title .title-text');
    title.innerHTML = year + '屯昌耕地分布';
    if (dataType == 'population') {
        title.innerHTML = year + '屯昌人口分布';
    }

    // 三产收入
    title = document.getElementById('left_1');
    title.innerHTML = '<img src="../static/img/t_1.png" alt="">' + year + '屯昌三产收入';

    // 各产业总产值
    title = document.getElementById('left_2');
    title.innerHTML = '<img src="../static/img/t_1.png" alt="">' + year + '屯昌农林牧渔业总产值构成';

    // 农机拥有量
    title = document.getElementById('right_1');
    title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '屯昌农机拥有量';

    // 化肥施用量
    title = document.getElementById('right_2');
    title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '屯昌化肥施用量';

    // 农药施用量
    title = document.getElementById('bottom_2');
    if (dataType2 == "agrochemical") {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '海南各市县农药施用量';
    } else if (dataType2 == "fertilizers") {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '海南各市县化肥施用量';
    } else if (dataType2 == "irrigatedArea") {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '海南各市县农田有效灌溉面积';
    }
}