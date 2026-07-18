"use strict";

/**
 * LOGIN RENDERER
 * Quản lý cập nhật giao diện màn hình đăng nhập.
 */
const LoginRenderer = (() => {

    // Hiển thị thông báo lỗi
    const showError = (message) => alert(message);

    // Bật/tắt trạng thái loading cho nút đăng nhập
    const setLoading = (loading) => {
        const btn = Utils.id("btnLogin");
        if (!btn) return;

        btn.disabled = loading;
        btn.innerText = loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP";
    };

    return { showError, setLoading };
})();
