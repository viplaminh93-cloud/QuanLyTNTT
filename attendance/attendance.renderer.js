"use strict";

const AttendanceRenderer = (() => {

    function showHome() {
        Renderer.show("homeBox"); // Giả định ID của container home là homeBox
        hideScanner();
    }

    function hideHome() {
        Renderer.hide("homeBox");
    }

    function showScanner(loai) {
        hideHome();
        Renderer.show("scannerBox");
        renderType(loai);
    }

    function hideScanner() {
        Renderer.hide("scannerBox");
    }

    function renderType(loai) {
        Renderer.text("typeTitle", "Điểm danh: " + loai);
    }

    function renderTodayCounter(total) {
        Renderer.text("todayCount", "Đã điểm danh hôm nay: " + total + " em");
    }

    return { showHome, hideHome, showScanner, hideScanner, renderType, renderTodayCounter };
})();
