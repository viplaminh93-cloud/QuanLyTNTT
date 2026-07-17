//======================================
// ATTENDANCE SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceService = (()=>{

    //----------------------------------
    // Loại điểm danh
    //----------------------------------

    let currentType = "";

    //----------------------------------
    // Tổng hôm nay
    //----------------------------------

    let todayCounter = 0;

    //----------------------------------
    // START SESSION
    //----------------------------------

    async function start(type){

        currentType = type;

        App.loaiDiemDanh = type;

        if(

            navigator.onLine

            &&

            OfflineService.hasQueue()

        ){

            await OfflineService.sync();

        }

        AttendanceRenderer.showScanner(type);

        await loadTodayCounter();

        await startCamera();

    }

    //----------------------------------
    // LOAD COUNTER
    //----------------------------------

    async function loadTodayCounter(){

        try{

            const response = await Auth.post({

                action : "todayCounter",

                loai : currentType

            });

            if(response.success){

                todayCounter =

                    Number(response.total || 0);

            }

            else{

                todayCounter = 0;

            }

        }

        catch(error){

            console.error(error);

            todayCounter = 0;

        }

        AttendanceRenderer.renderTodayCounter(

            todayCounter

        );

    }

    //----------------------------------
    // SEND ATTENDANCE
    //----------------------------------

    async function sendAttendance(qrText){

        return await AttendanceAPI.sendAttendance(

            qrText

        );

    }

    //----------------------------------
    // COUNTER ++
    //----------------------------------

    function increaseCounter(){

        todayCounter++;

        AttendanceRenderer.renderTodayCounter(

            todayCounter

        );

    }

    //----------------------------------
    // GET COUNTER
    //----------------------------------

    function getCounter(){

        return todayCounter;

    }

    //----------------------------------
    // GET TYPE
    //----------------------------------

    function getCurrentType(){

        return currentType;

    }

    //----------------------------------
    // RESET
    //----------------------------------

    function reset(){

        currentType = "";

        todayCounter = 0;

    }

    //----------------------------------
    // PUBLIC
    //----------------------------------

    return{

        start,

        loadTodayCounter,

        sendAttendance,

        increaseCounter,

        getCounter,

        getCurrentType,

        reset

    };

})();
