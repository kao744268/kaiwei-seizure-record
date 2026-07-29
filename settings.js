// ==========================================
// 愷威 Care V1.0
// settings.js
// 功能：系統設定 / 備份 / 匯出
// ==========================================





// ===============================
// 初始化設定頁
// ===============================


function initSettings(){


    const syncBtn =
    document.getElementById(
        "syncBtn"
    );


    const backupBtn =
    document.getElementById(
        "backupBtn"
    );


    const exportBtn =
    document.getElementById(
        "exportBtn"
    );




    // Google 同步入口


    if(syncBtn){


        syncBtn.addEventListener(

            "click",

            function(){


                alert(
                    "☁️ Google 同步功能準備中"
                );


            }

        );


    }







    // 備份資料


    if(backupBtn){


        backupBtn.addEventListener(

            "click",

            backupData

        );


    }







    // 匯出紀錄


    if(exportBtn){


        exportBtn.addEventListener(

            "click",

            exportRecords

        );


    }





}









// ===============================
// 建立備份
// ===============================


function backupData(){



    const backup = {


        version:
        window.CARE_VERSION || "V1.0",


        backupTime:
        new Date()
        .toISOString(),



        seizureRecords:
        window.seizureRecords || [],



        medicalData:
        window.medicalData || {},



        emergencyContacts:
        window.emergencyContacts || []



    };





    downloadJSON(

        backup,

        "愷威_Care_備份資料.json"

    );



}









// ===============================
// 匯出發作紀錄
// ===============================


function exportRecords(){



    const data = {


        exportTime:
        new Date()
        .toISOString(),



        records:
        window.seizureRecords || []



    };





    downloadJSON(

        data,

        "愷威_發作紀錄.json"

    );


}









// ===============================
// JSON下載工具
// ===============================


function downloadJSON(data,filename){



    const json =

    JSON.stringify(

        data,

        null,

        2

    );





    const blob =

    new Blob(

        [json],

        {
            type:
            "application/json"
        }

    );





    const url =

    URL.createObjectURL(
        blob
    );





    const a =

    document.createElement(
        "a"
    );



    a.href = url;


    a.download = filename;



    document.body.appendChild(a);



    a.click();



    document.body.removeChild(a);



    URL.revokeObjectURL(url);



}









// ===============================
// 啟動
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    initSettings();



    console.log(
        "⚙️ settings.js 啟動"
    );


});
