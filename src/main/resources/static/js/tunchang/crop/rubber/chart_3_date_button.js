document.addEventListener("DOMContentLoaded", function () {
    var dropdownItems = document.querySelectorAll('.dropdown-menu a[data-year], .dropdown-menu a[data-date]');

    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var selectedDate = event.target.getAttribute('data-date') || '';
            var crop = document.querySelector('.custom-btn.selected').textContent.trim();

            // 更新按钮文本
            var dropdownButton = document.getElementById('dLabel');
            dropdownButton.innerHTML = selectedDate + ' <span class="caret"></span>';

            // 更新地图
            updateChart3(crop, selectedDate);
        });
    });
});

function updateChart3(crop, date) {
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

    var apiUrl = '';
    // set by crop
    if (crop === '天然橡胶') {
        apiUrl = '/api/crop/rubber/getRubberPriceByYearAndMonth?';
    } else if (crop === '槟榔') {
        apiUrl = '/api/crop/betelNut/getBetelNutPriceByYearAndMonth?';
    }
    // set by date
    if (date === '2023') {
        apiUrl += 'year=2023&month=all'; // todo: replace hardcode when more year
    } else {
        var parts = date.split('-');
        var year = parts[0];
        var month = parts[1];
        apiUrl += 'year=' + year + '&month=' + month;
    }

    $.ajax({
        url: apiUrl,
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
}
