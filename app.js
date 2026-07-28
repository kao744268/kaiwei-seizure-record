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
// ==========================================
// V3.0 Clean
// app.js
// 第二段：初始化資料顯示
// ==========================================



// ===============================
// 顯示系統資訊
// ===============================

function loadSystemInfo(){


    const versionElement =
    document.querySelector(".version");



    if(versionElement && typeof systemInfo !== "undefined"){


        versionElement.textContent =
        systemInfo.version;


    }


}






// ===============================
// 初始化醫療資訊卡
// ===============================

function loadMedicalCard(){


    const box =
    document.getElementById("medicalCard");



    if(!box){

        return;

    }



    if(typeof medicalCard === "undefined"){


        box.innerHTML =
        "尚無醫療資料";


        return;

    }



    box.innerHTML = `

        <div>

            <h3>
            ${medicalCard.name || ""}
            </h3>


            <p>
            診斷：
            ${medicalCard.diagnosis || "未設定"}
            </p>


            <p>
            醫院：
            ${medicalCard.hospital || "未設定"}
            </p>


            <p>
            醫師：
            ${medicalCard.doctor || "未設定"}
            </p>


            <p>
            備註：
            ${medicalCard.note || ""}
            </p>


        </div>

    `;


}







// ===============================
// 初始化緊急聯絡備援資料
// ===============================

function loadEmergencyLocal(){


    const box =
    document.getElementById("emergencyList");



    if(!box){

        return;

    }



    if(
        typeof emergencyContacts === "undefined" ||
        emergencyContacts.length === 0
    ){


        box.innerHTML =
        "尚無緊急聯絡資料";


        return;


    }




    box.innerHTML = "";



    emergencyContacts.forEach(function(contact){



        box.innerHTML += `

            <div class="contact-card">


                <div class="contact-name">

                    ${contact.name}

                </div>



                <div class="contact-phone">

                    ${contact.phone || "未設定"}

                </div>



                <div>

                    ${contact.relation || ""}

                </div>


            </div>

        `;



    });



}






// ===============================
// 啟動初始化
// ===============================


document.addEventListener(
"DOMContentLoaded",
function(){


    loadSystemInfo();


    loadMedicalCard();


    loadEmergencyLocal();


});
