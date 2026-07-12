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



console.log("renderer.js loaded");
