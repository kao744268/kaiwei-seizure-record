// ==========================================
// 👦 愷威 Care V3.3
// seizure.js
// 發作紀錄 + Google Sheet 同步
// + Screen Wake Lock
// + 背景計時保護
// ==========================================


// ==========================================
// Google Sheet API
// ==========================================

const GOOGLE_SHEET_API =
"https://script.google.com/macros/s/AKfycbyqBDv6Xnn1bUDnavrEoxIe9x0NWyRiZIImhPb5-G66eh3BOlCa3m_3ZFD-ftbLDPeogg/exec";


// ==========================================
// Child ID
// ==========================================

const CHILD_ID = "P001";


// ==========================================
// LocalStorage
// ==========================================

const PENDING_RECORD_KEY =
"care_pending_seizure";


// ==========================================
// 發作狀態
// ==========================================

let seizureTimer = null;

let seizureRunning = false;

let seizurePendingSave = false;

let seizureSeconds = 0;

let seizureStartTime = null;

let seizureEndTime = null;

let emergencyTriggered = false;


// ==========================================
// Screen Wake Lock
// ==========================================

let wakeLock = null;


// ==========================================
// 取得螢幕保持喚醒
// ==========================================

async function requestWakeLock(){

    try{

        if(
            !("wakeLock" in navigator)
        ){

            console.warn(
                "📱 此瀏覽器不支援 Screen Wake Lock"
            );

            return;

        }


        if(
            wakeLock &&
            !wakeLock.released
        ){

            return;

        }


        wakeLock =
        await navigator.wakeLock.request(
            "screen"
        );


        console.log(
            "📱 Screen Wake Lock 已啟用"
        );


        wakeLock.addEventListener(
            "release",
            function(){

                console.log(
                    "📱 Screen Wake Lock 已解除"
                );

            }
        );


    }catch(error){

        console.warn(
            "📱 無法啟用 Screen Wake Lock：",
            error
        );

    }

}


// ==========================================
// 重新取得 Wake Lock
// App 從背景回來時使用
// ==========================================

async function reacquireWakeLock(){

    if(
        document.visibilityState !==
        "visible"
    ){

        return;

    }


    if(
        !seizureRunning
    ){

        return;

    }


    await requestWakeLock();

}


// ==========================================
// App 可見狀態變化
// ==========================================

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.visibilityState ===
            "visible"
        ){

            reacquireWakeLock();

            updateElapsedTime();

        }

    }
);


// ==========================================
// 開始發作
// ==========================================

function startSeizure(){

    if(
        seizureRunning ||
        seizurePendingSave
    ){

        return;

    }


    seizureStartTime =
    new Date();


    seizureEndTime =
    null;


    seizureSeconds =
    0;


    seizureRunning =
    true;


    seizurePendingSave =
    false;


    emergencyTriggered =
    false;


    updateStartTime();

    updateTimer();

    updateStatus(
        "🔴 發作進行中..."
    );


    updateButtons();


    // 啟用螢幕保持喚醒

    requestWakeLock();


    // 使用實際時間計算

    if(
        seizureTimer !== null
    ){

        clearInterval(
            seizureTimer
        );

    }


    seizureTimer =
    setInterval(

        updateElapsedTime,

        1000

    );

}


// ==========================================
// 更新實際經過時間
// ==========================================

function updateElapsedTime(){

    if(
        !seizureRunning ||
        !seizureStartTime
    ){

        return;

    }


    const now =
    new Date();


    seizureSeconds =
    Math.floor(

        (
            now.getTime() -
            seizureStartTime.getTime()
        )
        /
        1000

    );


    updateTimer();


    // ======================================
    // 五分鐘提醒
    // ======================================

    if(
        seizureSeconds >= 300 &&
        !emergencyTriggered
    ){

        emergencyTriggered =
        true;


        showFiveMinuteAlert();

    }

}


// ==========================================
// 結束發作
// ==========================================

function stopSeizure(){

    if(
        !seizureRunning
    ){

        return;

    }


    // 先更新最後秒數

    updateElapsedTime();


    seizureEndTime =
    new Date();


    seizureRunning =
    false;


    if(
        seizureTimer !== null
    ){

        clearInterval(
            seizureTimer
        );

    }


    seizureTimer =
    null;


    updateStatus(
        "🟡 發作已結束，請確認資料"
    );


    seizurePendingSave =
    true;


    savePendingRecord();


    updateButtons();


    console.log(
        "⏹ 發作結束：",
        seizureSeconds,
        "秒"
    );

}


// ==========================================
// 建立完整紀錄
// ==========================================

async function saveRecord(){

    if(
        !seizurePendingSave
    ){

        alert(
            "目前沒有等待儲存的發作紀錄。"
        );

        return;

    }


    if(
        !seizureStartTime
    ){

        alert(
            "找不到發作開始時間，無法儲存。"
        );

        return;

    }


    // 防止重複按儲存

    const saveBtn =
    document.getElementById(
        "saveBtn"
    );


    if(saveBtn){

        saveBtn.disabled =
        true;

    }


    // ======================================
    // 取得目前使用者
    // ======================================

    let currentUser =
    "現場紀錄";


    try{

        // ======================================
        // 使用新版使用者系統
        // user.js：getCurrentUser()
        // ======================================

        if(
            typeof getCurrentUser ===
            "function"
        ){

            const user =
            getCurrentUser();


            if(user){

                // 優先使用 displayName
                // 例如：冠如｜老師

                if(
                    user.displayName
                ){

                    currentUser =
                    user.displayName;

                }else{

                    // 相容舊格式

                    currentUser =
                    (
                        user.name ||
                        "未設定姓名"
                    ) +
                    "｜" +
                    (
                        user.role ||
                        "未設定角色"
                    );

                }

            }

        }

    }catch(error){

        console.warn(
            "取得目前紀錄者資訊失敗：",
            error
        );

    }


    // ======================================
    // 建立完整紀錄
    // ======================================

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
        currentUser

    };


    // ======================================
    // 第一層：LocalStorage
    // ======================================

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


    records.push(
        record
    );


    localStorage.setItem(

        "care_seizure_records",

        JSON.stringify(
            records
        )

    );


    // ======================================
    // 第二層：Google Sheet
    // ======================================

    updateStatus(
        "☁️ 正在同步 Google Sheet..."
    );


    try{

        const result =
        await sendToGoogleSheet(
            record
        );


        if(
            result &&
            result.status === "success"
        ){

            // ==================================
            // Google Sheet 成功
            // ==================================

            localStorage.removeItem(
                PENDING_RECORD_KEY
            );


            seizurePendingSave =
            false;


            // ==================================
            // 詢問是否保留手機紀錄
            // ==================================

            const keepLocal =
            confirm(

                "✅ 發作紀錄已儲存\n\n" +

                "☁️ Google Sheet 同步成功\n\n" +

                "是否要保留這筆紀錄在此手機？\n\n" +

                "按「確定」＝保留\n" +

                "按「取消」＝從此手機刪除"

            );


            if(
                !keepLocal
            ){

                removeLocalRecord(
                    record.id
                );

            }


            resetSeizure();


        }else{

            // ==================================
            // API 有回應，但同步失敗
            // ==================================

            console.error(
                "Google Sheet 回應錯誤：",
                result
            );


            alert(

                "⚠️ 發作紀錄已儲存在本機\n\n" +

                "但 Google Sheet 同步失敗。\n\n" +

                "資料不會遺失，請稍後再同步。"

            );


            seizurePendingSave =
            false;


            updateButtons();

        }


    }catch(error){

        console.error(
            "Google Sheet 同步失敗：",
            error
        );


        alert(

            "⚠️ 發作紀錄已儲存在本機\n\n" +

            "目前無法連線到 Google Sheet。\n\n" +

            "資料不會遺失。"

        );


        seizurePendingSave =
        false;


        updateButtons();

    }

}


// ==========================================
// 刪除手機上的單筆紀錄
// ==========================================

function removeLocalRecord(id){

    try{

        const records =
        JSON.parse(

            localStorage.getItem(
                "care_seizure_records"
            ) || "[]"

        );


        const filtered =
        records.filter(
            function(item){

                return item.id !== id;

            }
        );


        localStorage.setItem(

            "care_seizure_records",

            JSON.stringify(
                filtered
            )

        );


        console.log(
            "🗑️ 已從手機刪除紀錄：",
            id
        );


    }catch(error){

        console.error(
            "刪除本機紀錄失敗：",
            error
        );

    }

}


// ==========================================
// 發送 Google Sheet
// ==========================================

async function sendToGoogleSheet(record){

    const payload = {

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

            headers:
            {

                "Content-Type":
                "text/plain;charset=utf-8"

            },

            body:
            JSON.stringify(
                payload
            )

        }

    );


    if(
        !response.ok
    ){

        throw new Error(
            "HTTP " +
            response.status
        );

    }


    return await response.json();

}


// ==========================================
// 取消本次紀錄
// ==========================================

function cancelSeizure(){

    if(
        !seizurePendingSave
    ){

        alert(
            "目前沒有可以取消的待儲存紀錄。"
        );

        return;

    }


    const confirmCancel =
    confirm(

        "⚠️ 確定要取消本次紀錄嗎？\n\n" +

        "此次發作資料將不會保存。"

    );


    if(
        !confirmCancel
    ){

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


// ==========================================
// 暫存紀錄
// ==========================================

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


// ==========================================
// 讀取暫存紀錄
// ==========================================

function loadPendingRecord(){

    const saved =
    localStorage.getItem(
        PENDING_RECORD_KEY
    );


    if(
        !saved
    ){

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


        seizureRunning =
        false;


        seizurePendingSave =
        true;


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


// ==========================================
// 五分鐘提醒
// ==========================================

function showFiveMinuteAlert(){

    alert(

        "🚨 發作超過 5 分鐘\n\n" +

        "請依醫囑處理：\n\n" +

        "① 給予緊急藥物\n\n" +

        "② 通知鄰近醫院送醫\n\n" +

        "③ 聯絡家長"

    );

}


// ==========================================
// 重置
// ==========================================

function resetSeizure(){

    if(
        seizureTimer !== null
    ){

        clearInterval(
            seizureTimer
        );

    }


    seizureTimer =
    null;


    seizureRunning =
    false;


    seizurePendingSave =
    false;


    seizureSeconds =
    0;


    seizureStartTime =
    null;


    seizureEndTime =
    null;


    emergencyTriggered =
    false;


    // ======================================
    // 釋放 Wake Lock
    // ======================================

    if(
        wakeLock &&
        !wakeLock.released
    ){

        wakeLock.release()
        .then(
            function(){

                wakeLock =
                null;


                console.log(
                    "📱 發作結束，已解除螢幕保持喚醒"
                );

            }
        )
        .catch(
            function(error){

                console.warn(
                    "解除 Wake Lock 失敗：",
                    error
                );


                wakeLock =
                null;

            }
        );

    }


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


// ==========================================
// 更新按鈕
// ==========================================

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


// ==========================================
// 更新計時器
// ==========================================

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


// ==========================================
// 更新開始時間
// ==========================================

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


// ==========================================
// 更新狀態
// ==========================================

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


// ==========================================
// 取得發作場合
// ==========================================

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


// ==========================================
// 取得複選資料
// ==========================================

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


// ==========================================
// 取得備註
// ==========================================

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


// ==========================================
// 清除表單
// ==========================================

function clearForm(){

    document
    .querySelectorAll(
        'input[name="situation"]'
    )
    .forEach(
        function(item){

            item.checked =
            false;

        }
    );


    document
    .querySelectorAll(
        'input[name="type"]'
    )
    .forEach(
        function(item){

            item.checked =
            false;

        }
    );


    document
    .querySelectorAll(
        'input[name="condition"]'
    )
    .forEach(
        function(item){

            item.checked =
            false;

        }
    );


    document
    .querySelectorAll(
        'input[name="afterState"]'
    )
    .forEach(
        function(item){

            item.checked =
            false;

        }
    );


    const note =
    document.getElementById(
        "note"
    );


    if(note){

        note.value =
        "";

    }

}


// ==========================================
// 格式：持續時間
// ==========================================

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
// 格式：時間
// ==========================================

function formatTime(date){

    if(!date){

        return "--:--:--";

    }


    return (

        String(
            date.getHours()
        )
        .padStart(
            2,
            "0"
        )

        +

        ":"

        +

        String(
            date.getMinutes()
        )
        .padStart(
            2,
            "0"
        )

        +

        ":"

        +

        String(
            date.getSeconds()
        )
        .padStart(
            2,
            "0"
        )

    );

}


// ==========================================
// 格式：日期
// ==========================================

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
        .padStart(
            2,
            "0"
        )

        +

        "/"

        +

        String(
            date.getDate()
        )
        .padStart(
            2,
            "0"
        )

    );

}


// ==========================================
// 初始化
// ==========================================

function initSeizure(){

    console.log(
        "🚨 seizure.js V3.3 loaded"
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

    updateTimer();

    updateButtons();

}


// ==========================================
// DOM 初始化
// ==========================================

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initSeizure
    );

}else{

    initSeizure();

}
