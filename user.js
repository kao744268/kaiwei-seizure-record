/* ==========================================
👦 愷威 Care
user.js
使用者身份系統 V1.1
========================================== */

/* ==========================================
設定
========================================== */

const USER_STORAGE_KEY = "kaiweiCareUser";

/* ==========================================
取得目前使用者
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

    localStorage.removeItem(
        USER_STORAGE_KEY
    );

    return null;

}
```

}

/* ==========================================
儲存使用者
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
顯示使用者設定
========================================== */

function showUserSetup() {

```
const setupPage =
    document.getElementById(
        "userSetupPage"
    );

const homePage =
    document.getElementById(
        "homePage"
    );


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
顯示主畫面
========================================== */

function showHomePage() {

```
const setupPage =
    document.getElementById(
        "userSetupPage"
    );

const homePage =
    document.getElementById(
        "homePage"
    );


if (setupPage) {

    setupPage.classList.remove("active");

}


if (homePage) {

    homePage.classList.add("active");

}
```

}

/* ==========================================
初始化
========================================== */

function initUserSystem() {

```
const currentUser =
    getCurrentUser();


if (!currentUser) {

    showUserSetup();

    return;

}


showHomePage();
```

}

/* ==========================================
開始使用
========================================== */

function handleUserStart() {

```
const nameInput =
    document.getElementById(
        "userName"
    );

const roleInput =
    document.getElementById(
        "userRole"
    );


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


showHomePage();
```

}

/* ==========================================
更換使用者
========================================== */

function changeUser() {

```
const nameInput =
    document.getElementById(
        "userName"
    );

const roleInput =
    document.getElementById(
        "userRole"
    );


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
初始化使用者系統
注意：
user.js 是最後載入
不需要等待 DOMContentLoaded
========================================== */

const userStartButton =
document.getElementById(
"userStartBtn"
);

if (userStartButton) {

```
userStartButton.addEventListener(

    "click",

    handleUserStart

);
```

}

/* ==========================================
立即初始化
========================================== */

initUserSystem();
