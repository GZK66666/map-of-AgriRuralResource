document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.left-button, .left-button2, .right-button');

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            window.location = '/tunchang-agriculture-bigdata/' + button.id;
        });
    });

    // 设置默认选中项
    var viewName = document.getElementById('viewName').textContent;
    if (viewName === 'ecom') {
        document.querySelector('.left-button').classList.add('selected');
    } else if (viewName === 'enterprise') {
        document.querySelector('.left-button2').classList.add('selected');
    } else if (viewName === 'cropIndustry') {
        document.querySelector('.right-button').classList.add('selected');
    }
});