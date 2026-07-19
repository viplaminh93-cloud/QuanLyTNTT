"use strict";

/**
 * OFFLINE SERVICE
 * Quản lý hàng đợi gửi dữ liệu khi mất kết nối.
 */
const OfflineService = (() => {
    const STORAGE_KEY = "attendance_offline_queue";

    // --- Core Methods ---
    const load = () => {
        try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
        catch (e) { console.error(e); return []; }
    };

    const save = (queue) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
        renderQueueBadge();
    };

    const push = (req) => { const q = load(); q.push(req); save(q); };
    const pop = () => { const q = load(); if (q.length) { q.shift(); save(q); } };
    const peek = () => load()[0] || null;
    const clear = () => save([]);
    const length = () => load().length;
    const hasQueue = () => length() > 0;

    // --- Sync Logic ---
/*    async function sync() {
        if (!navigator.onLine || !hasQueue()) return;

        while (hasQueue()) {
            const req = peek();
            try {
                const res = await AttendanceAPI.resend(req);
                if (res.success) pop(); else break;
            } catch (e) { console.error(e); break; }
        }
    }*/

    async function sync() {
        if (!navigator.onLine || !hasQueue()) return;
    
        while (hasQueue()) {
            const req = peek();
            
            // --- QUAN TRỌNG: CẬP NHẬT LẠI TOKEN MỚI NHẤT ---
            // Lấy token đang có hiện tại trong Auth (trình duyệt của bạn)
            const currentToken = Auth.getToken();
            
            if (currentToken) {
                req.token = currentToken; // Ghi đè token mới vào request cũ
            } else {
                console.error("Không có Token đăng nhập, dừng đồng bộ!");
                break; // Dừng lại nếu chưa đăng nhập
            }
            // ------------------------------------------------
    
            try {
                const res = await AttendanceAPI.resend(req);
                if (res.success) {
                    pop(); // Chỉ xóa khỏi hàng đợi khi thành công
                } else {
                    console.warn("Server từ chối request này:", res.message);
                    // Nếu lỗi do Token (ví dụ 401), thì phải dừng sync để không bị lặp vô tận
                    break; 
                }
            } catch (e) { 
                console.error("Lỗi mạng:", e); 
                break; 
            }
        }
    }

    // --- UI Helpers ---
    function renderQueueBadge() {
        const badge = Utils.id("queueBadge");
        const count = Utils.id("queueCount");
        if (!badge || !count) return;

        const total = length();
        count.innerText = total;
        total > 0 ? badge.classList.remove("hidden") : badge.classList.add("hidden");
    }

    // Lắng nghe sự kiện kết nối mạng trở lại
    window.addEventListener("online", sync);

    return { load, save, push, peek, pop, clear, length, hasQueue, sync, renderQueueBadge };
})();
