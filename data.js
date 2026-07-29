// ==========================================
// 愷威 Care V1.0
// data.js
// 功能：系統資料中心
// ==========================================



// ===============================
// 發作紀錄資料
// ===============================


window.seizureRecords = [];




// ===============================
// 醫療資訊
// ===============================


window.medicalData = {


    name:
    "愷威",


    birthday:
    "",


    diagnosis:
    "卓飛症候群",


    hospital:
    "",


    doctor:
    "",


    medication:
    "",


    allergy:
    "",


    note:
    ""

};







// ===============================
// 緊急聯絡資料
// ===============================


window.emergencyContacts = [


    {


        name:
        "",


        relation:
        "",


        phone:
        ""


    }


];







// ===============================
// 系統設定
// ===============================


window.appSettings = {


    childName:
    "愷威",


    autoSync:
    false,


    googleSheetUrl:
    "",


    notification:
    false


};







// ===============================
// 資料版本
// ===============================


window.CARE_VERSION =
"V1.0";





console.log(
    "🗂️ data.js 載入完成",
    CARE_VERSION
);
