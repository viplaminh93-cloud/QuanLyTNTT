"use strict";

/**
 * CONSTANTS MODULE
 * Định nghĩa các hằng số toàn cục cho hệ thống (Module, Loại, Message, Status).
 */

// Các module trong hệ thống
const MODULE = Object.freeze({
    APP: "APP", API: "API", ATTENDANCE: "ATTENDANCE", CAMERA: "CAMERA",
    POPUP: "POPUP", OFFLINE: "OFFLINE", MODEL: "MODEL", RENDERER: "RENDERER",
    DEBUG: "DEBUG", AUTH: "AUTH", STUDENTS: "STUDENTS", DASHBOARD: "DASHBOARD", LOGIN: "LOGIN"
});

// Loại điểm danh
const LOAI = Object.freeze({
    LE: "DỰ LỄ",
    GIAOLY: "GIÁO LÝ"
});

// Thông báo hệ thống
const MESSAGE = Object.freeze({
    NETWORK_ERROR: "Không kết nối được máy chủ.",
    OFFLINE_SAVED: "Đã lưu, sẽ đồng bộ khi có mạng.",
    LOGIN_EXPIRED: "Phiên đăng nhập đã hết hạn.",
    LOGIN_REQUIRED: "Vui lòng đăng nhập.",
    STUDENT_NOT_FOUND: "Không tìm thấy thiếu nhi."
});

// Trạng thái xử lý
const STATUS = Object.freeze({
    SUCCESS: "SUCCESS",
    WARNING: "WARNING",
    ERROR: "ERROR",
    OFFLINE: "OFFLINE"
});
