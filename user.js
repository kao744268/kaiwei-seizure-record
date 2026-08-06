/* ==========================================
👦 愷威 Care
user.js
使用者身份系統 V1.0
========================================== */

/* ==========================================
設定
========================================== */

const USER_STORAGE_KEY = "kaiweiCareUser";

/* ==========================================
取得使用者資料
========================================== */

function getCurrentUser() {

```
const savedUser =
    localStorage.getItem(USER_STORAGE_KEY);

if (!savedUser) {

    return null;

}

try {

    return JSON.parse(savedUser);

} catch (error) {

    console.error(
        "使用者資料讀取失敗：",
        error
    );

    return null;

}
```

}

/* ==========================================
儲存使用者資料
========================================== */

function saveCurrentUser(name, role) {

```
const user = {

    name: name,

    role: role

};


localStorage.setItem(

    USER_STORAGE_KEY,

    JSON.stringify(user)

);


return user;
```

}

/* ==========================================
顯示使用者設定畫面
========================================== */

function showUserSetup() {

```
const setupPage =
    document.getElementById("userSetupPage");

const homePage =
    document.getElementById("homePage");


if (!setupPage) {

    return;

}


setupPage.classList.add("active");


if (homePage) {

    homePage.classList.remove("active");

}
```

}

/* ==========================================
隱藏使用者設定畫面
========================================== */

function hideUserSetup() {

```
const setupPage =
    document.getElementById("userSetupPage");

const homePage =
    document.getElementById("homePage");


if (setupPage) {

    setupPage.classList.remove("active");

}


if (homePage) {

    homePage.classList.add("active");

}
```

}

/* ==========================================
初始化使用者系統
========================================== */

function initUserSystem() {

```
const savedUser =
    getCurrentUser();


if (!savedUser) {

    showUserSetup();

    return;

}


hideUserSetup();
```

}

/* ==========================================
開始使用
========================================== */

function handleUserStart() {

```
const nameInput =
    document.getElementById("userName");

const roleInput =
    document.getElementById("userRole");


if (!nameInput || !roleInput) {

    return;

}


const name =
    nameInput.value.trim();

const role =
    roleInput.value;


if (!name) {

    alert("請輸入姓名");

    nameInput.focus();

    return;

}


if (!role) {

    alert("請選擇身份");

    roleInput.focus();

    return;

}


saveCurrentUser(

    name,

    role

);


hideUserSetup();
```

}

/* ==========================================
更換使用者
========================================== */

function changeUser() {

```
const nameInput =
    document.getElementById("userName");

const roleInput =
    document.getElementById("userRole");


if (nameInput) {

    nameInput.value = "";

}


if (roleInput) {

    roleInput.value = "";

}


showUserSetup();
```

}

/* ==========================================
頁面載入
========================================== */

document.addEventListener(

```
"DOMContentLoaded",

function () {


    const startButton =
        document.getElementById("userStartBtn");


    if (startButton) {

        startButton.addEventListener(

            "click",

            handleUserStart

        );

    }


    initUserSystem();


}
```

);
