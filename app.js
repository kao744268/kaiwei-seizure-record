// =================================
// 愷威癲癇紀錄系統 V1.0
// app.js
// =================================



// =================================
// 愷威癲癇紀錄系統 V1.0.1
// 新增紀錄初始化
// =================================



let currentRecord = {};



let timer = null;


let startTimestamp = null;





// ===============================
// 建立新的紀錄
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
// 取消本次紀錄
// ===============================


function cancelRecord(){



let confirmCancel = confirm(

"確定取消本次發作紀錄？"

);



if(!confirmCancel){

return;

}



resetRecord();



alert(

"已取消本次紀錄"

);



showPage("home");



}


let timer=null;

let startTimestamp=null;







// ===============================
// 頁面切換
// ===============================


function showPage(id){


document
.querySelectorAll(".page")
.forEach(page=>{


page.classList.remove("active");


});



document
.getElementById(id)
.classList.add("active");



if(id==="medical"){

renderMedical();

}


if(id==="emergency"){

renderEmergency();

}


if(id==="record"){

renderRecord();

}


}







// ===============================
// 發作紀錄畫面
// ===============================


function renderRecord(){



let area=
document.getElementById(
"recordArea"
);



area.innerHTML=`

<div class="card">


<h3>
發作計時
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





<button onclick="saveRecord()">

📤 儲存紀錄

</button>


`;



renderOptions();

}// ===============================
// 選項產生
// ===============================


function renderOptions(){



createOptionButtons(

"locationOptions",

locationList,

"location"

);



createOptionButtons(

"typeOptions",

seizureTypeList,

"type"

);



createOptionButtons(

"awarenessOptions",

awarenessList,

"awareness"

);



createOptionButtons(

"afterOptions",

afterStateList,

"afterState"

);



}








function createOptionButtons(
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


let btn=document.createElement("button");


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
// 選項選擇
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


if(currentRecord.type.includes(value)){


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



if(currentRecord.afterState.includes(value)){


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
// 開始發作
// ===============================



function startSeizure(){


if(startTimestamp){

alert("目前已在計時中");

return;

}


resetRecord();


startTimestamp=new Date();



currentRecord.startTime =
startTimestamp.toLocaleString();



clearInterval(timer);



timer=setInterval(()=>{


let now=new Date();



let diff =
Math.floor(
(now-startTimestamp)/1000
);



let min =
Math.floor(diff/60);



let sec =
diff%60;

let startButton =
document.querySelector(
'button[onclick="startSeizure()"]'
);


if(startButton){

startButton.innerText =
"⏱ 發作計時中...";

startButton.disabled=true;

}

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
// 結束發作
// ===============================



function endSeizure(){



if(!startTimestamp){

alert(
"請先開始發作計時"
);

return;

}



let end =
new Date();



clearInterval(timer);



let diff =
Math.floor(
(end-startTimestamp)/1000
);



currentRecord.endTime =
end.toLocaleString();



currentRecord.duration =
diff+"秒";



document.getElementById(
"timer"
).innerText =

"✅ 發作結束\n\n持續時間："

+

currentRecord.duration;
let startButton =
document.querySelector(
'button[onclick="startSeizure()"]'
);


if(startButton){

startButton.innerText =
"▶ 開始發作";

startButton.disabled=false;

}


}// ===============================
// 醫療資訊卡
// ===============================


function renderMedical(){


let area =
document.getElementById(
"medicalArea"
);



area.innerHTML=`

<div class="info">


<h3>
👦 ${medicalInfo.name}
</h3>


<p>
疾病：
${medicalInfo.disease}
</p>


<p>
就診醫院：
${medicalInfo.hospital || "尚未設定"}
</p>


<p>
主治醫師：
${medicalInfo.doctor || "尚未設定"}
</p>


<p>
目前藥物：
${medicalInfo.medicine || "尚未設定"}
</p>


<p>
緊急藥物：
${medicalInfo.emergencyMedicine || "尚未設定"}
</p>


<p>
注意事項：
${medicalInfo.note || "尚未設定"}
</p>


</div>

`;



}









// ===============================
// 緊急聯絡
// ===============================



function renderEmergency(){


let area =
document.getElementById(
"contactArea"
);



let html=`


<div class="emergency">


<h3>
🚨 發作超過五分鐘
</h3>


<p>

請依醫師指示：

</p>


<p>
＊給予緊急藥物
</p>


<p>
＊通知鄰近醫院送醫
</p>


<p>
＊通知家長
</p>


</div>


`;





emergencyContacts.forEach(
person=>{


html += `


<a

class="call-btn"

href="tel:${person.phone}"

>

📞 ${person.name}

<br>

${person.phone}


</a>


`;


});





area.innerHTML=html;


}









// ===============================
// 超過五分鐘判斷
// ===============================



function checkEmergency(){



if(!startTimestamp){

return;

}



let now=new Date();



let diff =
Math.floor(
(now-startTimestamp)/1000
);





if(diff>=300){



alert(

"🚨 發作已超過五分鐘\n\n請依醫師指示處理"

);



clearInterval(timer);



}



}// ===============================
// 五分鐘自動檢查
// ===============================


function startEmergencyMonitor(){


setInterval(()=>{


if(!startTimestamp){

return;

}



let now=new Date();


let diff =
Math.floor(
(now-startTimestamp)/1000
);



if(diff===300){


showEmergencyAlert();


}



}



},1000);



}









// ===============================
// 儲存紀錄
// ===============================



function saveRecord(){



currentRecord.note =

document
.getElementById("note")
.value;



let records =

JSON.parse(

localStorage.getItem(
"kaiweiRecords"
)

)

|| [];





records.push({

...currentRecord

});





localStorage.setItem(

"kaiweiRecords",

JSON.stringify(records)

);





alert(
"紀錄已保存"
);

resetRecord();

renderHistory();



showPage("history");



}









// ===============================
// 歷史紀錄
// ===============================



function renderHistory(){


let area =
document.getElementById(
"historyArea"
);



let records =

JSON.parse(

localStorage.getItem(
"kaiweiRecords"
)

)

|| [];





if(records.length===0){


area.innerHTML=

`

<div class="card">

目前尚無紀錄

</div>

`;


return;


}





let html="";





records
.reverse()
.forEach(r=>{


html += `


<div class="card">


<p>
日期時間：

${r.startTime}

</p>



<p>
持續：

${r.duration}

</p>



<p>
地點：

${r.location}

</p>



<p>
型態：

${r.type.join("、")}

</p>



<p>
意識：

${r.awareness}

</p>



<p>
發作後：

${r.afterState.join("、")}

</p>



<p>
備註：

${r.note}

</p>


</div>


`;



});





area.innerHTML=html;



}









// ===============================
// 啟動
// ===============================



window.onload=function(){


renderMedical();


renderEmergency();


renderHistory();


startEmergencyMonitor();


};
// ===============================
// 五分鐘緊急提醒畫面
// ===============================


function showEmergencyAlert(){



let area = document.getElementById(
"recordArea"
);



if(!area){

return;

}




let html = `


<div class="emergency-alert">


<h2>
🚨 緊急提醒
</h2>



<p>

愷威發作已超過 5 分鐘

</p>



<p>

請依醫師指示處理：

<br>

＊給予緊急藥物

<br>

＊通知鄰近醫院送醫

<br>

＊通知家長

</p>


</div>



`;





emergencyContacts.forEach(person=>{


html += `


<a

class="call-btn"

href="tel:${person.phone}"

>

📞 ${person.name}

<br>

${person.phone}

</a>


`;


});




area.insertAdjacentHTML(
"afterbegin",
html
);



}
