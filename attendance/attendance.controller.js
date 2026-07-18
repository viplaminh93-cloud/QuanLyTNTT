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
            
            // Thêm log để biết chắc chắn code chạy đến đây
            console.log("Đang bắt đầu camera...");
            await CameraController.start();
            console.log("Camera đã khởi động thành công.");
            
        } catch (e) {
            // Hiển thị rõ ràng loại lỗi và thông báo
            const errorMessage = `Lỗi hệ thống: ${e.name} - ${e.message}`;
            console.error("Lỗi khởi tạo điểm danh:", e);
            alert(errorMessage);
            
            // Tùy chọn: Tự động quay về trang chủ nếu lỗi camera để người dùng không bị kẹt
            backHome();
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
