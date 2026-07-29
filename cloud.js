// ==========================================
// 愷威 Care V1.0
// cloud.js
// 功能：Google Cloud 同步
// ==========================================



// ===============================
// Google Apps Script API網址
// ===============================


const CARE_API_URL =

"請填入你的Apps Script exec網址";







// ===============================
// 基礎同步函式
// ===============================


async function cloudSync(type,data){



    if(
        !CARE_API_URL ||
        CARE_API_URL.includes(
            "請填入"
        )
    ){


        console.warn(
            "尚未設定Google API"
        );


        return false;


    }






    const payload = {


        type:type,


        data:data,


        timestamp:
        new Date()
        .toISOString()



    };







    try{



        const response =

        await fetch(

            CARE_API_URL,

            {


                method:"POST",


                headers:{


                    "Content-Type":
                    "application/json"


                },


                body:

                JSON.stringify(
                    payload
                )



            }

        );







        const result =

        await response.json();






        console.log(

            "同步結果",

            result

        );





        return result;





    }

    catch(error){



        console.error(

            "同步失敗",

            error

        );



        return false;



    }



}









// ===============================
// 同步發作紀錄
// ===============================


function syncSeizure(record){



    return cloudSync(

        "seizure",

        record

    );


}









// ===============================
// 同步醫療資料
// ===============================


function syncMedical(){



    return cloudSync(

        "medical",

        window.medicalData || {}

    );


}









// ===============================
// 同步緊急聯絡
// ===============================


function syncEmergency(){



    return cloudSync(

        "emergency",

        window.emergencyContacts || []

    );


}









// ===============================
// 全部同步
// ===============================


async function syncAll(){



    const result = await Promise.all([


        syncMedical(),


        syncEmergency(),


        cloudSync(

            "seizure",

            window.seizureRecords || []

        )



    ]);





    alert(

        "☁️ 同步完成"

    );



    return result;



}









// ===============================
// 啟動
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    console.log(

        "☁️ cloud.js 啟動"

    );


});
