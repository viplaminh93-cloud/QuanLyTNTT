//======================================
// ATTENDANCE SERVICE
// Giáo xứ Phú Hòa
//======================================

"use strict";

const AttendanceService = (()=>{

    let currentType = "";

    //----------------------------------
    // SET TYPE
    //----------------------------------

    function setCurrentType(loai){

        currentType = loai;

    }

    //----------------------------------
    // GET TYPE
    //----------------------------------

    function getCurrentType(){

        return currentType;

    }

    //----------------------------------
    // SEND ATTENDANCE
    //----------------------------------

    async function sendAttendance(qrText){

        return await AttendanceAPI.sendAttendance(qrText);

    }

    //----------------------------------
    // TODAY COUNTER
    //----------------------------------

    async function getTodayCounter(){

        try{

            const response = await Auth.post({

                action : "todayCounter",

                loai : currentType

            });

            if(

                response &&

                response.success

            ){

                return Number(

                    response.total || 0

                );

            }

            return 0;

        }

        catch(error){

            console.error(error);

            return 0;

        }

    }

    //----------------------------------
    // RESET
    //----------------------------------

    function reset(){

        currentType = "";

    }

    //----------------------------------

    return{

        setCurrentType,

        getCurrentType,

        sendAttendance,

        getTodayCounter,

        reset

    };

})();
