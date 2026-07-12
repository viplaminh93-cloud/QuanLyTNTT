//======================================
// STUDENT MODEL
//======================================

function taoHocSinh(data){

    return {

        maso : data.maso ?? "",

        hoten : data.hoten ?? "",

        khoi : data.khoi ?? "",

        lop : data.lop ?? "",

        photo : data.photo ?? "",

        success : !!data.success,

        duplicate : !!data.duplicate,

        time : data.time ?? ""

    };

}



//======================================
// GETTERS
//======================================

function layHoTen(hocSinh){

    return hocSinh.hoten;

}

function layLop(hocSinh){

    return hocSinh.lop;

}

function layKhoi(hocSinh){

    return hocSinh.khoi;

}

function layMaSo(hocSinh){

    return hocSinh.maso;

}

function layAnh(hocSinh){

    return hocSinh.photo;

}

console.log("model.js loaded");
