//======================================
// CAMERA SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const CameraService = (()=>{

    let scanner = null;
    let paused = false;
    let running = false;

    //----------------------------------
    // START
    //----------------------------------

    async function start(onSuccess){

        if(running){

            await stop();
        }

        scanner = new Html5Qrcode("reader");

        paused = false;
        running = true;

        await scanner.start(

            {
                facingMode : "environment"
            },

            {
                fps : 10,

                qrbox : {
                    width : 250,
                    height : 250
                },

                rememberLastUsedCamera : true,

                disableFlip : false
            },

            decodedText=>{

                onSuccess(decodedText);

            },

            ()=>{}

        );

    }

    //----------------------------------
    // STOP
    //----------------------------------

    async function stop(){

        if(!scanner){

            running = false;
            paused = false;

            clearReader();

            return;
        }

        try{

            if(paused){

                scanner.resume();

                paused = false;

                await Utils.sleep(100);

            }

        }catch(e){}

        try{

            await scanner.stop();

        }catch(e){}

        try{

            await scanner.clear();

        }catch(e){}

        scanner = null;
        running = false;
        paused = false;

        clearReader();

    }

    //----------------------------------
    // PAUSE
    //----------------------------------

    function pause(){

        if(!scanner){

            return;
        }

        if(paused){

            return;
        }

        try{

            scanner.pause(true);

            paused = true;

        }catch(e){

            console.error(e);

        }

    }

    //----------------------------------
    // RESUME
    //----------------------------------

    function resume(){

        if(!scanner){

            return;
        }

        if(!paused){

            return;
        }

        try{

            scanner.resume();

            paused = false;

        }catch(e){

            console.error(e);

        }

    }

    //----------------------------------
    // DESTROY
    //----------------------------------

    async function destroy(){

        await stop();

    }

    //----------------------------------
    // CLEAR READER
    //----------------------------------

    function clearReader(){

        const reader = document.getElementById("reader");

        if(reader){

            reader.innerHTML = "";

        }

    }

    //----------------------------------
    // STATE
    //----------------------------------

    function exists(){

        return scanner !== null;

    }

    function isPaused(){

        return paused;

    }

    function isRunning(){

        return running;

    }

    function getScanner(){

        return scanner;

    }

    //----------------------------------

    return{

        start,
        stop,
        pause,
        resume,
        destroy,

        exists,
        isPaused,
        isRunning,

        getScanner

    };

})();
