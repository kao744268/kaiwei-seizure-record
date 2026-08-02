// ==========================================
// 愷威 Care V2.3.1
// history.js
// 歷史紀錄顯示
// ==========================================


function renderHistory(){


    const box =
    document.getElementById(
        "historyList"
    );


    if(!box){

        return;

    }


    let records = JSON.parse(

        localStorage.getItem(
            "care_seizure_records"
        )

        ||

        "[]"

    );


    if(records.length === 0){

        box.innerHTML = `

        <div class="info-card">

        目前沒有發作紀錄

        </div>

        `;

        return;

    }


    // 最新在前
    // 使用 slice 避免直接修改原始陣列

    records =
    records.slice().reverse();


    box.innerHTML = "";


    records.forEach(function(record){


        const typeText =

        record.type &&
        record.type.length

        ?

        record.type.join("、")

        :

        "未記錄";


        const conditionText =

        record.condition &&
        record.condition.length

        ?

        record.condition.join("、")

        :

        "未記錄";


        const afterText =

        record.afterState &&
        record.afterState.length

        ?

        record.afterState.join("、")

        :

        "未記錄";


        const card =
        document.createElement(
            "div"
        );


        card.className =
        "history-card";


        card.innerHTML = `

        <h3>
        🚨 ${record.date}
        </h3>


        <p>
        ⏰ 開始：
        ${record.startTime}
        </p>


        <p>
        ⏹ 結束：
        ${record.endTime}
        </p>


        <p>
        ⌛ 持續：
        ${formatHistoryDuration(record.duration)}
        </p>


        <hr>


        <p>
        📍 場合：
        ${record.situation}
        </p>


        <p>
        🧠 型態：
        ${typeText}
        </p>


        <p>
        👀 意識：
        ${conditionText}
        </p>


        <p>
        🌱 發作後：
        ${afterText}
        </p>


        <p>
        📝 備註：
        ${record.note || "無"}
        </p>

        `;


        box.appendChild(card);


    });


}









// ===============================
// 秒數格式
// ===============================


function formatHistoryDuration(sec){


    if(!sec){

        return "00:00";

    }


    const min =

    Math.floor(
        sec / 60
    );


    const second =

    sec % 60;


    return (

        String(min)
        .padStart(2,"0")

        +

        ":"

        +

        String(second)
        .padStart(2,"0")

    );

}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    console.log(
        "📋 history.js V2.3.1 loaded"
    );


});
