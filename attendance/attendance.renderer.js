/**
 * ======================================
 * ATTENDANCE RENDERER
 * Giáo xứ Phú Hòa
 * Quản lý cập nhật giao diện
 * ======================================
 */
"use strict";

const AttendanceRenderer = (() => {

    /** Chuyển sang màn hình quét */
    function showScanner(loai) {
        Utils.id("homeBox").classList.add("hidden");
        Utils.id("scannerBox").classList.remove("hidden");
        
        // Cập nhật tiêu đề theo loại điểm danh (Lễ hoặc Giáo lý)
        Utils.id("typeTitle").innerText = (loai === LOAI.LE) ? "ĐIỂM DANH DỰ LỄ" : "ĐIỂM DANH GIÁO LÝ";
    }

    /** Quay về màn hình chính */
    function showHome() {
        Utils.id("scannerBox").classList.add("hidden");
        Utils.id("homeBox").classList.remove("hidden");
    }

    /** Cập nhật bộ đếm số em đã điểm danh */
    function renderTodayCounter(total) {
        const element = Utils.id("todayCount");
        if (element) {
            element.innerText = `Đã điểm danh hôm nay: ${total} em`;
        }
    }

    return {
        showScanner,
        showHome,
        renderTodayCounter
    };
})();
