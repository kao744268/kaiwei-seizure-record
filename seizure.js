// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// seizure.js
// 功能：發作計時核心
// ==========================================


// ===============================
// 狀態變數
// ===============================

let seizureRunning = false;

let seizureStartTimestamp = null;

let seizureInterval = null;


// ===============================
// 開始發作
// ===============================

function startSeizure(){


    if(seizureRunning){

        console.log("已經正在發作計時");

        return;

    }



    seizureRunning = true;


    // 唯一時間來源

    seizureStartTimestamp = Date.now();



    updateTimerDisplay();



    seizureInterval = setInterval(
        updateTimerDisplay,
        1000
    );



    console.log(
        "開始發作",
        new Date(seizureStartTimestamp)
    );


}





// ===============================
// 更新計時畫面
// ===============================

function updateTimerDisplay(){


    if(
        !seizureRunning ||
        !seizureStartTimestamp
    ){

        return;

    }



    const now = Date.now();



    const seconds = Math.floor(
        (now - seizureStartTimestamp) / 1000
    );



    const timerBox =
    document.getElementById(
        "timerBox"
    );



    if(timerBox){


        timerBox.textContent =
        formatDuration(seconds);


    }


}





// ===============================
// 結束發作
// ===============================

function endSeizure(){


    if(
        !seizureRunning ||
        !seizureStartTimestamp
    ){

        alert("目前沒有發作紀錄");

        return;

    }



    const endTimestamp = Date.now();



    const duration = Math.floor(
        (endTimestamp - seizureStartTimestamp)
        / 1000
    );



    // 停止計時

    clearInterval(
        seizureInterval
    );


    seizureInterval = null;



    seizureRunning = false;



    console.log(
        "發作結束",
        {
            start:
            new Date(seizureStartTimestamp),

            end:
            new Date(endTimestamp),

            duration:
            duration
        }
    );

const record = {

    startTime:
    new Date(seizureStartTimestamp)
    .toLocaleString(),

    endTime:
    new Date(endTimestamp)
    .toLocaleString(),

    duration:
    duration

};


if(typeof addSeizureRecord === "function"){

    addSeizureRecord(record);

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
// 時間格式
// ===============================

function formatDuration(totalSeconds){



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

        String(hour).padStart(2,"0")
        +
        ":"
        +
        String(minute).padStart(2,"0")
        +
        ":"
        +
        String(second).padStart(2,"0")

    );

}





// ===============================
// 重置計時顯示
// ===============================

function resetTimer(){


    const timerBox =
    document.getElementById(
        "timerBox"
    );



    if(timerBox){

        timerBox.textContent =
        "00:00:00";

    }



    seizureStartTimestamp = null;


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
        "🚨 seizure.js 啟動完成"
    );


});
