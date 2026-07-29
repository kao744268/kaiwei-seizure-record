// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// cloud.js
// 功能：Google Sheet 同步
// ==========================================



// ===============================
// Google Apps Script API網址
// ===============================

const API_URL = 
"https://你的AppsScript網址/exec";





// ===============================
// 傳送發作紀錄
// ===============================

async function sendSeizureRecord(record){



    if(!record){

        console.warn(
            "沒有發作資料"
        );

        return;

    }



    const data = {


        type:
        "seizure",


        startTime:
        record.startTime,


        endTime:
        record.endTime,


        duration:
        record.duration


    };



    try{


        const response =
        await fetch(
            API_URL,
            {

                method:"POST",


                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify(data)

            }
        );



        const result =
        await response.json();



        console.log(
            "雲端同步成功:",
            result
        );



    }
    catch(error){


        console.error(
            "雲端同步失敗:",
            error
        );


    }



}
