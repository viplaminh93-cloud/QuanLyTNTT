//======================================
// REPORT CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const ReportController = (()=>{

    //----------------------------------
    // LOAD
    //----------------------------------

    async function load(){

        try{

            Renderer.text("reportDate", Utils.formatDate());
console.log("lỗi 1");
            const data = await ReportService.load();
console.log("lỗi 2");
            if(!data || data.success===false){
                alert (data?.message || "Không tải được báo cáo.");
                return;
            }
console.log("lỗi 3");
            ReportRenderer.renderSummary(data);
console.log("lỗi 4");
            ReportRenderer.renderList(data.list || []);
        }

        catch(error){
            console.log(error);
            alert ("Lỗi tải báo cáo.");
        }

    }

    //----------------------------------
    // REFRESH
    //----------------------------------

    async function refresh() {await load();}

    //----------------------------------

    return{load, refresh};

})();


// Biến trạng thái
let isLookingUp = false;

// Hàm bắt đầu chế độ tra cứu
function startLookup() {
    isLookingUp = true;
    // Gọi hàm mở camera của bạn (ví dụ: CameraService.start())
    // Giả sử sau khi quét xong, nó gọi hàm onScanResult(maso)
    alert("Hãy quét mã học sinh...");
}

// Hàm xử lý sau khi quét mã
async function onScanResult(maso) {
    if (isLookingUp) {
        // Gọi API chúng ta vừa tạo
        const res = await Auth.post({ action: "studentHistory", maso: maso });
        if (res.success && res.list.length > 0) {
            renderHistory(res.list);
        } else {
            alert("Không tìm thấy dữ liệu hoặc mã không hợp lệ.");
        }
        isLookingUp = false; // Tắt chế độ tra cứu
    } else {
        // Điểm danh bình thường
        AttendanceService.send(maso);
    }
}

// Hàm hiển thị lên màn hình
function renderHistory(list) {
    const container = document.getElementById("historyList");
    container.innerHTML = list.map(item => `
        <div class="report-row">
            <div>
                <strong>${item.ngay}</strong><br>
                <small>${item.loai} - ${item.lop}</small>
            </div>
        </div>
    `).join("");
    document.getElementById("resultArea").classList.remove("hidden");
}

function closeResult() {
    document.getElementById("resultArea").classList.add("hidden");
}
