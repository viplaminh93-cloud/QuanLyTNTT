//======================================
// DEBUG
//======================================

"use strict";

const Debug={

    logs:[],

    opened:false

};


//======================================
// INIT
//======================================

window.addEventListener(

    "load",

    ()=>{

        if(!CONFIG.APP.DEBUG){

            return;

        }

        show(

            id("debugButton")

        );

        id("debugButton")

            .addEventListener(

                "click",

                toggleDebug

            );

    }

);


//======================================
// TOGGLE
//======================================

function toggleDebug(){

    Debug.opened=!Debug.opened;

    if(Debug.opened){

        show(

            id("debugPanel")

        );

    }

    else{

        hide(

            id("debugPanel")

        );

    }

}


//======================================
// DEBUG
//======================================

function debug(message){

    if(!CONFIG.APP.DEBUG){

        return;

    }

    const now=new Date();

    const line=

        "["

        + now.toLocaleTimeString()

        + "] "

        + message;

    Debug.logs.push(line);

    console.log(line);

}
