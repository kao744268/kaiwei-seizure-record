// ==========================================
// 愷威 Care 癲癇紀錄版 V1.0
// history.js
// History Record Display
// ==========================================



// ===============================
// 讀取歷史紀錄
// ===============================


function getHistoryRecords(){


    var records =

    JSON.parse(

        localStorage.getItem(
            "care_seizure_records"
        )

        ||

        "[]"

    );



    return records;


}









// ===============================
// 顯示歷史紀錄
// ===============================


function renderHistory(){



    var historyList =

    document.getElementById(
        "historyList"
    );



    if(!historyList){

        return;

    }





    var records =
    getHistoryRecords();





    if(records.length === 0){


        historyList.innerHTML =

        "<p>目前尚無發作紀錄</p>";



        return;


    }







    historyList.innerHTML = "";







    // 最新在最上面


    records.reverse();





    for(
        var i = 0;
        i < records.length;
        i++
    ){


        var record =
        records[i];





        var card =
        document.createElement(
            "div"
        );



        card.className =
        "history-card";





        card.innerHTML = `

        <h3>
        🚨 第 ${records.length - i} 次發作
        </h3>


        <p>
        📅 日期：
        ${record.date || "-"}
        </p>


        <p>
        ⏰ 開始：
        ${record.startTime || "-"}
        </p>


        <p>
        ⏰ 結束：
        ${record.endTime || "-"}
        </p>


        <p>
        ⏱ 持續：
        ${record.duration || 0}
        秒
        </p>



        <hr>


        <p>
        🧠 發作型態：
        ${
            formatArray(record.type)
        }
        </p>


        <p>
        🌙 發作前：
        ${
            formatArray(record.before)
        }
        </p>


        <p>
        👀 發作中：
        ${
            formatArray(record.during)
        }
        </p>



        <p>
        💤 恢復時間：
        ${
            record.recovery || "-"
        }
        分鐘
        </p>



        <p>
        📝 備註：
        ${
            record.note || "-"
        }
        </p>


        `;





        historyList.appendChild(
            card
        );


    }



}









// ===============================
// 陣列轉文字
// ===============================


function formatArray(arr){



    if(!arr || arr.length === 0){


        return "-";


    }



    return arr.join(
        "、"
    );


}









// ===============================
// 首頁最新紀錄
// ===============================


function updateLatestRecord(){



    var box =

    document.getElementById(
        "latestBox"
    );



    if(!box){

        return;

    }





    var records =
    getHistoryRecords();





    if(records.length === 0){


        box.innerHTML =
        "尚無近期紀錄";


        return;


    }





    var latest =
    records[
        records.length - 1
    ];





    box.innerHTML = `

    最近一次發作<br><br>

    📅 ${latest.date}<br>

    ⏱ ${latest.duration} 秒

    `;



}









// ===============================
// 啟動
// ===============================


window.onload =
function(){



    renderHistory();


    updateLatestRecord();



    console.log(
        "📋 history.js 載入完成"
    );



};
