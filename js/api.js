//======================================
// API
// Giáo xứ Phú Hòa
//======================================

"use strict";


//======================================
// TẠO REQUEST
//======================================

function taoRequest(maso){

    return{

        maso: maso.trim().toUpperCase(),

        loai: App.loaiDiemDanh,

        requestId:
            Date.now()
            + "_"
            + Math.random(),

        time: Date.now()

    };

}



//======================================
// NHẬN QR TỪ CAMERA
//======================================

window.onQRCode = function(maso){

    const request = taoRequest(maso);

    console.log(request);

};

//======================================
// GỬI REQUEST
//======================================



//======================================
// XỬ LÝ RESPONSE
//======================================



//======================================
// XỬ LÝ LỖI
//======================================



console.log("api.js loaded");
