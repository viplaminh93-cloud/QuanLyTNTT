//==================================================
// STUDENTS CONTROLLER
//
// Điều phối module Students
//
// Chức năng:
//
// - Khởi tạo
// - Load dữ liệu
// - Search
// - Mở popup
// - Đóng popup
//
//==================================================

"use strict";

Auth.requireLogin();

//======================================
// INIT
//======================================

window.addEventListener(

    "load",

    initStudents

);

//======================================
// INIT MODULE
//======================================

async function initStudents(){

    await StudentService.load();

    StudentRenderer.renderList(

        StudentService.getAll()

    );

}

//======================================
// SEARCH
//======================================

id("txtSearch").addEventListener(

    "input",

    onSearch

);

function onSearch(){

    const keyword =

        id("txtSearch")

        .value

        .trim()

        .toLowerCase();

    if(keyword===""){

        StudentRenderer.renderList(

            StudentService.getAll()

        );

        return;

    }

    StudentRenderer.renderList(

        StudentService.search(keyword)

    );

}

//======================================
// MODAL
//======================================

id("studentModal")

.addEventListener(

    "click",

    e=>{

        if(

            e.target.id==="studentModal"

        ){

            StudentRenderer.closeModal();

        }

    }

);
