// ==========================================
// 👦 愷威 Care V3.1
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

    name: "愷威",

    disease:
        "卓飛症候群\nDravet syndrome",

    description:
        "尚未設定",

    symptom:
        "癲癇發作",

    hospital:
        "尚未設定",

    doctor:
        "尚未設定",

    medication:
        "尚未設定",

    emergencyMedicine:
        "尚未設定",

    usage:
        "依醫囑使用",

    notice:
        "尚未設定",

    height: "",

    weight: "",

    update: ""

};


// ==========================================
// 從 Google Sheet 取得醫療資料
// ==========================================

async function fetchMedicalInfo() {

    try {

        updateMedicalStatus(
            "☁️ 正在載入最新醫療資訊..."
        );


        const response = await fetch(
            MEDICAL_API + "?action=medical",
            {
                method: "GET",
                cache: "no-store"
            }
        );


        if (!response.ok) {

            throw new Error(
                "HTTP " + response.status
            );

        }


        const result = await response.json();


        console.log(
            "🏥 Google Sheet Medical API：",
            result
        );


        // ======================================
        // 檢查 API 回傳狀態
        // ======================================

        if (
            !result ||
            result.status !== "success"
        ) {

            throw new Error(
                result && result.message
                    ? result.message
                    : "醫療資料讀取失敗"
            );

        }


        // ======================================
        // 確認 data 是否存在
        // ======================================

        if (!result.data) {

            console.warn(
                "Medical_Info 沒有 data"
            );

            return {
                ...defaultMedicalInfo
            };

        }


        // ======================================
        // 確保 data 是陣列
        // ======================================

        let medicalData = result.data;


        if (!Array.isArray(medicalData)) {

            medicalData = [medicalData];

        }


        if (medicalData.length === 0) {

            console.warn(
                "Medical_Info 沒有資料"
            );

            return {
                ...defaultMedicalInfo
            };

        }


        // ======================================
        // 找愷威 P001
        // ======================================

        const row = medicalData.find(
            function (item) {

                if (!item) {
                    return false;
                }

                return String(
                    item.child_id ||
                    item.Child_ID ||
                    item.childId ||
                    ""
                ).trim() === MEDICAL_CHILD_ID;

            }
        );


        // ======================================
        // 找不到 P001
        // ======================================

        if (!row) {

            console.warn(
                "找不到 Child_ID：",
                MEDICAL_CHILD_ID
            );

            return {
                ...defaultMedicalInfo
            };

        }


        console.log(
            "🏥 找到愷威醫療資料：",
            row
        );


        // ======================================
        // 整理資料
        // ======================================

        return {

            name:
                row.name ||
                row.Name ||
                defaultMedicalInfo.name,


            disease:
                row.disease ||
                row.Disease ||
                defaultMedicalInfo.disease,


            description:
                row.description ||
                row.Description ||
                defaultMedicalInfo.description,


            symptom:
                row.symptom ||
                row.Symptom ||
                defaultMedicalInfo.symptom,


            hospital:
                row.hospital ||
                row.Hospital ||
                defaultMedicalInfo.hospital,


            doctor:
                row.doctor ||
                row.Doctor ||
                defaultMedicalInfo.doctor,


            medication:
                row.medication ||
                row.medicine ||
                row.Medication ||
                row.Medicine ||
                defaultMedicalInfo.medication,


            emergencyMedicine:
                row.emergencyMedicine ||
                row.emergency_medicine ||
                row.EmergencyMedicine ||
                row.Emergency_Medicine ||
                defaultMedicalInfo.emergencyMedicine,


            usage:
                row.usage ||
                row.Usage ||
                defaultMedicalInfo.usage,


            notice:
                row.notice ||
                row.Notice ||
                defaultMedicalInfo.notice,


            height:
                row.height ||
                row.Height ||
                defaultMedicalInfo.height,


            weight:
                row.weight ||
                row.Weight ||
                defaultMedicalInfo.weight,


            update:
                row.update ||
                row.updated ||
                row.last_update ||
                row.lastUpdate ||
                row.Update ||
                defaultMedicalInfo.update

        };


    } catch (error) {

        console.error(
            "🏥 Google Sheet 醫療資料載入失敗：",
            error
        );


        updateMedicalStatus(
            "⚠️ 無法取得最新資料，顯示預設資訊"
        );


        // ======================================
        // 發生錯誤仍然回傳預設資料
        // ======================================

        return {
            ...defaultMedicalInfo
        };

    }

}


// ==========================================
// 顯示醫療卡
// ==========================================

async function renderMedical() {

    const card =
        document.getElementById(
            "medicalCard"
        );


    if (!card) {

        console.warn(
            "⚠️ 找不到 medicalCard"
        );

        return;

    }


    // ======================================
    // 載入畫面
    // ======================================

    card.innerHTML = `

        <div class="medical-loading">

            ☁️ 正在載入醫療資訊...

        </div>

    `;


    try {

        const info =
            await fetchMedicalInfo();


        // ======================================
        // 確保 info 存在
        // ======================================

        const medicalInfo =
            info || {
                ...defaultMedicalInfo
            };


        // ======================================
        // 建立醫療卡
        // ======================================

        card.innerHTML = `

            <h3>
                🏥 醫療資訊卡
            </h3>

            <hr>


            <p>
                👦 姓名：
                <br>
                ${lineBreak(medicalInfo.name)}
            </p>


            <p>
                🧬 疾病：
                <br>
                ${lineBreak(medicalInfo.disease)}
            </p>


            <p>
                📖 疾病說明：
                <br>
                ${lineBreak(medicalInfo.description)}
            </p>


            <p>
                ⚠️ 主要症狀：
                <br>
                ${lineBreak(medicalInfo.symptom)}
            </p>


            <p>
                🏥 就診醫院：
                <br>
                ${lineBreak(medicalInfo.hospital)}
            </p>


            <p>
                👨‍⚕️ 主治醫師：
                <br>
                ${lineBreak(medicalInfo.doctor)}
            </p>


            <p>
                📏 身高：
                <br>
                ${
                    medicalInfo.height !== "" &&
                    medicalInfo.height !== null &&
                    medicalInfo.height !== undefined
                        ? lineBreak(
                            String(medicalInfo.height)
                        ) + " cm"
                        : "-"
                }
            </p>


            <p>
                ⚖️ 體重：
                <br>
                ${
                    medicalInfo.weight !== "" &&
                    medicalInfo.weight !== null &&
                    medicalInfo.weight !== undefined
                        ? lineBreak(
                            String(medicalInfo.weight)
                        ) + " kg"
                        : "-"
                }
            </p>


            <p>
                💊 目前使用藥物：
                <br>
                ${lineBreak(medicalInfo.medication)}
            </p>


            <p>
                🚨 緊急藥物：
                <br>
                ${lineBreak(
                    medicalInfo.emergencyMedicine
                )}
            </p>


            <p>
                📌 使用方式：
                <br>
                ${lineBreak(medicalInfo.usage)}
            </p>


            <p>
                📝 注意事項：
                <br>
                ${lineBreak(medicalInfo.notice)}
            </p>


            ${
                medicalInfo.update
                    ? `
                        <p class="medical-update">

                            🔄 最後更新：
                            <br>

                            ${lineBreak(
                                String(
                                    medicalInfo.update
                                )
                            )}

                        </p>
                    `
                    : ""
            }


            <hr>


            <div class="medical-lock">

                🔒 查看模式

                <br>

                資料由 Google Sheet 管理

            </div>

        `;


        console.log(
            "🏥 醫療資訊卡顯示完成"
        );


    } catch (error) {

        console.error(
            "🏥 renderMedical 發生錯誤：",
            error
        );


        // ======================================
        // 最後一道保護
        // 就算 API / 資料格式出問題
        // 醫療卡也不應該整個空白
        // ======================================

        card.innerHTML = `

            <h3>
                🏥 醫療資訊卡
            </h3>

            <hr>

            <p>
                👦 姓名：
                <br>
                愷威
            </p>

            <p>
                🧬 疾病：
                <br>
                卓飛症候群<br>
                Dravet syndrome
            </p>

            <p>
                ⚠️ 主要症狀：
                <br>
                癲癇發作
            </p>

            <hr>

            <div class="medical-lock">

                ⚠️ 暫時無法取得最新資料

            </div>

        `;

    }

}


// ==========================================
// 醫療卡載入狀態
// ==========================================

function updateMedicalStatus(text) {

    const card =
        document.getElementById(
            "medicalCard"
        );


    if (!card) {

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

function lineBreak(text) {

    if (
        text === null ||
        text === undefined ||
        text === ""
    ) {

        return "-";

    }


    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/\r?\n/g, "<br>");

}


// ==========================================
// 初始化
// ==========================================

function initMedical() {

    console.log(
        "🏥 medical.js V3.1 初始化"
    );


    renderMedical();

}


// ==========================================
// DOM Ready
// ==========================================

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initMedical
    );

} else {

    initMedical();

}
