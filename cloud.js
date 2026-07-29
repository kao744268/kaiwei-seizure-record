// ==========================================
// 愷威 Care V1.0
// cloud.js
// ==========================================



const CARE_API_URL =

"https://https://script.google.com/macros/s/AKfycbySMK9kjhbp_dn98fIwiZsoDkoIlnnuMxER9mzvZoxmwAFosuHT8PNhxZNYa8gi_oLLDg/exec";








async function cloudSync(type,data){



if(
!CARE_API_URL ||
CARE_API_URL.includes("你的exec")
){


console.warn(
"尚未設定API"
);


return false;


}






try{



const response =

await fetch(

CARE_API_URL,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:

JSON.stringify({

type:type,

data:data

})


}

);






const result =
await response.json();



console.log(
"同步成功",
result
);



return true;



}

catch(error){



console.error(
"同步失敗",
error
);


return false;


}



}









function syncSeizure(record){



return cloudSync(

"seizure",

record

);


}








function syncMedical(){


return cloudSync(

"medical",

window.medicalData || {}

);


}








function syncEmergency(){



return cloudSync(

"emergency",

window.emergencyContacts || []

);


}








async function syncAll(){



const a =
await syncMedical();



const b =
await syncEmergency();



const c =
await cloudSync(

"seizure",

window.seizureRecords || []

);




return (
a ||
b ||
c
);



}








console.log(
"☁️ cloud.js ready"
);
