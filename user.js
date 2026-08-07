// ==========================================
// 👦 愷威 Care V1.0
// user.js
// 使用者身份管理
// ==========================================


// ==========================================
// LocalStorage Key
// ==========================================

const USER_STORAGE_KEY =
"care_current_user";


// ==========================================
// 取得目前使用者
// ==========================================

function getCurrentUser(){

    const saved =
    localStorage.getItem(
        USER_STORAGE_KEY
    );


    if(!saved){

        return null;

    }


    try{

        return JSON.parse(
            saved
        );

    }catch(error){

        console.error(
            "讀取使用者資料失敗：",
            error
        );

        localStorage.removeItem(
            USER_STORAGE_KEY
        );

        return null;

    }

}


// ==========================================
// 儲存使用者
// ==========================================

function saveCurrentUser(
    name,
    role
){

    const user = {

        name:
        name.trim(),

        role:
        role,

        displayName:
        name.trim() +
        "｜" +
        role

    };


    localStorage.setItem(

        USER_STORAGE_KEY,

        JSON.stringify(
            user
        )

    );


    return user;

}


// ==========================================
// 顯示使用者設定畫面
// ==========================================

function showUserSetup(){

    const setupPage =
    document.getElementById(
        "userSetupPage"
    );


    const homePage =
    document.getElementById(
        "homePage"
    );


    if(setupPage){

        setupPage.classList.add(
            "active"
        );

    }


    if(homePage){

        homePage.classList.remove(
            "active"
        );

    }

}


// ==========================================
// 進入主畫面
// ==========================================

function enterApp(){

    const setupPage =
    document.getElementById(
        "userSetupPage"
    );


    const homePage =
    document.getElementById(
        "homePage"
    );


    if(setupPage){

        setupPage.classList.remove(
            "active"
        );

    }


    if(homePage){

        homePage.classList.add(
            "active"
        );

    }


    window.scrollTo(
        0,
        0
    );

}


// ==========================================
// 開始使用
// ==========================================

function startUserSetup(){

    const nameInput =
    document.getElementById(
        "userName"
    );


    const roleSelect =
    document.getElementById(
        "userRole"
    );


    if(!nameInput){

        console.error(
            "找不到 userName"
        );

        return;

    }


    if(!roleSelect){

        console.error(
            "找不到 userRole"
        );

        return;

    }


    const name =
    nameInput.value.trim();


    const role =
    roleSelect.value;


    // ===============================
    // 檢查姓名
    // ===============================

    if(!name){

        alert(
            "請先輸入姓名。"
        );


        nameInput.focus();

        return;

    }


    // ===============================
    // 檢查身份
    // ===============================

    if(!role){

        alert(
            "請先選擇身份。"
        );


        roleSelect.focus();

        return;

    }


    // ===============================
    // 儲存
    // ===============================

    const user =
    saveCurrentUser(
        name,
        role
    );


    console.log(
        "👤 使用者設定完成：",
        user
    );


    // ===============================
    // 進入 App
    // ===============================

    enterApp();


    alert(

        "👋 歡迎 " +
        user.displayName +
        "\n\n" +
        "之後的發作紀錄會自動記錄您的身份。"

    );

}


// ==========================================
// 更換使用者
// ==========================================

function changeUser(){

    const currentUser =
    getCurrentUser();


    if(currentUser){

        const confirmChange =
        confirm(

            "目前使用者：\n" +

            currentUser.displayName +

            "\n\n" +

            "確定要更換使用者嗎？"

        );


        if(!confirmChange){

            return;

        }

    }


    localStorage.removeItem(
        USER_STORAGE_KEY
    );


    // 清空輸入欄位

    const nameInput =
    document.getElementById(
        "userName"
    );


    const roleSelect =
    document.getElementById(
        "userRole"
    );


    if(nameInput){

        nameInput.value = "";

    }


    if(roleSelect){

        roleSelect.value = "";

    }


    showUserSetup();

}


// ==========================================
// 初始化使用者系統
// ==========================================

function initUser(){

    console.log(
        "👤 user.js V1.0 初始化"
    );


    const startBtn =
    document.getElementById(
        "userStartBtn"
    );


    if(startBtn){

        startBtn.onclick =
        startUserSetup;

    }else{

        console.error(
            "❌ 找不到 userStartBtn"
        );

    }


    const currentUser =
    getCurrentUser();


    // ===============================
    // 已經設定過使用者
    // ===============================

    if(currentUser){

        console.log(
            "👤 目前使用者：",
            currentUser.displayName
        );


        enterApp();


    }else{

        // ===============================
        // 第一次使用
        // ===============================

        console.log(
            "👤 尚未設定使用者"
        );


        showUserSetup();

    }

}


// ==========================================
// DOM 初始化
// ==========================================

if(
    document.readyState === "loading"
){

    document.addEventListener(

        "DOMContentLoaded",

        initUser

    );

}else{

    initUser();

}
