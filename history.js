// ==========================================
// 愷威 Care V1.0
// history.js
// 功能：發作歷史紀錄管理
// ==========================================



// ===============================
// 初始化資料
// ===============================


if(
    typeof seizureRecords === "undefined"
){

    window.seizureRecords = [];

}







// ===============================
// 新增紀錄
// ===============================


function addSeizureRecord(record){



    seizureRecords.push(
        record
    );



    saveLocalRecords();



    renderHistory();



    updateLatestRecord();



    console.log(
        "新增發作紀錄",
        record
    );


}







// ===============================
// 儲存本機
// ===============================


function saveLocalRecords(){



    localStorage.setItem(

        "kw_seizure_records",

        JSON.stringify(
            seizureRecords
        )

    );


}







// ===============================
// 讀取本機
// ===============================


function loadLocalRecords(){



    const data =
    localStorage.getItem(
        "kw_seizure_records"
    );



    if(data){



        try{


            seizureRecords =
            JSON.parse(
                data
            );


        }
        catch(error){


            console.error(
                "讀取紀錄失敗",
                error
            );


            seizureRecords = [];


        }



    }



}







// ===============================
// 顯示歷史
// ===============================


function renderHistory(){



    const list =
    document.getElementById(
        "recordList"
    );



    if(!list){

        return;

    }




    if(
        seizureRecords.length === 0
    ){



        list.innerHTML =

        `

        <div class="record-card">

        尚無發作紀錄

        </div>

        `;


        return;


    }







    list.innerHTML = "";







    const records =

    [...seizureRecords]

    .reverse();







    records.forEach(

        function(record,index){



            const card =
            document.createElement(
                "div"
            );



            card.className =
            "record-card";



            card.innerHTML =



            `

            <h3>

            🚨 第 ${seizureRecords.length-index} 次發作

            </h3>


            <p>

            📅 日期：

            ${record.date}

            </p>


            <p>

            ⏰ 開始：

            ${record.startTime}

            </p>


            <p>

            ⏰ 結束：

            ${record.endTime}

            </p>


            <p>

            ⏱️ 持續：

            ${record.duration}

            秒

            </p>


            `;



            list.appendChild(
                card
            );



        }

    );



}







// ===============================
// 首頁最新紀錄
// ===============================


function updateLatestRecord(){



    const latest =
    document.getElementById(
        "latestRecord"
    );



    if(!latest){

        return;

    }





    if(
        seizureRecords.length === 0
    ){


        latest.textContent =
        "尚無紀錄";


        return;


    }






    const record =

    seizureRecords[
        seizureRecords.length - 1
    ];





    latest.innerHTML =


    `

    📅 ${record.date}

    <br>

    ⏱️ 持續：

    ${record.duration}

    秒


    `;


}







// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){



    loadLocalRecords();



    renderHistory();



    updateLatestRecord();



    console.log(
        "📋 history.js 啟動"
    );


});
