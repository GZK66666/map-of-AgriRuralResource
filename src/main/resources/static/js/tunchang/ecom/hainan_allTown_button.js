// 按钮选中和移除样式
(function() {
    // 获取所有导航栏按钮元素
    var navButtons = document.querySelectorAll("#nav2 .options li a");

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

            var dataType = document.querySelector("#nav2 .options li a.selected").getAttribute('data-type');
            var year = document.querySelector('.custom-btn.selected')?.textContent.trim() || '2021'; // 按钮没被选中使用默认值2021
            updateTitle(year, dataType);
            updateMap(year, dataType);
        });
    });
})();


function updateTitle(year, dataType) {
    var title = document.getElementById('bottom_2');

    if (dataType == "agrochemical") {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '海南各市县农药施用量';
    } else if (dataType == "fertilizers") {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '海南各市县化肥施用量';
    } else if (dataType == "irrigatedArea") {
        title.innerHTML = '<img src="../static/img/t_4.png" alt="">' + year + '海南各市县农田有效灌溉面积';
    }
}

function updateMap(year, dataType) {
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