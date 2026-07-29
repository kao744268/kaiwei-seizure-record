// ==========================================
// 愷威 Care 癲癇紀錄版 V1.0
// history.js
// History Display System
// ==========================================



// ===============================
// 取得紀錄
// ===============================


function getRecords(){


    return JSON.parse(

        localStorage.getItem(
            "care_records"
        )

        ||

        "[]"

    );


}









// ===============================
// 顯示歷史紀錄
// ===============================


function renderHistory(){



    var box =
    document.getElementById(
        "historyList"
    );



    if(!box){

        return;

    }





    var records =
    getRecords();





    if(records.length === 0){


        box.innerHTML =

        "<p>目前尚無發作紀錄</p>";


        return;


    }





    box.innerHTML = "";





    // 最新在前


    records.reverse();





    for(
        var i = 0;
        i < records.length;
        i++
    ){



        var data =
        records[i];



        var card =
        document.createElement(
            "div"
        );



        card.className =
        "history-card";





        card.innerHTML = `


        <h3>
        🚨 第 ${records.length-i} 次發作
        </h3>



        <p>
        📅 日期：
        ${data.date || "-"}
        </p>



        <p>
        ⏰ 開始：
        ${data.start || "-"}
        </p>



        <p>
        ⏰ 結束：
        ${data.end || "-"}
        </p>



        <p>
        ⏱ 持續時間：
        ${data.duration || 0}
        秒
        </p>



        <hr>



        <p>
        🧠 發作型態：
        ${showArray(data.type)}
        </p>



        <p>
        🌙 發作前：
        ${showArray(data.before)}
        </p>



        <p>
        👀 發作中：
        ${showArray(data.during)}
        </p>



        <p>
        💤 恢復時間：
        ${data.recovery || "-"}
        分鐘
        </p>



        <p>
        📝 備註：
        ${data.note || "-"}
        </p>



        `;




        box.appendChild(
            card
        );


    }



}









// ===============================
// 首頁最新紀錄
// ===============================


function updateLatest(){



    var box =
    document.getElementById(
        "latestBox"
    );



    if(!box){

        return;

    }





    var records =
    getRecords();





    if(records.length === 0){


        box.innerHTML =
        "尚無近期紀錄";


        return;


    }





    var last =
    records[
        records.length-1
    ];





    box.innerHTML = `


    最近一次發作<br><br>


    📅 ${last.date}<br>


    ⏱ 持續 ${last.duration} 秒



    `;



}









// ===============================
// 格式化陣列
// ===============================


function showArray(arr){



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
