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

console.log("model.js loaded");
