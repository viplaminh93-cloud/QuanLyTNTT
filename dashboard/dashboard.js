"use strict";

Auth.requireLogin();

window.addEventListener(

"load",

loadDashboard

);

async function loadDashboard(){

try{

const data=await Auth.post({

action:"profile"

});

if(!data.success){

alert(data.message);

Auth.logout();

return;

}

id("txtEmail").innerText=data.email;

id("txtRole").innerText=data.role;

}

catch(err){

console.error(err);

alert("Không kết nối được máy chủ.");

}

}

id("btnAttendance").onclick=()=>{

location.href="../attendance/attendance.html";

};

id("btnStudents").onclick=()=>{

location.href="../students/students.html";

};

id("btnReports").onclick=()=>{

location.href="../reports/report.html";

};

id("btnLogout").onclick=()=>{

Auth.logout();

};
