function boatInit() {
    getWeather();
    toStep3();
}
var ifRain = false;
// 获取天气数据
function getWeather(lat, lon) {
    console.log('base', baseInfo);
    const appid = '0e0d49a0f614aa68285bd51ea6339f84';
    var ajaxObj = new XMLHttpRequest();
    ajaxObj.open(
        'get',
        `http://api.openweathermap.org/data/2.5/forecast?lat=36.859454&lon=174.5660387&appid=${appid}&units=metric`
    );
    ajaxObj.send();
    ajaxObj.onreadystatechange = function () {
        if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
            const res = JSON.parse(ajaxObj.responseText);
            console.log('数据返回成功', res);
            res.list.map((item, index) => {
                const date = item.dt_txt.split(' ')[0];
                const dateIndex = dateArr.indexOf(date);
                if (dateIndex !== -1) {
                    weatherData[dateIndex] = {
                        date,
                        temp: item.main.temp, // 温度
                        rain: item.rain, // 雨量（不一定有）
                        humidity: item.main.humidity, // 湿度
                        windSpeed: item.wind.speed, // 风速
                        // cityName: res.city.name, // 城市
                    };
                }
            });

            console.log('weatherData', weatherData);
            renderWea();
            renderSeat('seatLeft');
            renderSeat('seatRight');
            getSeatInfo();
            renderCc();
            ifRain && alert('The weather is not suitable');
        }
    };
}

function renderWea() {
    const weaHead = document.getElementById('weaHead');
    const day = dateArr.indexOf(baseInfo.schedDate);
    const nowWea = weatherData[day];
    console.log('now', nowWea);
    // 判断天气是否符合条件能够预定：
    if (!!nowWea.rain || nowWea.temp < 14) ifRain = true;

    let weaStr = `
    <div class="weaItem">
      <p>Boat:</p>
      <span>${baseInfo.boatName}</span>
    </div>
      <div class="weaItem">
        <p>Quantity:</p>
        <span>${baseInfo.peopleNum}</span>
      </div>
      <div class="weaItem">
        <p>Date:</p>
        <span>${baseInfo.schedDate}</span>
      </div>
      <div class="weaItem">
        <p>Time:</p>
        <span>${baseInfo.schedTime}</span>
      </div>
      <div class="weaItem">
        <p>Temperature:</p>
        <span>${nowWea.temp}</span>
      </div>
      <div class="weaItem">
        <p>Rain:</p>
        <span>${nowWea.rain ? nowWea.rain['3h'] : '--'}</span>
      </div>
      <div class="weaItem">
        <p>Humidity:</p>
        <span>${nowWea.humidity}</span>
      </div>
      <div class="weaItem">
        <p>Wind speed:</p>
        <span>${nowWea.windSpeed}</span>
      </div>`;
    weaHead.innerHTML = weaStr;
}

function renderSeat(id) {
    // 判断是哪一艘船，呈现不同的布局
    let boatRow = 7;
    let boatType = 0;
    if (boatName.indexOf(baseInfo.boatName) !== 0) {
        boatRow = 5;
        boatType = 1;
    }
    var seatDom = document.getElementById(id);
    var localSeat = JSON.parse(localStorage.getItem('boat')) || [];
    var rowStr = '';

    new Array(boatRow).fill('').map((item, index) => {
        // 有多少行
        var colStr = '';
        var colNum = 4;
        if (boatType === 0) {
            if (index > 1 && index < 5) {
                colNum = 6;
            } else if (index > 4) {
                colNum = 8;
            }
        } else {
            colNum = 2;
            if (index > 1 && index < 4) {
                colNum = 4;
            } else if (index > 3) {
                colNum = 6;
            }
        }

        new Array(colNum).fill('').map((col, i) => {
            // 每行有多少排
            // 判断该日期、时间的座位是否已被预定
            let enable = 'enable';
            localSeat.map((item) => {
                if (
                    item.name === baseInfo.boatName &&
                    item.date === baseInfo.schedDate &&
                    item.time === baseInfo.schedTime &&
                    index + 1 == item.row &&
                    i + 1 == item.col &&
                    id == item.lr
                ) {
                    enable = 'disable';
                }
            });
            colStr += `
            <span class="${enable} seatItem" data-row="${
                index + 1
            }" data-col="${i + 1}" data-lr="${id}"></span>
            `;
        });
        rowStr += `
        <div class="seatRow">
            ${colStr}
        </div>
        `;
    });
    seatDom.innerHTML = rowStr;
}
function renderCc() {
    const weaRightDom = document.getElementById('weaRight');
    let seatStr = '';
    let price = 0;
    seatInfo.map((item, index) => {
        price += item.price;
        seatStr += `<span>${item.row}Row${item.col}Seats</span>`;
    });
    let ccStr = `
    <h1>${baseInfo.boatName}</h1>
    <div class="ccCon">
        <div class="ccItem">
            <p>Selected seat:</p>
            <div>${seatStr}</div>
        </div>
        <div class="ccItem">
        <p>Total price:</p>
        <span>${price}$</span>
        </div>
    </div>`;
    weaRightDom.innerHTML = ccStr;
}
function getSeatInfo() {
    var seatItemDom = document.getElementsByClassName('seatItem');
    for (var i in seatItemDom) {
        seatItemDom[i].onclick = function () {
            // 添加点击事件
            const rowAttr = this.getAttribute('data-row');
            const colAttr = this.getAttribute('data-col');
            const lrAttr = this.getAttribute('data-lr');
            const classAttr = this.getAttribute('class');
            if (classAttr.indexOf('choiced') !== -1) {
                // 由选中->可用
                this.setAttribute('class', 'enable');
                seatInfo.map((item, index) => {
                    if (item.row === rowAttr && item.col === colAttr) {
                        seatInfo.splice(index, 1);
                    }
                });
            } else if (classAttr.indexOf('enable') !== -1) {
                // 由可用->选中
                if (seatInfo.length < baseInfo.peopleNum) {
                    // 判断是否超过人数
                    this.setAttribute('class', 'choiced');
                    seatInfo.push({
                        row: rowAttr,
                        col: colAttr,
                        price: rowAttr < 3 ? 30 : rowAttr < 6 ? 25 : 20,
                        date: baseInfo.schedDate,
                        time: baseInfo.schedTime,
                        lr: lrAttr,
                        name: baseInfo.boatName,
                    });
                } else {
                    alert('Choose more seats than number of people');
                }
            }
            renderCc();
        };
        seatItemDom[i].onmouseover = function () {
            const colAttr = this.getAttribute('data-col');
            const rowAttr = this.getAttribute('data-row');
            const tipStr = `
            <div class="tip" id="tip">
                <p>Row:${rowAttr}</p>
                <p>Column:${colAttr}</p>
                <p>Price:${rowAttr < 3 ? 30 : rowAttr < 6 ? 25 : 20}</p>
            </div>`;
            this.innerHTML = tipStr;
        };
        seatItemDom[i].onmouseout = function () {
            const colAttr = this.getAttribute('data-col');
            const rowAttr = this.getAttribute('data-row');
            this.innerHTML = '';
        };
    }
}

function toStep3() {
    const nextDom = document.getElementById('toStep3');
    // const prevDom = document.getElementById('toStep1');
    const conDom = document.getElementById('content');
    nextDom.onclick = function () {
        if (ifRain) {
            alert('The weather is not suitable');
        } else {
            conDom.innerHTML = step3Str;
            foodInit();
        }
    };
    // prevDom.onclick = function () {
    //     conDom.innerHTML = step1Str;
    //     baseInit();
    //     // 清空已选择座位的信息
    //     seatInfo = [];
    // };
}

// // 获取当前经纬度坐标
// getPosition()
//     .then((result) => {
//         // 返回结果示例：
//         // {latitude: 30.318030999999998, longitude: 120.05561639999999}
//         // 只取小数点后六位
//         let queryData = {
//             longitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
//             latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
//             channelType: '00',
//         };
//         console.log('经纬度坐标', queryData);
//         getWeather(queryData.latitude, queryData.longitude);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// // 获取当前经纬度坐标
// function getPosition() {
//     return new Promise((resolve, reject) => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 function (position) {
//                     let latitude = position.coords.latitude;
//                     let longitude = position.coords.longitude;
//                     let data = {
//                         latitude: latitude,
//                         longitude: longitude,
//                     };
//                     resolve(data);
//                 },
//                 function () {
//                     reject(arguments);
//                 }
//             );
//         } else {
//             reject('你的浏览器不支持当前地理位置信息获取');
//         }
//     });
// }
