function foodInit() {
    renderFoodList();
    operateFood();
    toStep4();
}

function renderFoodList() {
    const foodConDom = document.getElementById('foodLeft');
    let foodStr = '';
    foodArr.map((item, index) => {
        foodStr += `
    <div class="foList">
      <img name="referrer" content="no-referrer" src=${item.img} alt="">
      <div class="foTabel">
        <h3>
          <b>${item.name}</b>
          <b>${item.price}$</b>
        </h3>
        <p>${item.desc}</p>
        <span>Type：${item.type}</span>
        <div class="foodBtn">
          <div class="add">+</div>
          <div class="foodNum">0</div>
          <div class="reduce">-</div>
        </div>
      </div>
    </div>`;
    });
    foodConDom.innerHTML = foodStr;
}

function operateFood() {
    const btnDom = document.getElementsByClassName('foodBtn');
    const addDom = document.getElementsByClassName('add');
    const numDom = document.getElementsByClassName('foodNum');
    const reduceDom = document.getElementsByClassName('reduce');
    for (var i = 0; i < addDom.length; i++) {
        (function (i) {
            addDom[i].onclick = function () {
                numDom[i].innerHTML++;
                // 获取选择了哪个食物
                if (foodInfo.length > 0) {
                    let lock = false;
                    foodInfo.map((item, index) => {
                        if (item.name === foodArr[i].name) {
                            item.num++;
                            lock = true;
                        }
                    });
                    if (!lock) {
                        foodInfo.push({
                            ...foodArr[i],
                            num: 1,
                        });
                    }
                } else {
                    foodInfo.push({
                        ...foodArr[i],
                        num: 1,
                    });
                }
                getTotalPrice();
            };
            reduceDom[i].onclick = function () {
                if (numDom[i].innerHTML > 0) {
                    numDom[i].innerHTML--;
                    // 获取选择了哪个食物
                    if (foodInfo.length > 0) {
                        foodInfo.map((item, index) => {
                            if (item.name === foodArr[i].name) {
                                if (item.num === 1) {
                                    foodInfo.splice(index, 1);
                                } else {
                                    item.num--;
                                }
                            }
                        });
                    }
                } else {
                    alert('The minimum number that can be selected is 0');
                }
                getTotalPrice();
            };
        })(i);
    }
}

function getTotalPrice() {
    const totalDom = document.getElementById('totalPrice');
    var total = 0;
    foodInfo.map((item) => {
        total += item.num * item.price;
    });
    totalDom.innerHTML = total + '$';
}

function toStep4() {
    const nextDom = document.getElementById('3toStep4');
    // const prevDom = document.getElementById('3toStep2');
    const conDom = document.getElementById('content');
    nextDom.onclick = function () {
        conDom.innerHTML = step4Str;
        totalInit();
    };
    // prevDom.onclick = function () {
    //     conDom.innerHTML = step2Str;
    //     boatInit();
    // };
}
