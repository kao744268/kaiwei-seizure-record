// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean
// history.js
// 功能：發作歷史紀錄
// ==========================================


// ===============================
// 紀錄資料
// ===============================

let seizureRecords = [];




// ===============================
// 新增紀錄
// ===============================

function addSeizureRecord(record){


    seizureRecords.push(record);



    console.log(
        "新增發作紀錄:",
        record
    );



    renderHistory();


}





// ===============================
// 顯示歷史紀錄
// ===============================

function renderHistory(){


    const list =
    document.getElementById(
        "recordList"
    );



    if(!list){

        return;

    }



    if(seizureRecords.length === 0){


        list.innerHTML =
        "尚無發作紀錄";


        return;


    }



    list.innerHTML = "";



    seizureRecords.forEach(
    function(record,index){



        const item =
        document.createElement(
            "div"
        );



        item.className =
        "record-card";



        item.innerHTML = `

            <h3>
            第 ${index + 1} 次發作
            </h3>


            <p>
            開始：
            ${record.startTime}
            </p>


            <p>
            結束：
            ${record.endTime}
            </p>


            <p>
            持續：
            ${record.duration}
            秒
            </p>

        `;



        list.appendChild(item);



    });


}





// ===============================
// 初始化
// ===============================

document.addEventListener(
"DOMContentLoaded",
function(){


    renderHistory();



    console.log(
        "📋 history.js 啟動完成"
    );


});
