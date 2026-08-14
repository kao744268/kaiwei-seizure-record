// ==========================================
// 👦 愷威 Care V2.4
// history.js
// 歷史紀錄顯示 + 清除本機紀錄
// ==========================================


// ==========================================
// 顯示歷史紀錄
// ==========================================

function renderHistory(){


    const box =
    document.getElementById(
        "historyList"
    );


    if(!box){

        return;

    }


    let records = [];


    try{

        records = JSON.parse(

            localStorage.getItem(
                "care_seizure_records"
            )

            ||

            "[]"

        );

    }catch(error){

        console.error(
            "讀取歷史紀錄失敗：",
            error
        );

        records = [];

    }


    // ======================================
    // 清除按鈕
    // ======================================

    let clearButtonHTML = `

        <button
            id="clearHistoryBtn"
            class="cancel-button history-clear-button"
        >
            🗑️ 清除本機歷史紀錄
        </button>

    `;


    // ======================================
    // 沒有紀錄
    // ======================================

    if(records.length === 0){

        box.innerHTML = `

            <div class="info-card">

                目前沒有發作紀錄

            </div>

            <div class="history-clear-area">

                ${clearButtonHTML}

            </div>

        `;


        bindClearHistoryButton();


        return;

    }


    // ======================================
    // 最新在前
    // 使用 slice 避免修改原始陣列
    // ======================================

    records =
    records.slice().reverse();


    box.innerHTML = "";


    // ======================================
    // 歷史紀錄卡片
    // ======================================

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


        box.appendChild(
            card
        );


    });


    // ======================================
    // 清除按鈕
    // ======================================

    const clearArea =
    document.createElement(
        "div"
    );


    clearArea.className =
    "history-clear-area";


    clearArea.innerHTML =
    clearButtonHTML;


    box.appendChild(
        clearArea
    );


    bindClearHistoryButton();

}


// ==========================================
// 清除本機歷史紀錄
// ==========================================

function clearLocalHistory(){


    const records = JSON.parse(

        localStorage.getItem(
            "care_seizure_records"
        )

        ||

        "[]"

    );


    // 沒有資料就不用清除

    if(records.length === 0){

        alert(
            "目前沒有可以清除的本機歷史紀錄。"
        );

        return;

    }


    // ======================================
    // 二次確認
    // ======================================

    const confirmClear =
    confirm(

        "⚠️ 確定要清除這台手機上的歷史紀錄嗎？\n\n" +

        "這個動作只會刪除「本機」保存的紀錄。\n\n" +

        "☁️ Google Sheet 裡的資料不會被刪除。\n\n" +

        "確定要繼續嗎？"

    );


    if(!confirmClear){

        return;

    }


    // ======================================
    // 只刪除本機資料
    // ======================================

    localStorage.removeItem(

        "care_seizure_records"

    );


    console.log(
        "🗑️ 已清除本機歷史紀錄"
    );


    alert(

        "✅ 本機歷史紀錄已清除\n\n" +

        "Google Sheet 的資料完全不受影響。"

    );


    // ======================================
    // 重新整理畫面
    // ======================================

    renderHistory();

}


// ==========================================
// 綁定清除按鈕
// ==========================================

function bindClearHistoryButton(){


    const clearBtn =
    document.getElementById(
        "clearHistoryBtn"
    );


    if(!clearBtn){

        return;

    }


    clearBtn.onclick =
    clearLocalHistory;

}


// ==========================================
// 秒數格式
// ==========================================

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
        .padStart(
            2,
            "0"
        )

        +

        ":"

        +

        String(second)
        .padStart(
            2,
            "0"
        )

    );

}


// ==========================================
// 初始化
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function(){


        console.log(
            "📋 history.js V2.4 loaded"
        );


    }

);
