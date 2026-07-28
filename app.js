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


currentRecord.startTime =
startTime.toLocaleString();



timer=setInterval(function(){



let now = new Date();


let seconds = Math.floor(
(now - startTime) / 1000
);



let min =
Math.floor(seconds / 60);



let sec =
seconds % 60;



let display =
document.getElementById(
"timer"
);



if(display){


display.innerText =

String(min).padStart(2,"0")

+

":"

+

String(sec).padStart(2,"0");

}



if(seconds>=300){


showFiveMinuteWarning();


}



},500);



}



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



let endTime = new Date();



clearInterval(timer);


timer=null;



currentRecord.endTime =
endTime.toLocaleString();



let duration =
Math.floor(
(endTime-startTime)/1000
);



currentRecord.duration =
duration+"秒";



let display =
document.getElementById(
"timer"
);



if(display){


let min =
Math.floor(duration/60);


let sec =
duration%60;



display.innerText =

String(min).padStart(2,"0")

+

":"

+

String(sec).padStart(2,"0");

}



alert(

"發作結束\n持續時間："+

currentRecord.duration

);



}



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
// =================================
// V2.0 app.js
// 第三段：儲存、歷史、醫療資訊
// =================================





// ===============================
// 儲存目前紀錄
// ===============================


function saveCurrentRecord(){



if(!currentRecord){


alert(
"目前沒有紀錄"
);


return;


}




let note =
document.getElementById(
"noteInput"
);



if(note){


currentRecord.note =
note.value;


}





if(!currentRecord.endTime){


alert(
"請先結束發作計時"
);


return;


}






historyRecords.unshift(
currentRecord
);



saveHistory();





alert(
"✅ 紀錄已保存"
);





currentRecord=null;



showPage("home");



}









// ===============================
// 歷史紀錄
// ===============================


function renderHistory(){



let area =
document.getElementById(
"historyArea"
);



if(!area)return;




if(historyRecords.length===0){



area.innerHTML=`

<div class="card">

<p>
目前尚無發作紀錄
</p>

</div>

`;

return;


}







area.innerHTML="";





historyRecords.forEach(record=>{



let div =
document.createElement(
"div"
);



div.className=
"record-item";





div.innerHTML=`

<h3>
📅 ${record.recordTime}
</h3>


<p>
📍 地點：
${record.location || "未填寫"}
</p>


<p>
⚡ 型態：
${record.type.join("、") || "未填寫"}
</p>


<p>
🧠 意識：
${record.awareness || "未填寫"}
</p>


<p>
📝 發作後：
${record.afterState.join("、") || "未填寫"}
</p>


<p>
⏱ 持續：
${record.duration || "未計算"}
</p>


<p>
備註：
${record.note || "無"}
</p>


`;



area.appendChild(div);



});



}









// ===============================
// 醫療資訊卡
// ===============================


function renderMedical(){



let area =
document.getElementById(
"medicalArea"
);



if(!area)return;





area.innerHTML=`

<div class="card">


<h3>
👦 ${medicalInfo.name}
</h3>


<div class="info-item">

疾病：
${medicalInfo.disease}

</div>



<div class="info-item">

主要醫院：
${medicalInfo.hospital || "尚未設定"}

</div>



<div class="info-item">

醫師：
${medicalInfo.doctor || "尚未設定"}

</div>



<div class="info-item">

固定藥物：
${medicalInfo.medicine || "尚未設定"}

</div>



<div class="info-item">

緊急藥物：
${medicalInfo.emergencyMedicine || "依醫囑使用"}

</div>



<div class="info-item">

注意事項：
${medicalInfo.note || "尚未設定"}

</div>



</div>

`;



}
// =================================
// V2.0 app.js
// 第四段：緊急聯絡、提醒、補強功能
// =================================






// ===============================
// 緊急聯絡頁面
// ===============================


function renderEmergency(){



let area =
document.getElementById(
"emergencyArea"
);



if(!area)return;





area.innerHTML = `


<div class="emergency-alert">


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



<div class="card">

<h3>
📞 緊急聯絡人
</h3>


<div id="contactList"></div>


</div>



`;




let list =
document.getElementById(
"contactList"
);



emergencyContacts.forEach(
contact=>{


let a =
document.createElement(
"a"
);



a.className="call-btn";


a.href =
"tel:" + contact.phone;



a.innerText =

"📞 "

+

contact.name

+

" "

+

contact.phone;



list.appendChild(a);



});


}









// ===============================
// 五分鐘提醒
// ===============================


function showFiveMinuteWarning(){



alert(

"⚠️ 發作已超過五分鐘\n\n"

+

"請依醫師指示處理\n"

+

"並通知家長"

);



}









// ===============================
// 補上儲存按鈕
// ===============================


function addSaveButton(){



let area =
document.getElementById(
"recordArea"
);



if(!area)return;




let button =
document.createElement(
"button"
);



button.innerText =
"💾 儲存本次紀錄";



button.onclick =
saveCurrentRecord;



area.appendChild(button);



}









// ===============================
// 修改原本發作頁
// 自動加入儲存按鈕
// ===============================


const oldRenderRecord =
renderRecord;



renderRecord=function(){



oldRenderRecord();



addSaveButton();



};
