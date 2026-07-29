// ==========================================
// 愷威 Care V2.0 守護版
// medical.js
// Medical Information Card
// ==========================================



// ===============================
// 預設醫療資料
// ===============================


const defaultMedicalInfo = {


    name:
    "愷威",


    disease:
    "卓飛症候群\nDravet syndrome",


    symptom:
    "癲癇發作",


    hospital:
    "尚未設定",


    doctor:
    "尚未設定",


    medicine:
    "尚未設定",


    emergencyMedicine:
    "尚未設定",


    usage:
    "依醫囑使用",


    notice:
    "尚未設定"



};









// ===============================
// 取得資料
// ===============================


function getMedicalInfo(){



    const data =

    localStorage.getItem(
        "care_medical_info"
    );



    if(data){


        return JSON.parse(
            data
        );


    }



    return defaultMedicalInfo;



}









// ===============================
// 儲存資料
// ===============================


function saveMedicalInfo(data){



    localStorage.setItem(

        "care_medical_info",

        JSON.stringify(data)

    );


}









// ===============================
// 顯示醫療卡
// ===============================


function renderMedical(){



    const card =
    document.getElementById(
        "medicalCard"
    );



    if(!card){

        return;

    }




    const info =
    getMedicalInfo();





    card.innerHTML = `


<h3>
🏥 醫療資訊卡
</h3>



<hr>



<p>
👦 姓名：
<br>
${lineBreak(info.name)}
</p>



<p>
🧬 疾病：
<br>
${lineBreak(info.disease)}
</p>



<p>
⚠️ 主要症狀：
<br>
${lineBreak(info.symptom)}
</p>



<p>
🏥 就診醫院：
<br>
${lineBreak(info.hospital)}
</p>



<p>
👨‍⚕️ 主治醫師：
<br>
${lineBreak(info.doctor)}
</p>



<p>
💊 目前使用藥物：
<br>
${lineBreak(info.medicine)}
</p>



<p>
🚨 緊急藥物：
<br>
${lineBreak(info.emergencyMedicine)}
</p>



<p>
📌 使用方式：
<br>
${lineBreak(info.usage)}
</p>



<p>
📝 注意事項：
<br>
${lineBreak(info.notice)}
</p>



<hr>



<div class="medical-lock">

🔒 查看模式

<br>

僅家長可修改資料

</div>



`;



}









// ===============================
// 換行處理
// ===============================


function lineBreak(text){



    if(!text){

        return "-";

    }



    return text.replace(
        /\n/g,
        "<br>"
    );



}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    renderMedical();



    console.log(
        "🏥 medical.js 初始化完成"
    );



}

);
