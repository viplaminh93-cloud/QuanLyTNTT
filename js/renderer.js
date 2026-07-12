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


console.log("renderer.js loaded");
