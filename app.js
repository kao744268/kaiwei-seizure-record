// ==========================================
// 愷威 Care 癲癇紀錄版 V1.0
// app.js
// Core Controller
// ==========================================



// ===============================
// 切換頁面
// ===============================


function showPage(pageId){


    var pages =
    document.getElementsByClassName(
        "page"
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
            "切換至:",
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
        "👦 愷威 Care 啟動"
    );





    // 發作紀錄入口


    var seizureBtn =
    document.getElementById(
        "seizurePageBtn"
    );



    if(seizureBtn){


        seizureBtn.onclick =
        function(){


            showPage(
                "seizurePage"
            );


        };


    }







    // 歷史紀錄入口


    var historyBtn =
    document.getElementById(
        "historyPageBtn"
    );



    if(historyBtn){


        historyBtn.onclick =
        function(){


            showPage(
                "historyPage"
            );


        };


    }







    // 醫療資料入口


    var medicalBtn =
    document.getElementById(
        "medicalPageBtn"
    );



    if(medicalBtn){


        medicalBtn.onclick =
        function(){


            showPage(
                "medicalPage"
            );


        };


    }







    // 緊急資訊入口


    var emergencyBtn =
    document.getElementById(
        "emergencyPageBtn"
    );



    if(emergencyBtn){


        emergencyBtn.onclick =
        function(){


            showPage(
                "emergencyPage"
            );


        };


    }







    // 設定入口


    var settingsBtn =
    document.getElementById(
        "settingsPageBtn"
    );



    if(settingsBtn){


        settingsBtn.onclick =
        function(){


            showPage(
                "settingsPage"
            );


        };


    }







    // 所有返回首頁按鈕


    var backButtons =
    document.getElementsByClassName(
        "backBtn"
    );



    for(
        var j = 0;
        j < backButtons.length;
        j++
    ){


        backButtons[j].onclick =
        function(){


            goHome();


        };


    }







    console.log(
        "✅ app.js 初始化完成"
    );


}









// ===============================
// 啟動
// ===============================


window.onload =
function(){


    initApp();


};
