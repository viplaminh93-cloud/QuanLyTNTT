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

window.addEventListener(

    "load",

    initLogin

);


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

async function handleLogin(){

    //----------------------------------
    // Lấy email
    //----------------------------------

    const email = LoginService.getLoginEmail();

    //----------------------------------
    // Kiểm tra
    //----------------------------------

    if(email === ""){

        LoginRenderer.showError(

            "Nhập Email."

        );

        return;

    }

    //----------------------------------
    // Disable nút
    //----------------------------------

    LoginRenderer.setLoading(true);

    //----------------------------------
    // Gửi Server
    //----------------------------------

    try{

        const result = await LoginService.login(email);

        //----------------------------------
        // Không thành công
        //----------------------------------

        if(!result.success){

            LoginRenderer.showError(

                result.message

            );

            return;

        }

        //----------------------------------
        // Lưu Token
        //----------------------------------

        await Auth.login(

            result.token

        );

        //----------------------------------
        // Chuyển Dashboard
        //----------------------------------

        location.href =

            "../dashboard/dashboard.html";

    }

    catch(err){

        console.error(err);

        LoginRenderer.showError(

            "Không kết nối được máy chủ."

        );

    }

    finally{

        LoginRenderer.setLoading(false);

    }

}
