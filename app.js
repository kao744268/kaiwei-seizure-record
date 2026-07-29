// ==========================================
// 愷威 Care V1.0 Stable
// app.js
// Offline Edition
// ==========================================



// ===============================
// 全域版本
// ===============================


window.CARE_VERSION =
"V1.0 Stable";




// ===============================
// 頁面切換
// ===============================


function showPage(pageId){



    const pages =
    document.querySelectorAll(
        ".page"
    );



    pages.forEach(

        function(page){

            page.classList.remove(
                "active"
            );

        }

    );



    const target =
    document.getElementById(
        pageId
    );



    if(target){


        target.classList.add(
            "active"
        );


    }



}






// ===============================
// 初始化資料
// ===============================


function initCareApp(){



    console.log(
        "👦 愷威 Care 啟動"
    );



    console.log(
        "版本:",
        window.CARE_VERSION
    );





    // 初始化發作資料

    if(
        typeof loadLocalRecords === "function"
    ){


        loadLocalRecords();


    }





    // 更新歷史顯示

    if(
        typeof renderHistory === "function"
    ){


        renderHistory();


    }





    // 更新首頁資訊

    if(
        typeof updateLatestRecord === "function"
    ){


        updateLatestRecord();


    }





    // 醫療資料

    if(
        typeof loadMedical === "function"
    ){


        loadMedical();


    }





    // 緊急資料

    if(
        typeof loadEmergency === "function"
    ){


        loadEmergency();


    }





}









// ===============================
// DOM完成啟動
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    initCareApp();


}

);
