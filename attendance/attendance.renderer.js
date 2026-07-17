"use strict";

const AttendanceRenderer = (() => {

    function showHome() {
        Renderer.show(Utils.id("homeBox"));
        hideScanner();
    }

    function hideHome() {
        Renderer.hide(Utils.id("homeBox"));
    }

    function showScanner(loai) {
        hideHome();
        Renderer.show(Utils.id("scannerBox"));
        renderType(loai);
    }

    function hideScanner() {
        Renderer.hide(Utils.id("scannerBox"));
    }

    function renderType(loai) {
        Renderer.text("typeTitle", "Điểm danh: " + loai);
    }

    function renderTodayCounter(total) {
        Renderer.text("todayCount", "Đã điểm danh hôm nay: " + total + " em");
    }

    return { showHome, hideHome, showScanner, hideScanner, renderType, renderTodayCounter };
})();
