// ==========================================
// 愷威 Care V2.0 守護版
// seizure.js
// Seizure Record System
// ==========================================



let seizureTimer = null;

let seizureSeconds = 0;

let seizureRunning = false;

let seizureStartTime = null;








// ===============================
// 開始發作
// ===============================


function startSeizure(){



    if(seizureRunning){

        return;

    }



    seizureRunning = true;


    seizureSeconds = 0;


    seizureStartTime = new Date();



    updateTimer();



    const status =
    document.getElementById(
        "statusBox"
    );



    if(status){

        status.innerHTML =
        "🚨 發作中";

    }





    seizureTimer = setInterval(
        function(){


            seizureSeconds++;


            updateTimer();



            // 超過5分鐘

            if(seizureSeconds >= 300){


                triggerEmergency();


            }



        },
        1000
    );



    console.log(
        "開始發作:",
        seizureStartTime
    );



}









// ===============================
// 計時顯示
// ===============================


function updateTimer(){



    const timer =
    document.getElementById(
        "timer"
    );



    if(!timer){

        return;

    }



    let min =
    Math.floor(
        seizureSeconds / 60
    );



    let sec =
    seizureSeconds % 60;



    timer.innerHTML =

    formatNumber(min)

    +

    ":"

    +

    formatNumber(sec);



}









// ===============================
// 結束發作
// ===============================


function stopSeizure(){



    if(!seizureRunning){

        return;

    }




    clearInterval(
        seizureTimer
    );



    seizureTimer = null;


    seizureRunning = false;





    let endTime =
    new Date();





    let record =
    createRecord(
        endTime
    );





    saveRecord(
        record
    );





    const status =
    document.getElementById(
        "statusBox"
    );



    if(status){


        status.innerHTML =
        "✅ 發作紀錄完成";


    }



    console.log(
        "完成紀錄:",
        record
    );



    if(
        typeof renderHistory === "function"
    ){

        renderHistory();

    }



}









// ===============================
// 建立資料
// ===============================


function createRecord(endTime){



    return {


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
            endTime
        ),



        duration:
        seizureSeconds,



        type:
        getCheckedValues(
            "type"
        ),



        condition:
        getCheckedValues(
            "condition"
        ),



        recovery:
        getValue(
            "recoveryTime"
        ),



        note:
        getValue(
            "note"
        )



    };


}









// ===============================
// 儲存資料
// ===============================


function saveRecord(record){



    let records =

    JSON.parse(

        localStorage.getItem(
            "care_seizure_records"
        )

        ||

        "[]"

    );





    records.push(
        record
    );





    localStorage.setItem(

        "care_seizure_records",

        JSON.stringify(records)

    );



}









// ===============================
// 取得勾選
// ===============================


function getCheckedValues(name){



    let result = [];



    document

    .querySelectorAll(

    'input[name="' + name + '"]:checked'

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
// 取得輸入
// ===============================


function getValue(id){



    let element =
    document.getElementById(
        id
    );



    if(element){

        return element.value;

    }



    return "";

}









// ===============================
// 5分鐘緊急提醒
// ===============================


function triggerEmergency(){



    console.log(
        "🚨 發作超過5分鐘"
    );



    if(
        typeof showEmergencyAlert === "function"
    ){

        showEmergencyAlert();

    }



}









// ===============================
// 日期
// ===============================


function formatDate(date){


    return (

        date.getFullYear()

        +

        "/"

        +

        formatNumber(
            date.getMonth()+1
        )

        +

        "/"

        +

        formatNumber(
            date.getDate()
        )

    );


}









// ===============================
// 時間
// ===============================


function formatTime(date){


    return (

        formatNumber(
            date.getHours()
        )

        +

        ":"

        +

        formatNumber(
            date.getMinutes()
        )

        +

        ":"

        +

        formatNumber(
            date.getSeconds()
        )

    );


}









// ===============================
// 補0
// ===============================


function formatNumber(num){


    return num < 10

    ?

    "0" + num

    :

    num;


}









// ===============================
// 啟動
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





    if(startBtn){


        startBtn.addEventListener(

            "click",

            startSeizure

        );


    }





    if(stopBtn){


        stopBtn.addEventListener(

            "click",

            stopSeizure

        );


    }



    console.log(
        "🚨 seizure.js 初始化完成"
    );


}

);
