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
            console.error(e);
            alert(e.message);
        }
    }

    /** Xử lý dữ liệu sau khi quét QR thành công */
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

            // Hiển thị kết quả lên Popup
            PopupService.show(result);
        } catch (error) {
            console.error(error);
            processing = false;
            await CameraController.resume();
        }
    }

    /** Đóng popup thông báo */
    async function closePopup() {
        processing = false;
        await PopupService.close();
    }

    /** Quay lại màn hình chính */
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
