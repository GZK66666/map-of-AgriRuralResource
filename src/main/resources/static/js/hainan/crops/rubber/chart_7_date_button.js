document.addEventListener("DOMContentLoaded", function () {
    var dropdownItems = document.querySelectorAll('.dropdown-menu a[data-date1]');

    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var date = event.target.textContent.trim();
            var dropdownButton = document.getElementById('dLabel1');

            // 更新按钮文本
            dropdownButton.innerHTML = date + ' <span class="caret"></span>';

            // 在这里执行你的其他操作，如果需要的话
            updateChart7(date);
        });
    });
});

function updateChart7(date) {
    var myChart = echarts.init(document.getElementById('chart_7'));

    var option = {
        legend: {
            data: ['天然橡胶收购均价', '全省均价'],
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
                name: '天然橡胶收购均价',
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

    var parts = date.split('-');
    var month = parts[1];
    var apiUrl = '/api/hainan-crops/rubber/getAllRegionAvgPriceByMonth?month=' + month;

    $.ajax({
        url: apiUrl,
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
}