
// ==========================================
// 👦 愷威 Care V3.1
// seizure.js
// 發作紀錄核心 + Google Sheet 同步
// ==========================================


// ===============================
// Google Sheet API
// ===============================

const GOOGLE_SHEET_API =
"https://script.google.com/macros/s/AKfycbyqBDv6Xnn1bUDnavrEoxIe9x0NWyRiZIImhPb5-G66eh3BOlCa3m_3ZFD-ftbLDPeogg/exec";


// ===============================
// 基本資料
// ===============================

const CHILD_ID = "P001";

const RECORD_USER = "照護人員";


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


// ===============================
// 暫存紀錄 Key
// ===============================

const PENDING_RECORD_KEY =
"care_pending_seizure";


// ===============================
// 開始發作
// ===============================

function startSeizure(){

    if(seizureRunning){

        return;

    }


    if(seizurePendingSave){

        alert(
            "⚠️ 目前還有一筆尚未儲存的發作紀錄。\n\n" +
            "請先完成並儲存上一筆紀錄。"
        );

        return;

    }


    // 清除舊計時器

    if(seizureTimer !== null){

        clearInterval(
            seizureTimer
        );

        seizureTimer = null;

    }


    // 初始化

    seizureRunning = true;

    seizurePendingSave = false;

    seizureSeconds = 0;

    emergencyTriggered = false;

    seizureStartTime = new Date();

    seizureEndTime = null;


    // 更新畫面

    updateStatus(
        "🚨 發作中｜請先照料與觀察"
    );

    updateStartTime();

    updateTimer();

    updateButtons();


    // 開始計時

    seizureTimer = setInterval(

        function(){

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

        },

        1000

    );

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


    // 停止計時器

    if(seizureTimer !== null){

        clearInterval(
            seizureTimer
        );

        seizureTimer = null;

    }


    // 結束發作

    seizureRunning = false;

    seizureEndTime = new Date();

    seizurePendingSave = true;


    // 暫存核心資料

    savePendingRecord();


    updateStatus(
        "🟡 發作已結束｜請完成紀錄後儲存"
    );

    updateButtons();


    alert(

        "⏹ 發作已結束\n\n" +

        "持續時間：" +

        formatDuration(
            seizureSeconds
        ) +

        "\n\n" +

        "請完成下方紀錄，最後按「💾 儲存紀錄」。"

    );

}


// ===============================
// 儲存紀錄
// ===============================

async function saveRecord(){

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


    if(!seizureEndTime){

        alert(
            "找不到發作結束時間，無法儲存。"
        );

        return;

    }


    // ===============================
    // 建立紀錄
    // ===============================

    const record = {

        id:
        Date.now(),

        child_id:
        CHILD_ID,

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
        getNote(),

        user:
        RECORD_USER

    };


    // ===============================
    // 先存本機
    // ===============================

    let records = [];

    try{

        records = JSON.parse(

            localStorage.getItem(
                "care_seizure_records"
            ) || "[]"

        );

    }catch(error){

        console.error(
            "讀取歷史紀錄失敗：",
            error
        );

        records = [];

    }


    records.push(record);


    localStorage.setItem(

        "care_seizure_records",

        JSON.stringify(
            records
        )

    );


    // ===============================
    // 顯示同步中
    // ===============================

    updateStatus(
        "☁️ 正在同步 Google Sheet..."
    );


    // 防止使用者重複按儲存

    const saveBtn =
    document.getElementById(
        "saveBtn"
    );


    if(saveBtn){

        saveBtn.disabled = true;

    }


    // ===============================
    // 傳送 Google Sheet
    // ===============================

    try{

        const result =
        await syncToGoogleSheet(record);


        // -------------------------------
        // Google Sheet 成功
        // -------------------------------

        if(
            result &&
            result.status === "success"
        ){

            localStorage.removeItem(
                PENDING_RECORD_KEY
            );


            seizurePendingSave = false;


            alert(

                "✅ 發作紀錄已儲存\n\n" +

                "☁️ Google Sheet 同步成功"

            );


            resetSeizure();

            return;

        }


        // -------------------------------
        // API 回傳錯誤
        // -------------------------------

        throw new Error(

            result &&
            result.message

            ?

            result.message

            :

            "Google Sheet 回傳錯誤"

        );


    }catch(error){

        console.error(
            "Google Sheet 同步失敗：",
            error
        );


        updateStatus(
            "⚠️ 已儲存於本機｜Google Sheet 尚未同步"
        );


        if(saveBtn){

            saveBtn.disabled = false;

        }


        alert(

            "⚠️ 發作紀錄已保存在本機\n\n" +

            "但 Google Sheet 同步失敗。\n\n" +

            "紀錄不會遺失，之後可以再處理同步。"

        );

    }

}


// ===============================
// Google Sheet 同步
// ===============================

async function syncToGoogleSheet(record){

    const data = {

        action:
        "saveSeizure",

        child_id:
        record.child_id,

        date:
        record.date,

        start_time:
        record.startTime,

        end_time:
        record.endTime,

        duration:
        record.duration,

        situation:
        record.situation,

        type:
        record.type.join("、"),

        condition:
        record.condition.join("、"),

        afterState:
        record.afterState.join("、"),

        note:
        record.note,

        user:
        record.user

    };


    const response =
    await fetch(

        GOOGLE_SHEET_API,

        {

            method:
            "POST",

            headers:{

                "Content-Type":
                "text/plain;charset=utf-8"

            },

            body:
            JSON.stringify(data)

        }

    );


    if(!response.ok){

        throw new Error(
            "HTTP " + response.status
        );

    }


    const result =
    await response.json();


    return result;

}


// ===============================
// 取消本次紀錄
// ===============================

function cancelSeizure(){

    if(!seizurePendingSave){

        alert(
            "目前沒有可以取消的待儲存紀錄。"
        );

        return;

    }


    const confirmCancel = confirm(

        "⚠️ 確定要取消本次紀錄嗎？\n\n" +

        "此次發作資料將不會保存。"

    );


    if(!confirmCancel){

        return;

    }


    localStorage.removeItem(
        PENDING_RECORD_KEY
    );


    resetSeizure();


    alert(
        "↩️ 本次紀錄已取消"
    );

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
// 讀取暫存紀錄
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
        JSON.parse(
            saved
        );


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
        ) || 0;


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

    if(seizureTimer !== null){

        clearInterval(
            seizureTimer
        );

    }


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

        box.textContent =
        "尚未開始";

    }


    clearForm();

    updateButtons();

}


// ===============================
// 更新按鈕
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


    const cancelBtn =
    document.getElementById(
        "cancelBtn"
    );


    if(startBtn){

        startBtn.disabled =
        seizureRunning ||
        seizurePendingSave;

    }


    if(stopBtn){

        stopBtn.disabled =
        !seizureRunning;

    }


    if(saveBtn){

        saveBtn.disabled =
        !seizurePendingSave;

    }


    if(cancelBtn){

        cancelBtn.disabled =
        !seizurePendingSave;

    }

}


// ===============================
// 更新計時器
// ===============================

function updateTimer(){

    const timer =
    document.getElementById(
        "timer"
    );


    if(!timer){

        return;

    }


    timer.textContent =

    formatDuration(
        seizureSeconds
    );

}


// ===============================
// 更新開始時間
// ===============================

function updateStartTime(){

    const box =
    document.getElementById(
        "startTimeBox"
    );


    if(
        box &&
        seizureStartTime
    ){

        box.textContent =

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

        box.textContent =
        text;

    }

}


// ===============================
// 取得發作場合
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
    .forEach(

        function(item){

            result.push(
                item.value
            );

        }

    );


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
    .forEach(

        function(item){

            item.checked = false;

        }

    );


    document
    .querySelectorAll(
        'input[name="type"]'
    )
    .forEach(

        function(item){

            item.checked = false;

        }

    );


    document
    .querySelectorAll(
        'input[name="condition"]'
    )
    .forEach(

        function(item){

            item.checked = false;

        }

    );


    document
    .querySelectorAll(
        'input[name="afterState"]'
    )
    .forEach(

        function(item){

            item.checked = false;

        }

    );


    const note =
    document.getElementById(
        "note"
    );


    if(note){

        note.value = "";

    }

}


// ===============================
// 格式：持續時間
// ===============================

function formatDuration(sec){

    sec =
    Number(sec) || 0;


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
// 格式：時間
// ===============================

function formatTime(date){

    if(!date){

        return "--:--:--";

    }


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

    if(!date){

        return "";

    }


    return (

        date.getFullYear()

        +

        "/"

        +

        String(
            date.getMonth() + 1
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

        console.log(
            "🚨 seizure.js V3.1 loaded"
        );


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


        const cancelBtn =
        document.getElementById(
            "cancelBtn"
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


        if(cancelBtn){

            cancelBtn.onclick =
            cancelSeizure;

        }


        loadPendingRecord();

        updateButtons();

        updateTimer();


    }

);
```
