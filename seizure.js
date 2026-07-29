// ==========================================
// 愷威 Care V2.3
// seizure.js
// 發作紀錄核心
// ==========================================


let seizureRunning = false;

let seizureSeconds = 0;

let seizureTimer = null;

let seizureStartTime = null;

let emergencyTriggered = false;





// ===============================
// 開始發作
// ===============================


function startSeizure(){


    if(seizureRunning){

        return;

    }



    seizureRunning = true;

    seizureSeconds = 0;

    emergencyTriggered = false;


    seizureStartTime = new Date();



    updateStatus(
        "🚨 發作中"
    );


    updateStartTime();


    updateTimer();




    seizureTimer = setInterval(function(){


        seizureSeconds++;


        updateTimer();



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




    let confirmStop = confirm(

        "⏹ 確認結束發作？\n\n" +

        "持續時間：" +

        formatDuration(
            seizureSeconds
        )

    );





    if(confirmStop){


        saveRecord();


        resetSeizure();


    }



}









// ===============================
// 儲存紀錄
// ===============================


function saveRecord(){



    let record = {


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
            new Date()
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




        // 新增：發作後狀態

        afterState:
        getCheckedValues(
            "afterState"
        ),




        note:
        getNote()



    };





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





    alert(
        "✅ 發作紀錄已儲存"
    );



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


    seizureSeconds = 0;


    seizureStartTime = null;



    updateTimer();


    updateStatus(
        "等待開始紀錄"
    );



    let box =
    document.getElementById(
        "startTimeBox"
    );



    if(box){


        box.innerHTML =
        "尚未開始";


    }


}









// ===============================
// 更新畫面
// ===============================


function updateTimer(){



    let timer =
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






function updateStartTime(){



    let box =
    document.getElementById(
        "startTimeBox"
    );



    if(box){


        box.innerHTML =

        "開始時間："

        +

        formatTime(
            seizureStartTime
        );


    }



}






function updateStatus(text){



    let box =
    document.getElementById(
        "statusBox"
    );



    if(box){


        box.innerHTML = text;


    }


}









// ===============================
// 取得資料
// ===============================


function getSituation(){



    let item =

    document.querySelector(

        'input[name="situation"]:checked'

    );



    return item

    ?

    item.value

    :

    "未選擇";


}









function getCheckedValues(name){



    let result = [];



    document

    .querySelectorAll(

        'input[name="' + name + '"]:checked'

    )

    .forEach(function(item){


        result.push(
            item.value
        );


    });



    return result;


}









function getNote(){



    let note =
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
// 格式
// ===============================


function formatDuration(sec){



    let min =
    Math.floor(
        sec / 60
    );



    let second =
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





    if(startBtn){


        startBtn.onclick =
        startSeizure;


    }





    if(stopBtn){


        stopBtn.onclick =
        stopSeizure;


    }





    console.log(
        "🚨 seizure.js V2.3 loaded"
    );



});
