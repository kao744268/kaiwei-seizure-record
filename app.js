// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// app.js
// 功能：頁面切換（唯一職責）
// ==========================================

// 頁面 ID 對照
const pages = {
    home: "homePage",
    seizure: "seizurePage",
    record: "recordPage",
    medical: "medicalPage",
    emergency: "emergencyPage"
};

// ===============================
// 顯示指定頁面
// ===============================
function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
        target.classList.add("active");
    } else {
        console.warn("找不到頁面：", pageId);
    }
}

// ===============================
// 綁定按鈕
// ===============================
function bindButtons() {

    const buttonMap = {

        startSeizureBtn: pages.seizure,

        recordBtn: pages.record,

        medicalBtn: pages.medical,

        emergencyBtn: pages.emergency

    };

    Object.entries(buttonMap).forEach(([buttonId, pageId]) => {

        const button = document.getElementById(buttonId);

        if (!button) {
            console.warn("找不到按鈕：", buttonId);
            return;
        }

        button.addEventListener("click", () => {
            showPage(pageId);
        });

    });

    // 返回首頁
    document.querySelectorAll(".backBtn").forEach(button => {

        button.addEventListener("click", () => {

            showPage(pages.home);

        });

    });

}

// ===============================
// 初始化
// ===============================
function initApp() {

    console.log("🚀 V3.0 Clean 啟動");

    bindButtons();

    showPage(pages.home);

}

document.addEventListener("DOMContentLoaded", initApp);
