// =================================
// 愷威癲癇紀錄系統 V2.0
// app.js
// 第一段：初始化與頁面控制
// =================================



// ===============================
// 全域變數
// ===============================


let currentRecord = null;


let timer = null;


let startTime = null;


let historyRecords = [];






// ===============================
// 初始化
// ===============================


window.onload = function(){


loadHistory();


showPage("home");


};







// ===============================
// 建立新的紀錄資料
// ===============================


function createNewRecord(){



return {


id:
Date.now(),


recordTime:
new Date().toLocaleString(),


startTime:"",


endTime:"",


duration:"",


location:"",


type:[],


awareness:"",


afterState:[],


note:""



};


}









// ===============================
// 頁面切換
// ===============================


function showPage(pageId){



document
.querySelectorAll(".page")
.forEach(page=>{


page.classList.remove("active");


});





let page =

document.getElementById(pageId);




if(page){


page.classList.add("active");


}





if(pageId==="medical"){


renderMedical();


}





if(pageId==="history"){


renderHistory();


}





if(pageId==="emergency"){


renderEmergency();


}




if(pageId==="record"){


renderRecord();


}



}









// ===============================
// 歷史紀錄讀取
// ===============================


function loadHistory(){



let data =

localStorage.getItem(
"kaiweiHistory"
);



if(data){


historyRecords =
JSON.parse(data);


}else{


historyRecords=[];


}



}








// ===============================
// 儲存歷史紀錄
// ===============================


function saveHistory(){



localStorage.setItem(

"kaiweiHistory",

JSON.stringify(historyRecords)

);



}
// =================================
// V2.0 app.js
// 第二段：發作紀錄功能
// =================================




// ===============================
// 發作紀錄頁面
// ===============================


function renderRecord(){



let area = document.getElementById(
"recordArea"
);



area.innerHTML = `



<div class="card">


<h3>
⏱ 發作計時
</h3>


<h1 id="timer">
00:00
</h1>



<button onclick="startSeizure()">

▶ 開始發作

</button>



<button onclick="endSeizure()">

⏹ 結束發作

</button>



<button onclick="cancelRecord()">

❌ 取消本次紀錄

</button>


</div>





<div class="card">

<h3>
📍 發作地點
</h3>

<div id="locationButtons"></div>


</div>





<div class="card">

<h3>
⚡ 發作型態
</h3>

<div id="typeButtons"></div>


</div>





<div class="card">

<h3>
🧠 意識狀態
</h3>

<div id="awarenessButtons"></div>


</div>





<div class="card">

<h3>
📝 發作後狀態
</h3>

<div id="afterButtons"></div>


</div>





<div class="card">

<h3>
備註
</h3>

<textarea id="noteInput"></textarea>


</div>


`;



if(!currentRecord){

currentRecord=createNewRecord();

}



createOptionButtons();


}









// ===============================
// 建立選項按鈕
// ===============================


function createOptionButtons(){



createOptionGroup(

"locationButtons",

locationList,

"location"

);



createOptionGroup(

"typeButtons",

seizureTypeList,

"type"

);



createOptionGroup(

"awarenessButtons",

awarenessList,

"awareness"

);



createOptionGroup(

"afterButtons",

afterStateList,

"afterState"

);



}








function createOptionGroup(
id,
list,
type
){



let area=document.getElementById(id);



if(!area)return;



area.innerHTML="";



list.forEach(item=>{


let button=document.createElement(
"button"
);



button.className="option";


button.innerText=item;



button.onclick=function(){


selectOption(
type,
item,
button
);



};



area.appendChild(button);



});


}









// ===============================
// 選擇紀錄項目
// ===============================


function selectOption(
type,
value,
button
){



button.classList.toggle(
"active"
);



if(type==="location"){


currentRecord.location=value;


}





if(type==="type"){


toggleArray(
currentRecord.type,
value
);


}





if(type==="awareness"){


currentRecord.awareness=value;


}





if(type==="afterState"){


toggleArray(
currentRecord.afterState,
value
);


}



}







function toggleArray(
array,
value
){



let index=array.indexOf(value);



if(index>-1){


array.splice(index,1);


}else{


array.push(value);


}


}









// ===============================
// 開始發作
// ===============================


function startSeizure(){



if(timer){


return;


}




currentRecord=createNewRecord();



startTime=new Date();



currentRecord.startTime=

startTime.toLocaleString();




let seconds=0;



timer=setInterval(function(){


seconds++;



let min=Math.floor(seconds/60);


let sec=seconds%60;



let display=document.getElementById(
"timer"
);



if(display){


display.innerText=

String(min).padStart(2,"0")

+

":"

+

String(sec).padStart(2,"0");


}






// 五分鐘提醒

if(seconds===300){


showFiveMinuteWarning();


}





},1000);



}









// ===============================
// 結束發作
// ===============================


function endSeizure(){



if(!timer){


alert(
"尚未開始計時"
);


return;


}



let endTime=new Date();



clearInterval(timer);



timer=null;



currentRecord.endTime=

endTime.toLocaleString();



let duration=

Math.floor(
(endTime-startTime)/1000
);



currentRecord.duration=

duration+"秒";



alert(

"發作結束\n持續時間："+

currentRecord.duration

);



}









// ===============================
// 取消紀錄
// ===============================


function cancelRecord(){



if(confirm(
"確定取消本次紀錄？"
)){



if(timer){


clearInterval(timer);


timer=null;


}



currentRecord=null;



showPage("home");



}



}
