//======================================
// DEBUG MODULE - Giáo xứ Phú Hòa
//======================================
"use strict";

const Debug = (() => {
    // Trạng thái debug dựa trên config
    let enabled = Config.APP.DEBUG;

    /** Bật chế độ debug và hiển thị nút điều khiển */
    function enable() {
        enabled = true;
        Utils.show(Utils.id("debugButton"));
    }

    /** Tắt debug và ẩn toàn bộ panel */
    function disable() {
        enabled = false;
        Utils.hide(Utils.id("debugButton"));
        Utils.hide(Utils.id("debugPanel"));
    }

    /** Ghi log vào console và panel debug */
    function write(module, message) {
        if (!enabled) return;
        const text = `[${module}] ${message}`;
        console.log(text);
        append(text);
    }

    /** Thêm dòng log vào panel hiển thị trên giao diện */
    function append(text) {
        const panel = Utils.id("debugContent");
        if (!panel) return;
        const line = Utils.create("div");
        line.innerText = text;
        panel.appendChild(line);
        panel.scrollTop = panel.scrollHeight; // Cuộn xuống dưới cùng
    }

    /** Xóa sạch nội dung panel debug */
    function clear() {
        const panel = Utils.id("debugContent");
        if (panel) panel.innerHTML = "";
    }

    /** Ẩn/Hiện panel debug */
    function toggle() {
        const panel = Utils.id("debugPanel");
        if (panel) Utils.toggle(panel);
    }

    /** Khởi tạo sự kiện cho nút debug */
    function init() {
        if (!enabled) return;
        const button = Utils.id("debugButton");
        if (button) {
            Utils.show(button);
            button.addEventListener("click", toggle);
        }
    }

    return { init, enable, disable, write, clear, toggle };
})();

//======================================
// AUTO INIT
//======================================
window.addEventListener("load", Debug.init);
