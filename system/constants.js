//======================================
// CONSTANTS
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * CONSTANTS MODULE
 *
 * Chứa toàn bộ hằng số của hệ thống.
 *
 * Bao gồm:
 * - Module Name
 * - Loại điểm danh
 * - Message
 *
 * Không chứa Config.
 * Không chứa Business.
 * ======================================
 */

//======================================
// MODULE
//======================================

const MODULE = Object.freeze({

    APP         : "APP",

    API         : "API",

    ATTENDANCE  : "ATTENDANCE",

    CAMERA      : "CAMERA",

    POPUP       : "POPUP",

    OFFLINE     : "OFFLINE",

    MODEL       : "MODEL",

    RENDERER    : "RENDERER",

    DEBUG       : "DEBUG",

    AUTH        : "AUTH",

    STUDENTS    : "STUDENTS",

    DASHBOARD   : "DASHBOARD",

    LOGIN       : "LOGIN"

});

//======================================
// LOẠI ĐIỂM DANH
//======================================

const LOAI = Object.freeze({

    LE :

        "DỰ LỄ",

    GIAOLY :

        "GIÁO LÝ"

});

//======================================
// MESSAGE
//======================================

const MESSAGE = Object.freeze({

    NETWORK_ERROR :

        "Không kết nối được máy chủ.",

    OFFLINE_SAVED :

        "Đã lưu, sẽ đồng bộ khi có mạng.",

    LOGIN_EXPIRED :

        "Phiên đăng nhập đã hết hạn.",

    LOGIN_REQUIRED :

        "Vui lòng đăng nhập.",

    STUDENT_NOT_FOUND :

        "Không tìm thấy thiếu nhi."

});

//======================================
// STATUS
//======================================

const STATUS = Object.freeze({

    SUCCESS :

        "SUCCESS",

    WARNING :

        "WARNING",

    ERROR :

        "ERROR",

    OFFLINE :

        "OFFLINE"

});
