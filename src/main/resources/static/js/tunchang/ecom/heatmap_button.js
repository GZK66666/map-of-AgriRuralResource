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
            var year = document.querySelector('.custom-btn.selected')?.textContent.trim() || '2021'; // 按钮没被选中使用默认值2021
            if (dataType == "landArea") {
                title.innerHTML = year + '屯昌耕地分布';
            } else if (dataType == "population") {
                title.innerHTML = year + '屯昌人口分布';
            }
        });
    });
})();

$('.options a').on('click', function () {
    var myChart = echarts.init(document.getElementById('chart_map'));

    var dataType = $(this).data('type');
    var year = document.querySelector('.custom-btn.selected')?.textContent.trim() || '2021'; // 按钮没被选中使用默认值2021
    var apiUrl = '';
    var text = "公顷";

    if (dataType === 'landArea') {
        apiUrl = '/api/ecom/getLandAreaByYear?year=' + year;
    } else if (dataType === 'population') {
        apiUrl = '/api/ecom/getPopulationByYear?year=' + year;
        text = "人";
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
            formatter: '{b}: {c}公顷',
        },
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
})