//======================================
// ATTENDANCE RENDERER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceRenderer = (()=>{

    //----------------------------------
    // HOME
    //----------------------------------

    function showHome(){

        const home = document.querySelector(".home");

        if(home){

            Renderer.show(home);

        }

        hideScanner();

    }

    function hideHome(){

        const home = document.querySelector(".home");

        if(home){

            Renderer.hide(home);

        }

    }

    //----------------------------------
    // SCANNER
    //----------------------------------

    function showScanner(loai){

        hideHome();

        const box = Utils.id("scannerBox");

        Renderer.show(box);

        renderType(loai);

    }

    function hideScanner(){

        const box = Utils.id("scannerBox");

        Renderer.hide(box);

    }

    //----------------------------------
    // TITLE
    //----------------------------------

    function renderType(loai){

        const txt = Utils.id("typeTitle");

        if(!txt){

            return;

        }

        txt.innerText = "Điểm danh: " + loai;

    }

    //----------------------------------
    // COUNTER
    //----------------------------------

    function renderTodayCounter(total){

        const txt = Utils.id("todayCount");

        if(!txt){

            return;

        }

        txt.innerText =
            "Đã điểm danh hôm nay: "
            + total
            + " em";

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        showHome,
        hideHome,

        showScanner,
        hideScanner,

        renderType,
        renderTodayCounter

    };

})();
