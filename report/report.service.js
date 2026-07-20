//======================================
// REPORT SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportService = (() => {
    //----------------------------------
    // BIẾN NỘI BỘ
    //----------------------------------
    const STORAGE_KEY = 'attendance_history';

    //----------------------------------
    // API CŨ (Giữ lại để tương thích với các trang cũ)
    //----------------------------------
    async function load() {
        try {
            const response = await Auth.post({ action: "report" });
            return response;
        } catch (error) {
            console.error("Lỗi khi gọi ReportService:", error);
            return { success: false, message: "Không thể kết nối đến máy chủ." };
        }
    },

    //----------------------------------
    // API MỚI (Lịch sử điểm danh toàn cục)
    //----------------------------------
    
    /**
     * Đồng bộ dữ liệu từ Google Sheets về localStorage
     */
    async syncFromGoogle() {
        return new Promise((resolve) => {
            // Kiểm tra môi trường (tránh lỗi khi test ở máy tính)
            if (typeof google === 'undefined' || !google.script) {
                console.warn("Đang dùng dữ liệu offline.");
                resolve(JSON.parse(localStorage.getItem("APP_DATA") || "{}"));
                return;
            }

            google.script.run
                .withSuccessHandler(data => {
                    // data ở đây là object {students: [...], history: [...]}
                    localStorage.setItem("APP_DATA", JSON.stringify(data));
                    resolve(data);
                })
                .withFailureHandler(err => {
                    console.error("Lỗi đồng bộ:", err);
                    resolve({});
                })
                .getAppData();
        });
    },

    getHistory() {
        const data = JSON.parse(localStorage.getItem("APP_DATA") || "{}");
        return data.history || [];
    },

    /**
     * Xóa dữ liệu cũ (nếu cần Reset)
     */
    clearData() {
        localStorage.removeItem(STORAGE_KEY);
    }

    //----------------------------------
    // TRẢ VỀ PUBLIC API
    //----------------------------------
    return { 
        load, 
        syncFromGoogle, 
        getHistory, 
        clearData 
    };
})();
