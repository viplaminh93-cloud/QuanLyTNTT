/**
 * ======================================
 * ATTENDANCE CONTROLLER
 * Giáo xứ Phú Hòa
 * ======================================
 */
"use strict";

const AttendanceController = (() => {
    let processing = false;

    /** Khởi tạo phiên điểm danh */
    async function start(loai) {
        try {
            processing = false;
            AttendanceService.setCurrentType(loai);
            
            AttendanceRenderer.showScanner(loai);
            
            const total = await AttendanceService.getTodayCounter();
            AttendanceRenderer.renderTodayCounter(total);
            
            await CameraController.start();
        } catch (e) {
            console.error("Lỗi khởi tạo điểm danh:", e);
            alert(e.message);
        }
    }

    /** Xử lý kết quả quét mã QR */
    async function onQRCode(qrText) {
        if (processing) return;
        
        processing = true;
        try {
            const result = await AttendanceService.sendAttendance(qrText);

            // Cập nhật bộ đếm nếu điểm danh thành công
            if (result.success) {
                const total = await AttendanceService.getTodayCounter();
                AttendanceRenderer.renderTodayCounter(total);
            }

            // Hiển thị thông tin lên Popup
            PopupService.show(result);
        } catch (error) {
            console.error("Lỗi xử lý QR:", error);
            processing = false;
            await CameraController.resume();
        }
    }

    /** Đóng popup và cho phép tiếp tục quét */
    async function closePopup() {
        processing = false;
        await PopupService.close();
    }

    /** Quay về màn hình chính */
    async function backHome() {
        processing = false;
        AttendanceService.reset();
        await CameraController.stop();
        AttendanceRenderer.showHome();
    }

    return {
        start,
        onQRCode,
        closePopup,
        backHome
    };
})();
