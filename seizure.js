// ==========================================
// 愷威 Care V2.0 守護版
// seizure.js
// Seizure Record System 修正版
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
        "🚨 發作進行中";


    }






    seizureTimer = setInterval(

        function(){


            seizureSeconds++;


            updateTimer();





            // 超過5分鐘

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





    console.log(
        "開始發作",
        seizureStartTime
    );


}









// ===============================
// 顯示計時
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
// 點擊結束
// ===============================


function stopSeizure(){



    if(!seizureRunning){

        return;

    }






    let confirmEnd = confirm(

        "⚠️ 確認結束發作？\n\n" +

        "目前持續時間：" +

        seizureSeconds +

        " 秒\n\n" +

        "是否儲存此次紀錄？"

    );





    if(!confirmEnd){

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
        "✅ 發作紀錄已儲存";


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





        note:

        getValue(
            "note"
        )



    };


}









// ===============================
// 儲存
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

        JSON.stringify(
            records
        )

    );


}









// ===============================
// 取得勾選資料
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

        return element.value;

    }



    return "";


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
        "🚨 seizure.js 修正版啟動完成"
    );



});
