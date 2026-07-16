//======================================
// CAMERA SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

/**
 * ======================================
 * CAMERA SERVICE
 *
 * Chỉ làm việc với Html5Qrcode.
 * Không Popup.
 * Không API.
 * Không Attendance.
 * ======================================
 */

const CameraService = (()=>{

    let scanner = null;

    /**
     * ======================================
     * START
     * ======================================
     */

    async function start(onSuccess){

        Debug.log?.(

            MODULE.CAMERA,

            "Start Camera"

        );

        if(scanner){

            await stop();

        }

        scanner = new Html5Qrcode(

            "reader"

        );

        await scanner.start(

            {

                facingMode:

                    Config.CAMERA.FACING_MODE

            },

            {

                fps:

                    Config.CAMERA.FPS,

                qrbox:{

                    width:

                        Config.CAMERA.WIDTH,

                    height:

                        Config.CAMERA.HEIGHT

                },

                rememberLastUsedCamera:

                    Config.CAMERA.REMEMBER_CAMERA,

                disableFlip:

                    Config.CAMERA.DISABLE_FLIP

            },

            onSuccess

        );

    }

    /**
     * ======================================
     * STOP
     * ======================================
     */

    async function stop(){

        if(!scanner){

            return;

        }

        try{

            await scanner.stop();

        }

        catch(error){

            console.error(error);

        }

        try{

            await scanner.clear();

        }

        catch(error){

            console.error(error);

        }

        scanner = null;

        const reader =

            Utils.id("reader");

        if(reader){

            reader.innerHTML = "";

        }

    }

    /**
     * ======================================
     * PAUSE
     * ======================================
     */

    async function pause(){

        if(!scanner){

            return;

        }

        try{

            scanner.pause(true);

        }

        catch(error){

            console.error(error);

        }

    }

    /**
     * ======================================
     * RESUME
     * ======================================
     */

    async function resume(){

        if(!scanner){

            return;

        }

        try{

            scanner.resume();

        }

        catch(error){

            console.error(error);

        }

    }

    /**
     * ======================================
     * EXISTS
     * ======================================
     */

    function exists(){

        return scanner !== null;

    }

    /**
     * ======================================
     * GET INSTANCE
     * ======================================
     */

    function getScanner(){

        return scanner;

    }

    return{

        start,

        stop,

        pause,

        resume,

        exists,

        getScanner

    };

})();
