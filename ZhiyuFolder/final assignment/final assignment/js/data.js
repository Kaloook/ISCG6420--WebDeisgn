// 船名
var boatName = ['Tere Boat', 'Nui Boat'];
// 预定时间
var schedTime = ['10am', '2pm'];
// 未来四天内日期
var dateArr = [getNowDate(0), getNowDate(-1), getNowDate(-2), getNowDate(-3)];
// 天气数据
var weatherData = [];
// 基础信息：人数、日期、时间、船名
var baseInfo = {
    peopleNum: 1,
    schedDate: getNowDate(0),
    schedTime: schedTime[0],
    boatName: boatName[0],
};
// 已选择的船座位信息
var seatInfo = [];

// 已选择食物信息
var foodInfo = [];

/**
 * 获取时间
 * @param {number} day -1表示未来天数，0为当前，1为之前天数
 * @returns yy-mm-ss
 */
function getNowDate(day) {
    var beginDate;
    var curr_time = new Date();
    var week_time = new Date(curr_time.getTime() - 1000 * 60 * 60 * 24 * day);
    var curyear = week_time.getFullYear();
    var curmonth = week_time.getMonth() + 1;
    curmonth = curmonth > 9 ? curmonth.toString() : '0' + curmonth.toString();
    var curday = week_time.getDate();
    curday = curday > 9 ? curday.toString() : '0' + curday.toString();
    beginDate = curyear + '-' + curmonth + '-' + curday;
    return beginDate;
}

// 菜品信息
var foodArr = [
    {
        name: 'Viennese Apfelstrudel',
        desc: 'Germans may argue that the Strudel belongs to them, but Austria has wholeheartedly taken to the sweet crusty Apfelstrudel, which is counted among their national foods',
        type: 'Dessert',
        price: 10,
        img: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2018/07/viennese-austrian1.jpg',
    },
    {
        name: 'Wiener Schnitzel',
        desc: 'If there is one dish that is synonymous with Austrian cooking it is the Schnitzel! Known as the Wiener Schnitzel or the Vienna Schnitzel, it is counted among the Austrian national food dishes',
        type: 'Dessert',
        price: 12,
        img: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2018/07/wiener-austrian.jpg',
    },
    {
        name: 'Vienna Sausage',
        desc: 'The Vienna sausage is bound to feature in your search for authentic Austrian food. Eastern European cuisine is dominated by the use of meats and the sausage is one of the favourite foods of Austrians',
        type: 'Dessert',
        price: 15,
        img: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2018/07/Vienna-austrian.jpg',
    },
    {
        name: 'Knödel',
        desc: 'World over various cuisines have their own form of dumplings and Knödel is the form of dumpling that is popular all across Eastern Europe',
        type: 'Meat',
        price: 20,
        img: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2018/07/knodel-austrian.jpg',
    },
    {
        name: 'Tafelspitz',
        desc: 'Tafelspitz is a typical Austrian food that is found as a main course in many restaurants across the country. A classic dish, it is made up of beef boiled in a broth of vegetables and spices',
        type: 'Dessert',
        price: 13,
        img: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2018/07/tafelsplitz-austrian.jpg',
    },
    {
        name: 'Tiroler Gröstl',
        desc: 'The Tiroler Gröstl is comfort food at its best! Among the most common traditional Austrian food in Vienna, it is more common in the Austrian Alps',
        type: 'Salad',
        price: 20,
        img: 'https://assets.traveltriangle.com/blog/wp-content/uploads/2018/07/tiroler-austrain.jpg',
    },
];

// 第一步的html结构
var step1Str = `<div class="step">
<div>1</div>
<p>Select Basic Information</p>
</div>
<div class="boat">
<div class="inputBox">
  <p>Number of people:</p>
  <input id="peopleNum" value="1" type="number" max="10" min="1">
</div>
<div class="inputBox">
  <p>Date:</p>
  <select id="schedDate">
  </select>
</div>
<div class="inputBox">
  <p>Time:</p>
  <select id="schedTime">
  </select>
</div>
<div class="inputBox">
  <p>Boat name:</p>
  <select id="boatName">
  </select>
</div>
</div>
<div class="nextBox">
<div class="next" id="toStep2">Next step</div>
</div>`;

// 第二步的html结构
var step2Str = `<div class="step">
<div>2</div>
<p>Choose a seat</p>
</div>
<div class="boat">
<div class="weaHead" id="weaHead">
</div>
<div class="weaCon">
  <div class="weaLeft">
    <div class="seatHead">
      <div>
        <span class="enable"></span>
        <p>Available</p>
      </div>
      <div>
        <span class="choiced"></span>
        <p>Selected</p>
      </div>
      <div>
        <span class="disable"></span>
        <p>Disabled</p>
      </div>
    </div>
    <div class="seatCon">
      <div class="seatLeft" id="seatLeft"></div>
      <div class="seatRight" id="seatRight"></div>
    </div>
  </div>
  <div class="weaRight" id="weaRight"></div>
</div>
</div>
<div class="nextBox">
<div class="next" id="toStep3">Next step</div>
</div>`;

var step3Str = `
<div class="step">
        <div>3</div>
        <p>Choose a food</p>
      </div>
      <div class="boat step2">
        <div class="foodLeft" id="foodLeft">
          <div class="foList">
            <img src="./images/food1.jpg" alt="">
            <div class="foTabel">
              <h3>
                <b>--</b>
                <b>--$</b>
              </h3>
              <p>--</p>
              <span>Type：--</span>
              <div class="foodBtn">
                <div class="add">+</div>
                <div class="foodNum">1</div>
                <div class="reduce">-</div>
              </div>
            </div>
          </div>
        </div>
        <div class="foodRight">
          <div class="totalPrice">
            <p>Total price:</p>
            <span id="totalPrice">0$</span>
          </div>
        </div>
      </div>
      <div class="nextBox">
        <div class="next" id="3toStep4">Next step</div>
      </div>
`;

var step4Str = `
        <div class="step">
        <div>4</div>
        <p>Total</p>
      </div>
      <div class="boat step3">
        <div class="totalCon" id="totalCon">
          <div class="toLeft">
            <h1>Ship position information</h1>
            <div class="toCon">
              <p>Boat name：--</p>
              <p>Selected seat：--</p>
              <p>Number of seats：3</p>
              <p>Date：--</p>
              <p>Time：--</p>
              <p>Number of people：--</p>
              <span id="boatPrice">Boat price:--$</span>
            </div>
          </div>
          <div class="toRight">
            <h1>Menu Information</h1>
            <div class="toCon">
              <span id="menuPrice">Boat price:--$</span>
            </div>
          </div>
        </div>
        <div class="totalBot" id="allPrice">
          Total price:--$
        </div>
      </div>
      <div class="nextBox">
        <div class="next" id="finish">Finish</div>
      </div>`;
