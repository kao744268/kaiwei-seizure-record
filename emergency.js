// ==========================================
// 愷威 Care V1.0
// emergency.js
// 功能：緊急聯絡管理
// ==========================================



// ===============================
// 取得安全文字
// ===============================


function getContactValue(value){


    if(
        value === undefined ||
        value === null ||
        value === ""
    ){

        return "--";

    }


    return value;


}







// ===============================
// 顯示緊急聯絡
// ===============================


function renderEmergency(){



    const list =
    document.getElementById(
        "emergencyList"
    );



    if(!list){

        return;

    }




    const contacts =
    window.emergencyContacts || [];






    if(
        contacts.length === 0
    ){


        list.innerHTML =

        `

        <div class="contact-card">

        尚無緊急聯絡資料

        </div>

        `;


        return;


    }






    list.innerHTML = "";






    contacts.forEach(

        function(contact){



            const card =
            document.createElement(
                "div"
            );



            card.className =
            "contact-card";





            let phone =
            getContactValue(
                contact.phone
            );





            let callButton = "";



            if(
                phone !== "--"
            ){


                callButton =


                `

                <button

                onclick="callContact('${phone}')"

                >

                📞 立即撥打

                </button>

                `;


            }







            card.innerHTML =


            `

            <h3>

            👤 ${getContactValue(contact.name)}

            </h3>


            <p>

            關係：

            ${getContactValue(contact.relation)}

            </p>


            <p>

            電話：

            ${phone}

            </p>


            ${callButton}


            `;



            list.appendChild(
                card
            );



        }

    );



}









// ===============================
// 撥打電話
// ===============================


function callContact(phone){



    if(
        !phone ||
        phone === "--"
    ){


        alert(
            "沒有電話資料"
        );


        return;


    }



    window.location.href =

    "tel:" + phone;



}








// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    console.log(
        "📞 emergency.js 啟動"
    );


});
