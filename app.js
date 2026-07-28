// =================================
// 愷威癲癇紀錄系統 V2.1 Stable
// app.js
// =================================



// ===============================
// 全域資料
// ===============================


let currentRecord = null;

let startTimestamp = null;

let timer = null;

let records = [];





// ===============================
// 啟動
// ===============================


window.onload = function(){


loadRecords();


openPage("home");


};







// ===============================
// 頁面切換
// ===============================


function openPage(pageId){



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
// 建立新紀錄
// ===============================


function createRecord(){



return {


id:Date.now(),


time:
new Date().toLocaleString(),


start:"",


end:"",


duration:0,


location:"",


types:[],


consciousness:"",


recovery:[],


note:""


};


}









// ===============================
// 發作紀錄頁
// ===============================


function renderRecord(){



let page =
document.getElementById(
"recordPage"
);



page.innerHTML = `



<div class="card">


<h3>
⏱ 發作時間
</h3>


<div class="timer" id="timer">

00:00

</div>



<button onclick="startSeizure()">

▶ 開始發作

</button>



<button onclick="endSeizure()">

⏹ 結束發作

</button>



<button class="cancel-btn" onclick="cancelRecord()">

❌ 取消本次紀錄

</button>



</div>







<div class="card">

<h3>
📍 發作地點
</h3>

<div id="locationBox"></div>

</div>







<div class="card">

<h3>
⚡ 發作型態
</h3>

<div id="typeBox"></div>

</div>







<div class="card">

<h3>
🧠 意識狀態
</h3>

<div id="consciousBox"></div>

</div>







<div class="card">

<h3>
📝 發作後狀態
</h3>

<div id="recoveryBox"></div>

</div>







<div class="card">


<h3>
備註
</h3>


<textarea id="note"></textarea>


</div>





<button class="save-btn" onclick="saveRecord()">

💾 儲存紀錄

</button>



`;



if(!currentRecord){

currentRecord=createRecord();

}



createButtons();



}









// ===============================
// 建立選項
// ===============================


function createButtons(){



createOptionButtons(
"locationBox",
seizureLocations,
"location"
);



createOptionButtons(
"typeBox",
seizureTypes,
"types"
);



createOptionButtons(
"consciousBox",
consciousnessStates,
"consciousness"
);



createOptionButtons(
"recoveryBox",
recoveryStates,
"recovery"
);



}








function createOptionButtons(
boxId,
list,
type
){



let box =
document.getElementById(boxId);



if(!box)return;



box.innerHTML="";



list.forEach(item=>{



let btn =
document.createElement("button");



btn.className =
"option-btn";



btn.innerText=item;



btn.onclick=function(){


selectOption(
type,
item,
btn
);



};



box.appendChild(btn);



});



}









function selectOption(
type,
value,
btn
){



btn.classList.toggle("active");



if(type==="location"){


currentRecord.location=value;


}



if(type==="types"){


toggleArray(
currentRecord.types,
value
);


}



if(type==="consciousness"){


currentRecord.consciousness=value;


}



if(type==="recovery"){


toggleArray(
currentRecord.recovery,
value
);


}



}







function toggleArray(
array,
value
){


let index =
array.indexOf(value);



if(index>=0){


array.splice(index,1);


}else{


array.push(value);


}


}









// ===============================
// 開始計時
// ===============================


function startSeizure(){



if(timer){

return;

}



currentRecord=createRecord();



startTimestamp =
Date.now();



currentRecord.start =
new Date().toLocaleString();





timer=setInterval(updateTimer,500);



}








function updateTimer(){



if(!startTimestamp)return;



let seconds =
Math.floor(
(Date.now()-startTimestamp)/1000
);



let min =
Math.floor(seconds/60);



let sec =
seconds%60;



let timerBox =
document.getElementById(
"timer"
);



if(timerBox){


timerBox.innerText =

String(min).padStart(2,"0")

+

":"

+

String(sec).padStart(2,"0");

}



if(seconds>=systemConfig.warningTime){


timerBox.classList.add("danger");


}



}









// ===============================
// 結束發作
// ===============================


function endSeizure(){



if(!timer){


alert(
"尚未開始發作"
);


return;


}



let end =
Date.now();



clearInterval(timer);


timer=null;



let seconds =
Math.floor(
(end-startTimestamp)/1000
);



currentRecord.duration =
seconds;



currentRecord.end =
new Date().toLocaleString();





alert(

"發作結束\n\n持續時間："

+

seconds

+

" 秒"

);



}









// ===============================
// 取消
// ===============================


function cancelRecord(){



if(confirm(
"確定取消本次紀錄？"
)){



clearInterval(timer);


timer=null;


currentRecord=null;


openPage("home");


}



}









// ===============================
// 儲存紀錄
// ===============================


function saveRecord(){



if(!currentRecord){

alert(
"沒有紀錄"
);

return;

}




if(currentRecord.duration===0){


alert(
"請先結束發作"
);


return;


}





let note =
document.getElementById(
"note"
);



if(note){


currentRecord.note=
note.value;


}





records.unshift(
currentRecord
);



saveRecords();

sendToGoogleSheet(currentRecord);

alert(
"✅ 已保存紀錄"
);



currentRecord=null;


openPage("home");


}









// ===============================
// LocalStorage
// ===============================


function loadRecords(){



let data =
localStorage.getItem(
systemConfig.storageKey
);



records =
data ?
JSON.parse(data)
:
[];



}



function saveRecords(){



localStorage.setItem(

systemConfig.storageKey,

JSON.stringify(records)

);



}









// ===============================
// 醫療卡
// ===============================


function renderMedical(){



let page =
document.getElementById(
"medicalPage"
);



page.innerHTML=`


<div class="info-card">


👦 姓名：
${medicalCard.name}


<br>


🏥 疾病：
${medicalCard.disease}


<br>


🏥 醫院：
${medicalCard.hospital}


<br>


👨‍⚕️ 醫師：
${medicalCard.doctor}


<br>


💊 固定藥物：
${medicalCard.medication}


<br>


🚨 緊急藥物：
${medicalCard.emergencyMedication}


<br>


📝 注意事項：
${medicalCard.notes}


</div>


`;



}









// ===============================
// 歷史紀錄
// ===============================


function renderHistory(){



let page =
document.getElementById(
"historyPage"
);



if(records.length===0){


page.innerHTML=`

<div class="card">

目前尚無紀錄

</div>

`;

return;


}



page.innerHTML="";



records.forEach(record=>{


let div =
document.createElement(
"div"
);



div.className=
"history-item";



div.innerHTML=`

<h3>
📅 ${record.time}
</h3>


<p>
📍 ${record.location}
</p>


<p>
⚡ ${record.types.join("、")}
</p>


<p>
🧠 ${record.consciousness}
</p>


<p>
📝 ${record.note || "無"}
</p>


<p>
⏱ ${record.duration} 秒
</p>


`;



page.appendChild(div);



});



}









// ===============================
// 緊急聯絡
// ===============================


function renderEmergency(){



let page =
document.getElementById(
"emergencyPage"
);



page.innerHTML=`


<div class="emergency-box">


<h2>
⚠️ 超過五分鐘
</h2>


<ul>

<li>
給予緊急藥物
</li>


<li>
通知鄰近醫院送醫
</li>


<li>
通知家長
</li>


</ul>


</div>



`;





emergencyContacts.forEach(person=>{


let a =
document.createElement(
"a"
);



a.className=
"phone-btn";


a.href=
"tel:"+person.phone;



a.innerText=

"📞 "

+

person.name

+

" "

+

person.phone;



page.appendChild(a);



});



}
// ===============================
// 傳送 Google Sheet
// V2.2
// ===============================


function sendToGoogleSheet(record){


const apiUrl =

"https://script.google.com/macros/s/AKfycbxlLMrK83W_Oqn3bmafxdtLmpH-07KtjocEBWe5-Owa1DLK6u8fi80QiZl5g5CmfyX6AA/exec";




fetch(apiUrl, {


method:"POST",


body:JSON.stringify({


recordTime:
record.time,


startTime:
record.start,


endTime:
record.end,


duration:
record.duration,


location:
record.location,


type:
record.types.join("、"),


awareness:
record.consciousness,


afterState:
record.recovery.join("、"),


note:
record.note



})


})


.then(response=>response.json())


.then(data=>{


console.log(
"Google Sheet同步成功",
data
);


})


.catch(error=>{


console.error(
"Google Sheet同步失敗",
error
);


});


}
