//
// ==========================================
// 愷威 Care 癲癇紀錄版 V1.0
// app.js
// Core Controller
// ==========================================
//



// ===============================
// 頁面切換
// ===============================


function showPage(pageId){


    var pages = 
    document.querySelectorAll(
        ".page"
    );



    for(
        var i = 0;
        i < pages.length;
        i++
    ){

        pages[i].classList.remove(
            "active"
        );

    }




    var target =
    document.getElementById(
        pageId
    );



    if(target){


        target.classList.add(
            "active"
        );


        console.log(
            "切換頁面:",
            pageId
        );


    }


}









// ===============================
// 回首頁
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
        "👦 愷威 Care V1.0 啟動"
    );






    // 發作紀錄


    var seizureBtn =
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







    // 歷史紀錄


    var historyBtn =
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







    // 醫療資料


    var medicalBtn =
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


            }

        );


    }







    // 緊急資訊


    var emergencyBtn =
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


            }

        );


    }







    // 設定


    var settingsBtn =
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








    // 返回首頁按鈕


    var backButtons =
    document.querySelectorAll(
        ".backBtn"
    );



    for(
        var j = 0;
        j < backButtons.length;
        j++
    ){


        backButtons[j].addEventListener(

            "click",

            function(){


                goHome();


            }

        );


    }





    console.log(
        "✅ app.js 初始化完成"
    );



}









// ===============================
// 啟動
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    initApp();


}

);
