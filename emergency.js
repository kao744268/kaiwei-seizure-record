// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// emergency.js
// 功能：緊急聯絡資訊
// ==========================================



// ===============================
// 顯示緊急聯絡人
// ===============================

function renderEmergencyContacts(){


    const box =
    document.getElementById(
        "emergencyList"
    );



    if(!box){

        return;

    }



    // 檢查資料

    if(
        typeof emergencyContacts === "undefined" ||
        emergencyContacts.length === 0
    ){


        box.innerHTML = `

            <p>
            尚無緊急聯絡資料
            </p>

        `;


        return;

    }



    box.innerHTML = "";



    emergencyContacts.forEach(
    function(contact){



        const card =
        document.createElement(
            "div"
        );



        card.className =
        "contact-card";



        card.innerHTML = `


            <h3>
            👤 ${contact.name || "未設定"}
            </h3>



            <p>

            關係：
            ${contact.relation || "未設定"}

            </p>




            <p>

            電話：

            <a href="tel:${contact.phone}">

            ${contact.phone || "未設定"}

            </a>

            </p>


        `;



        box.appendChild(card);



    });


}






// ===============================
// 初始化
// ===============================

document.addEventListener(
"DOMContentLoaded",
function(){


    renderEmergencyContacts();



    console.log(
        "📞 emergency.js 啟動完成"
    );


});
