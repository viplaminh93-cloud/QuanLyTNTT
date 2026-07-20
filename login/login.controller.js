//======================================
// LOGIN CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * KHỞI TẠO
 * ======================================
 */
window.addEventListener("load", () => {
    initLogin();
    
    // TỰ ĐỘNG ĐĂNG KÝ SERVICE WORKER TẠI ĐÂY
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/QuanLyTNTT/service-worker.js')
        .then(reg => {
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.onstatechange = () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        if (confirm("Đã có bản cập nhật mới! Tải lại trang ngay?")) {
                            window.location.reload();
                        }
                    }
                };
            });
        });
    }
});


/**
 * ======================================
 * GẮN SỰ KIỆN
 * ======================================
 */

function initLogin(){

    const button = Utils.id("btnLogin");

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        handleLogin

    );

}


/**
 * ======================================
 * XỬ LÝ ĐĂNG NHẬP
 * ======================================
 */

async function handleLogin() {
    const email = LoginService.getLoginEmail();
    if (email === "") {
        LoginRenderer.showError("Nhập Email.");
        return;
    }

    LoginRenderer.setLoading(true);
    try {
        const result = await LoginService.login(email);
        
        // CHẶN NGAY: Nếu success là false, không được chạy tiếp
        if (!result.success) {
            LoginRenderer.showError(result.message);
            return;
        }


        await Auth.login(result.token, { 
            email: result.email,
            name: result.name,
            role: result.role || "Người dùng" 
        });

        location.href = "../dashboard/dashboard.html";
    } catch (err) {
        console.error(err);
        LoginRenderer.showError("Đang kết nối lại...");
            setTimeout(() => {
            }, 1000);
    } finally {
        LoginRenderer.setLoading(false);
    }
}
