// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean Stable-1
// app.js
// 功能：頁面控制
// ==========================================



// ===============================
// 頁面設定
// ===============================


const pageMap = {


    startSeizureBtn:
    "seizurePage",


    recordBtn:
    "recordPage",


    medicalBtn:
    "medicalPage",


    emergencyBtn:
    "emergencyPage"


};






// ===============================
// 顯示頁面
// ===============================


function showPage(pageId){



    document
    .querySelectorAll(".page")
    .forEach(
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
// 初始化
// ===============================


function initApp(){



    console.log(
        "🚀 V3.0 Stable-1 app 啟動"
    );



    Object
    .entries(pageMap)
    .forEach(
        function([buttonId,pageId]){



            const button =
            document.getElementById(
                buttonId
            );



            if(button){



                button.addEventListener(
                    "click",
                    function(){

                        showPage(pageId);

                    }
                );



            }



        }
    );





    document
    .querySelectorAll(".backBtn")
    .forEach(
        function(button){



            button.addEventListener(
                "click",
                function(){

                    showPage(
                        "homePage"
                    );

                }
            );


        }
    );





    showPage(
        "homePage"
    );


}





document.addEventListener(

    "DOMContentLoaded",

    initApp

);
