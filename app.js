// ==========================================
// 愷威 Care V2.0 守護版
// app.js
// Core Navigation System
// ==========================================



// ===============================
// 頁面切換
// ===============================


function showPage(pageId){


    const pages = document.querySelectorAll(
        ".page"
    );


    pages.forEach(function(page){


        page.classList.remove(
            "active"
        );


    });



    const target = document.getElementById(
        pageId
    );


    if(target){


        target.classList.add(
            "active"
        );


        console.log(
            "目前頁面:",
            pageId
        );


    }


}









// ===============================
// 返回首頁
// ===============================


function goHome(){


    showPage(
        "homePage"
    );


}









// ===============================
// 初始化
// ===============================


function initApp(){



    console.log(
        "👦 愷威 Care V2.0 啟動"
    );





    // 醫療資訊


    const medicalBtn =
    document.getElementById(
        "medicalPageBtn"
    );


    if(medicalBtn){


        medicalBtn.addEventListener(
            "click",
            function(){


                showPage(
                    "medicalPage"
                );


                if(
                    typeof renderMedical === "function"
                ){

                    renderMedical();

                }


            }
        );


    }







    // 發作紀錄


    const seizureBtn =
    document.getElementById(
        "seizurePageBtn"
    );


    if(seizureBtn){


        seizureBtn.addEventListener(
            "click",
            function(){


                showPage(
                    "seizurePage"
                );


            }
        );


    }







    // 緊急模式


    const emergencyBtn =
    document.getElementById(
        "emergencyPageBtn"
    );


    if(emergencyBtn){


        emergencyBtn.addEventListener(
            "click",
            function(){


                showPage(
                    "emergencyPage"
                );


                if(
                    typeof renderEmergency === "function"
                ){

                    renderEmergency();

                }


            }
        );


    }







    // 歷史紀錄


    const historyBtn =
    document.getElementById(
        "historyPageBtn"
    );


    if(historyBtn){


        historyBtn.addEventListener(
            "click",
            function(){


                showPage(
                    "historyPage"
                );



                if(
                    typeof renderHistory === "function"
                ){

                    renderHistory();

                }


            }
        );


    }







    // 設定


    const settingsBtn =
    document.getElementById(
        "settingsPageBtn"
    );


    if(settingsBtn){


        settingsBtn.addEventListener(
            "click",
            function(){


                showPage(
                    "settingsPage"
                );


            }
        );


    }








    // 所有返回首頁


    const backButtons =
    document.querySelectorAll(
        ".backBtn"
    );



    backButtons.forEach(function(btn){


        btn.addEventListener(
            "click",
            function(){


                goHome();


            }
        );


    });






    console.log(
        "✅ app.js 初始化完成"
    );



}









// ===============================
// DOM完成後啟動
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    initApp();


}

);
