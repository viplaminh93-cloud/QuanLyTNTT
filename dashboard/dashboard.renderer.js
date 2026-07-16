//==================================================
// DASHBOARD RENDERER
//
// Render giao diện Dashboard
//
// Bao gồm:
//
// - Dashboard
// - Toolbar
// - Summary
// - Table
//
//==================================================

"use strict";

const DashboardRenderer = (()=>{

    //======================================
    // RENDER ALL
    //======================================

    function render(){

        renderSummary();

        renderTable();

    }

    //======================================
    // SUMMARY
    //======================================

    function renderSummary(){

        const list =

            DashboardService.getByType(

                DashboardState.currentType

            );

        renderText(

            "tongDanhSach",

            list.length

        );

    }

    //======================================
    // TABLE
    //======================================

    function renderTable(){

        const body =

            id("attendanceBody");

        body.innerHTML = "";

        const list =

            DashboardService.getByType(

                DashboardState.currentType

            );

        list.forEach((item,index)=>{

            const tr =

                create("tr");

            tr.innerHTML =

                "<td>"

                +(index+1)

                +"</td>"

                +

                "<td>"

                +item.maso

                +"</td>"

                +

                "<td>"

                +item.hoten

                +"</td>"

                +

                "<td>"

                +(item.lop || "")

                +"</td>"

                +

                "<td>"

                +item.gio

                +"</td>";

            body.appendChild(tr);

        });

    }

    //======================================
    // TOOLBAR
    //======================================

    function updateToolbar(){

        if(

            DashboardState.currentType === LOAI.LE

        ){

            id("btnLe")

            .classList.add("active");

            id("btnGiaoLy")

            .classList.remove("active");

        }

        else{

            id("btnGiaoLy")

            .classList.add("active");

            id("btnLe")

            .classList.remove("active");

        }

    }

    //======================================
    // PUBLIC
    //======================================

    return{

        render,

        renderSummary,

        renderTable,

        updateToolbar

    };

})();
