//======================================
// POPUP RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const PopupRenderer = (()=>{

    //----------------------------------
    // RESET
    //----------------------------------

    function reset(){

        const overlay = Utils.id("overlay");

        if(!overlay){

            return;

        }

        overlay.className = "hidden";

    }

    //----------------------------------
    // TITLE
    //----------------------------------

    function renderTitle(data){

        const obj = Utils.id("overlayTitle");

        if(!obj){

            return;

        }

        if(data.success){

            obj.innerText =

                "✅ ĐIỂM DANH THÀNH CÔNG";

            return;

        }

        if(data.offline){

            obj.innerText =

                "📴 ĐÃ LƯU OFFLINE";

            return;

        }

        if(data.duplicate){

            obj.innerText =

                "⚠️ ĐÃ ĐIỂM DANH";

            return;

        }

        obj.innerText =

            "❌ KHÔNG TÌM THẤY";

    }

    //----------------------------------
    // NAME
    //----------------------------------

    function renderStudentName(data){

        Utils.id("overlayName").innerText =

            data.hoten ||

            data.name ||

            "";

    }

    //----------------------------------
    // KHỐI
    //----------------------------------

    function renderStudentKhoi(data){

        const khoi =

            data.khoi ||

            "";

        Utils.id("overlayKhoi").innerText =

            khoi;

        if(

            khoi &&

            Config.KHOI[khoi]

        ){

            Utils.id("overlay")

                .classList

                .add(

                    Config.KHOI[khoi].css

                );

        }

    }

    //----------------------------------
    // LỚP
    //----------------------------------

    function renderStudentClass(data){

        Utils.id("overlayClass").innerText =

            data.lop ||

            "";

    }

    //----------------------------------
    // MÃ SỐ
    //----------------------------------

    function renderStudentCode(data){

        Utils.id("overlayCode").innerText =

            data.maso ||

            "";

    }

    //----------------------------------
    // ẢNH
    //----------------------------------

    function renderStudentPhoto(data){

        const img =

            Utils.id("overlayPhoto");

        if(!img){

            return;

        }

        img.src =

            data.photo ||

            data.hinhanh ||

            "../icons/avatar.png";

    }

    //----------------------------------
    // STUDENT
    //----------------------------------

    function renderStudent(data){

        renderStudentName(data);

        renderStudentKhoi(data);

        renderStudentClass(data);

        renderStudentCode(data);

        renderStudentPhoto(data);

    }

    //----------------------------------
    // HINT
    //----------------------------------

    function renderHint(){

        Utils.id("overlayHint").innerText =

            Config.POPUP.HINT;

    }

    //----------------------------------
    // SHOW
    //----------------------------------

    function show(){

        Utils.id("overlay")

            .classList

            .remove("hidden");

    }

    //----------------------------------
    // HIDE
    //----------------------------------

    function hide(){

        Utils.id("overlay")

            .classList

            .add("hidden");

    }

    //----------------------------------

    return{

        reset,

        renderTitle,

        renderStudent,

        renderHint,

        show,

        hide

    };

})();
