//======================================
// POPUP
//======================================

"use strict";


//======================================
// HIỂN THỊ POPUP
//======================================

function hienThi(data){

    resetPopup();

    renderTitle(data);

    showPopup();

}


//======================================
// RESET POPUP
//======================================

function resetPopup(){

    const overlay = id("overlay");

    if(!overlay){

        return;

    }

    // Ẩn popup
    overlay.classList.add("hidden");

    // Xóa toàn bộ class màu
    Object.values(CONFIG.KHOI)
    
        .forEach(khoi=>{
    
            overlay.classList.remove(khoi.css);
    
        });

    );

}




//======================================
// HIỂN THỊ TIÊU ĐỀ
//======================================

function renderTitle(data){

    const title = id("popupTitle");

    if(!title){

        return;

    }

    if(data.success){

        title.innerText = "✅ ĐIỂM DANH THÀNH CÔNG";

        return;

    }

    if(data.duplicate){

        title.innerText = "⚠️ ĐÃ ĐIỂM DANH";

        return;

    }

    title.innerText = "❌ KHÔNG TÌM THẤY";

}





//======================================
// HIỆN POPUP
//======================================

function showPopup(){

    const overlay = id("overlay");

    if(!overlay){

        return;

    }

    overlay.classList.remove("hidden");

}


console.log("popup.js loaded");
