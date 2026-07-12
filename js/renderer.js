//======================================
// RENDERER
//======================================

"use strict";


//======================================
// RENDER TEXT
//======================================

function renderText(elementId,value){

    const obj=id(elementId);

    if(!obj){

        return;

    }

    obj.innerText=value??"";

}


//======================================
// RENDER IMAGE
//======================================

function renderImage(elementId,url){

    const img=id(elementId);

    if(!img){

        return;

    }

    img.src=url||"";

}



//======================================
// SHOW ELEMENT
//======================================

function renderShow(elementId){

    show(id(elementId));

}



//======================================
// HIDE ELEMENT
//======================================

function renderHide(elementId){

    hide(id(elementId));

}







//======================================
// STUDENT
//======================================

function renderStudentName(name){

    renderText(

        "overlayName",

        name

    );

}


function renderStudentClass(lop){

    renderText(

        "overlayClass",

        lop

    );

}



function renderStudentKhoi(khoi){

    renderText(

        "overlayKhoi",

        khoi

    );

}


function renderStudentCode(maso){

    renderText(

        "overlayCode",

        maso

    );

}



function renderStudentPhoto(photo){

    renderImage(

        "overlayPhoto",

        photo

    );

}




//======================================
// RENDER STUDENT
//======================================

function renderStudent(data){

    renderStudentName(data);

    renderStudentKhoi(data);

    renderStudentClass(data);

    renderStudentCode(data);

    renderStudentPhoto(data);

}





//======================================
// RENDER POPUP
//======================================

function renderPopup(data){

    renderStudent(data);

}

console.log("renderer.js loaded");
