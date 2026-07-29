// ==========================================
// 愷威 Care V1.0
// medical.js
// 功能：醫療資訊卡
// ==========================================





// ===============================
// 取得資料
// ===============================


function getMedicalValue(value){


    if(
        value === undefined ||
        value === null ||
        value === ""
    ){

        return "--";

    }


    return value;


}







// ===============================
// 顯示醫療資訊
// ===============================


function renderMedical(){



    const card =
    document.getElementById(
        "medicalCard"
    );



    if(!card){

        return;

    }




    const data =
    window.medicalData || {};






    card.className =
    "medical-card";




    card.innerHTML =



    `

    <h3>
    👦 基本資料
    </h3>


    <p>
    <strong>姓名：</strong>
    ${getMedicalValue(data.name)}
    </p>


    <p>
    <strong>生日：</strong>
    ${getMedicalValue(data.birthday)}
    </p>


    <hr>


    <h3>
    🏥 醫療資訊
    </h3>


    <p>
    <strong>診斷：</strong>
    ${getMedicalValue(data.diagnosis)}
    </p>


    <p>
    <strong>醫院：</strong>
    ${getMedicalValue(data.hospital)}
    </p>


    <p>
    <strong>醫師：</strong>
    ${getMedicalValue(data.doctor)}
    </p>


    <p>
    <strong>用藥：</strong>
    ${getMedicalValue(data.medication)}
    </p>


    <p>
    <strong>過敏：</strong>
    ${getMedicalValue(data.allergy)}
    </p>


    <hr>


    <h3>
    📝 注意事項
    </h3>


    <p>
    ${getMedicalValue(data.note)}
    </p>


    `;



}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    console.log(
        "🏥 medical.js 啟動"
    );


});
