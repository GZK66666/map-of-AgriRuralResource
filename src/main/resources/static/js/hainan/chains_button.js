// 年份滚动按钮
let chains = [ "水稻", "冬季瓜菜", "水产养殖", "文昌鸡", "天然橡胶", "地瓜", "南繁种业",
    "甘蔗", "胡椒", "咖啡", "芒果", "荔枝", "火龙果", "凤梨", "蜜瓜", "榴莲", "茶" ];
let currentChainsStartIndex = 0;
// 默认第五个按钮被选中
let currentChainsButtonIndex = 5;
document.getElementById("chain5").classList.add("selected");

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentChainsButtonIndex === 6) { // 已经是最右边的按钮，更新中间的产业按钮
        if (currentChainsStartIndex === 11) { // 最后一个产业就不再更新
            return;
        }

        currentChainsStartIndex++;
        updateChainsButtons();
    } else { // 否则更新选中选中状态
        currentChainsButtonIndex++;
        document.querySelector('.btn.custom-btn.selected').classList.remove('selected');
        document.getElementById("chain" + currentChainsButtonIndex).classList.add('selected');
    }

    updateMapAndTitle(chains[currentChainsStartIndex + currentChainsButtonIndex - 1]);
});

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentChainsButtonIndex === 1) {
        if (currentChainsStartIndex === 0) {
            return;
        }

        currentChainsStartIndex--;
        updateChainsButtons();
    } else {
        currentChainsButtonIndex--;
        document.querySelector('.btn.custom-btn.selected').classList.remove('selected');
        document.getElementById("chain" + currentChainsButtonIndex).classList.add('selected');
    }

    updateMapAndTitle(chains[currentChainsStartIndex + currentChainsButtonIndex - 1]);
});

// 点击年份按钮时触发的操作
document.querySelectorAll('.btn.custom-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        // 排除已经选中的按钮
        if (!button.classList.contains('selected') && !button.id.includes('prevBtn') && !button.id.includes('nextBtn')) {
            // 获取点击的年份
            var chain = button.textContent.trim();

            // 移除其他按钮的选中状态
            document.querySelectorAll('.btn.custom-btn').forEach(function (otherButton) {
                otherButton.classList.remove('selected');
            });

            // 将点击的按钮设为选中状态
            button.classList.add('selected');

            // 更新被选中的按钮下标
            currentChainsButtonIndex = parseInt(button.id.substring("chain".length), 10);

            // 更新图表和标题
            updateMapAndTitle(chain);
        }
    });
});

function updateChainsButtons() {
    document.getElementById("chain1").innerHTML = '<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> ' + chains[currentChainsStartIndex];
    document.getElementById("chain2").innerHTML = '<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> ' + chains[currentChainsStartIndex + 1];
    document.getElementById("chain3").innerHTML = '<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> ' + chains[currentChainsStartIndex + 2];
    document.getElementById("chain4").innerHTML = '<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> ' + chains[currentChainsStartIndex + 3];
    document.getElementById("chain5").innerHTML = '<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> ' + chains[currentChainsStartIndex + 4];
    document.getElementById("chain6").innerHTML = '<span class="glyphicon glyphicon-tree-conifer" aria-hidden="true"></span> ' + chains[currentChainsStartIndex + 5];
}

function updateMapAndTitle(chain) {
    switch (chain) {
        case '天然橡胶':
            rubber_update();
            break;
        case '水产养殖':
            aquafarming_update();
            break;
        default:
            break;
    }
}