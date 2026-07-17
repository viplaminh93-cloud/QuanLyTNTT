//======================================
// ATTENDANCE CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceController = (()=>{

    let processing = false;

    //----------------------------------
    // START
    //----------------------------------

    async function start(loai){
    
        try{
    
            processing = false;
    
            AttendanceService.setCurrentType(loai);
    
            console.log("1");
    
            AttendanceRenderer.showScanner(loai);
    
            console.log("2");
    
            const total = await AttendanceService.getTodayCounter();
    
            console.log("3");
    
            AttendanceRenderer.renderTodayCounter(total);
    
            console.log("4");
    
            await CameraController.start();
    
            console.log("5");
    
        }
    
        catch(e){
    
            console.error(e);
    
            alert(e.message);
    
        }
    
    }

    //----------------------------------
    // QR SUCCESS
    //----------------------------------

    async function onQRCode(qrText){

        if(processing){

            return;

        }

        processing = true;

        try{

            const result =

                await AttendanceService.sendAttendance(

                    qrText

                );

            //----------------------------------
            // Update counter
            //----------------------------------

            if(result.success){

                const total =

                    await AttendanceService.getTodayCounter();

                AttendanceRenderer.renderTodayCounter(

                    total

                );

            }

            //----------------------------------
            // Popup
            //----------------------------------

            PopupService.show(result);

        }

        catch(error){

            console.error(error);

            processing = false;

            await CameraController.resume();

        }

    }

    //----------------------------------
    // CLOSE POPUP
    //----------------------------------

    async function closePopup(){

        processing = false;

        await PopupService.close();

    }

    //----------------------------------
    // BACK HOME
    //----------------------------------

    async function backHome(){

        processing = false;

        AttendanceService.reset();

        await CameraController.stop();

        AttendanceRenderer.showHome();

    }

    //----------------------------------

    return{

        start,

        onQRCode,

        closePopup,

        backHome

    };

})();
