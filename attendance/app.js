//======================================
// ATTENDANCE APP
// Giáo xứ Phú Hòa
//======================================

"use strict";

window.addEventListener(

    "load",

    initializeAttendance

);

//======================================
// INIT
//======================================

function initializeAttendance(){

    console.log("================================");

    console.log(Config.APP.PARISH);

    console.log(Config.APP.NAME);

    console.log("Version:",Version.VERSION);

    console.log("================================");

    //----------------------------------
    // Queue
    //----------------------------------

    if(

        typeof OfflineService !== "undefined"

    ){

        OfflineService.renderQueueBadge();

    }

    //----------------------------------
    // PWA
    //----------------------------------

    initializePWA();

}

//======================================
// INSTALL
//======================================

let installPrompt = null;

window.addEventListener(

    "beforeinstallprompt",

    event=>{

        event.preventDefault();

        installPrompt = event;

        Renderer.show("installBtn");

    }

);

//======================================
// INIT PWA
//======================================

function initializePWA(){

    const button = Utils.id("installBtn");

    if(!button){

        return;

    }

    button.addEventListener(

        "click",

        installApplication

    );

}

//======================================
// INSTALL APP
//======================================

async function installApplication(){

    if(!installPrompt){

        return;

    }

    installPrompt.prompt();

    await installPrompt.userChoice;

    installPrompt = null;

    Renderer.hide("installBtn");

}

//======================================
// SERVICE WORKER
//======================================

if(

    "serviceWorker" in navigator

){

    window.addEventListener(

        "load",

        ()=>{

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

    );

}
