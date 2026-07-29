// ==========================================
// 愷威 Care 癲癇紀錄版 V1.0
// seizure.js
// Seizure Core System
// ==========================================



var seizureTimer = null;

var seizureSeconds = 0;

var seizureRunning = false;

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



    updateTimer();



    var status =
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



        },

        1000

    );



    console.log(
        "開始發作",
        seizureStartTime
    );


}









// ===============================
// 更新秒數
// ===============================


function updateTimer(){



    var timer =
    document.getElementById(
        "timer"
    );



    if(!timer){

        return;

    }



    var min =
    Math.floor(
        seizureSeconds / 60
    );



    var sec =
    seizureSeconds % 60;



    timer.innerHTML =

    pad(min)

    +

    ":"

    +

    pad(sec);



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



    var endTime =
    new Date();





    var record =
    createSeizureRecord(
        endTime
    );





    saveRecord(
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



    if(
        typeof renderHistory === "function"
    ){

        renderHistory();

    }



}









// ===============================
// 建立紀錄
// ===============================


function createSeizureRecord(endTime){



    return {



        id:
        Date.now(),



        date:
        formatDate(
            seizureStartTime
        ),



        start:
        formatTime(
            seizureStartTime
        ),



        end:
        formatTime(
            endTime
        ),



        duration:
        seizureSeconds,



        type:
        getChecked(
            "type"
        ),



        before:
        getChecked(
            "before"
        ),



        during:
        getChecked(
            "during"
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
// 儲存紀錄
// ===============================


function saveRecord(record){



    var records =

    JSON.parse(

        localStorage.getItem(
            "care_records"
        )

        ||

        "[]"

    );





    records.push(
        record
    );





    localStorage.setItem(

        "care_records",

        JSON.stringify(records)

    );



}









// ===============================
// 取得勾選
// ===============================


function getChecked(name){



    var result = [];



    var list =
    document.querySelectorAll(

        'input[name="' + name + '"]:checked'

    );



    for(
        var i = 0;
        i < list.length;
        i++
    ){


        result.push(
            list[i].value
        );


    }



    return result;


}









// ===============================
// 取得輸入
// ===============================


function getValue(id){



    var el =
    document.getElementById(
        id
    );



    if(el){

        return el.value;

    }



    return "";

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

        pad(
            date.getMonth()+1
        )

        +

        "/"

        +

        pad(
            date.getDate()
        )

    );


}









// ===============================
// 時間
// ===============================


function formatTime(date){



    return (

        pad(
            date.getHours()
        )

        +

        ":"

        +

        pad(
            date.getMinutes()
        )

        +

        ":"

        +

        pad(
            date.getSeconds()
        )

    );


}









// ===============================
// 補零
// ===============================


function pad(num){


    return num < 10

    ?

    "0" + num

    :

    num;


}









// ===============================
// 綁定按鈕
// ===============================


document.addEventListener(

"DOMContentLoaded",

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



});
