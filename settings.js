// ==========================================
// 👦 愷威 Care
// settings.js
// 家長控制＋紀錄者設定
// ==========================================


// ===============================
// 預設設定
// ===============================

const defaultSettings = {

    parentMode: false,

    pin: "1234",

    recorder: ""

};


// ===============================
// 取得設定
// ===============================

function getSettings(){

    const data =
    localStorage.getItem(
        "care_settings"
    );


    if(data){

        try{

            return {
                ...defaultSettings,
                ...JSON.parse(data)
            };

        }catch(error){

            console.error(
                "讀取設定失敗：",
                error
            );

        }

    }


    return {
        ...defaultSettings
    };

}


// ===============================
// 儲存設定
// ===============================

function saveSettings(data){

    localStorage.setItem(

        "care_settings",

        JSON.stringify(data)

    );

}


// ===============================
// 設定紀錄者
// ===============================

function setRecorder(){

    const settings =
    getSettings();


    const current =
    settings.recorder || "";


    const input =
    prompt(

        "請輸入紀錄者姓名\n\n" +

        "例如：媽媽、爸爸、老師、阿姨\n\n" +

        "目前紀錄者：" +

        (current || "尚未設定"),

        current

    );


    if(input === null){

        return;

    }


    const recorder =
    input.trim();


    if(!recorder){

        alert(
            "⚠️ 紀錄者不能為空白"
        );

        return;

    }


    settings.recorder =
    recorder;


    saveSettings(
        settings
    );


    alert(

        "✅ 紀錄者已設定為：\n\n" +

        recorder

    );


    console.log(
        "👤 紀錄者設定：",
        recorder
    );

}


// ===============================
// 取得紀錄者
// ===============================

function getRecorder(){

    const settings =
    getSettings();


    return settings.recorder || "未設定";

}


// ===============================
// 開啟家長模式
// ===============================

function enableParentMode(){

    const settings =
    getSettings();


    const input =
    prompt(
        "請輸入家長PIN碼"
    );


    if(
        input === settings.pin
    ){

        settings.parentMode =
        true;


        saveSettings(
            settings
        );


        alert(
            "🔓 已進入家長管理模式"
        );


    }else{

        alert(
            "❌ PIN錯誤"
        );

    }

}


// ===============================
// 關閉家長模式
// ===============================

function disableParentMode(){

    const settings =
    getSettings();


    settings.parentMode =
    false;


    saveSettings(
        settings
    );


    alert(
        "🔒 已回到查看模式"
    );

}


// ===============================
// 檢查權限
// ===============================

function isParentMode(){

    const settings =
    getSettings();


    return settings.parentMode;

}


// ===============================
// 備份資料
// ===============================

function backupData(){

    const backup = {

        medical:

        JSON.parse(

            localStorage.getItem(
                "care_medical_info"
            )

            ||

            "{}"

        ),


        seizures:

        JSON.parse(

            localStorage.getItem(
                "care_seizure_records"
            )

            ||

            "[]"

        ),


        settings:

        getSettings()

    };


    const blob =
    new Blob(

        [
            JSON.stringify(
                backup,
                null,
                2
            )
        ],

        {
            type:
            "application/json"
        }

    );


    const url =
    URL.createObjectURL(
        blob
    );


    const a =
    document.createElement(
        "a"
    );


    a.href =
    url;


    a.download =
    "愷威Care備份資料.json";


    a.click();


    URL.revokeObjectURL(
        url
    );

}


// ===============================
// 匯出發作紀錄
// ===============================

function exportRecords(){

    const records =

    JSON.parse(

        localStorage.getItem(
            "care_seizure_records"
        )

        ||

        "[]"

    );


    let text =
    "愷威 Care 發作紀錄\n\n";


    records.forEach(

        function(item,index){

            text +=

            "第 "

            +

            (index + 1)

            +

            " 次發作\n"

            +

            "日期："

            +

            item.date

            +

            "\n"

            +

            "開始時間："

            +

            (item.startTime || "-")

            +

            "\n"

            +

            "結束時間："

            +

            (item.endTime || "-")

            +

            "\n"

            +

            "持續："

            +

            item.duration

            +

            " 秒\n"

            +

            "紀錄者："

            +

            (item.recorder || "未設定")

            +

            "\n\n";

        }

    );


    const blob =
    new Blob(

        [
            text
        ],

        {
            type:
            "text/plain"
        }

    );


    const url =
    URL.createObjectURL(
        blob
    );


    const a =
    document.createElement(
        "a"
    );


    a.href =
    url;


    a.download =
    "愷威Care發作紀錄.txt";


    a.click();


    URL.revokeObjectURL(
        url
    );

}


// ===============================
// 初始化
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        const backupBtn =
        document.getElementById(
            "backupBtn"
        );


        if(backupBtn){

            backupBtn.addEventListener(

                "click",

                backupData

            );

        }


        const exportBtn =
        document.getElementById(
            "exportBtn"
        );


        if(exportBtn){

            exportBtn.addEventListener(

                "click",

                exportRecords

            );

        }


        console.log(
            "⚙️ settings.js 初始化完成"
        );


        console.log(
            "👤 目前紀錄者：",
            getRecorder()
        );

    }

);
