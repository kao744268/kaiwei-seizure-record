// ==========================================
// 愷威 Care V2.3
// app.js
// 頁面控制核心
// ==========================================





// ===============================
// 切換頁面
// ===============================


function showPage(pageId){



    const pages =

    document.querySelectorAll(
        ".page"
    );



    pages.forEach(function(page){


        page.classList.remove(
            "active"
        );


    });





    const target =

    document.getElementById(
        pageId
    );



    if(target){


        target.classList.add(
            "active"
        );


    }



    window.scrollTo(
        0,
        0
    );



}









// ===============================
// 首頁
// ===============================


function goHome(){


    showPage(
        "homePage"
    );


}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    console.log(
        "👦 愷威 Care V2.3 app.js 啟動"
    );





    // 醫療卡


    const medicalBtn =

    document.getElementById(
        "medicalPageBtn"
    );



    if(medicalBtn){


        medicalBtn.onclick = function(){



            showPage(
                "medicalPage"
            );



            if(
                typeof renderMedical === "function"
            ){


                renderMedical();


            }



        };


    }









    // 歷史紀錄


    const historyBtn =

    document.getElementById(
        "historyPageBtn"
    );



    if(historyBtn){


        historyBtn.onclick = function(){



            showPage(
                "historyPage"
            );



            if(
                typeof renderHistory === "function"
            ){


                renderHistory();


            }



        };


    }









    // 緊急模式


    const emergencyBtn =

    document.getElementById(
        "emergencyPageBtn"
    );



    if(emergencyBtn){


        emergencyBtn.onclick = function(){



            showPage(
                "emergencyPage"
            );



            if(
                typeof renderEmergency === "function"
            ){


                renderEmergency();


            }



        };


    }









    // 所有返回按鈕


    const backButtons =

    document.querySelectorAll(
        ".backBtn"
    );



    backButtons.forEach(function(btn){



        btn.onclick = function(){



            goHome();



        };



    });









    // 特別處理緊急返回


    const emergencyBack =

    document.getElementById(
        "emergencyBackBtn"
    );



    if(emergencyBack){


        emergencyBack.onclick = function(){



            goHome();



        };


    }



});
