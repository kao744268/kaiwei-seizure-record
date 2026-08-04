// ==========================================
// 👦 愷威 Care V3.0
// medical.js
// Google Sheet 醫療資訊卡
// ==========================================


// ==========================================
// Google Sheet API
// ==========================================

const MEDICAL_API =
"https://script.google.com/macros/s/AKfycbyqBDv6Xnn1bUDnavrEoxIe9x0NWyRiZIImhPb5-G66eh3BOlCa3m_3ZFD-ftbLDPeogg/exec";


// ==========================================
// Child ID
// ==========================================

const MEDICAL_CHILD_ID = "P001";


// ==========================================
// 預設資料
// ==========================================

const defaultMedicalInfo = {
    console.log("🏥 API 找到的醫療資料：", row);
return {

    name:
    "愷威",

    disease:
    row.disease ||
    defaultMedicalInfo.disease,

    description:
    row.description ||
    defaultMedicalInfo.description,

    symptom:
    row.symptom ||
    defaultMedicalInfo.symptom,

    hospital:
    row.hospital ||
    defaultMedicalInfo.hospital,

    doctor:
    row.doctor ||
    defaultMedicalInfo.doctor,

    medication:
    row.medicine ||
    defaultMedicalInfo.medication,

    emergencyMedicine:
    row.emergencyMedicine ||
    defaultMedicalInfo.emergencyMedicine,

    usage:
    row.usage ||
    defaultMedicalInfo.usage,

    notice:
    row.notice ||
    defaultMedicalInfo.notice,

    update:
    row.update ||
    ""

};


// ==========================================
// 從 Google Sheet 取得醫療資料
// ==========================================

async function fetchMedicalInfo(){

    try{

        updateMedicalStatus(
            "☁️ 正在載入最新醫療資訊..."
        );


        const response =
        await fetch(

            MEDICAL_API +
            "?action=medical"

        );


        if(!response.ok){

            throw new Error(
                "HTTP " + response.status
            );

        }


        const result =
        await response.json();


        console.log(
            "🏥 Google Sheet Medical API：",
            result
        );


        if(
            result.status !== "success"
        ){

            throw new Error(
                result.message ||
                "醫療資料讀取失敗"
            );

        }


        if(
            !result.data ||
            result.data.length === 0
        ){

            console.warn(
                "Medical_Info 沒有資料"
            );

            return defaultMedicalInfo;

        }


        // 找愷威 P001
        const row =
        result.data.find(function(item){

            return String(
                item.child_id
            ) === MEDICAL_CHILD_ID;

        });


        if(!row){

            console.warn(
                "找不到 Child_ID：" +
                MEDICAL_CHILD_ID
            );

            return defaultMedicalInfo;

        }


        return {

            name:
            "愷威",

            disease:
            row.disease ||
            defaultMedicalInfo.disease,

            description:
            row.description ||
            defaultMedicalInfo.description,

            symptom:
            row.symptom ||
            defaultMedicalInfo.symptom,

            hospital:
            row.hospital ||
            defaultMedicalInfo.hospital,

            doctor:
            row.doctor ||
            defaultMedicalInfo.doctor,

            mmedication:
row.medicine ||
defaultMedicalInfo.medication,

            emergencyMedicine:
            row.emergencyMedicine ||
            defaultMedicalInfo.emergencyMedicine,

            usage:
            row.usage ||
            defaultMedicalInfo.usage,

            notice:
            row.notice ||
            defaultMedicalInfo.notice,

            update:
            row.update ||
            ""

        };


    }catch(error){

        console.error(
            "🏥 Google Sheet 醫療資料載入失敗：",
            error
        );


        updateMedicalStatus(
            "⚠️ 無法取得最新資料，顯示預設資訊"
        );


        return defaultMedicalInfo;

    }

}


// ==========================================
// 顯示醫療卡
// ==========================================

async function renderMedical(){

    const card =
    document.getElementById(
        "medicalCard"
    );


    if(!card){

        return;

    }


    card.innerHTML = `

        <div class="medical-loading">

            ☁️ 正在載入醫療資訊...

        </div>

    `;


    const info =
    await fetchMedicalInfo();


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
            📖 疾病說明：
            <br>
            ${lineBreak(info.description)}
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
            ${lineBreak(info.medication)}
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


        ${
            info.update
            ?
            `
            <p class="medical-update">
                🔄 最後更新：
                <br>
                ${lineBreak(String(info.update))}
            </p>
            `
            :
            ""
        }


        <hr>


        <div class="medical-lock">

            🔒 查看模式

            <br>

            資料由 Google Sheet 管理

        </div>

    `;

}


// ==========================================
// 醫療卡載入狀態
// ==========================================

function updateMedicalStatus(text){

    const card =
    document.getElementById(
        "medicalCard"
    );


    if(!card){

        return;

    }


    card.innerHTML = `

        <div class="medical-loading">

            ${lineBreak(text)}

        </div>

    `;

}


// ==========================================
// 換行處理
// ==========================================

function lineBreak(text){

    if(
        text === null ||
        text === undefined ||
        text === ""
    ){

        return "-";

    }


    return String(text)
        .replace(
            /\n/g,
            "<br>"
        );

}


// ==========================================
// 初始化
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function(){

        console.log(
            "🏥 medical.js V3.0 初始化完成"
        );


        // 首頁載入時也先準備醫療卡
        renderMedical();

    }

);
