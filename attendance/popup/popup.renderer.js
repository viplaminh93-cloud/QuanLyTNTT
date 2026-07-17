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

        let title = "❌ KHÔNG TÌM THẤY";

        if(data.success){

            title = "✅ ĐIỂM DANH THÀNH CÔNG";

        }

        else if(data.offline){

            title = "📴 ĐÃ LƯU OFFLINE";

        }

        else if(data.duplicate){

            title = "⚠️ ĐÃ ĐIỂM DANH";

        }

        Renderer.text(

            "overlayTitle",

            title

        );

    }

    //----------------------------------
    // PHOTO
    //----------------------------------

    function renderPhoto(data){

        Renderer.image(

            "overlayPhoto",

            data.photo ||

            "../icons/avatar.png"

        );

    }

    //----------------------------------
    // NAME
    //----------------------------------

    function renderName(data){

        Renderer.text(

            "overlayName",

            data.hoten || ""

        );

    }

    //----------------------------------
    // KHỐI
    //----------------------------------

    function renderKhoi(data){

        Renderer.text(

            "overlayKhoi",

            data.khoi || ""

        );

    }

    //----------------------------------
    // CLASS
    //----------------------------------

    function renderClass(data){

        Renderer.text(

            "overlayClass",

            data.lop || ""

        );

    }

    //----------------------------------
    // CODE
    //----------------------------------

    function renderCode(data){

        Renderer.text(

            "overlayCode",

            data.maso || ""

        );

    }

    //----------------------------------
    // TIME
    //----------------------------------

    function renderTime(data){

        Renderer.text(

            "overlayTime",

            data.time ||

            Utils.formatTime()

        );

    }

    //----------------------------------
    // HINT
    //----------------------------------

    function renderHint(){

        Renderer.text(

            "overlayHint",

            "Chạm để tiếp tục"

        );

    }

    //----------------------------------
    // STUDENT
    //----------------------------------

    function renderStudent(data){

        renderPhoto(data);

        renderName(data);

        renderKhoi(data);

        renderClass(data);

        renderCode(data);

        renderTime(data);

    }

    //----------------------------------
    // SHOW
    //----------------------------------

    function show(){

        Renderer.show("overlay");

    }

    //----------------------------------
    // HIDE
    //----------------------------------

    function hide(){

        Renderer.hide("overlay");

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
