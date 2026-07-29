// ==========================================
// 愷威癲癇紀錄系統
// V3.0 Clean Stable-1
// history.js
// 功能：歷史紀錄
// ==========================================




// ===============================
// 顯示紀錄
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

        "<p>尚無發作紀錄</p>";


        return;

    }




    list.innerHTML = "";





    seizureRecords.forEach(

        function(record,index){



            const card =
            document.createElement(
                "div"
            );



            card.className =
            "record-card";



            card.innerHTML = `


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



            list.appendChild(
                card
            );


        }


    );


}







// ===============================
// 新增紀錄
// ===============================

function addSeizureRecord(record){



    seizureRecords.push(
        record
    );



    renderHistory();



    console.log(
        "新增紀錄",
        record
    );



}






// ===============================
// 初始化
// ===============================

document.addEventListener(
"DOMContentLoaded",
function(){



    renderHistory();



    console.log(
        "📋 history.js Stable-1 啟動"
    );


});
