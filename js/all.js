var data = {
  height: [],
  weight: [],
  BMI: [],
  date: []
}
var BMIcolor;
var input_height = document.querySelector('#height');
var input_weight = document.querySelector('#weight');
var list = document.querySelector('.bmiList');
var submitBtn = document.querySelector('.submitBtn');
var resetBtn = document.querySelector('.resetBtn');
var result = document.querySelector('.bmiresult');
// 從localstorage拿資料
data.height = JSON.parse(localStorage.getItem('height'));
data.weight = JSON.parse(localStorage.getItem('weight'));
data.BMI = JSON.parse(localStorage.getItem('BMI'));
data.date = JSON.parse(localStorage.getItem('date'));

function updateData() {
  var len = data.height.length;
  var str = "";
  for (var i = 0; i < len; i++) {
    var check = checkLevel(data.BMI[i]);
    str += '<li style="border-color:' + BMIcolor + '"><span>' + check + '</span><small>BMI</small><strong>' + data.BMI[i]
      + '</strong><small>weight</small><strong>' + data.weight[i]
      + 'kg</strong><small>height</small><strong>' + data.height[i]
      + 'cm</strong><small>' + data.date[i] + '</small><a class="delBtn" data-number=' + i + '>刪除</a></li>';
  }
  // console.log(str);
  list.innerHTML = str;
  // 更新資料進localstorage
  localStorage.setItem('height', JSON.stringify(data.height));
  localStorage.setItem('weight', JSON.stringify(data.weight));
  localStorage.setItem('BMI', JSON.stringify(data.BMI));
  localStorage.setItem('date', JSON.stringify(data.date));
}
updateData();
submitBtn.addEventListener('click', calcBmi);
resetBtn.addEventListener('click', reset);
list.addEventListener('click', deleteList);

function calcBmi() {
  var weight = input_weight.value;
  var height = input_height.value;
  // 簡易驗證
  if (weight === "" || height === "") {
    alert("您的資料輸入不完整！");
    return
  }
  // 計算BMI
  var BMI = weight / Math.pow((height / 100), 2);
  BMI = Number.parseFloat(BMI).toFixed(2);
  // 按下按鈕紀錄日期
  var date = new Date();
  var today = "";
  today += date.getDate().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getFullYear().toString();
  // 將資料更新
  data.weight.push(weight);
  data.height.push(height);
  data.BMI.push(BMI);
  data.date.push(today);
  // 更新LEVEL
  var check = checkLevel(BMI);
  // 更改submitBTN樣式
  submitBtn.innerHTML = '<p>' + BMI + '</p>' + '<small>BMI</small>';
  submitBtn.setAttribute("style", 'border-color: ' + BMIcolor + '; background-color:transparent ; color :' + BMIcolor + '; font-size : 24px ;');
  submitBtn.disabled = true;
  // 更新resetBTN樣式
  resetBtn.setAttribute("style", 'display:block ; background-color:' + BMIcolor + ';');
  // 顯示結果
  result.innerHTML = check;
  result.setAttribute("style", 'color : ' + BMIcolor + ';');
  updateData();
}

function checkLevel(BMI) {
  if (BMI <= 18.5) {
    BMIcolor = '#65ccfb';
    return '過輕';
  }
  else if (BMI > 18.5 && BMI <= 25) {
    BMIcolor = '#86d73f';
    return '理想';
  }
  else if (BMI > 25 && BMI <= 30) {
    BMIcolor = '#FF8C00';
    return '過重';
  }
  else if (BMI > 30 && BMI <= 35) {
    BMIcolor = '#FF7F50';
    return '輕度肥胖';
  }
  else if (BMI > 35 && BMI <= 40) {
    BMIcolor = '#FF6347';
    return '中度肥胖';
  }
  else {
    BMIcolor = '#FF4500';
    return '重度肥胖';
  }

}

function reset() {
  input_height.value = '';
  input_weight.value = '';
  // 更改submitBTN樣式
  submitBtn.innerHTML = '<p>看結果</p>';
  submitBtn.setAttribute('style', '');
  submitBtn.disabled = false;
  // 更新resetBTN樣式
  resetBtn.setAttribute("style", 'display:none ;');
  // 顯示結果
  result.innerHTML = '';
}

function deleteList(e) {
  e.preventDefault();
  var current = e.target.nodeName;
  if (current !== 'A') { return };
  var currentnum = e.target.dataset.number;
  console.log(current, currentnum);
  data.weight.splice(currentnum, 1);
  data.height.splice(currentnum, 1);
  data.BMI.splice(currentnum, 1);
  data.date.splice(currentnum, 1);
  updateData();
}

