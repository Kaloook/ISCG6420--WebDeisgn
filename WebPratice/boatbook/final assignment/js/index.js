baseInit();
function baseInit() {
    getBaseInfo();
    toStep2();
}

function getBaseInfo() {
    // 获取人数
    const peopleDom = document.getElementById('peopleNum');
    peopleDom.onchange = function (e) {
        baseInfo.peopleNum = e.target.value;
        console.log('ba', baseInfo);
    };
    // 获取日期
    const dateDom = document.getElementById('schedDate');
    let dateOpt = '';
    dateArr.map((item) => {
        dateOpt += `<option value=${item}>${item}</option>`;
    });
    dateDom.innerHTML = dateOpt;
    dateDom.onchange = function (e) {
        baseInfo.schedDate = e.target.value;
    };
    // 获取时间
    const timeDom = document.getElementById('schedTime');
    let timeOpt = '';
    schedTime.map((item) => {
        timeOpt += `<option value=${item}>${item}</option>`;
    });
    timeDom.innerHTML = timeOpt;
    timeDom.onchange = function (e) {
        baseInfo.schedTime = e.target.value;
    };
    // 获取船名
    const boatDom = document.getElementById('boatName');
    let boatOpt = '';
    boatName.map((item) => {
        boatOpt += `<option value=${item}>${item}</option>`;
    });
    boatDom.innerHTML = boatOpt;
    boatDom.onchange = function (e) {
        baseInfo.boatName = e.target.value;
    };
}

function toStep2() {
    const nextDom = document.getElementById('toStep2');
    const conDom = document.getElementById('content');
    nextDom.onclick = function () {
        conDom.innerHTML = step2Str;
        boatInit();
    };
}
