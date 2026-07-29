// ==========================================
// 愷威 Care V2.1 守護手冊版
// seizure.js
// 發作紀錄系統（場合整合版）
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
        "🚨 發作紀錄進行中";

    }



    seizureTimer = setInterval(

        function(){


            seizureSeconds++;


            updateTimer();




            // 超過五分鐘

            if(
                seizureSeconds >= 300
            ){


                if(
                    typeof showEmergencyAlert === "function"
                ){

                    showEmergencyAlert();

                }


            }


        },

        1000

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



    const minute =
    Math.floor(
        seizureSeconds / 60
    );



    const second =
    seizureSeconds % 60;



    timer.innerHTML =

    formatNumber(minute)

    +

    ":"

    +

    formatNumber(second);



}









// ===============================
// 結束發作
// ===============================


function stopSeizure(){



    if(!seizureRunning){

        return;

    }




    const result = confirm(

        "⚠️ 確認結束發作？\n\n" +

        "持續時間：" +

        seizureSeconds +

        " 秒\n\n" +

        "是否儲存此次紀錄？"

    );





    if(!result){

        return;

    }




    finishSeizure();



}









// ===============================
// 完成紀錄
// ===============================


function finishSeizure(){



    clearInterval(
        seizureTimer
    );


    seizureTimer = null;



    seizureRunning = false;




    const endTime =
    new Date();




    const record =
    createSeizureRecord(
        endTime
    );




    saveSeizureRecord(
        record
    );





    const status =
    document.getElementById(
        "statusBox"
    );



    if(status){


        status.innerHTML =

        "✅ 發作紀錄已完成儲存";


    }





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




        // 新增場合

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




        note:
        getValue(
            "note"
        )



    };


}









// ===============================
// 取得發作場合
// ===============================


function getSituation(){



    const selected =

    document.querySelector(

        'input[name="situation"]:checked'

    );



    if(selected){


        return selected.value;


    }



    return "未選擇";


}









// ===============================
// 儲存紀錄
// ===============================


function saveSeizureRecord(record){



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

        JSON.stringify(
            records
        )

    );


}









// ===============================
// 取得勾選
// ===============================


function getCheckedValues(name){



    let values = [];



    document

    .querySelectorAll(

        'input[name="' + name + '"]:checked'

    )

    .forEach(

        function(item){


            values.push(
                item.value
            );


        }

    );



    return values;


}









// ===============================
// 取得輸入
// ===============================


function getValue(id){



    const element =
    document.getElementById(
        id
    );



    if(element){

        return element.value.trim();

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
        "🚨 seizure.js V2.1 場合整合完成"
    );


});
