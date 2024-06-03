function totalInit() {
    renderTotal();
    finish();
}

function renderTotal() {
    const totalConDom = document.getElementById('totalCon');
    const allPriceDom = document.getElementById('allPrice');
    let menuPrice = 0,
        menuStr = '',
        boatPrice = 0,
        boatStr = '';
    foodInfo.map((item, index) => {
        menuPrice += item.num * item.price;
        menuStr += `<p>${item.name}*${item.num}</p>`;
    });
    seatInfo.map((item, index) => {
        boatPrice += item.price;
        // 最后一个就不要加顿号了
        if (index === seatInfo.length - 1) {
            boatStr += `${item.row}Row${item.col}Seats`;
        } else {
            boatStr += `${item.row}Row${item.col}Seats、`;
        }
    });
    const totalStr = `
    <div class="toLeft">
        <h1>Ship position information</h1>
        <div class="toCon">
            <p>Boat name：${baseInfo.boatName}</p>
            <p>Selected seat：${boatStr ?? ''}</p>
            <p>Date：${baseInfo.schedDate}</p>
            <p>Time：${baseInfo.schedTime}</p>
            <p>Number of people：${baseInfo.peopleNum}</p>
            <span id="boatPrice">Boat price:${boatPrice ?? 0}$</span>
        </div>
    </div>
    <div class="toRight">
        <h1>Menu Information</h1>
        <div class="toCon">
            ${menuStr ?? ''}
            <span id="menuPrice">Menu price:${menuPrice ?? 0}$</span>
        </div>
    </div>`;
    totalConDom.innerHTML = totalStr;

    allPriceDom.innerHTML = ` Total price:${menuPrice + boatPrice || 0}$`;
}

function finish() {
    const finishDom = document.getElementById('finish');
    // const toStep3 = document.getElementById('toStep3');
    const conDom = document.getElementById('content');
    finishDom.onclick = function () {
        alert('Booking was successful');
        var localData = JSON.parse(localStorage.getItem('boat')) || [];
        localData.push(...seatInfo);
        console.log('追加', localData);
        localStorage.setItem('boat', JSON.stringify(localData));
    };
    // toStep3.onclick = function () {
    //     conDom.innerHTML = step3Str;
    //     foodInit();
    //     // 清空已选择座位的信息
    //     seatInfo = [];
    // };
}
