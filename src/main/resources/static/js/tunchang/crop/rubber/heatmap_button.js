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
            title.innerHTML = "屯昌县" + dataType + "分布";

            // 更新热力图
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

        });
    });
})();