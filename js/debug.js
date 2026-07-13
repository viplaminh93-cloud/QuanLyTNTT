//======================================
// DEBUG
//======================================

"use strict";

const Debug = {

    logs:[]

};


//======================================
// ADD LOG
//======================================

function debug(message){

    if(!CONFIG.APP.DEBUG){

        return;

    }

    const now = new Date();

    const time =

        now.toLocaleTimeString();

    const text =

        "["

        + time

        + "] "

        + message;

    Debug.logs.push(text);

    console.log(text);

}
