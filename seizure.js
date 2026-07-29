// ==========================================
// 愷威 Care V1.0
// seizure.js
// 功能：癲癇發作計時核心
// ==========================================



let seizureStartTime = null;

let seizureTimer = null;

let isSeizing = false;





// ===============================
// 開始發作
// ===============================


function startSeizure(){



    if(isSeizing){

        return;

    }



    isSeizing = true;



    seizureStartTime = new Date();




    const startText =
    document.getElementById(
        "startTimeText"
    );



    if(startText){


        startText.textContent =
        formatDateTime(
            seizureStartTime
        );


    }





    const status =
    document.getElementById(
        "seizureStatus"
    );



    if(status){


        status.textContent =
        "🚨 發作進行中";


    }




    updateTimer();



    seizureTimer =
    setInterval(
        updateTimer,
        1000
    );



    console.log(
        "開始發作",
        seizureStartTime
    );


}






// ===============================
// 更新計時器
// ===============================


function updateTimer(){



    if(
        !isSeizing ||
        !seizureStartTime
    ){

        return;

    }




    const now =
    new Date();




    const seconds =
    Math.floor(
        (
            now -
            seizureStartTime
        )
        /
        1000
    );




    const timer =
    document.getElementById(
        "timerBox"
    );



    if(timer){


        timer.textContent =
        formatDuration(
            seconds
        );


    }


}







// ===============================
// 結束發作
// ===============================


function endSeizure(){



    if(!isSeizing){


        alert(
            "目前沒有發作紀錄"
        );


        return;


    }





    const endTime =
    new Date();




    const duration =
    Math.floor(
        (
            endTime -
            seizureStartTime
        )
        /
        1000
    );





    clearInterval(
        seizureTimer
    );



    seizureTimer = null;



    isSeizing = false;





    const record = {


        id:
        Date.now(),



        date:
        formatDate(
            seizureStartTime
        ),



        startTime:
        formatDateTime(
            seizureStartTime
        ),



        endTime:
        formatDateTime(
            endTime
        ),



        duration:
        duration



    };





    console.log(
        "完成紀錄",
        record
    );





    // 傳給 history.js


    if(
        typeof addSeizureRecord === "function"
    ){


        addSeizureRecord(
            record
        );


    }






    const status =
    document.getElementById(
        "seizureStatus"
    );



    if(status){


        status.textContent =
        "✅ 發作已結束";


    }






    alert(

        "發作紀錄完成\n\n" +

        "持續時間：" +

        duration +

        " 秒"

    );





}








// ===============================
// 時間格式
// ===============================


function formatDateTime(date){



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

        +

        " "

        +

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







function formatDuration(seconds){



    const h =
    Math.floor(
        seconds / 3600
    );



    const m =
    Math.floor(
        (seconds % 3600)
        /
        60
    );



    const s =
    seconds % 60;



    return (

        String(h)
        .padStart(2,"0")

        +

        ":"

        +

        String(m)
        .padStart(2,"0")

        +

        ":"

        +

        String(s)
        .padStart(2,"0")

    );


}







// ===============================
// 綁定按鈕
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    const endBtn =
    document.getElementById(
        "endSeizureBtn"
    );



    if(endBtn){


        endBtn.addEventListener(

            "click",

            endSeizure

        );


    }




    console.log(
        "🚨 seizure.js 啟動"
    );



});
