// ==========================================
// 愷威 Care V1.0
// app.js
// 功能：App導航與頁面控制
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



    window.scrollTo(
        0,
        0
    );



}







// ===============================
// 初始化
// ===============================


function initApp(){



    console.log(
        "👦 愷威 Care V1.0 啟動"
    );





    // 開始發作

    const startBtn =
    document.getElementById(
        "startSeizureBtn"
    );



    if(startBtn){


        startBtn.addEventListener(

            "click",

            function(){


                showPage(
                    "seizurePage"
                );



                if(
                    typeof startSeizure === "function"
                ){

                    startSeizure();

                }


            }

        );


    }







    // 歷史紀錄


    const historyBtn =
    document.getElementById(
        "historyBtn"
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








    // 醫療卡


    const medicalBtn =
    document.getElementById(
        "medicalBtn"
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







    // 緊急聯絡


    const emergencyBtn =
    document.getElementById(
        "emergencyBtn"
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







    // 設定


    const settingsBtn =
    document.getElementById(
        "settingsBtn"
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









    // 返回首頁


    const backButtons =
    document.querySelectorAll(
        ".backBtn"
    );



    backButtons.forEach(

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







    // 預設首頁


    showPage(
        "homePage"
    );



}







// 啟動


document.addEventListener(

    "DOMContentLoaded",

    initApp

);
