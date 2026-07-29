// ==========================================
// 愷威 Care V2.0 守護版
// data.js
// Central Data Management
// ==========================================



const CARE_KEYS = {


    medical:
    "care_medical_info",



    seizures:
    "care_seizure_records",



    settings:
    "care_settings",



    contacts:
    "care_emergency_contacts"



};









// ===============================
// 讀取資料
// ===============================


function loadData(key){



    const data =

    localStorage.getItem(
        key
    );



    if(data){


        return JSON.parse(
            data
        );


    }



    return null;


}









// ===============================
// 儲存資料
// ===============================


function saveData(key,data){



    localStorage.setItem(

        key,

        JSON.stringify(
            data
        )

    );


}









// ===============================
// 發作紀錄
// ===============================


function getSeizureData(){



    return (

        loadData(
            CARE_KEYS.seizures
        )

        ||

        []

    );



}






function saveSeizureData(records){



    saveData(

        CARE_KEYS.seizures,

        records

    );


}









// ===============================
// 醫療資料
// ===============================


function getMedicalData(){



    return (

        loadData(
            CARE_KEYS.medical
        )

        ||

        {}

    );


}




function saveMedicalData(data){



    saveData(

        CARE_KEYS.medical,

        data

    );


}









// ===============================
// 緊急聯絡
// ===============================


function getEmergencyContacts(){



    let contacts =

    loadData(
        CARE_KEYS.contacts
    );



    if(contacts){


        return contacts;


    }





    return [


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



}









function saveEmergencyContacts(data){



    saveData(

        CARE_KEYS.contacts,

        data

    );


}









// ===============================
// APP設定
// ===============================


function getAppSettings(){



    return (

        loadData(
            CARE_KEYS.settings
        )

        ||

        {

            parentMode:false,

            pin:"1234"

        }

    );


}






function saveAppSettings(data){



    saveData(

        CARE_KEYS.settings,

        data

    );


}









// ===============================
// 完整備份
// ===============================


function getFullBackup(){



    return {



        version:
        "Care V2.0",



        exportTime:
        new Date()
        .toISOString(),



        medical:
        getMedicalData(),



        seizures:
        getSeizureData(),



        contacts:
        getEmergencyContacts(),



        settings:
        getAppSettings()



    };



}









// ===============================
// 還原備份
// ===============================


function restoreBackup(data){



    if(
        !data
    ){

        return false;

    }





    if(data.medical){


        saveMedicalData(
            data.medical
        );


    }





    if(data.seizures){


        saveSeizureData(
            data.seizures
        );


    }





    if(data.contacts){


        saveEmergencyContacts(
            data.contacts
        );


    }





    if(data.settings){


        saveAppSettings(
            data.settings
        );


    }





    return true;


}









// ===============================
// 初始化
// ===============================


document.addEventListener(

"DOMContentLoaded",

function(){


    console.log(
        "📦 data.js 資料核心初始化完成"
    );


}

);
