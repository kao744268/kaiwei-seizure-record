// ==========================================
// 愷威 Care V1.0 Stable
// seizure.js
// Offline Edition
// ==========================================



let seizureTimer = null;

let seizureSeconds = 0;

let seizureStartTime = null;

let isSeizing = false;








// ===============================
// 開始發作
// ===============================


function startSeizure(){



    if(isSeizing){


        return;


    }



    isSeizing = true;



    seizureSeconds = 0;



    seizureStartTime =
    new Date();






    const timer =
    document.getElementById(
        "timer"
    );


    const status =
    document.getElementById(
        "seizureStatus"
    );






    if(status){


        status.innerHTML =
        "🚨 發作中";


    }







    if(timer){


        timer.innerHTML =
        "00:00";


    }







    seizureTimer =

    setInterval(

        function(){



            seizureSeconds++;



            updateTimer();



        },

        1000

    );





}









// ===============================
// 更新秒數
// ===============================


function updateTimer(){



    const timer =
    document.getElementById(
        "timer"
    );



    if(!timer)return;




    const min =
    Math.floor(
        seizureSeconds / 60
    );



    const sec =
    seizureSeconds % 60;




    timer.innerHTML =

    String(min).padStart(2,"0")

    +

    ":"

    +

    String(sec).padStart(2,"0");



}









// ===============================
// 結束發作
// ===============================


function stopSeizure(){



    if(!isSeizing){


        return;


    }





    clearInterval(
        seizureTimer
    );



    seizureTimer = null;



    isSeizing = false;






    const endTime =
    new Date();






    const record = {


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
        seizureSeconds



    };







    // 儲存紀錄


    if(
        typeof addSeizureRecord === "function"
    ){



        addSeizureRecord(
            record
        );



    }

    else{


        saveFallbackRecord(
            record
        );


    }







    const status =
    document.getElementById(
        "seizureStatus"
    );



    if(status){


        status.innerHTML =

        "✅ 發作結束";


    }







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

        String(
            date.getMonth()+1
        ).padStart(2,"0")

        +

        "/"

        +

        String(
            date.getDate()
        ).padStart(2,"0")

    );


}









// ===============================
// 時間格式
// ===============================


function formatTime(date){



    return (

        String(
            date.getHours()
        ).padStart(2,"0")

        +

        ":"

        +

        String(
            date.getMinutes()
        ).padStart(2,"0")

        +

        ":"

        +

        String(
            date.getSeconds()
        ).padStart(2,"0")

    );


}









// ===============================
// 備援保存
// ===============================


function saveFallbackRecord(record){



    let records =

    JSON.parse(

        localStorage.getItem(

            "kw_seizure_records"

        )

        ||

        "[]"

    );




    records.push(record);



    localStorage.setItem(

        "kw_seizure_records",

        JSON.stringify(records)

    );



}









// ===============================
// 按鈕綁定
// ===============================


window.addEventListener(
"load",
function(){


    const startBtn =
    document.getElementById(
        "startBtn"
    );


    const stopBtn =
    document.getElementById(
        "stopBtn"
    );



    console.log(
        "檢查按鈕",
        startBtn,
        stopBtn
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
        "🚨 seizure.js Stable 已連接"
    );


});






    console.log(

        "🚨 seizure.js Stable 啟動"

    );



});
