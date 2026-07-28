// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// app.js
// 第一段：頁面控制
// ==========================================



// ===============================
// 切換頁面
// ===============================

function showPage(pageId){


    const pages =
    document.querySelectorAll(".page");



    pages.forEach(function(page){


        page.classList.remove("active");


    });



    const target =
    document.getElementById(pageId);



    if(target){


        target.classList.add("active");


    }


}






// ===============================
// 初始化
// ===============================


document.addEventListener(
"DOMContentLoaded",
function(){



    console.log(
        "V3.0 App 啟動"
    );



    // ==========================
    // 首頁按鈕
    // ==========================


    document
    .getElementById("startSeizureBtn")
    .addEventListener(
        "click",
        function(){

            showPage("seizurePage");

        }
    );



    document
    .getElementById("recordBtn")
    .addEventListener(
        "click",
        function(){

            showPage("recordPage");

        }
    );



    document
    .getElementById("medicalBtn")
    .addEventListener(
        "click",
        function(){

            showPage("medicalPage");

        }
    );



    document
    .getElementById("emergencyBtn")
    .addEventListener(
        "click",
        function(){

            showPage("emergencyPage");

        }
    );





    // ==========================
    // 返回首頁按鈕
    // ==========================


    const backButtons =
    document.querySelectorAll(".backBtn");



    backButtons.forEach(function(btn){


        btn.addEventListener(
            "click",
            function(){

                showPage("homePage");

            }
        );


    });



});
