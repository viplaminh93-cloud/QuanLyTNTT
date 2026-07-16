//======================================
// ATTENDANCE CONTROLLER
// Giáo xứ Phú Hòa
//======================================

"use strict";

Auth.requireLogin();

const AttendanceController = (()=>{

    let currentType = "";

    let processing = false;

    let todayCounter = 0;

    /**
     * ======================================
     * BẮT ĐẦU ĐIỂM DANH
     * ======================================
     */

    async function start(type){

        currentType = type;

        processing = false;

        //----------------------------------
        // Đồng bộ Offline
        //----------------------------------

        if(

            navigator.onLine

            &&

            typeof Offline !== "undefined"

            &&

            Offline.hasQueue()

        ){

            await Offline.sync();

        }

        //----------------------------------
        // Hiển thị giao diện
        //----------------------------------

        AttendanceRenderer.showScanner(type);

        //----------------------------------
        // Tổng hôm nay
        //----------------------------------

        await loadTodayCounter();

        //----------------------------------
        // Camera
        //----------------------------------

        await startCamera();

    }

    /**
     * ======================================
     * LOAD COUNTER
     * ======================================
     */

    async function loadTodayCounter(){

        try{

            todayCounter =

                await AttendanceService.getTodayCounter(

                    currentType

                );

            AttendanceRenderer.renderTodayCounter(

                todayCounter

            );

        }

        catch(error){

            console.error(error);

        }

    }

    /**
     * ======================================
     * QR SUCCESS
     * ======================================
     */

    async function onQRCode(qrText){

        if(processing){

            return;

        }

        processing = true;

        try{

            const result =

                await AttendanceService.sendAttendance(

                    qrText,

                    currentType

                );

            //----------------------------------
            // Thành công
            //----------------------------------

            if(result.success){

                todayCounter++;

                AttendanceRenderer.renderTodayCounter(

                    todayCounter

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

            await resumeCamera();

        }

    }

    /**
     * ======================================
     * ĐÓNG POPUP
     * ======================================
     */

    async function closePopup(){

        processing = false;

        await PopupService.close();

    }

    /**
     * ======================================
     * QUAY VỀ
     * ======================================
     */

    async function backHome(){

        await stopCamera();

        AttendanceRenderer.showHome();

        processing = false;

    }

    return{

        start,

        onQRCode,

        closePopup,

        backHome

    };

})();
