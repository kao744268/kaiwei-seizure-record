// ==========================================
// 愷威 Care 癲癇紀錄版 V1.0
// seizure.js
// Seizure Record Core
// ==========================================



var seizureRunning = false;

var seizureInterval = null;

var seizureSeconds = 0;

var seizureStartTime = null;








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




    var timer =
    document.getElementById(
        "timer"
    );



    var status =
    document.getElementById(
        "statusBox"
    );



    if(timer){

        timer.innerHTML = "00:00";

    }



    if(status){

        status.innerHTML =
        "🚨 發作中";

    }





    seizureInterval = setInterval(

        function(){


            seizureSeconds++;


            updateTimer();


        },

        1000

    );



    console.log(
        "開始發作",
        seizureStartTime
    );


}









// ===============================
// 更新計時
// ===============================


function updateTimer(){


    var timer =
    document.getElementById(
        "timer"
    );



    if(!timer){

        return;

    }



    var minutes =
    Math.floor(
        seizureSeconds / 60
    );



    var seconds =
    seizureSeconds % 60;



    timer.innerHTML =

    formatNumber(minutes)

    +

    ":"

    +

    formatNumber(seconds);



}









// ===============================
// 結束發作
// ===============================


function stopSeizure(){


    if(!seizureRunning){

        return;

    }




    clearInterval(
        seizureInterval
    );



    seizureInterval = null;


    seizureRunning = false;



    var endTime =
    new Date();




    var record = createRecord(
        endTime
    );




    saveSeizureRecord(
        record
    );





    var status =
    document.getElementById(
        "statusBox"
    );



    if(status){


        status.innerHTML =
        "✅ 發作紀錄完成";


    }



    console.log(
        "完成紀錄",
        record
    );



}









// ===============================
// 建立紀錄
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



        before:
        getCheckedValues(
            "before"
        ),



        during:
        getCheckedValues(
            "during"
        ),



        recovery:
        document.getElementById(
            "recoveryTime"
        )?.value || "",



        note:
        document.getElementById(
            "note"
        )?.value || ""



    };


}









// ===============================
// 取得勾選資料
// ===============================


function getCheckedValues(name){


    var result = [];



    var items =
    document.querySelectorAll(

        'input[name="' + name + '"]:checked'

    );



    for(
        var i = 0;
        i < items.length;
        i++
    ){


        result.push(
            items[i].value
        );


    }



    return result;


}









// ===============================
// 儲存紀錄
// ===============================


function saveSeizureRecord(record){



    var records =

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
// 日期格式
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
// 時間格式
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
// 補零
// ===============================


function formatNumber(num){


    return num < 10

    ?

    "0" + num

    :

    num;


}









// ===============================
// 按鈕連接
// ===============================


window.onload =
function(){



    var startBtn =
    document.getElementById(
        "startBtn"
    );



    var stopBtn =
    document.getElementById(
        "stopBtn"
    );





    if(startBtn){


        startBtn.onclick =
        startSeizure;


    }



    if(stopBtn){


        stopBtn.onclick =
        stopSeizure;


    }





    console.log(
        "🚨 seizure.js 載入完成"
    );



};
