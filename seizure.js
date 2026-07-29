// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean Stable-1
// seizure.js
// 功能：發作計時
// ==========================================


let seizureRunning = false;

let seizureStartTime = null;

let seizureTimer = null;




// ===============================
// 開始發作
// ===============================

function startSeizure(){


    if(seizureRunning){

        return;

    }



    seizureRunning = true;



    seizureStartTime = new Date();



    updateTimer();



    seizureTimer = setInterval(
        updateTimer,
        1000
    );


    console.log(
        "開始發作",
        seizureStartTime
    );

}




// ===============================
// 更新時間
// ===============================

function updateTimer(){



    if(
        !seizureRunning ||
        !seizureStartTime
    ){

        return;

    }



    const now =
    new Date();



    const seconds =
    Math.floor(
        (now - seizureStartTime)
        / 1000
    );



    const timer =
    document.getElementById(
        "timerBox"
    );



    if(timer){


        timer.textContent =
        formatTime(seconds);


    }



}






// ===============================
// 結束發作
// ===============================

function endSeizure(){



    if(
        !seizureRunning
    ){

        alert(
            "目前沒有發作紀錄"
        );

        return;

    }



    const endTime =
    new Date();



    const duration =
    Math.floor(
        (endTime - seizureStartTime)
        / 1000
    );



    clearInterval(
        seizureTimer
    );



    seizureTimer = null;

    seizureRunning = false;





    const record = {


        startTime:
        seizureStartTime
        .toLocaleString(
            "zh-TW"
        ),



        endTime:
        endTime
        .toLocaleString(
            "zh-TW"
        ),



        duration:
        duration



    };





    if(
        typeof addSeizureRecord === "function"
    ){

        addSeizureRecord(
            record
        );

    }




    alert(

        "發作結束\n\n" +

        "持續時間：" +

        duration +

        " 秒"

    );





    resetTimer();


}





// ===============================
// 格式化時間
// ===============================

function formatTime(totalSeconds){



    const hour =
    Math.floor(
        totalSeconds / 3600
    );



    const minute =
    Math.floor(
        (totalSeconds % 3600) / 60
    );



    const second =
    totalSeconds % 60;



    return (

        String(hour)
        .padStart(2,"0")

        + ":"

        +

        String(minute)
        .padStart(2,"0")

        + ":"

        +

        String(second)
        .padStart(2,"0")

    );


}





// ===============================
// 重置畫面
// ===============================

function resetTimer(){



    const timer =
    document.getElementById(
        "timerBox"
    );



    if(timer){


        timer.textContent =
        "00:00:00";


    }



    seizureStartTime = null;


}





// ===============================
// 初始化按鈕
// ===============================

document.addEventListener(
"DOMContentLoaded",
function(){



    const startBtn =
    document.getElementById(
        "startSeizureBtn"
    );



    const endBtn =
    document.getElementById(
        "endSeizureBtn"
    );



    if(startBtn){


        startBtn.addEventListener(
            "click",
            startSeizure
        );


    }




    if(endBtn){


        endBtn.addEventListener(
            "click",
            endSeizure
        );


    }



    console.log(
        "🚨 seizure.js Stable-1 啟動"
    );



});
