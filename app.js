// =================================
// 愷威癲癇紀錄系統 V1.1
// app.js
// 第一段：基礎架構
// =================================



// Google Sheet API

const GOOGLE_SCRIPT_URL =

"https://script.google.com/macros/s/AKfycbz7NTKNSgzGET2zkReQTi_nMcWU0LYWz3gD9cwuJkKPfyVG81a_bgzbOa8WUK5e5qv5-w/exec";




// ===============================
// 發作紀錄資料
// ===============================


let currentRecord = {

startTime:"",

endTime:"",

duration:"",

location:"",

type:[],

awareness:"",

afterState:[],

note:""

};





let timer = null;


let startTimestamp = null;








// ===============================
// 初始化新紀錄
// ===============================


function resetRecord(){



currentRecord = {


startTime:"",

endTime:"",

duration:"",

location:"",

type:[],

awareness:"",

afterState:[],

note:""


};



startTimestamp = null;



if(timer){


clearInterval(timer);


timer=null;


}



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





let target =

document.getElementById(pageId);




if(target){


target.classList.add("active");


}






if(pageId==="record"){


renderRecord();


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



}
// ===============================
// 發作紀錄畫面
// ===============================


function renderRecord(){


let area = document.getElementById(
"recordArea"
);



area.innerHTML = `


<div class="card">


<h3>
⏱ 發作時間
</h3>


<h1 id="timer">
00:00
</h1>



<button onclick="startSeizure()">

▶ 開始發作

</button>



<button onclick="endSeizure()">

⏹ 發作結束

</button>



<button onclick="cancelRecord()">

❌ 取消本次紀錄

</button>



</div>





<div class="card">

<h3>
📍 發作地點
</h3>


<div id="locationOptions"></div>


</div>





<div class="card">

<h3>
⚡ 發作型態
</h3>


<div id="typeOptions"></div>


</div>





<div class="card">

<h3>
🧠 意識狀態
</h3>


<div id="awarenessOptions"></div>


</div>





<div class="card">

<h3>
發作後狀態
</h3>


<div id="afterOptions"></div>


</div>





<div class="card">

<h3>
備註
</h3>


<textarea id="note"></textarea>


</div>



`;



renderOptions();


}









// ===============================
// 建立選項
// ===============================


function renderOptions(){



createButtons(
"locationOptions",
locationList,
"location"
);



createButtons(
"typeOptions",
seizureTypeList,
"type"
);



createButtons(
"awarenessOptions",
awarenessList,
"awareness"
);



createButtons(
"afterOptions",
afterStateList,
"afterState"
);



}







function createButtons(
id,
list,
type
){



let area =
document.getElementById(id);



if(!area){

return;

}



area.innerHTML="";



list.forEach(item=>{


let btn =
document.createElement("button");



btn.className="option";


btn.innerText=item;



btn.onclick=function(){


selectOption(
type,
item,
btn
);


};



area.appendChild(btn);



});



}









// ===============================
// 選擇項目
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


if(
currentRecord.type.includes(value)
){


currentRecord.type =
currentRecord.type.filter(
x=>x!==value
);


}else{


currentRecord.type.push(value);


}



}




if(type==="awareness"){


currentRecord.awareness=value;


}



if(type==="afterState"){


if(
currentRecord.afterState.includes(value)
){


currentRecord.afterState =
currentRecord.afterState.filter(
x=>x!==value
);


}else{


currentRecord.afterState.push(value);


}



}



}








// ===============================
// 開始計時
// ===============================


function startSeizure(){



if(startTimestamp){


alert(
"目前已在計時中"
);


return;


}



resetRecord();



startTimestamp =
new Date();



currentRecord.startTime =
startTimestamp.toLocaleString();




timer=setInterval(()=>{


let now=new Date();


let seconds =
Math.floor(
(now-startTimestamp)/1000
);



let min =
Math.floor(seconds/60);



let sec =
seconds%60;



document.getElementById(
"timer"
).innerText =


String(min).padStart(2,"0")

+

":"

+

String(sec).padStart(2,"0");



},1000);



}








// ===============================
// 結束計時
// ===============================


function endSeizure(){



if(!startTimestamp){

alert(
"請先開始計時"
);

return;

}



let end =
new Date();



clearInterval(timer);



let seconds =
Math.floor(
(end-startTimestamp)/1000
);



currentRecord.endTime =
end.toLocaleString();



currentRecord.duration =
seconds+"秒";



document.getElementById(
"timer"
).innerText =


"✅ 發作結束\n"

+

"持續時間："

+

currentRecord.duration;



}








// ===============================
// 取消紀錄
// ===============================


function cancelRecord(){



if(
confirm(
"確定取消本次紀錄？"
)

){


resetRecord();


showPage("home");


}


}
