let loaiDiemDanh = "";
let scanner = null;
let dangXuLy = false;
let tongHomNay = 0;

const API_URL =
"https://script.google.com/macros/s/AKfycbwKw7ClT18whwE-V4V-Uw6CrKkpaQsx7xZGDrq5psSWdZgNQtTqiHSGuowjfpTXTCBXkw/exec";


//======================
// Chọn loại điểm danh
//======================

function startApp(loai){

    loaiDiemDanh = loai;

    document.querySelector(".home").style.display = "none";

    document.getElementById("scannerBox")
        .classList.remove("hidden");

    document.getElementById("typeTitle")
        .innerText = "Điểm danh: " + loai;

    capNhatTongTuServer(loai);

    startCamera();

}



//======================
// Lấy tổng điểm danh
//======================

function capNhatTongTuServer(loai){

    fetch(
        API_URL +
        "?count=1&loai=" +
        encodeURIComponent(loai)
    )

    .then(res => res.json())

    .then(data => {

        tongHomNay = Number(data.count) || 0;

        capNhatTong();

    })

    .catch(err => {

        console.log(err);

        tongHomNay = 0;

        capNhatTong();

    });

}



//======================
// Camera
//======================

async function startCamera(){

    if(scanner){

        try{

            await scanner.stop();

            scanner.clear();

        }catch(e){}

    }

    scanner = new Html5Qrcode("reader");

    try{

        await scanner.start(

            { facingMode:"environment" },

            {

                fps:10,

                qrbox:{
                    width:220,
                    height:220
                },

                rememberLastUsedCamera:true,

                disableFlip:true

            },

            qrSuccess

        );

    }catch(err){

        alert("Không mở được camera\n\n" + err);

    }

}



//======================
// Quét thành công
//======================

function qrSuccess(text){

    if(dangXuLy) return;

    dangXuLy = true;

    if(scanner){

        scanner.pause(true);

    }

    if(navigator.vibrate){

        navigator.vibrate(50);

    }

    guiDiemDanh(text);

}



//======================
// Gửi Apps Script
//======================

function guiDiemDanh(maso){

    maso = maso.trim().toUpperCase();

    fetch(API_URL,{

        method:"POST",

        redirect:"follow",

        headers:{
            "Content-Type":"text/plain;charset=utf-8"
        },

        body:JSON.stringify({

            maso:maso,

            loai:loaiDiemDanh,

            requestId:
                Date.now()
                + "_"
                + Math.random()

        })

    })

    .then(res=>res.json())

    .then(data=>{

        console.log(data);

        hienThi(data);

    })

    .catch(err=>{

        console.error(err);

        hienThi({

            success:false,

            message:"Không kết nối được máy chủ"

        });

    });

}



//======================
// Popup
//======================

function hienThi(data){

    const overlay =
        document.getElementById("overlay");

    overlay.classList.remove(
        "hidden",
        "success",
        "warning",
        "error"
    );

    const icon =
        document.getElementById("overlayIcon");

    const title =
        document.getElementById("overlayTitle");

    const photo =
        document.getElementById("overlayPhoto");

    const name =
        document.getElementById("overlayName");

    const code =
        document.getElementById("overlayCode");

    const lop =
        document.getElementById("overlayClass");

    const time =
        document.getElementById("overlayTime");



    if(data.success){

        tongHomNay++;

        capNhatTong();

        overlay.classList.add("success");

        icon.innerHTML = "✅";

        title.innerHTML = "ĐIỂM DANH THÀNH CÔNG";

    }

    else if(data.duplicate){

        overlay.classList.add("warning");

        icon.innerHTML = "⚠️";

        title.innerHTML = "ĐÃ ĐIỂM DANH";

    }

    else{

        overlay.classList.add("error");

        icon.innerHTML = "❌";

        title.innerHTML = "KHÔNG TÌM THẤY";

    }



    if(data.student){

        name.innerHTML = data.student.hoten;

        lop.innerHTML =
            data.student.malop
            ? "Lớp: " + data.student.malop
            : "";

        code.innerHTML =
            "Mã số: " + data.student.maso;

        if(data.duplicate && data.gio){

            time.innerHTML =
                "🕒 Đã điểm danh lúc: "
                + data.gio;

        }else{

            time.innerHTML = "";

        }

        if(data.student.hinh){

            photo.src = data.student.hinh;

            photo.style.display = "block";

        }else{

            photo.style.display = "none";

        }

    }else{

        name.innerHTML = "";

        lop.innerHTML = "";

        code.innerHTML =
            data.message || "";

        time.innerHTML = "";

        photo.style.display = "none";

    }



    setTimeout(()=>{

        overlay.classList.remove("hidden");

    },10);

}



//======================
// Chạm popup để quét tiếp
//======================

window.onload = function(){

    document
        .getElementById("overlay")
        .addEventListener("click",async function(){

            this.classList.add("hidden");

            dangXuLy = false;

            if(scanner){

                try{

                    await scanner.resume();

                }catch(e){}

            }

        });

};



//======================
// Quay lại
//======================

async function backHome(){

    try{

        if(scanner){

            await scanner.stop();

            scanner.clear();

            scanner = null;

        }

    }catch(e){}

    dangXuLy = false;

    document.querySelector(".home")
        .style.display = "block";

    document.getElementById("scannerBox")
        .classList.add("hidden");

}



//======================
// Cập nhật bộ đếm
//======================

function capNhatTong(){

    document.getElementById("todayCount").innerHTML =
        "Đã điểm danh hôm nay: <b>"
        + tongHomNay
        + "</b> em";

}

console.log("APP JS OK");
