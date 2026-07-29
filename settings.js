// ==========================================
// 愷威 Care V1.0
// settings.js
// cloud串接修正版
// ==========================================


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




    // Google同步

    if(syncBtn){


        syncBtn.addEventListener(

            "click",

            async function(){


                if(
                    typeof syncAll === "function"
                ){


                    syncBtn.innerHTML =
                    "☁️ 同步中...";


                    const result =
                    await syncAll();



                    syncBtn.innerHTML =
                    "☁️ Google同步";



                    if(result){


                        alert(
                            "✅ Google同步完成"
                        );


                    }



                }

                else{


                    alert(
                        "cloud.js 尚未載入"
                    );


                }


            }

        );


    }







    if(backupBtn){


        backupBtn.addEventListener(

            "click",

            backupData

        );


    }






    if(exportBtn){


        exportBtn.addEventListener(

            "click",

            exportRecords

        );


    }



}








function backupData(){


    const backup = {


        version:
        window.CARE_VERSION || "V1.0",


        time:
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

        "愷威_Care_備份.json"

    );


}








function exportRecords(){


    downloadJSON(

        {
            records:
            window.seizureRecords || []
        },

        "愷威_發作紀錄.json"

    );


}








function downloadJSON(data,filename){


    const blob =
    new Blob(

        [
            JSON.stringify(
                data,
                null,
                2
            )
        ],

        {
            type:
            "application/json"
        }

    );



    const url =
    URL.createObjectURL(blob);



    const a =
    document.createElement("a");



    a.href=url;

    a.download=filename;



    a.click();



    URL.revokeObjectURL(url);


}








document.addEventListener(

"DOMContentLoaded",

function(){

    initSettings();

    console.log(
        "⚙️ settings cloud版啟動"
    );

}

);
