//==================================================
// DASHBOARD CONTROLLER
//
// Điều phối Dashboard
//
// Chức năng:
//
// - Khởi tạo
// - Load Dashboard
// - Refresh
// - Chuyển tab
//
//==================================================

"use strict";

Auth.requireLogin();

//======================================
// INIT
//======================================

window.addEventListener(

    "load",

    initDashboard

);

//======================================
// INIT DASHBOARD
//======================================

async function initDashboard(){

    await loadDashboard();

    bindEvents();

}

//======================================
// LOAD DASHBOARD
//======================================

async function loadDashboard(){

    try{

        await DashboardService.load();

        DashboardRenderer.updateToolbar();

        DashboardRenderer.render();

    }

    catch(err){

        console.error(err);

        alert(

            err.message ||

            "Không kết nối được máy chủ."

        );

    }

}

//======================================
// EVENTS
//======================================

function bindEvents(){

    //----------------------------------
    // Refresh
    //----------------------------------

    id("btnRefresh")

    .addEventListener(

        "click",

        loadDashboard

    );

    //----------------------------------
    // Dự lễ
    //----------------------------------

    id("btnLe")

    .addEventListener(

        "click",

        showLe

    );

    //----------------------------------
    // Giáo lý
    //----------------------------------

    id("btnGiaoLy")

    .addEventListener(

        "click",

        showGiaoLy

    );

}

//======================================
// SHOW LỄ
//======================================

function showLe(){

    DashboardState.currentType =

        LOAI.LE;

    DashboardRenderer.updateToolbar();

    DashboardRenderer.render();

}

//======================================
// SHOW GIÁO LÝ
//======================================

function showGiaoLy(){

    DashboardState.currentType =

        LOAI.GIAOLY;

    DashboardRenderer.updateToolbar();

    DashboardRenderer.render();

}
