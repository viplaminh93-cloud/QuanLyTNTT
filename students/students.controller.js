//==================================================
// STUDENTS CONTROLLER
// Điều phối logic cho module Students
//==================================================

"use strict";

Auth.requireLogin();

window.addEventListener("load", initStudents);


/**
 * Khởi tạo dữ liệu: Dùng ReportService làm nguồn dữ liệu trung tâm
 */
async function initStudents() {
    const data = await ReportService.syncFromGoogle();
    const history = data.history || [];
    const students = data.students || [];

    const studentsWithStats = students.map(s => ({
        ...s,
        ...calculateStats(history, s.maso)
    }));
    
    StudentRenderer.renderList(studentsWithStats);
}

// Lắng nghe sự kiện người dùng nhập liệu
Utils.id("txtSearch").addEventListener("input", onSearch);

/**
 * Xử lý tìm kiếm
 */
function onSearch() {
    const keyword = Utils.id("txtSearch").value.trim().toLowerCase();
    const history = ReportService.getHistory();
    const filtered = StudentService.search(keyword);

    const displayList = filtered.map(s => ({
        ...s,
        ...calculateStats(history, s.maso)
    }));

    StudentRenderer.renderList(displayList);
}
// Sự kiện Modal
Utils.id("studentModal").addEventListener("click", e => {
    if (e.target.id === "studentModal") {
        StudentRenderer.closeModal();
    }
});


// Hàm hỗ trợ đếm
function calculateStats(history, studentMaso) {
    const stats = history.filter(h => h.maso == studentMaso);
    return {
        soBuoiLe: stats.filter(h => h.loai && h.loai.includes("Lễ")).length,
        soBuoiGiaoLy: stats.filter(h => h.loai && h.loai.includes("Giáo lý")).length
    };
}
