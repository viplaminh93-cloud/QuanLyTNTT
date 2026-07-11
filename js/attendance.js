//======================================
// ATTENDANCE
//======================================

"use strict";


//======================================
// CHỌN LOẠI ĐIỂM DANH
//======================================

function startApp(loai){

    loaiDiemDanh = loai;

    document
        .querySelector(".home")
        .style.display = "none";

    document
        .getElementById("scannerBox")
        .classList.remove("hidden");

    document
        .getElementById("typeTitle")
        .innerHTML =
        "Điểm danh: " + loai;

    capNhatTongTuServer(loai);

    dongBoQueue();

    startCamera();

}



//======================================
// LẤY TỔNG TỪ SERVER
//======================================

function capNhatTongTuServer(loai){

    fetch(

        API_URL +

        "?count=1&loai=" +

        encodeURIComponent(loai)

    )

    .then(res=>res.json())

    .then(data=>{

        tongHomNay =

            Number(data.count) || 0;

        capNhatTong();

    })

    .catch(err=>{

        console.log(err);

    });

}



//======================================
// CẬP NHẬT GIAO DIỆN
//======================================

function capNhatTong(){

    const box =

        document.getElementById("todayCount");

    if(!box){

        return;

    }

    box.innerHTML =

        "Đã điểm danh hôm nay: <b>"

        +

        tongHomNay

        +

        "</b> em";

}
