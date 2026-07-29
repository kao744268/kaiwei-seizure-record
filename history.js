// ==========================================
// 愷威 Care V2.0 守護版
// history.js
// Seizure History System
// ==========================================



// ===============================
// 取得發作紀錄
// ===============================


function getSeizureRecords(){



    return JSON.parse(

        localStorage.getItem(
            "care_seizure_records"
        )

        ||

        "[]"

    );


}









// ===============================
// 顯示歷史紀錄
// ===============================


function renderHistory(){



    const box =
    document.getElementById(
        "historyList"
    );



    if(!box){

        return;

    }





    let records =
    getSeizureRecords();





    if(records.length === 0){


        box.innerHTML = `

        <div class="info-card">

        📋 尚無發作紀錄

        </div>

        `;


        updateLatest();


        return;


    }





    // 最新在前


    records =
    records.reverse();





    box.innerHTML = "";





    records.forEach(

        function(record,index){



            const card =
            document.createElement(
                "div"
            );



            card.className =
            "history-card";





            card.innerHTML = `


<h3>

🚨 第 ${records.length-index} 次發作

</h3>



<p>
📅 日期：
${record.date || "-"}
</p>



<p>
⏰ 開始時間：
${record.startTime || "-"}
</p>



<p>
⏰ 結束時間：
${record.endTime || "-"}
</p>



<p>
⏱ 持續時間：
${record.duration || 0}
秒
</p>



<hr>



<p>
🧠 發作型態：
${formatArray(record.type)}
</p>



<p>
👀 發作狀況：
${formatArray(record.condition)}
</p>



<p>
💤 恢復時間：
${record.recovery || "-"}
分鐘
</p>



<p>
📝 備註：
${record.note || "-"}
</p>



`;



            box.appendChild(
                card
            );


        }

    );





    updateLatest();



}









// ===============================
// 首頁最新紀錄
// ===============================


function updateLatest(){



    const box =
    document.getElementById(
        "latestBox"
    );



    if(!box){

        return;

    }





    const records =
    getSeizureRecords();





    if(records.length === 0){


        box.innerHTML =

        "尚無近期紀錄";


        return;


    }





    const last =
    records[
        records.length - 1
    ];





    box.innerHTML = `


📋 最近一次發作


<br><br>


📅 ${last.date || "-"}


<br>


⏱ 持續：

${last.duration || 0}

秒



`;



}









// ===============================
// 陣列格式
// ===============================


function formatArray(arr){



    if(
        !arr ||
        arr.length === 0
    ){

        return "-";

    }



    return arr.join(
        "、"
    );


}









// ===============================
// 清除紀錄
// ===============================


function clearHistory(){



    const check =
    confirm(
        "確定清除所有發作紀錄？"
    );



    if(check){



        localStorage.removeItem(
            "care_seizure_records"
        );



        renderHistory();



    }



}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    renderHistory();



    updateLatest();



    console.log(
        "📋 history.js 初始化完成"
    );


}

);
