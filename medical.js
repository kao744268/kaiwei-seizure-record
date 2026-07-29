// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// medical.js
// 功能：醫療資訊卡
// ==========================================



// ===============================
// 顯示醫療卡
// ===============================

function renderMedicalCard(){



    const box =
    document.getElementById(
        "medicalCard"
    );



    if(!box){

        return;

    }




    // 檢查資料是否存在

    if(
        typeof medicalCard === "undefined"
    ){


        box.innerHTML = `

            <p>
            尚無醫療資訊
            </p>

        `;


        return;

    }




    box.innerHTML = `


        <div class="medical-card">


            <h3>
            👦 ${medicalCard.name || "未設定"}
            </h3>



            <p>
            <strong>
            診斷：
            </strong>

            ${medicalCard.diagnosis || "未設定"}

            </p>




            <p>
            <strong>
            醫院：
            </strong>

            ${medicalCard.hospital || "未設定"}

            </p>




            <p>
            <strong>
            主治醫師：
            </strong>

            ${medicalCard.doctor || "未設定"}

            </p>




            <p>
            <strong>
            備註：
            </strong>

            ${medicalCard.note || "無"}

            </p>



        </div>


    `;



}






// ===============================
// 初始化
// ===============================

document.addEventListener(
"DOMContentLoaded",
function(){


    renderMedicalCard();



    console.log(
        "🏥 medical.js 啟動完成"
    );


});
