"use strict";

//======================================
// STATUS
//======================================

const STATUS = Object.freeze({

    SUCCESS : "success",

    DUPLICATE : "duplicate",

    ERROR : "error"

});

//========================
// EVENT
//========================

const EVENT={

    QR_SUCCESS:"qr-success",

    QR_ERROR:"qr-error",

    POPUP_SHOW:"popup-show",

    POPUP_CLOSE:"popup-close",

    API_SUCCESS:"api-success",

    API_ERROR:"api-error"

};

//========================
// LOAI DIEM DANH
//========================

const LOAI = Object.freeze({

    LE : "Dự lễ",

    GIAOLY : "Giáo lý"

});

console.log("constants.js loaded");
