// ==========================================
// 愷威 Care V2.0 守護版
// emergency.js
// Emergency Mode System
// ==========================================



// ===============================
// 緊急聯絡資料
// ===============================


const emergencyContacts = [


    {
        name:"爸爸",
        phone:"0916-398-937"
    },


    {
        name:"奶奶",
        phone:"0905-083-604"
    },


    {
        name:"爺爺",
        phone:"0932-000-929"
    },


    {
        name:"叔叔",
        phone:"0975-108-215"
    }


];









// ===============================
// 顯示緊急提醒
// ===============================


function showEmergencyAlert(){


    const alertBox =
    document.getElementById(
        "emergencyAlert"
    );



    if(alertBox){


        alertBox.innerHTML = `


        🚨 發作超過 5 分鐘


        `;


    }




    showPage(
        "emergencyPage"
    );



    renderEmergency();


}









// ===============================
// 顯示緊急頁
// ===============================


function renderEmergency(){



    const alertBox =
    document.getElementById(
        "emergencyAlert"
    );



    if(alertBox && alertBox.innerHTML===""){


        alertBox.innerHTML =

        "⚠️ 緊急資訊模式";


    }







    renderContacts();



}









// ===============================
// 聯絡人列表
// ===============================


function renderContacts(){



    const box =
    document.getElementById(
        "contactList"
    );



    if(!box){

        return;

    }





    box.innerHTML = "";






    emergencyContacts.forEach(

        function(contact){



            const div =
            document.createElement(
                "div"
            );



            div.className =
            "contact-card";





            div.innerHTML = `


            <div>


            <h3>
            ${contact.name}
            </h3>


            <p>
            📞 ${contact.phone}
            </p>


            </div>



            <button onclick="callPhone('${contact.phone}')">

            撥打

            </button>


            `;



            box.appendChild(
                div
            );


        }

    );



}









// ===============================
// 撥電話
// ===============================


function callPhone(phone){


    window.location.href =

    "tel:" +

    phone.replace(
        /-/g,
        ""
    );


}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    console.log(
        "⚠️ emergency.js 初始化完成"
    );



}

);
