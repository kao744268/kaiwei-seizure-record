// ==========================================
// 愷威 Care V2.0 Clean
// app.js
// Stable Controller
// ==========================================



// ===============================
// 頁面切換
// ===============================


function showPage(id){


    var pages = document.getElementsByClassName(
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
    document.getElementById(id);



    if(target){

        target.classList.add(
            "active"
        );


        console.log(
            "切換頁面:",
            id
        );


    }
    else{


        console.log(
            "找不到頁面:",
            id
        );


    }



}








// ===============================
// 初始化
// ===============================


function initApp(){



    console.log(
        "👦 愷威 Care V2.0 Clean 啟動"
    );





    // 發作紀錄按鈕


    var goSeizureBtn =
    document.getElementById(
        "goSeizureBtn"
    );


    if(goSeizureBtn){


        goSeizureBtn.onclick =
        function(){


            showPage(
                "seizurePage"
            );


        };


        console.log(
            "✅ 發作按鈕連線"
        );


    }







    // 歷史紀錄


    var goHistoryBtn =
    document.getElementById(
        "goHistoryBtn"
    );



    if(goHistoryBtn){


        goHistoryBtn.onclick =
        function(){


            showPage(
                "historyPage"
            );


        };


        console.log(
            "✅ 歷史按鈕連線"
        );


    }







    // 醫療資訊


    var goMedicalBtn =
    document.getElementById(
        "goMedicalBtn"
    );



    if(goMedicalBtn){


        goMedicalBtn.onclick =
        function(){


            showPage(
                "medicalPage"
            );


        };


        console.log(
            "✅ 醫療按鈕連線"
        );


    }







    // 緊急聯絡


    var goEmergencyBtn =
    document.getElementById(
        "goEmergencyBtn"
    );



    if(goEmergencyBtn){


        goEmergencyBtn.onclick =
        function(){


            showPage(
                "emergencyPage"
            );


        };


        console.log(
            "✅ 緊急按鈕連線"
        );


    }







    // 設定


    var goSettingsBtn =
    document.getElementById(
        "goSettingsBtn"
    );



    if(goSettingsBtn){


        goSettingsBtn.onclick =
        function(){


            showPage(
                "settingsPage"
            );


        };


        console.log(
            "✅ 設定按鈕連線"
        );


    }







    // 返回首頁


    var backButtons =
    document.getElementsByClassName(
        "backHomeBtn"
    );



    for(
        var j = 0;
        j < backButtons.length;
        j++
    ){


        backButtons[j].onclick =
        function(){


            showPage(
                "homePage"
            );


        };


    }



    console.log(
        "✅ 所有按鈕初始化完成"
    );



}









// ===============================
// 啟動
// ===============================


window.onload =
function(){


    initApp();


};
