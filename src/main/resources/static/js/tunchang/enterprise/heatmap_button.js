// 按钮选中和移除样式
(function() {
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

            // 更新热力图标题
            var title = document.querySelector('.main_title .title-text');
            var dataType = document.querySelector("#nav1 .options li a.selected").getAttribute('data-type');
            title.innerHTML = "屯昌" + dataType + "分布";

            // 更新热力图
            var myChart = echarts.init(document.getElementById('chart_map'));

            var apiUrl = '/api/enterprise/getFarmersProfessionalCooperativeByTown';
            if (dataType === '家庭农场') {
                apiUrl = '/api/enterprise/getFamilyFarmByTown';
            } else if (dataType === '农村集体经济组织') {
                apiUrl = '/api/enterprise/getCollectiveEconomicOrganizationByTown';
            } else if (dataType === '农业企业') {
                apiUrl = '/api/enterprise/getFarmEnterpriseByTown';
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

                option.series[0].data = townData;
                option.visualMap.min = minValue;
                option.visualMap.max = maxValue;

                myChart.setOption(option);
            });

        });
    });
})();