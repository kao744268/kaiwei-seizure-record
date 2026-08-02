// ==========================================
// 愷威 Care V2.3.1
// seizure.js
// 發作紀錄核心
// ==========================================


// ===============================
// 狀態
// ===============================


let seizureRunning = false;

let seizurePendingSave = false;

let seizureSeconds = 0;

let seizureTimer = null;

let seizureStartTime = null;

let seizureEndTime = null;

let emergencyTriggered = false;


// 暫存 key

const PENDING_RECORD_KEY =
"care_pending_seizure";




// ===============================
// 開始發作
// ===============================


function startSeizure(){


    // 已經在發作中

    if(seizureRunning){

        return;

    }


    // 如果有上一筆未儲存紀錄

    if(seizurePendingSave){

        alert(
            "⚠️ 目前還有一筆尚未儲存的發作紀錄。\n\n" +
            "請先完成並儲存上一筆紀錄。"
        );

        return;

    }


    seizureRunning = true;

    seizurePendingSave = false;

    seizureSeconds = 0;

    emergencyTriggered = false;


    seizureStartTime = new Date();

    seizureEndTime = null;


    updateStatus(
        "🚨 發作中｜請先照料與觀察"
    );


    updateStartTime();

    updateTimer();


    updateButtons();


    seizureTimer = setInterval(function(){


        seizureSeconds++;


        updateTimer();


        // 五分鐘提醒

        if(
            seizureSeconds >= 300 &&
            emergencyTriggered === false
        ){

            emergencyTriggered = true;

            showFiveMinuteAlert();

        }


    },1000);


}









// ===============================
// 結束發作
// ===============================


function stopSeizure(){


    if(!seizureRunning){

        alert(
            "目前沒有進行中的發作紀錄"
        );

        return;

    }


    const confirmStop = confirm(

        "⏹ 確認結束發作？\n\n" +

        "持續時間：" +

        formatDuration(
            seizureSeconds
        )

    );


    if(!confirmStop){

        return;

    }


    // 停止計時

    clearInterval(
        seizureTimer
    );


    seizureTimer = null;


    seizureRunning = false;


    // 鎖定真正的結束時間

    seizureEndTime = new Date();


    // 進入待儲存狀態

    seizurePendingSave = true;


    // 暫存目前發作核心資料

    savePendingRecord();


    updateStatus(
        "🟡 發作已結束｜請完成紀錄後儲存"
    );


    updateButtons();


    alert(
        "⏹ 發作已結束\n\n" +
        "持續時間：" +
        formatDuration(seizureSeconds) +
        "\n\n" +
        "請完成下方紀錄，最後按「💾 儲存紀錄」。"
    );

}









// ===============================
// 儲存紀錄
// ===============================


function saveRecord(){


    if(!seizurePendingSave){

        alert(
            "目前沒有等待儲存的發作紀錄。"
        );

        return;

    }


    if(!seizureStartTime){

        alert(
            "找不到發作開始時間，無法儲存。"
        );

        return;

    }


    // 建立完整紀錄

    const record = {


        id:
        Date.now(),


        date:
        formatDate(
            seizureStartTime
        ),


        startTime:
        formatTime(
            seizureStartTime
        ),


        endTime:
        formatTime(
            seizureEndTime
        ),


        duration:
        seizureSeconds,


        situation:
        getSituation(),


        type:
        getCheckedValues(
            "type"
        ),


        condition:
        getCheckedValues(
            "condition"
        ),


        afterState:
        getCheckedValues(
            "afterState"
        ),


        note:
        getNote()


    };


    // 取得歷史紀錄

    let records = JSON.parse(

        localStorage.getItem(
            "care_seizure_records"
        )

        ||

        "[]"

    );


    records.push(record);


    localStorage.setItem(

        "care_seizure_records",

        JSON.stringify(records)

    );


    // 清除待儲存資料

    localStorage.removeItem(
        PENDING_RECORD_KEY
    );


    seizurePendingSave = false;


    alert(
        "✅ 發作紀錄已儲存"
    );


    // 重置

    resetSeizure();

}









// ===============================
// 暫存紀錄
// ===============================


function savePendingRecord(){


    if(
        !seizureStartTime ||
        !seizureEndTime
    ){

        return;

    }


    const pendingRecord = {


        startTime:
        seizureStartTime.getTime(),


        endTime:
        seizureEndTime.getTime(),


        duration:
        seizureSeconds


    };


    localStorage.setItem(

        PENDING_RECORD_KEY,

        JSON.stringify(
            pendingRecord
        )

    );

}









// ===============================
// 讀取暫存
// ===============================


function loadPendingRecord(){


    const saved =

    localStorage.getItem(
        PENDING_RECORD_KEY
    );


    if(!saved){

        return;

    }


    try{


        const record =
        JSON.parse(saved);


        seizureStartTime =
        new Date(
            record.startTime
        );


        seizureEndTime =
        new Date(
            record.endTime
        );


        seizureSeconds =
        Number(
            record.duration
        );


        seizureRunning = false;

        seizurePendingSave = true;


        updateTimer();

        updateStartTime();


        updateStatus(
            "🟡 有一筆尚未儲存的發作紀錄"
        );


        updateButtons();


    }catch(error){


        console.error(
            "讀取待儲存紀錄失敗：",
            error
        );


        localStorage.removeItem(
            PENDING_RECORD_KEY
        );

    }

}









// ===============================
// 五分鐘提醒
// ===============================


function showFiveMinuteAlert(){


    alert(

        "🚨 發作超過 5 分鐘\n\n" +

        "請依醫囑處理：\n\n" +

        "① 給予緊急藥物\n\n" +

        "② 通知鄰近醫院送醫\n\n" +

        "③ 聯絡家長"

    );

}









// ===============================
// 重置
// ===============================


function resetSeizure(){


    clearInterval(
        seizureTimer
    );


    seizureTimer = null;


    seizureRunning = false;

    seizurePendingSave = false;


    seizureSeconds = 0;


    seizureStartTime = null;

    seizureEndTime = null;


    emergencyTriggered = false;


    updateTimer();


    updateStatus(
        "等待開始紀錄"
    );


    const box =
    document.getElementById(
        "startTimeBox"
    );


    if(box){

        box.innerHTML =
        "尚未開始";

    }


    clearForm();


    updateButtons();

}









// ===============================
// 更新按鈕狀態
// ===============================


function updateButtons(){


    const startBtn =
    document.getElementById(
        "startBtn"
    );


    const stopBtn =
    document.getElementById(
        "stopBtn"
    );


    const saveBtn =
    document.getElementById(
        "saveBtn"
    );


    // 開始按鈕

    if(startBtn){

        startBtn.disabled =
        seizureRunning ||
        seizurePendingSave;

    }


    // 結束按鈕

    if(stopBtn){

        stopBtn.disabled =
        !seizureRunning;

    }


    // 儲存按鈕

    if(saveBtn){

        saveBtn.disabled =
        !seizurePendingSave;

    }

}









// ===============================
// 更新計時
// ===============================


function updateTimer(){


    const timer =
    document.getElementById(
        "timer"
    );


    if(timer){

        timer.innerHTML =

        formatDuration(
            seizureSeconds
        );

    }

}









// ===============================
// 更新開始時間
// ===============================


function updateStartTime(){


    const box =
    document.getElementById(
        "startTimeBox"
    );


    if(box && seizureStartTime){

        box.innerHTML =

        "開始時間：" +

        formatTime(
            seizureStartTime
        );

    }

}









// ===============================
// 更新狀態
// ===============================


function updateStatus(text){


    const box =
    document.getElementById(
        "statusBox"
    );


    if(box){

        box.innerHTML =
        text;

    }

}









// ===============================
// 取得場合
// ===============================


function getSituation(){


    const item =

    document.querySelector(

        'input[name="situation"]:checked'

    );


    return item

    ?

    item.value

    :

    "未選擇";

}









// ===============================
// 取得複選資料
// ===============================


function getCheckedValues(name){


    const result = [];


    document

    .querySelectorAll(

        'input[name="' +
        name +
        '"]:checked'

    )

    .forEach(function(item){


        result.push(
            item.value
        );


    });


    return result;

}









// ===============================
// 取得備註
// ===============================


function getNote(){


    const note =
    document.getElementById(
        "note"
    );


    return note

    ?

    note.value.trim()

    :

    "";

}









// ===============================
// 清除表單
// ===============================


function clearForm(){


    document

    .querySelectorAll(
        'input[name="situation"]'
    )

    .forEach(function(item){

        item.checked = false;

    });


    document

    .querySelectorAll(
        'input[name="type"]'
    )

    .forEach(function(item){

        item.checked = false;

    });


    document

    .querySelectorAll(
        'input[name="condition"]'
    )

    .forEach(function(item){

        item.checked = false;

    });


    document

    .querySelectorAll(
        'input[name="afterState"]'
    )

    .forEach(function(item){

        item.checked = false;

    });


    const note =
    document.getElementById(
        "note"
    );


    if(note){

        note.value = "";

    }

}









// ===============================
// 格式：時間
// ===============================


function formatDuration(sec){


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
// 格式：時分秒
// ===============================


function formatTime(date){


    return (

        String(
            date.getHours()
        )
        .padStart(2,"0")

        +

        ":"

        +

        String(
            date.getMinutes()
        )
        .padStart(2,"0")

        +

        ":"

        +

        String(
            date.getSeconds()
        )
        .padStart(2,"0")

    );

}









// ===============================
// 格式：日期
// ===============================


function formatDate(date){


    return (

        date.getFullYear()

        +

        "/"

        +

        String(
            date.getMonth()+1
        )
        .padStart(2,"0")

        +

        "/"

        +

        String(
            date.getDate()
        )
        .padStart(2,"0")

    );

}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    const startBtn =
    document.getElementById(
        "startBtn"
    );


    const stopBtn =
    document.getElementById(
        "stopBtn"
    );


    const saveBtn =
    document.getElementById(
        "saveBtn"
    );


    if(startBtn){

        startBtn.onclick =
        startSeizure;

    }


    if(stopBtn){

        stopBtn.onclick =
        stopSeizure;

    }


    if(saveBtn){

        saveBtn.onclick =
        saveRecord;

    }


    // 嘗試恢復未儲存紀錄

    loadPendingRecord();


    // 初始按鈕狀態

    updateButtons();


    console.log(
        "🚨 seizure.js V2.3.1 loaded"
    );

});
