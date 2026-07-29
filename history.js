// ==========================================
// 愷威 Care V1.0
// history.js
// cloud串接修正版
// ==========================================


if(
typeof window.seizureRecords === "undefined"
){

window.seizureRecords=[];

}





function addSeizureRecord(record){



    window.seizureRecords.push(
        record
    );



    saveLocalRecords();



    renderHistory();



    updateLatestRecord();





    // 自動同步

    if(
        typeof syncSeizure === "function"
    ){


        syncSeizure(record);


    }





    console.log(
        "新增紀錄",
        record
    );


}








function saveLocalRecords(){


    localStorage.setItem(

        "kw_seizure_records",

        JSON.stringify(
            window.seizureRecords
        )

    );


}







function loadLocalRecords(){


    const data =
    localStorage.getItem(
        "kw_seizure_records"
    );


    if(data){


        window.seizureRecords =
        JSON.parse(data);


    }


}








function renderHistory(){



const list =
document.getElementById(
"recordList"
);



if(!list)return;




if(
window.seizureRecords.length===0
){


list.innerHTML=
"尚無紀錄";


return;


}



list.innerHTML="";



[...window.seizureRecords]
.reverse()
.forEach(

function(record,index){



const div =
document.createElement(
"div"
);


div.className=
"record-card";



div.innerHTML=

`

<h3>
🚨 第 ${window.seizureRecords.length-index} 次發作
</h3>

<p>
日期：${record.date}
</p>

<p>
開始：${record.startTime}
</p>

<p>
結束：${record.endTime}
</p>

<p>
持續：${record.duration} 秒
</p>

`;



list.appendChild(div);



}

);


}









function updateLatestRecord(){



const box =
document.getElementById(
"latestRecord"
);



if(!box)return;



const r =
window.seizureRecords[
window.seizureRecords.length-1
];



if(!r){


box.innerHTML="尚無紀錄";


return;


}



box.innerHTML=

`

${r.date}

<br>

⏱ ${r.duration} 秒

`;



}








document.addEventListener(

"DOMContentLoaded",

function(){

loadLocalRecords();

renderHistory();

updateLatestRecord();


}

);
