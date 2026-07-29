// ==========================================
// 愷威 Care V2.0 Clean
// app.js
// Core Controller
// ==========================================



// ===============================
// 顯示頁面
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
// 返回首頁
// ===============================


function backHome(){


    showPage(
        "homePage"
    );


}









// ===============================
// 初始化按鈕
// ===============================


function initApp(){



    console.log(
        "👦 愷威 Care V2.0 啟動"
    );





    // 首頁 → 發作


    document
    .getElementById(
        "goSeizureBtn"
    )
    ?.addEventListener(

        "click",

        function(){


            showPage(
                "seizurePage"
            );


        }

    );







    // 首頁 → 歷史


    document
    .getElementById(
        "goHistoryBtn"
    )
    ?.addEventListener(

        "click",

        function(){


            showPage(
                "historyPage"
            );


        }

    );







    // 首頁 → 醫療


    document
    .getElementById(
        "goMedicalBtn"
    )
    ?.addEventListener(

        "click",

        function(){


            showPage(
                "medicalPage"
            );


        }

    );







    // 首頁 → 緊急


    document
    .getElementById(
        "goEmergencyBtn"
    )
    ?.addEventListener(

        "click",

        function(){


            showPage(
                "emergencyPage"
            );


        }

    );







    // 首頁 → 設定


    document
    .getElementById(
        "goSettingsBtn"
    )
    ?.addEventListener(

        "click",

        function(){


            showPage(
                "settingsPage"
            );


        }

    );







    // 所有返回首頁按鈕


    const backButtons =

    document.querySelectorAll(

        ".backHomeBtn"

    );



    backButtons.forEach(

        function(btn){


            btn.addEventListener(

                "click",

                backHome

            );


        }

    );







    console.log(
        "✅ App 按鈕初始化完成"
    );



}









// ===============================
// 啟動
// ===============================


window.addEventListener(

"DOMContentLoaded",

function(){


    initApp();


}

);
