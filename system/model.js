//======================================
// MODEL
//======================================

"use strict";



//======================================
// STUDENT
//======================================

function taoHocSinh(data){

    return {

        maso : data.maso ?? "",

        hoten : data.hoten ?? "",

        khoi : data.khoi ?? "",

        lop : data.lop ?? "",

        photo : data.photo ?? "",

        success : Boolean(data.success),

        duplicate : Boolean(data.duplicate),

        time : data.time ?? ""

    };

}



//======================================
// GETTERS
//======================================

function layMaSo(hocSinh){

    return hocSinh.maso;

}


function layHoTen(hocSinh){

    return hocSinh.hoten;

}


function layKhoi(hocSinh){

    return hocSinh.khoi;

}


function layLop(hocSinh){

    return hocSinh.lop;

}


function layAnh(hocSinh){

    return hocSinh.photo;

}
