//======================================
// ATTENDANCE APP
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * ATTENDANCE APP
 *
 * Bootstrap Attendance Module
 * ======================================
 */

window.addEventListener(

    "load",

    initializeAttendance

);

//======================================
// INIT
//======================================

function initializeAttendance(){

    console.log(
        "================================"
    );

    console.log(
        Config.APP.PARISH
    );

    console.log(
        Config.APP.NAME
    );

    console.log(
        "Version:",
        Version.VERSION
    );

    console.log(
        "================================"
    );

    //----------------------------------
    // Queue Badge
    //----------------------------------

    if(

        typeof renderQueueBadge ===

        "function"

    ){

        renderQueueBadge();

    }

    //----------------------------------
    // PWA
    //----------------------------------

    initializePWA();

}

//======================================
// PWA
//======================================

let installPrompt = null;

//======================================
// BEFORE INSTALL
//======================================

window.addEventListener(

    "beforeinstallprompt",

    event=>{

        event.preventDefault();

        installPrompt = event;

        Renderer.show(

            Utils.id("installBtn")

        );

    }

);

//======================================
// INSTALL INIT
//======================================

function initializePWA(){

    const button =

        Utils.id("installBtn");

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        installApplication

    );

}

//======================================
// INSTALL
//======================================

async function installApplication(){

    if(!installPrompt){

        return;

    }

    installPrompt.prompt();

    await installPrompt.userChoice;

    installPrompt = null;

    Renderer.hide(

        Utils.id("installBtn")

    );

}

//======================================
// SERVICE WORKER
//======================================

if(

    "serviceWorker" in navigator

){

    navigator.serviceWorker

        .register(

            "../service-worker.js"

        )

        .then(reg=>{

            console.log(

                "Service Worker OK",

                reg

            );

        })

        .catch(console.error);

}
