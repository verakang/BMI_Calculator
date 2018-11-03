//指定DOM
var height = document.querySelector(".heightInput");
var weight = document.querySelector(".weightInput");
var newbtn = document.querySelector('.btn');
var datasend = document.querySelector(".btnsend");
var showlist =  document.querySelector(".bmilist");
var clearall = document.querySelector(".clearlist");
var data = JSON.parse(localStorage.getItem("bmidata")) || [];    
    
//監聽&更新
datasend.addEventListener("click",bmicheck);
showlist.addEventListener("click",removeList);
clearall.addEventListener("click",clearList);
updateList(data);

//變數宣告
var data_h;
var data_w;
var item_bmi;  //BMI數值
var lvl;       //BMI分級
var bmilist;   //一組數據

// 新增、紀錄資料 //
// 1)獲取身高體重資訊、計算ＢＭＩ
// 2)BMI分級
// 3)取得時間
// 4)新增一筆數據
// 5)變更btn樣式
// 6)更新清單後儲存資料
function bmicheck(){
  data_h = height.value;
  data_w = weight.value;
  item_bmi = (data_w / ((data_h/100)*(data_h/100))).toFixed(2);
  
  if(item_bmi<=18.5){
      lvl = "過輕";
    }else if(item_bmi<=25){
      lvl = "理想";
    }else if(item_bmi<=30){
      lvl = "過重";
    }else if(item_bmi<=35){
      lvl = "輕度肥胖";
    }else if(item_bmi<=40){
      lvl = "中度肥胖";
    }else{
      lvl = "重度肥胖";
    }
  
  var today = new Date();
  date = (today.getMonth()+1)+"-"+today.getDate()+"-"+today.getFullYear();
  
  // 一組數據資料
  bmilist = {
    bmiResult: item_bmi,
    height: data_h,
    weight: data_w,
    lvl: lvl, 
    date: date   
  }    

  //驗證輸入內容是否為數字及負值＆儲存數據
  if(data_h.replace(/[^\d]/g,"") == "" || data_w.replace(/[^\d]/g,"" ) == "" || data_h <= 0 ||data_w <= 0 ){
    alert("請輸入身高體重 (不含小數點的數字)") 
  }   
  else{
    data.push(bmilist);  
    btnset();
    updateList(data);  
    var dataString = JSON.stringify(data);
    localStorage.setItem("bmidata",dataString);   
  }  
} 

// 更新頁面資料 //
function updateList(data){
  var len = data.length;
  var str = "";
  
  for(var i = len-1;i >= 0;i--){ 
    var text = "<tr><td class='td_01'>"+data[i].lvl+"</td><td  class='td_02'><span class='bmitext'>BMI </span>"+data[i].bmiResult+"</td><td td class='td_03'><span>weight </span>"+data[i].weight+"kg</td><td td class='td_04'><span>height</span>"+data[i].height+"cm</td><td><span class='date'>"+data[i].date+"</span></td><td class='delete' data-num="+(i+1)+">X"+"</td></tr></table></li>"
    
    if(data[i].lvl == "過輕"){
      str += "<li><table class='colorbox_lvl_01'>"+text
    }else if(data[i].lvl == "理想"){
      str += "<li><table class='colorbox_lvl_02'>"+text
    }else if(data[i].lvl == "過重"){
      str += "<li><table class='colorbox_lvl_03'>"+text
    }else if(data[i].lvl == "輕度肥胖"){
      str += "<li><table class='colorbox_lvl_04'>"+text
    }else if(data[i].lvl == "中度肥胖"){
      str += "<li><table class='colorbox_lvl_05'>"+text
    }else{
      str += "<li><table class='colorbox_lvl_06'>"+text
    }    
  } 
  showlist.innerHTML = str;
}

// 刪除資料 //
function removeList(e){
  if(e.target.className !== "delete"){return};
  var listnum = e.target.dataset.num;
  data.splice(listnum-1,1);
  var dataString = JSON.stringify(data);
  localStorage.setItem("bmidata",dataString); 
  updateList(data);  
}

// 清空列表 //
function clearList(e){
  if(e.target.className !== "clearlist"){return};
    localStorage.removeItem("bmidata");
    data = [];
    updateList(data); 
}

// 變更按鈕樣式 //
function btnset(){
  var str = "<input class='btn_lvl' type='button' /><p class='lvlreturn'>"+lvl+"</p><p class='bmi'>BMI</p><input class='resetbtn' type='button' />";
  newbtn.innerHTML = str;
  
  var btn_lvl = document.querySelector(".btn_lvl");
  var lvlreturn = document.querySelector(".lvlreturn");
  var bmi = document.querySelector(".bmi");
  var refreshbtn = document.querySelector(".resetbtn");
  btn_lvl.setAttribute("value",item_bmi);
  
  switch(lvl){
    case "過輕": 
      btn_lvl.className ="btn_lvl color_lvl01 border_lvl01";
      lvlreturn.className ="lvlreturn color_lvl01";   
      bmi.className = "bmi color_lvl01"; 
      refreshbtn.className ="resetbtn bgc_lvl01";
      break;     
    case "理想": 
      btn_lvl.className ="btn_lvl color_lvl02 border_lvl02";
      lvlreturn.className ="lvlreturn color_lvl02";   
      bmi.className = "bmi color_lvl02"; 
      refreshbtn.className ="resetbtn bgc_lvl02";
      break;   
    case "過重": 
      btn_lvl.className ="btn_lvl color_lvl03 border_lvl03";
      lvlreturn.className ="lvlreturn color_lvl03";   
      bmi.className = "bmi color_lvl03"; 
      refreshbtn.className ="resetbtn bgc_lvl03";
      break;  
    case "輕度肥胖": 
      btn_lvl.className ="btn_lvl color_lvl04 border_lvl04";
      lvlreturn.className ="lvlreturn color_lvl04";   
      bmi.className = "bmi color_lvl04"; 
      refreshbtn.className ="resetbtn bgc_lvl04";
      break;     
    case "中度肥胖": 
      btn_lvl.className ="btn_lvl color_lvl05 border_lvl05";
      lvlreturn.className ="lvlreturn color_lvl05";   
      bmi.className = "bmi color_lvl05"; 
      refreshbtn.className ="resetbtn bgc_lvl05";
      break;     
    case "重度肥胖": 
      btn_lvl.className ="btn_lvl color_lvl06 border_lvl06";
      lvlreturn.className ="lvlreturn color_lvl06";   
      bmi.className = "bmi color_lvl06"; 
      refreshbtn.className ="resetbtn bgc_lvl06";
      break;      
  } 
  
  // refreshbtn_刷新頁面
  refreshbtn.onclick = function(){
		history.go(0);
  }
}