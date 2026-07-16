//======================================
// LOGIN CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * LOGIN CONTROLLER
 * Điều khiển toàn bộ màn hình Login
 * ======================================
 */

window.addEventListener(

    "load",

    initLogin

);

/**
 * ======================================
 * Khởi tạo
 * ======================================
 */

function initLogin(){

    bindEvents();

}

/**
 * ======================================
 * Gán sự kiện
 * ======================================
 */

function bindEvents(){

    id("btnLogin")

        .addEventListener(

            "click",

            onLogin

        );

}

/**
 * ======================================
 * Nhấn nút Login
 * ======================================
 */

async function onLogin(){

    const email =

        id("txtEmail")

            .value

            .trim()

            .toLowerCase();

    //----------------------------------
    // Kiểm tra dữ liệu
    //----------------------------------

    if(email === ""){

        alert(

            "Nhập Email."

        );

        return;

    }

    //----------------------------------
    // Gửi Server
    //----------------------------------

    const result =

        await LoginService.login(email);

    //----------------------------------
    // Sai
    //----------------------------------

    if(!result.success){

        alert(

            result.message

        );

        return;

    }

    //----------------------------------
    // Lưu Token
    //----------------------------------

    await LoginService.saveToken(

        result.token

    );

    //----------------------------------
    // Chuyển Dashboard
    //----------------------------------

    location.href =

        "../dashboard/dashboard.html";

}
