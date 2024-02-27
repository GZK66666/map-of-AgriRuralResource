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
            title.innerHTML = "2022年海南各市县天然橡胶" + dataType;

            // 更新热力图
            var myChart = echarts.init(document.getElementById('chart_map'));

            var apiUrl = '/api/hainan-crops/rubber/get2022EndYearAreaOrProduction?index=1';
            var suffix = "公顷";
            if (dataType === '总产量分布') {
                apiUrl = '/api/hainan-crops/rubber/get2022EndYearAreaOrProduction?index=2';
                suffix = "吨";
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
                            fontSize: 12,
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
})();