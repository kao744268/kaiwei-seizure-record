// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// seizure.js
// 第一段：發作計時核心
// ==========================================



// ===============================
// 發作狀態
// ===============================


let seizureActive = false;


let seizureStartTime = null;


let seizureTimer = null;





// ===============================
// 開始發作
// ===============================


function startSeizure(){


    if(seizureActive){

        return;

    }



    seizureActive = true;



    // 記錄唯一開始時間

    seizureStartTime =
    Date.now();



    const timerBox =
    document.getElementById("timerBox");



    if(timerBox){

        timerBox.textContent =
        "00:00:00";

    }



    seizureTimer =
    setInterval(updateTimer,1000);



    console.log(
        "發作開始:",
        new Date(seizureStartTime)
    );


}






// ===============================
// 更新畫面時間
// ===============================


function updateTimer(){



    if(!seizureActive ||
       !seizureStartTime){

        return;

    }



    const now =
    Date.now();



    const seconds =
    Math.floor(
        (now - seizureStartTime)
        /1000
    );



    const timerBox =
    document.getElementById("timerBox");



    if(timerBox){

        timerBox.textContent =
        formatTime(seconds);

    }


}






// ===============================
// 時間格式化
// ===============================


function formatTime(totalSeconds){



    const hours =
    Math.floor(
        totalSeconds / 3600
    );



    const minutes =
    Math.floor(
        (totalSeconds % 3600) / 60
    );



    const seconds =
    totalSeconds % 60;



    return (

        String(hours).padStart(2,"0")
        + ":"
        +
        String(minutes).padStart(2,"0")
        + ":"
        +
        String(seconds).padStart(2,"0")

    );


}document.addEventListener(
"DOMContentLoaded",
function(){


    const startBtn =
    document.getElementById(
        "startSeizureBtn"
    );


    if(startBtn){


        startBtn.addEventListener(
            "click",
            startSeizure
        );


    }


});
